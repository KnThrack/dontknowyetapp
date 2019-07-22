// recipesModel.js
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
// Setup schema
var imageSchema = mongoose.Schema({
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
var Image = (module.exports = mongoose.model("pictures", usersSchema));
module.exports.get = function(callback, limit) {
	Image.find(callback).limit(limit);
};
