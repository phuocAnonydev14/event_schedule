const bcrypt = require("bcrypt");
const { responseData } = require("../constant/responseData");
const jwt = require("jsonwebtoken");
const db = require("../models");
const moment = require("moment/moment");
const Service = db.service;
const Renter = db.renters;

// Create and Save a new Tutorial
exports.getAll = async (req, res, next) => {
  try {
    const allService = await Service.find({}).populate(
      "settings.renters.renter"
    );
    res.json(
      responseData(
        true,
        { services: allService },
        "lấy thông tin dịch vụ thành công"
      )
    );
  } catch (e) {
    return res.json(responseData(false, {}, "Lỗi máy chủ"));
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.json(responseData(false, {}, "các trường chưa hợp lệ"));
    }
    const existedService = await Service.find({ title });

    if (existedService.length > 0) {
      return res.json(responseData(false, {}, "dịch vụ đã tồn tại"));
    }

    const newService = new Service({
      ...req.body,
      settings: [],
    });
    await newService.save();
    res.json(
      responseData(true, { service: newService }, "Thêm dịch vụ thành công")
    );
  } catch (e) {
    console.log(e);
    return res.json(responseData(false, {}, "Lỗi máy chủ"));
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json(responseData(false, {}, "Id không hợp lệ"));
    }
    const updatedService = await Service.findOneAndUpdate({
      ...req.body,
    }).populate("renters.renter");
    res.json(
      responseData(true, { service: updatedService }, "Thêm dịch vụ thành công")
    );
  } catch (e) {
    console.log(e);
    return res.json(responseData(false, {}, "Lỗi máy chủ"));
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json(responseData(false, {}, "Id không hợp lệ"));
    }
    const deleteRes = await Service.deleteOne({ _id: id });
    if (!deleteRes) {
      return res.json(responseData(false, {}, "Lỗi máy chủ"));
    }
    return res.json(responseData(true, {}, "xóa dịch vụ thành công"));
  } catch (e) {
    return res.json(responseData(false, {}, "Lỗi máy chủ"));
  }
};

exports.addSettingOption = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json(responseData(false, {}, "Id không hợp lệ"));
    }

    const currentService = await Service.findOne({ _id: id });

    if (!currentService) {
      return res.json(responseData(false, {}, "Dịch vụ không tồn tại"));
    }

    const { renters, servicePack } = req.body;
    const addedRenter = renters.map((renter) => ({
      price: renter.price,
      quantity: renter.quantity,
      renter: renter.id,
    }));
    const currentSettings = currentService.settings;
    currentSettings.push({
      name: servicePack,
      renters: addedRenter,
    });
    console.log(currentSettings);

    const updatedService = await Service.findOneAndUpdate(
      { _id: id },
      {
        settings: currentSettings,
      },
      { new: true }
    ).populate("settings.renters.renter");
    return res.json(
      responseData(
        true,
        { service: updatedService },
        "Cập nhật dịch vụ thành công"
      )
    );
  } catch (e) {
    console.log(e);
    return res.json(responseData(false, {}, "Lỗi máy chủ"));
  }
};

exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json(responseData(false, {}, "Id không hợp lệ"));
    }
    const serviceDetail = await Service.findById(id).populate(
      "settings.renters.renter"
    );
    return res.json(
      responseData(
        true,
        { service: serviceDetail },
        "Lấy thông tin dịch vụ thành công"
      )
    );
  } catch (e) {
    return res.json(responseData(false, {}, "Lỗi máy chủ"));
  }
};

exports.getRentersByOption = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json(responseData(false, {}, "Id không hợp lệ"));
    }
    const { name } = req.body;

    const serviceDetail = await Service.findOne({ _id: id }).populate(
      "settings.renters.renter"
    );
    const settings = serviceDetail.settings;
    const currentSetting = settings.filter((item) => item.name == name);
    return res.json(
      responseData(
        true,
        { setting: currentSetting },
        "Lấy thông tin dịch vụ thành công"
      )
    );
  } catch (e) {
    return res.json(responseData(false, {}, "Lỗi máy chủ"));
  }
};
