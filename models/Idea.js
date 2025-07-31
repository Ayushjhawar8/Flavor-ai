import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
  idea: {
    type: String,
    required: [true, 'Idea is required'],
    trim: true,
    minlength: [10, 'Idea must be at least 10 characters long'],
    maxlength: [1000, 'Idea cannot be longer than 1000 characters']
  },
  name: {
    type: String,
    trim: true,
    default: 'Anonymous',
    maxlength: [50, 'Name cannot be longer than 50 characters']
  },
  votes: {
    type: Number,
    default: 0,
    min: 0
  },
  archived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add text index for search functionality
ideaSchema.index({ idea: 'text' });

// Prevent duplicate votes from the same IP (simplified for this example)
ideaSchema.methods.addVote = async function(ip) {
  // In a real app, you'd want to implement IP-based rate limiting here
  this.votes += 1;
  return this.save();
};

// Only return non-archived ideas by default
ideaSchema.pre(/^find/, function(next) {
  this.find({ archived: { $ne: true } });
  next();
});

export default mongoose.models.Idea || mongoose.model('Idea', ideaSchema);
