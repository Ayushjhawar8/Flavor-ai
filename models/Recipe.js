import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true,
    unique: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: String, // Store user IPs or session IDs
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);