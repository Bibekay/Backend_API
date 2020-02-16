const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const auth = require('../auth');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            throw new Error('Could not hash!');
        }
        User.create({
            fullname: req.body.fullname,
            username: req.body.username,
            contact: req.body.contact,
            email: req.body.email,
            password: hash
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "SignUp success",  token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login Successful',  token: token });
                    }).catch(next);
            }
        }).catch(next);
})

router.get('/me', auth.verifyUser, (req, res, next) => {
    res.json({ _id: req.user._id,
        fullname: req.user.fullname, 
        username:req.user.username,
        contact: req.user.contact,
        email: req.user.email,
        birthyear:req.user.birthyear,
        gender:req.user.gender,
        image:req.user.image
     });
});


router.put('/me', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            // res.json( {_id: user._id, fullname: req.user.fullname, username: req.user.username,  contact: user.contact, email: user.email, birthyear: user.birthyear, gender: user.gender });
        res.json(req.body);
        }).catch(next);
});





module.exports = router;