"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// recipesModel.js
const mongoose = require("mongoose");
// Setup schema
var ObjectId = mongoose.Schema.Types.ObjectId;
const recipesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    cuisine: String,
    ingredients: [{ ingredient: String, quantity: Number, unit: String }],
    create_date: {
        type: Date,
        default: Date.now
    },
    recipe: String,
    user: {
        type: ObjectId,
        required: true
    }
});
// Export Recipes model
const Recipe = mongoose.model('recipes', recipesSchema);
exports.default = Recipe;
//# sourceMappingURL=recipesModel.js.map