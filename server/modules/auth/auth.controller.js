const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const AuthService = require('./auth.service');
const emailToken = require('../emailToken/emailToken.controller');

const sendEmail = require('../../utils/sendEmail');
const { messageString } = require('./auth.constant');
const emailTemplate = require('../../utils/emailTemplate');
const { BASE_URL, TOKEN_KEY, REFRESH_TOKEN_EXPIRED } = require('../../config/env');

// Create new account

// eslint-disable-next-line consistent-return
exports.signup = async (req, res) => {
    // Validate body data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: messageString?.invalidInputs });
    }

    const {
        name, email, password, username, mobile,
    } = req.body;
    try {
        const existingUser = await AuthService?.getByField({ email });
        if (existingUser) {
            return res.status(422).json({ message: messageString?.userExist });
        }
    } catch (err) {
        return res.status(500).json({ message: messageString?.signupFailed });
    }
    // Create hash password
    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return res.status(500).json({ message: messageString?.notCreateAccount });
    }

    // Save data in db
    try {
        const payload = {
            name,
            email,
            password: hashedPassword,
            mobile,
            username,
            isActive: false,
            isAdmin: false,
        };
        // Create new user
        const user = await AuthService?.createUser(payload);
        // Create token
        const token = await emailToken.createToken(user);

        const url = `${BASE_URL}/user/${user._id}/verify/${token.token}`;

        await sendEmail(user.email, messageString?.activateAccount, url, emailTemplate.verifyAccount(url));
        res.status(201)?.json({ message: messageString?.checkEmail });
    } catch (err) {
        res.status(500)?.json({ message: err?.message });
    }
};

// eslint-disable-next-line consistent-return
exports.verifyUser = async (req, res) => {
    let user;
    try {
        // Find user
        user = await AuthService.getByField({ _id: req.params.id });

        if (!user) {
            return res.status(400).json({ message: messageString?.inValidLink });
        }
        // Find token
        const token = await emailToken.findToken({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) {
            return res.status(400).json({ message: messageString?.inValidLink });
        }
        // Active user
        await AuthService.updateUser({ _id: user._id, isActive: true });

        // Remove token
        await emailToken.deleteToken(token);
    } catch (err) {
        return res.status(500).json({ message: messageString?.somethingWrong });
    }
    await sendEmail(user.email, messageString?.accountActivated, '', emailTemplate.accountActivated());
    res.status(200).json({ message: messageString?.userVerifySuccess });
};

// Login using valid credential
// eslint-disable-next-line consistent-return
exports.login = async (req, res) => {
    const { email, password } = req.body;
    let existingUser;

    try {
        existingUser = await AuthService?.getByField({ email });
    } catch (err) {
        return res.status(500).json({ message: messageString?.loginFailedAgain });
    }

    if (!existingUser) {
        return res.status(404).send({ message: messageString?.invalidCred });
    }

    if (existingUser && !existingUser.isActive) {
        const token = crypto.randomBytes(32).toString('hex');
        await emailToken.updateOne({ userId: existingUser._id, token, createdAt: Date.now() });

        const url = `${BASE_URL}/user/${existingUser._id}/verify/${token}`;
        await sendEmail(existingUser.email, messageString?.activateAccount, url, emailTemplate.verifyAccount(url));

        return res.status(500).json({ message: messageString?.accountNotActive });
    }

    let isValidPassword = false;

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return res.status(500).json({ message: messageString?.loginFailed });
    }

    if (!isValidPassword) {
        return res.status(500).json({ message: messageString?.invalidCred });
    }

    let token;
    const tokenUser = {
        userId: existingUser.id, email: existingUser.email,
    };
    try {
        token = jwt.sign(
            tokenUser,
            TOKEN_KEY,
            { expiresIn: '1h' },
        );
    } catch (err) {
        return res.status(500).json({ message: messageString?.loginFailedAgain });
    }

    let refreshToken;
    try {
        refreshToken = jwt.sign({ userId: existingUser.id, email: existingUser.email, username: existingUser.username }, 'check_refresh', { expiresIn: REFRESH_TOKEN_EXPIRED });
    } catch (err) {
        return res.status(500).json({ message: messageString?.loginFailed });
    }
    res.status(201).json({
        user: {
            userId: existingUser.id,
            name: existingUser.name,
            description: existingUser.description,
            email: existingUser.email,
            image: existingUser.image,
            mobile: existingUser.mobile,
            isAdmin: existingUser.isAdmin,
            refreshToken,
            token,
        },
        message: messageString.loginSuccess
    });
};
// eslint-disable-next-line consistent-return
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    let existingUser;

    try {
        existingUser = await AuthService?.getByField({ email });
    } catch (err) {
        return res.status(500).json({ message: 'Logging in failed, please try again later.' });
    }

    if (!existingUser) {
        return res.status(404).send({ message: 'Invalid credentials, could not log you in.' });
    }

    if (existingUser && !existingUser.isActive) {
        const token = crypto.randomBytes(32).toString('hex');
        await emailToken.updateOne({ userId: existingUser._id, token, createdAt: Date.now() });

        const url = `${process.env.BASE_URL}/user/${existingUser._id}/verify/${token}`;
        await sendEmail(existingUser.email, messageString?.activateAccount, url, emailTemplate.verifyAccount(url));

        return res.status(500).json({ message: messageString?.accountNotActive });
    }
    if (existingUser) {
        try {
            // Create token
            const token = await emailToken.createToken(existingUser);

            const url = `${process.env.BASE_URL}/user/${existingUser.id}/update-password/${token?.token}`;

            await sendEmail(existingUser.email, 'Forgot your password', url, emailTemplate.forgotPassword(url));

            return res
                .status(201)
                .send({ message: 'An Email sent to your account please verify' });
        }
        catch (err) {
            console.log('err', err);
            return res.status(500).json({ message: err });
        }
    }
    res.status(200).json({ message: 'An Email sent to your account please verify' });
};

// eslint-disable-next-line consistent-return
exports.updatePassword = async (req, res) => {
    const { userId, password } = req.body;
    let existingUser;

    try {
        existingUser = await AuthService?.getById(userId);
        if (!existingUser) {
            return res.status(404).send({ message: messageString?.inValidLink });
        }
        // Find token
        const EmailToken = await emailToken.findToken({
            userId: existingUser._id,
            token: req.body.token,
        });

        if (!EmailToken) {
            return res.status(400).json({ message: messageString?.inValidLink });
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 12);
            await AuthService?.updateUser({ id: existingUser?._id, password: hashedPassword });
            // Remove token
            await emailToken.deleteToken(EmailToken);
        } catch (err) {
            return res.status(404).send({ message: messageString?.tryAgain });
        }

    } catch (err) {
        return res.status(500).json({ message: messageString?.updatePasswordFailed });
    }
    await sendEmail(existingUser.email, messageString?.successPassword, '', emailTemplate.accountActivated(messageString?.successPassword));
    return res.status(200).json({ message: messageString?.successPassword });


};