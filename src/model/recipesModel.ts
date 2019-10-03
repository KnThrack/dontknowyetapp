// recipesModel.js
import mongoose, { Schema, Document } from 'mongoose';
// Setup schema
var ObjectId = mongoose.Schema.Types.ObjectId;

export interface IRecipes extends Document{
	title: string;
	data: string;
	cuisine: string;
	ingredients: any;
    recipe: string;
    user: any;
  }

const recipesSchema = new Schema({
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
export default mongoose.model<IRecipes>('Recipes', recipesSchema);

