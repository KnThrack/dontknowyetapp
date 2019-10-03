// recipesModel.js
import mongoose, { Schema, Document } from 'mongoose';
var ObjectId = mongoose.Schema.Types.ObjectId;

export interface IPictures extends Document{
	name: string;
	data: Buffer;
	contentType: string;
	user: any;
	recipe: any;
  }
   
// Setup schema
const imageSchema = new Schema({
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

export default mongoose.model<IPictures>('Pictures', imageSchema);
