const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const errorCatcher = require('../util/error_catcher');
const User = require("../models/UserModel");

const getAllUsers = asyncHandler(async (_req, res) => {
    const users = await User.find().select('-password').lean();
    res.json(users);
});

const getAllEmployees = asyncHandler(async (_req, res) => {
    const users = await User.find({roles: {$in: ['employee', 'admin', 'receptionist', 'owner']}}).select('-password').lean();
    res.json(users);
});

const getRoles = asyncHandler(async (req, res) => {
    const id = req.userId;

    if (!id) {
        return res.status(400).json({error: true, message: 'User ID Required!'});
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({error: true, message: 'User not found!'});
    }

    res.status(200).json(user.roles);
});

const addUser = asyncHandler(async (req, res) => {
    const { name, username, email, address, phone, password, roles } = req.body;

    console.log(`Here ${name}`);

    await errorCatcher(res, async () => {

        const existingUser = await User.findOne({ username }).lean().exec();
        if (existingUser) {
            return res.status(409).json({ error: true, message: 'Username already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, username, email, address, phone, "password": hashedPassword, roles
        });
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(400).json({ error: true, message: 'Invalid user data recieved!' });
        }

    });
});

const updateUser = asyncHandler(async (req, res) => {
    const { _id, name, username, email, address, phone, password, roles, points, active } = req.body;

    if (!_id) {
        res.status(400).json({ error: true, message: 'User ID is required!' });
    }

    const user = await User.findById(_id).exec();
    if (!user) {
        res.status(400).json({ error: true, message: `User not found with ID: ${_id}` });
    }

    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate && duplicate?._id.toString() !== _id) {
        res.status(400).json({ error: true, message: 'Username already exists!' });
    }

    await errorCatcher(res, async () => {

        const userObject = {
            name, username, email, phone, address
        }

        if (active !== undefined) {
            userObject.active = active;
        }
        if (points !== undefined) {
            userObject.points = points;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            userObject.password = hashedPassword;
        }
        if (roles) {
            userObject.roles = roles;
        }

        const updated = await User.updateOne({ _id: _id }, userObject).exec();
        res.status(200).json(updated);

    });
});

const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.userId;

    if (!id) {
        return res.status(400).json({error: true, message: 'User ID Required!'});
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({error: true, message: 'User not found!'});
    }

    const result = await user.deleteOne();
    res.status(200).json(result);

});

const getUser = asyncHandler(async (req, res) => {
    const id = req.params.userId;

    if (!id) {
        return res.status(400).json({error: true, message: 'User ID Required!'});
    }

    console.log(id);

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({error: true, message: 'User not found!'});
    }

    res.json(user);

});

const getUserAddress = asyncHandler(async (req, res) => {
    const id = req.userId;

    if (!id) {
        return res.status(400).json({error: true, message: 'User ID Required!'});
    }

    const address = await User.findById(id).select('address').lean().exec();
    if (!address) {
        return res.status(400).json({error: true, message: 'User not found!'});
    }

    res.status(200).json(address);
});

module.exports = {
    getAllUsers,
    addUser,
    getRoles,
    getUser,
    updateUser,
    deleteUser,
    getUserAddress,
    getAllEmployees
}