// recipesController.js
// Import recipes model



// query parser instatiation
const { MongooseQueryParser } = require('mongoose-query-parser');
// mongoose
import * as mongoose from 'mongoose';

const parser = new MongooseQueryParser();
import Users, { IUsers } from './userModel';
import Recipes, { IRecipes } from './recipesModel';
//const parser = new MongooseQueryParser();
// import { MongooseQueryParser } from 'mongoose-query-parser';
// const parser = new MongooseQueryParser();

// Handle index actions
exports.index = function (req, res) {
    if (Object.keys(req.query).length === 0) {
        // no query strings so get it all this should never happen since you only allowed to see your own users stuff
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
        // we secure this by checking if the requested user is the logged in user 
        Users.findById(parsed.filter.user, function (err, users) {
            if (err)
                res.send(err);
            var usr = req.app.get("usr");
            var real_users = JSON.parse(JSON.stringify(users));
            if (usr === real_users.auth0ID) {
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