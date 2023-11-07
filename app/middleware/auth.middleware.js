const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Kiểm tra xem yêu cầu có Header 'Authorization' và có dạng 'Bearer <token>' không.

    if (!token) {
        return res.status(401).json({ message: 'Token không hợp lệ.' });
    }

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Xác thực thất bại.' });
        }

        // Gắn thông tin người dùng vào req.user
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;