// imagesController.js
// Import images model


// query parser instatiation
const { MongooseQueryParser } = require('mongoose-query-parser');
// mongoose
import * as mongoose from 'mongoose';

let Mparser = new MongooseQueryParser();
Users = require('./userModel');
//const parser = new MongooseQueryParser();
// import { MongooseQueryParser } from 'mongoose-query-parser';
// const parser = new MongooseQueryParser();

// Handle index actions
exports.index = function (req, res) {
    if (Object.keys(req.query).length === 0) {
        // no query strings so get it all this should never happen since you only allowed to see your own users stuff
            Images.get(function (err, images) {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                res.json({
                    status: "success",
                    message: "Images retrieved successfully",
                    data: images
                });
            });

    } else {
        // we got some query so lets query !
        const parsed = Mparser.parse(req.query);
        console.log(parsed);
        // we secure this by checking if the requested user is the logged in user 
        Users.findById(parsed.filter.user, function (err, users) {
            if (err)
                res.send(err);
            var usr = req.app.get("usr");
            var real_users = JSON.parse(JSON.stringify(users));
            if (usr === real_users.auth0ID) {
                Images.find(parsed.filter, function (err, images) {
                    if (err) {
                        res.json({
                            status: "error",
                            message: err,
                        });
                    }
                    //parse(req.query);
                    res.json({
                        status: "success",
                        message: "url parameters parsing",
                        query: parsed,
                        data: images
                    });
                });
            }
        });
    }

};
// Handle create images actions
exports.new = function (req, res) {
    var images = new Images();
    images.name = req.body.name ? req.body.name : images.name;
    images.contentType = req.body.contentType;
    images.data = req.body.data;
    images.recipe = mongoose.Types.ObjectId(req.body.recipe);
    images.user = mongoose.Types.ObjectId(req.body.user);
    // save the images and check for errors
    images.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New images created!',
            data: images
        });
    });
};
// Handle view images info
exports.view = function (req, res) {
    Images.findById(req.params.images_id, function (err, images) {
        if (err)
            res.send(err);
        res.json({
            message: 'Images details loading..',
            data: images
        });
    });
};
// Handle update images info
exports.update = function (req, res) {
    console.log(req.params.images_id);
    Images.findById(req.params.images_id, function (err, images) {
        if (err)
            res.send(err);
        console.log(JSON.stringify(req.body));
        images.name = req.body.name ? req.body.name : images.name;
        images.contentType = req.body.contentType;
        images.data = req.body.data;
        images.recipe = mongoose.Types.ObjectId(req.body.recipe);
        images.user = mongoose.Types.ObjectId(req.body.user);
        // save the images and check for errors
        images.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Images Info updated',
                data: images
            });
        });
    });
};
// Handle delete images
exports.delete = function (req, res) {
    Images.remove({
        _id: req.params.images_id
    }, function (err, images) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Images deleted'
        });
    });
};