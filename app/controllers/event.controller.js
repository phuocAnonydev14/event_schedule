const bcrypt = require("bcrypt")
const {responseData} = require("../constant/responseData");
const jwt = require("jsonwebtoken")
const db = require("../models");
const moment = require("moment/moment");
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


exports.create = async (req, res, next) => {
    try {
        const {name, description, startDate, endDate} = req.body
        if (!name || !description || !startDate || !endDate) {
            return res.json(responseData(false, {}, "các trường chưa hợp lệ"))
        }
        console.log({test:moment(startDate).format("YYYY-MM-DD"),init:startDate});
        const newEvent = new Event({
            ...req.body,
            startDate:moment(startDate).format("YYYY-MM-DD"),
            endDate: moment(endDate).format("YYYY-MM-DD")
        })
        await newEvent.save()
        res.json(responseData(true, {event: newEvent}, 'Thêm sự kiện thành công'));
    } catch (e) {
        console.log(e);
        return res.json(responseData(false, "Lỗi máy chủ"))
    }
}