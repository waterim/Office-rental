const express = require("express");
const router = express.Router();
const Office = require("../models/Office");


//GET methods Offices REST
router.get("/", (req,res) => {
    let currentUser = req.user;
    //Getting all from my DB
    Office.find()
    .then( (AllOffices) => {
        res.render("offices/index", {offices: AllOffices, currentUser: currentUser})
    })
    .catch( (err) => {
        console.log("Here is an error");
        console.log(err);
    });
});

router.get("/new", isLoggedIn,  (req,res) => {
    res.render("offices/new")
});

//All info about office
router.get("/:id" , (req,res) => {
    Office.findById(req.params.id).populate("reviews likes").exec()
    .then(foundOffice => {
        res.render("offices/show", {office: foundOffice})
    })
    .catch( err => {
        console.log("Error inside finding by id")
        console.log(err)
    });
});

//POST methods Offices
router.post("/", isLoggedIn, (req,res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description; 
    let author = {
        id: req.user.id,
        username: req.user.username
    }
    let address = {
        country: req.body.country,
        city: req.body.city
    }
    let newOffice ={
        name: name,
        image: image,
        description: description,
        author: author,
        address: address
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

router.get("/:id/edit",isAuthorized, (req,res) => {
    Office.findById(req.params.id)
    .then(foundOffice => {
        res.render("offices/edit", {office: foundOffice});
    }).catch(err => {
        req.flash("error", "Office not found");
        res.redirect("/offices") });
    
});

router.put("/:id",isAuthorized, (req,res) => {
    let id = req.params.id;
    let updatedOfficeData = req.body.updatedOffice;
    Office.findByIdAndUpdate(id, updatedOfficeData)
    .then(updatedOffice => {
        res.redirect(`/offices/${id}`)
    }).catch(err => {
        res.redirect("/offices");
    });
})


router.delete("/:id",isAuthorized, (req,res) => {
    Office.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect("/offices");
    }).catch(err => {res.redirect("/offices")});
});



// Office Like Route
router.post("/:id/like", isLoggedIn, (req, res) => {
    Office.findById(req.params.id).then(foundOffice => {
        let foundUserLike = foundOffice.likes.some(function (like) {
            return like.equals(req.user.id);
        }); 
        if(foundUserLike){
            foundOffice.likes.pull(req.user.id);
        }
        else{
            foundOffice.likes.push(req.user);
        }

        foundOffice.save().then(()=>{
            return res.redirect(`/offices/${foundOffice.id}`);
        })
        .catch(err => {
            return res.redirect("/offices");
        });
    }).catch(err => {
        return res.redirect("/offices");
    })
});


function isAuthorized(req,res,next){
    let idOffice = req.params.id;
    if(req.isAuthenticated()){
        Office.findById(idOffice)
        .then(foundOffice => {
            let idAuthor = foundOffice.author.id;
            let idUser = req.user.id;
            if(idAuthor.equals(idUser) || req.user.isAdmin){
                return next();
            }
            else{
                req.flash("error", "You don't have permission to do that");
                res.redirect(`/offices/${foundOffice.id}`)
            }
        }).catch(err => {
            req.flash("error", "Office not found");
            res.redirect("/offices");
        });
    }
    else{
        req.flash("error", "You need to be logged in");
        res.redirect(`/offices/${foundOffice.id}`)
    }
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in");
    res.redirect("/login");
}

module.exports = router;
