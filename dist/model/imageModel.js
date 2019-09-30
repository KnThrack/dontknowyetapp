"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// recipesModel.js
const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
// Setup schema
const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        required: true
    },
    recipe: {
        type: ObjectId,
        required: true
    }
});
// Export Recipes model
const Image = mongoose.model('pictures', imageSchema);
exports.default = Image;
//# sourceMappingURL=imageModel.js.map