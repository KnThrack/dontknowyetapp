// recipesModel.js
var mongoose = require('mongoose');
// Setup schema

var recipesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    cuisine: String,
    ingredients: [  { ingredient: String }, { quantity: Number }, { unit: String } ],
    create_date: {
        type: Date,
        default: Date.now
    },
    recipe: String
});
// Export Recipes model
var Recipes = module.exports = mongoose.model('recipes', recipesSchema);
module.exports.get = function (callback, limit) {
    Recipes.find(callback).limit(limit);
}