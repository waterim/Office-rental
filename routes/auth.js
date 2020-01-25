const express = require("express"),
      passport = require("passport");

const User = require("../models/User");

const router = express.Router();


// ==========
// AUTH routes
// ==========
//GET methods
router.get("/register", (req,res) =>{
    res.render("authentication/register");
});


router.get("/login", (req,res) => {
    res.render("authentication/login");
});

router.get("/logout", (req,res) => {
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/login");

})

//POST methods
router.post("/register", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let newUser = new User({username:username});
    User.register(newUser, password)
    .then(user => {
        passport.authenticate("local")(req,res, () => {
            res.redirect("/offices");
        })
    }).catch(err => {
        req.flash("error", err.message);
        console.log(err);
        return res.render("authentication/register");
    })
})

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/offices",
        failureRedirect: "/login"
    }),(req,res) => {

})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in");
    res.redirect("/login");
}

module.exports = router;