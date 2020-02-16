const express = require('express');
const Bikedetails = require('../models/bikedetails');
const router = express.Router();


router.post('/bikedetails', (req, res, next) => {
    let bikedetails = new Bikedetails(req.body);
    bikedetails.post_by = req.user._id;
    bikedetails.save()
    .then((bikedetails) => {
        res.statusCode = 201;
        res.json(bikedetails);
    }).catch(next);
});

module.exports = router;
