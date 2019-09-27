// recipesModel.js
import * as mongoose from 'mongoose';
// Setup schema
var ObjectId = mongoose.Schema.Types.ObjectId;

interface Recipes {
	title: string;
	data: string;
	cuisine: string;
	ingredients: any;
    recipe: string;
    user: any;
  }

const recipesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    cuisine: String,
    ingredients: [{ ingredient: String, quantity: Number,  unit: String }],
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
const Recipe = mongoose.model<Recipes & mongoose.Document>('recipes', recipesSchema);
 
export default Recipe;
