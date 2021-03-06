const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function(req, res, next) {
        userModel.create({name: req.body.name, email: req.body.email, password: req.body.password},function(err, result){
            if(err)
             next(err);
            else
             res.json({status: "success", message: "User added successfuly!", data: null});
            });
        },

        authenticate: function(req, res, next) {
            userModel.findOne({email: req.body.email}, function(err, userInfo){
                if(err){
                    next(err);
                }else{
                    if(bcrypt.compareSync(req.body.password, userInfo.password)){
                        const token = jwt.sign({id: userInfo._id}, reqapp.get('secretKey'),{
                            expiresIn: '1h'});
                        res.json({status: "success", message: "User found!", data: {user: userInfo, token: token}});
                    }else{
                        res.json({status: "error", message: "Invalid email/password!", data:null});

                    }
                }
            });
        }
    
}