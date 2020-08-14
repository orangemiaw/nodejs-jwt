const userModel = require('../models/users');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function(req, res, next) {
        userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "User add successfully.", data: null});
        });
    },
    authenticate: function(req, res, next) {
        userModel.findOne({email: req.body.email}, function(err, userInfo) {
            if (err) {
                next(err);
            } else {
                if(bycrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                } else {
                    res.json({status: "error", message: "Invalid email/password.", data:null});
                }
            }
        });
    }
}