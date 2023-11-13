const bcrypt = require("bcrypt")
const {responseData} = require("../constant/responseData");
const jwt = require("jsonwebtoken")
const db = require("../models");
const moment = require("moment/moment");
const Service = db.service;
const Renter = db.renters;


// Create and Save a new Tutorial
exports.getAll = async (req, res, next) => {
    try {
        const allService = await Service.find({}).populate("renters.renter")
        res.json(responseData(true, {services:allService},'lấy thông tin sự kiện thành công'));

    } catch (e) {
        return res.json(responseData(false,{},"Lỗi máy chủ"))
    }
};


exports.create = async (req, res, next) => {
    try {
        const {title,renters} = req.body
        if (!title || !renters) {
            return res.json(responseData(false, {}, "các trường chưa hợp lệ"))
        }
        const existedService = await Service.find({title})
        
        if (existedService.length > 0) {
            return res.json(responseData(false, {},"dịch vụ đã tồn tại"))
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
        const updatedService = await Service.findOneAndUpdate({...req.body}).populate("renters.renter")
        res.json(responseData(true, {service: updatedService}, 'Thêm dịch vụ thành công'));
    } catch (e) {
        console.log(e);
        return res.json(responseData(false,{}, "Lỗi máy chủ"))
    }
}

exports.delete = async (req, res) => {
    try {
        const {id} = req.params
        if (!id) {
            return res.json(responseData(false, {}, "Id không hợp lệ"))
        }
        const deleteRes = await Service.deleteOne({_id: id})
        if (!deleteRes) {
            return res.json(responseData(false, {}, "Lỗi máy chủ"))
        }
        return res.json(responseData(true, {}, "xóa dịch vụ thành công"))
    } catch (e) {
        return res.json(responseData(false, {}, "Lỗi máy chủ"))
    }
}