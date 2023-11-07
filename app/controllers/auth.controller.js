const bcrypt = require("bcrypt")
const {responseData} = require("../constant/responseData");
const jwt = require("jsonwebtoken")
const db = require("../models");
const Tutorial = db.tutorials;
const User = db.users;


// Create and Save a new Tutorial
exports.signup = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({status: 400, msg: "invalid condition", isSuccess: false})
        }
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User existed.'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json(responseData(true, {}, 'Sign up success'));

    } catch (e) {
        return res.status(400).json({status: 400, msg: "invalid condition", isSuccess: false})
    }
};

exports.signIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({status: 400, msg: "invalid condition", isSuccess: false})
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json(responseData(false, {}, "Email or password not correct"));
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json(responseData(false, {}, "Email or password not correct"));
        }
        delete user.password
        const accessToken = jwt.sign({userId: user._id, email: user.email}, 'your_secret_key', {expiresIn: '1h'});
        res.status(200).json(responseData(true, {accessToken, account: user}, "Sign in success"));
    } catch (e) {
        return res.status(400).json({status: 400, msg: "invalid condition", isSuccess: false})
    }

};

// Find a single Tutorial with an id
exports.logout = (req, res) => {
    res.status(200).json(responseData(true, {}, "Logout success"));
};

// Update a Tutorial by the id in the request
