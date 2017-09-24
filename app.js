var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//    Campground.create({
//        name: "Panchgani",
//        image: "http://a2.images.thrillophilia.com/image/upload/s--IqZD0jFJ--/c_fill,f_auto,fl_strip_profile,h_325,q_jpegmini,w_500/v1/images/photos/000/031/571/original/panchgani_8.jpg.jpg?1458195324",
//        description:" Located amongst the vast reliefs of land, it is best suited for those who want to experience nature at its best. The prosperous plant and wildlife of the region make it even more beautiful in the monsoon season when they are in full bloom and zenith." 
//    }, function (err, campground) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log("new campgd");
//            console.log(campground);
//        }
//    });


app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                campgrounds: allCampgrounds
            });
        }
    });

});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
    };
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })

});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

//show more info about a campgroung.
app.get("/campgrounds/:id", function (req, res) {
    //find the campgrounds with the provided id and render show template
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {
                campground: foundCampground
            });
        }
    });

});

app.listen(8080, function () {
    console.log("listening on port 8080");
});
