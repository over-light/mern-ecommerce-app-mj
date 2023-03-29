const AuthService = require('./auth.service');
const emailToken = require('../emailToken/emailToken.controller');
const HttpError = require('../../models/http-error');
const bcrypt = require('bcryptjs');
const sendEmail = require('../../utils/sendEmail');
const { validationResult } = require('express-validator');
const { messageString } = require('./auth.constant')

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

        const emailTemplate = `
        <div>
               <h4>Email verification required</h4>
               <p>
                    Click this link within 24 hours to complete your Blog account setup:
                </p>
               <a href=${url}>verify my email</a>
               <p>
                    Thanks,
                    Jayesh Sojitra
                </p>
    </div>`

        await sendEmail(user.email, messageString?.activateAccount, url, emailTemplate);
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

    res.status(200).json({ 'message': messageString?.userVerifySuccess })
}