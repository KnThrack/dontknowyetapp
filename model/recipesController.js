// recipesController.js
// Import recipes model
Recipes = require('./recipesModel');

// query parser instatiation
const { MongooseQueryParser } = require('mongoose-query-parser');
const parser = new MongooseQueryParser();

//const parser = new MongooseQueryParser();
// import { MongooseQueryParser } from 'mongoose-query-parser';
// const parser = new MongooseQueryParser();

// Handle index actions
exports.index = function (req, res) {

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

        Recipes.find(parsed,function (err, recipes) {
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
                data: parsed + recipes
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
    Recipes.findById(req.params.recipes_id, function (err, recipes) {
        if (err)
            res.send(err);
        recipes.name = req.body.name ? req.body.name : recipes.name;
        recipes.title = req.body.title;
        recipes.cuisine = req.body.cuisine;
        recipes.ingredients = req.body.ingredients;
        recipes.recipe = req.body.recipe;
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