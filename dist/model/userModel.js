"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// recipesModel.js
const mongoose = require("mongoose");
// Setup schema
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    auth0ID: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
});
// Export Recipes model
const User = mongoose.model('users', usersSchema);
exports.default = User;
//# sourceMappingURL=userModel.js.map