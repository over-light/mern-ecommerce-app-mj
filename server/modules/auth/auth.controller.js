const AuthService = require('./auth.service');
const emailToken = require('../emailToken/emailToken.controller');
const HttpError = require('../../models/http-error');
const bcrypt = require('bcryptjs');
const sendEmail = require('../../utils/sendEmail');
const { validationResult } = require('express-validator');
const { messageString } = require('./auth.constant')
const crypto = require('crypto');
const emailTemplate = require('../../utils/emailTemplate');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

//Create new account
exports.signup = async (req, res, next) => {

    //Validate body data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { name, email, password, username, mobile } = req.body;
    try {
        const existingUser = await AuthService?.getByField({ email: email });
        if (existingUser) {
            const error = new HttpError(
                messageString?.userExist,
                422
            );
            return next(error);
        }
    } catch (err) {
        const error = new HttpError(
            messageString?.signupFailed,
            500
        );
        return next(error);
    }
    //Create hash password
    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError(
            messageString?.notCreateAccount,
            500
        );
        return next(error);
    }

    //Save data in db
    try {
        const payload = {
            name: name,
            email: email,
            password: hashedPassword,
            mobile: mobile,
            username: username,
            isActive: false,
            isAdmin: false
        }
        //Create new user
        const user = await AuthService?.createUser(payload);
        // Create token
        const token = await emailToken.createToken(user);

        const url = `${process.env.BASE_URL}/user/${user._id}/verify/${token.token}`;

        await sendEmail(user.email, messageString?.activateAccount, url, emailTemplate.verifyAccount(url));
        res.status(201)?.json({ message: messageString?.checkEmail })
    } catch (err) {
        res.status(500)?.json({ error: err?.message });
    }
};

exports.verifyUser = async (req, res, next) => {
    let user;
    try {
        //Find user
        user = await AuthService.getByField({ _id: req.params.id });

        if (!user) {
            const error = new HttpError(
                messageString?.inValidLink,
                400
            );
            return next(error);
        }
        // Find token
        const token = await emailToken.findToken({
            userId: user._id,
            token: req.params.token
        });
        if (!token) {
            return res.status(400).json({ message: messageString?.inValidLink })
        }
        //Active user
        await AuthService.updateUser({ _id: user._id, isActive: true });

        //Remove token
        await emailToken.deleteToken(token);
    } catch (err) {
        const error = new HttpError(
            messageString?.somethingWrong,
            500
        );
        return next(err);
    }
    await sendEmail(user.email, messageString?.accountActivated, '', emailTemplate.accountActivated());
    res.status(200).json({ 'message': messageString?.userVerifySuccess })
}
//Login using valid credential
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;

    try {
        existingUser = await AuthService?.getByField({ email: email });
    } catch (err) {

        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }

    if (!existingUser) {
        return res.status(404).send({ error: 'Invalid credentials, could not log you in.' })
    }

    if (existingUser && !existingUser.isActive) {
        const token = crypto.randomBytes(32).toString('hex')
        await emailToken.updateOne({ userId: existingUser._id, token: token, createdAt: Date.now() });

        const url = `${process.env.BASE_URL}user/${existingUser._id}/verify/${token}`
        await sendEmail(existingUser.email, messageString?.activateAccount, url, emailTemplate.verifyAccount(url));

        const error = new HttpError(
            messageString?.accountNotActive,
            500);
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError(
            messageString?.loginFailed,
            500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            messageString?.invalidCred,
            500
        );
        return next(error);
    }
    let token;
    const tokenUser = {
        userId: existingUser.id, email: existingUser.email
    }
    try {
        token = jwt.sign(
            tokenUser,
            process.env.TOKEN_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(err);
    }

    let refreshToken;
    try {
        refreshToken = jwt.sign({ userId: existingUser.id, email: existingUser.email, username: existingUser.username }, 'check_refresh', { expiresIn: process.env.REFRESH_TOKEN_EXPIRED });
    }
    catch (err) {
        const error = new HttpError(
            messageString?.loginFailed,
            500
        );
        return next(error);
    }
    res.status(201).json({
        userId: existingUser.id,
        name: existingUser.name,
        description: existingUser.description,
        email: existingUser.email,
        image: existingUser.image,
        mobile: existingUser.mobile,
        isAdmin: existingUser.isAdmin,
        refreshToken: refreshToken,
        token: token
    });
}