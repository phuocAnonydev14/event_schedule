const bcrypt = require("bcrypt")
const {responseData} = require("../constant/responseData");
const jwt = require("jsonwebtoken")
const db = require("../models");
const moment = require("moment/moment");
const Service = db.service;


// Create and Save a new Tutorial
exports.getAll = async (req, res, next) => {
    try {
        const allService = await Service.find({})
        res.json(responseData(true, {services:allService},'lấy thông tin sự kiện thành công'));

    } catch (e) {
        return res.json(responseData(false,{},"Lỗi máy chủ"))
    }
};


exports.create = async (req, res, next) => {
    try {
        const {title} = req.body
        if (!title) {
            return res.json(responseData(false, {}, "các trường chưa hợp lệ"))
        }
        const newService = new Service({
            ...req.body,
        })
        await newService.save()
        res.json(responseData(true, {service: newService}, 'Thêm dịch vụ thành công'));
    } catch (e) {
        console.log(e);
        return res.json(responseData(false,{}, "Lỗi máy chủ"))
    }
}

exports.update = async (req, res, next) => {
    try {
        const {id} = req.params
        if (!id) {
            return res.json(responseData(false, {}, "Id không hợp lệ"))
        }
        const service = await Service.findById(id)
        if (!service) {
            return res.json(responseData(false, {},"dịch vụ không tồn tại"))
        }
        await service.update({...req.body})
        res.json(responseData(true, {service: service}, 'Thêm dịch vụ thành công'));
    } catch (e) {
        console.log(e);
        return res.json(responseData(false,{}, "Lỗi máy chủ"))
    }
}