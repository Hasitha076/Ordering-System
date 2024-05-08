const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer')
const userSchema = require('../model/userModel')
require('dotenv').config()

const salt = 10

const register = async (req, res) => {
    try {
        await userSchema.findOne({ email: req.body.email }).then((response) => {
            if (response == null) {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                        return res.status(404).json({ msg: 'Error hashing password' })
                    } else {
                        const user = new userSchema({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            image: req.body.imgUrl,
                            password: hash,
                            activeState: true
                        })

                        const transpoter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.EMAIL_USERNAME,
                                pass: process.env.APP_PASSWORD
                            }
                        })

                        const mailOptions = {
                            from: process.env.EMAIL_USERNAME,
                            to: req.body.email,
                            subject: 'New Account Creation',
                            text: 'You have created your account successfully!'
                        }

                        transpoter.sendMail(mailOptions, (err, info) => {
                            if (err) {
                                return res.status(500).json({ msg: 'Error sending mail' })
                            } else {
                                user.save()
                                    .then((result) => {
                                        return res.status(200).json({ msg: 'User created successfully', data: result })
                                    })
                            }
                        })
                    }
                })
            } else {
                return res.status(404).json({ msg: 'User is already exist!' })
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: 'server error!' })
    }
}

const editUser = async (req, res) => {
    try {
        const { id } = req.params
        await userSchema.findByIdAndUpdate({ _id: id }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                image: req.body.imgUrl
            }
        },
            {
                new: true
            })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "User does not exist!" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            sameSite: 'none',
            secure: true // Set to false for local development
        });

        console.log("User details: ", user);
        res.json({ msg: "success", token, user });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const refresh = (req, res) => {

    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const selectedUser = await userSchema.findOne({ email: decoded.email }).exec()

            if (!selectedUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    email: selectedUser.email,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        }
    )
}

const logout = asyncHandler(
    async (req, res) => {
        res.cookie('jwt', '', {
            path: '/',
            httpOnly: true,
            expires: new Date(0),
            sameSite: 'none',
            secure: true
        });
        res.status(200).json(true);
    }
);

const loginStatus = asyncHandler(async (req, res) => {
    try {
        // Parse cookies from request headers
        const token = req.cookies.jwt;
        if (!token) {
            return res.json(false);
        }

        //verify the token
        const verified = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        if (verified) {
            return res.json(true);
        } else {
            return res.json(false);
        }
    } catch (error) {
        console.error("Error in loginStatus:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = {
    register,
    login,
    refresh,
    logout,
    loginStatus
}