// recipesModel.js
import * as mongoose from 'mongoose';

interface Users {
	name: string;
	email: string;
	auth0ID: string;
	create_date: Date;
  }
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
const User = mongoose.model<Users & mongoose.Document>('users', usersSchema);
 
export default User;