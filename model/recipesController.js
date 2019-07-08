// recipesController.js
// Import recipes model
Recipes = require('./recipesModel');

// query parser instatiation
const { MongooseQueryParser } = require('mongoose-query-parser');
// mongoose
var mongoose = require('mongoose');

const parser = new MongooseQueryParser();
// security 
let jwt = require("express-jwt");
let jwksRsa = require("jwks-rsa");
// Set up Auth0 configuration
const authConfig = {
    domain: "shrill-brook-0201.eu.auth0.com",
    audience: "https://notsureyetapp.herokuapp.com/api"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-dontknowyet.eu.auth0.com
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
});
//const parser = new MongooseQueryParser();
// import { MongooseQueryParser } from 'mongoose-query-parser';
// const parser = new MongooseQueryParser();

// Handle index actions
exports.index = function (req, res) {


    if (req.authorization) {
        var authorization = req.authorization,
            decoded;
        try {
            decoded = jwt.verify(authorization, checkJwt.secret.secretToken);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.id;
        console.log(userId);
    }

    if (Object.keys(req.query).length === 0) {
        // no query strings so get it all
        Recipes.get(function (err, recipes) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Recipes retrieved successfully",
                data: recipes
            });
        });

    } else {
        // we got some query so lets query !

        const parsed = parser.parse(req.query);
        console.log(parsed);
        Recipes.find(parsed.filter, function (err, recipes) {
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
                data: recipes
            });
        });

    }

};
// Handle create recipes actions
exports.new = function (req, res) {
    var recipes = new Recipes();
    recipes.name = req.body.name ? req.body.name : recipes.name;
    recipes.title = req.body.title;
    recipes.cuisine = req.body.cuisine;
    recipes.ingredients = req.body.ingredients;
    recipes.recipe = req.body.recipe;
    recipes.user = mongoose.Types.ObjectId(req.body.user);
    // save the recipes and check for errors
    recipes.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New recipes created!',
            data: recipes
        });
    });
};
// Handle view recipes info
exports.view = function (req, res) {
    Recipes.findById(req.params.recipes_id, function (err, recipes) {
        if (err)
            res.send(err);
        res.json({
            message: 'Recipes details loading..',
            data: recipes
        });
    });
};
// Handle update recipes info
exports.update = function (req, res) {
    console.log(req.params.recipes_id);
    Recipes.findById(req.params.recipes_id, function (err, recipes) {
        if (err)
            res.send(err);
        console.log(JSON.stringify(req.body));
        recipes.name = req.body.name ? req.body.name : recipes.name;
        recipes.title = req.body.title;
        recipes.cuisine = req.body.cuisine;
        recipes.ingredients = req.body.ingredients;
        recipes.recipe = req.body.recipe;
        recipes.user = mongoose.Types.ObjectId(req.body.user);
        // save the recipes and check for errors
        recipes.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Recipes Info updated',
                data: recipes
            });
        });
    });
};
// Handle delete recipes
exports.delete = function (req, res) {
    Recipes.remove({
        _id: req.params.recipes_id
    }, function (err, recipes) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Recipes deleted'
        });
    });
};