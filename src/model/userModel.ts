// recipesModel.js
import mongoose, { Schema, Document } from 'mongoose';

export interface IUsers extends Document{
	name: string;
	email: string;
	auth0ID: string;
	create_date: Date;
  }
// Setup schema
const usersSchema = new Schema({
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
export default mongoose.model<IUsers>('Users', usersSchema);