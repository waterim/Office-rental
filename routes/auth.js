const express = require("express"),
      passport = require("passport");

const User = require("../models/User");
const { check, validationResult } = require('express-validator');

const router = express.Router();


// ==========
// AUTH routes
// ==========
//GET methods
router.get("/register", (req,res) =>{
    res.render("authentication/register", {success:req.session.success, errors: req.session.errors});
    req.session.errors = null;
});


router.get("/login", (req,res) => {
    res.render("authentication/login", {success:req.session.success, errors: req.session.errors});
});

router.get("/logout", (req,res) => {
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/login");

})

//POST methods
router.post("/register",(req,res) => {
    check("email", 'Invalid email address').isEmail(),
    check("username").not().isEmpty().withMessage("Username is required"),
    check("password", "Password is incorrect").isLength({min:4})

    let errors = validationResult(req).array();
    console.log(errors);
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    if(!errors.length == 0){
        console.log("12")
        req.session.errors = errors;
        req.session.success = false;
        return res.render("authentication/register");
    }
    else{
        console.log("22")
        req.session.success = true;
        let newUser = new User({username:username, email:email});
        if(req.body.adminCode === "admin"){
            newUser.isAdmin = true;
        }
        User.register(newUser, password)
        .then(user => {
            passport.authenticate("local")(req,res, () => {
            res.redirect("/offices");
            })
        })
        .catch(err => {
            req.flash("error", err.message);
            console.log(err);
            return res.render("authentication/register");
        });
    }

})

router.post("/login", passport.authenticate("local",

    {
        successRedirect: "/offices",
        failureRedirect: "/login"
    }
    ),(req,res) => {
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in");
    res.redirect("/login");
}

module.exports = router;