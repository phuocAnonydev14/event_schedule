const bcrypt = require("bcrypt")
const {responseData} = require("../constant/responseData");
const jwt = require("jsonwebtoken")
const db = require("../models");
const Event = db.events;


// Create and Save a new Tutorial
exports.getAll = async (req, res, next) => {
    try {
        const allEvents = await Event.find({})
        res.json(responseData(true, {events:allEvents},'lấy thông tin sự kiện thành công'));

    } catch (e) {
        return res.json(responseData(false,"Lỗi máy chủ"))
    }
};
