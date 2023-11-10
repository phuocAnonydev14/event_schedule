const { responseData } = require("../constant/responseData");

function adminCheck(req, res, next) {
    if (req.user.role !== "admin") {
        return res.json(responseData(false, {}, "Bạn không phải admin"))
    }
    next()
}

module.exports = adminCheck;