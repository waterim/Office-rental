const mongoose = require("mongoose");
const Office = require("./models/Office");
const Review = require("./models/Review");

let offices = [
    {name: "LYCS Architecture", image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop", description: "Description 1"},
    {name: "S O C I A L . C U T", image: "https://images.unsplash.com/photo-1542089363-bba089ffaa25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80", description: "Description 2"},
    {name: "Crew Collective & Café", image: "https://images.unsplash.com/photo-1498409785966-ab341407de6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80", description: "Description 3"}
];




function seedDB(){
    Office.remove({});
// .then(()=>{
//     console.log("Database was dropped")
//     offices.forEach(seed => {
//         Office.create(seed)
//         .then( (office) => { 
//             console.log("office was added");
//             Review.create({
//                 text: "That office is so bad",
//                 author: "Artem"
//             }).then(review => {
//                 office.reviews.push(review);
//                 office.save();
//                 console.log("new review was created"); 
//             }).catch(err => {
//                 console.log(err)
//             });
//         }).catch(err => {console.log(err)});
//     });
// })
// .catch(err=>{console.log(err)});

 }

module.exports = seedDB;
