const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const { createSecretToken } = require('../util/token_gen');
const User = require("../models/UserModel");
const errorCatcher = require('../util/error_catcher');
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
    const { name, username, email, address, phone, password } = req.body;

    await errorCatcher(res, async () => {

        const existingUser = await User.findOne({ username }).lean().exec();
        if (existingUser) {
            return res.status(409).json({ error: true, message: 'Username already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, username, email, address, phone, "password": hashedPassword, roles: ['customer']
        });
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(400).json({ error: true, message: 'Invalid user data recieved!' });
        }

    });
});

const login = asyncHandler(async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: true, message: 'All fields are required' })
    }

    const user = await User.findOne({ username }).lean().exec();
    if (!user) {
        res.status(400).json({ error: true, message: 'User not found!' });
    }

    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
        return res.status(400).json({ error: true, message: 'Incorrect password or username' })
    }

    const token = createSecretToken(user._id);
    
    user.password = token;
    res.status(200).json(user);

});

const authenticate = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.status(401).json({ status: false })
        } else {
            const user = await User.findById(data.id).select('_id').lean().exec();
            if (user) {
                return res.status(200).send('OK');
            }
            else {
                return res.status(401).json({ status: false })
            }
        }
    });
}

module.exports = {
    login,
    register,
    authenticate
}