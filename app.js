const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Office = require("./models/Office")
const Review = require("./models/Review")
const seedDB = require("./seeds")

const PORT = 4000;
const ConnectionURL = "mongodb://localhost/office_rental"

mongoose.connect(ConnectionURL, {useNewUrlParser: true});
app.set("view engine", "ejs");
app.set()
app.use(bodyParser.urlencoded({extended: true}));

//Seed the DB
seedDB();


//GET methods Offices REST

app.get("/", (req,res) => {
    res.render("landing")
});

app.get("/offices", (req,res) => {
    //Getting all from my DB
    Office.find()
    .then( (AllOffices) => {
        res.render("offices/index", {offices: AllOffices})
    })
    .catch( (err) => {
        console.log("Here is an error");
        console.log(err);
    });
});

app.get("/offices/new", (req,res) => {
    res.render("offices/new")
});

//All info about office
app.get("/offices/:id" , (req,res) => {
    Office.findById(req.params.id).populate("reviews").exec()
    .then(foundOffice => {
        res.render("offices/show", {office: foundOffice})
    })
    .catch( err => {
        console.log("Error inside finding by id")
        console.log(err)
    });
});




//POST methods Offices

app.post("/offices", (req,res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newOffice ={
        name: name,
        image: image,
        description: description
    }

    Office.create(newOffice)
    .then( () => {
        res.redirect("/offices");
        console.log("New OfficeCard added!")
    })
    .catch( (err) => {
        console.log(err);
    });
});


//GET mthods reviews REST

app.get("/offices/:id/reviews/new", (req,res) => {
    Office.findById(req.params.id)
    .then( office => { 
        res.render("reviews/new", {office:office})
    }).catch(err => {console.log(err)});
});


//POST for reviews 

app.post("/offices/:id/reviews", (req,res) => {
    Office.findById(req.params.id)
    .then(office => {
        let text = req.body.review;
        Review.create(text)
        .then(review => {
             office.reviews.push(review);
             office.save().catch(err => {console.log(err)});
             res.redirect("/offices/"+office.id);
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
        res.redirect("/offices");
    });
});
 

app.listen(PORT, () =>{
    console.log("Server is running on localhost:"+PORT)
    console.log("Office Rental Server Has Started")
})