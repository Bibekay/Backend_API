const express = require('express');
const Ridepost = require('../models/ridepost');
const auth = require('../auth');
const router = express.Router();



//ridepost details by all users to view working fine
router.route('/ridedetails')
.get((req,res,next)=> {
    Ridepost.find({status: false})
    .then((ridepost)=> {
        res.json(ridepost);
    }).catch((err)=>next(err));
});

//route post by logged in users
router.post('/ridepost', (req, res, next) => {
    let ridepost = new Ridepost(req.body);
    ridepost.post_by = req.user._id;
    ridepost.pickuppoint = req.body.pickuppoint;
    ridepost.destination = req.body.destination;
    ridepost.journeydate = req.body.journeydate;
    ridepost.time = req.body.time;
    ridepost.paidornot = req.body.paidornot;
    ridepost.cost = req.body.cost;
    ridepost.save()
    .then((ridepost) => {
        res.statusCode = 201;
        res.json(ridepost);
    }).catch(next);
});


//to notify user that ride is accepted
router.put('/:id', (req, res, next)=>
{
    ride = {
        acepted_by:req.user, 
        status: true
        }
 Ridepost.findByIdAndUpdate(req.params.id,  {$set:ride},{new:true})
    .then((reply)=>{
        if(reply == null) throw new Error("post not found");
        res.json(reply);
    }).catch(next);

});



//to view post accepted by other user 
router.route('/myPostedrides')
    .get((req, res, next) => {
        Ridepost.find({post_by: req.user.id, status:true})
        .populate('acepted_by')
        .then((ride) => {
            res.json(ride);
        }).catch((err)=>next(err));
    }); 


//view single individual post posted by users 
router.route('/myPosts')
.get((req,res,next)=> {
    Ridepost.find({post_by: req.user.id, status: false})
    .then((ridepost)=> {
        res.json(ridepost);
    }).catch((err)=>next(err));
});


//update single post posted by users
router.put('/:id/Update', (req, res, next)=>
{
    ride = {
        pickuppoint:req.body.pickuppoint, 
        destination: req.body.destination,
        journeydate:req.body.journeydate, 
        time: req.body.time,
        paidornot:req.body.paidornot, 
        cost: req.body.cost,
        }
 Ridepost.findByIdAndUpdate(req.params.id,  {$set:ride},{new:true})
    .then((reply)=>{
        if(reply == null) throw new Error("post not found");
        res.json(reply);
    }).catch(next);

});


router.delete('/:id/delete', (req, res, next)=> {
    Ridepost.findOneAndDelete({id:req.body.id})
    .then((ridepost)=>{
        res.json({status:"deleted"});
    })
}); 







module.exports = router;