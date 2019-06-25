// recipesModel.js
var mongoose = require('mongoose');
// Setup schema

var recipesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Recipes model
var Recipes = module.exports = mongoose.model('recipes', recipesSchema);
module.exports.get = function (callback, limit) {
    Recipes.find(callback).limit(limit);
}