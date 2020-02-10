const express = require("express");
const router = express.Router({mergeParams: true});
const Office = require("../models/Office"),
      Review = require("../models/Review");

//GET mthods reviews REST
router.get("/new", isLoggedIn, (req,res) => {
    Office.findById(req.params.id)
    .then( office => { 
        res.render("reviews/new", {office:office})
    }).catch(err => {console.log(err)});
});

//POST for reviews 
router.post("/", isLoggedIn,  (req,res) => {
    Office.findById(req.params.id)
    .then(office => {
        let text = req.body.review;
        Review.create(text)
        .then(review => {
            console.log(req.user);
             review.author.id = req.user.id;
             review.author.username = req.user.username;
             review.save();
             office.reviews.push(review);
             office.save().catch(err => {console.log(err)});
             req.flash("success", "Successfully added a new comment");
             res.redirect("/offices/"+office.id);
        }).catch(err => {
            req.flash("error", "Whoops, something went wrong");
            console.log(err);
            console.log(req.user)
            return res.render("errorPage", {err:err})
        });
    }).catch(err => {
        console.log(err);
        res.redirect("/offices");
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in");
    res.redirect("/login");
}

module.exports = router;