"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// recipesModel.js
const mongoose = __importStar(require("mongoose"));
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