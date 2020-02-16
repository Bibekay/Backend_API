const express = require('express');
const Riderequest = require('../models/riderequest');
const router = express.Router();


router.post('/riderequest', (req, res, next) => {
    let riderequest = new Riderequest(req.body);
    riderequest.post_by = req.user._id;
    riderequest.save()
    .then((riderequest) => {
        res.statusCode = 201;
        res.json(riderequest);
    }).catch(next);
});


router.route('/riderequestdetails')
.get((req,res,next)=> {
    Riderequest.find(res.body)
    .then((riderequest)=> {
        res.json(riderequest);
    }).catch((err)=>next(err));
});



module.exports = router;
