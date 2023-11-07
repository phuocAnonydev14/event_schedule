const bcrypt = require("bcrypt")
const {responseData} = require("../constant/responseData");
const jwt = require("jsonwebtoken")
const db = require("../models");
const User = db.users;


// Create and Save a new Tutorial
exports.signup = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.json(responseData(false,"Lỗi máy chủ"))
        }
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.json({message: 'Email đã tồn tại.'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.json(responseData(true, {},'Đăng ký thành công.'));

    } catch (e) {
        return res.json(responseData(false,"Lỗi máy chủ"))
    }
};

exports.signIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.json(responseData(false,{},"Vui lòng nhập email và mật khẩu"))
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.json(responseData(false, {}, "Email hoặc mật khẩu không đúng"));
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.json(responseData(false, {}, "Email hoặc mật khẩu không đúng"));
        }
        delete user.password
        const accessToken = jwt.sign({...user}, 'your_secret_key');
        res.json(responseData(true, {accessToken, account: user}, 'Đăng nhập thành công.'));
    } catch (e) {
        return res.json(responseData(false,"Lỗi máy chủ"))
    }

};

exports.fetchUser = async (req, res) => {
    try {
        return res.json(responseData(true,{account:req.user},"lấy thông tin người dùng thành công"))
    } catch (e) {
        return res.json(responseData(false,"Lỗi máy chủ"))
    }
};

exports.logout = (req, res) => {
    res.json(responseData(true, {}, "Đăng xuất thành công"));
};

