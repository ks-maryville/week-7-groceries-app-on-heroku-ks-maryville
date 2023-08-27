// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect("mongodb://localhost/groceries");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Grocery = mongoose.model('Grocery', {
    name: String,
    quantity: Number
});


// Get all grocery items
app.get('/api/groceries', function (req, res) {

    console.log("Listing groceries items...");

    //use mongoose to get all groceries in the database
    // Grocery.find(function (err, groceries) {
    //
    //     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    //     if (err) {
    //         res.send(err);
    //     }
    //
    //     res.json(groceries); // return all groceries in JSON format
    // });

    Grocery.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        })
});

app.get('/api/groceries/:id', async (req, res) => {

    // Grocery.findById((err, item) => {
    //     if (err) {
    //         return res.send(err);
    //     }
    //     return res.send(item);
    // })

    try{
        let item = await Grocery.findById(req.params.id);
        res.send(item);
    }catch(err){
        res.send(err);
    }
})
// Create a grocery Item
app.post('/api/groceries', function (req, res) {

    console.log("Creating grocery item...");

    const obj = {
        name: req.body.name,
        quantity: req.body.quantity,
        done: false
    }

    // Grocery.create({
    //     name: req.body.name,
    //     quantity: req.body.quantity,
    //     done: false
    // }, function (err, grocery) {
    //     if (err) {
    //         return res.send(err);
    //     }
    //
    //     // create and return all the groceries
    //     Grocery.find(function (err, groceries) {
    //         if (err) {
    //             return res.send(err);
    //         }
    //
    //         return res.json(groceries);
    //     });
    // });
    Grocery.create(obj).then(result=>{
        Grocery.find()
            .then(item=>{
                res.send(item);
            })
    }).catch((err)=>{
        res.send(err);
    })

});

// Update a grocery Item
app.put('/api/groceries/:id', function (req, res) {
    const grocery = {
        name: req.body.name,
        quantity: req.body.quantity
    };
    console.log("Updating item - ", req.params.id);
    Grocery.update({_id: req.params.id}, grocery, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a grocery Item
app.delete('/api/groceries/:id', function (req, res) {
    Grocery.remove({
        _id: req.params.id
    }, function (err, grocery) {
        if (err) {
            console.error("Error deleting grocery ", err);
        } else {
            Grocery.find(function (err, groceries) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(groceries);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(6000);
console.log("Grocery server listening on port  - ", (6000));