// recipesModel.js
import * as mongoose from 'mongoose';
var ObjectId = mongoose.Schema.Types.ObjectId;

interface Pictures {
	name: string;
	data: Buffer;
	contentType: string;
	user: any;
	recipe: any;
  }
   
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
const Image = mongoose.model<Pictures & mongoose.Document>('pictures', imageSchema);
 
export default Image;