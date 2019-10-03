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