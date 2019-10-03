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