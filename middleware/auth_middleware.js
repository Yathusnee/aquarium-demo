require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.status(401).json({ status: false, error: err })
        } else {
            const user = await User.findById(data.id).select('-password').lean().exec();
            if (user) {
                req.userId = user._id;
                req.userRoles = user.roles;
                next();
            }
            else {
                return res.status(401).json({ status: false })
            }
        }
    })
}

const restrict = (allowedRoles) => (req, res, next) => {
    const userRoles = req.userRoles;
    
    if (!userRoles) {
        return res.status(401).json({ status: false })
    }

    if (allowedRoles.some((role) => userRoles.includes(role))) {
        next();
    } else {
        return res.status(401).json({ status: false });
    }
}

module.exports = {
    authenticate,
    restrict
}