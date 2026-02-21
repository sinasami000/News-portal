import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Politics', 'Technology', 'Sports', 'Entertainment', 'Business', 'Health', 'Science', 'World', 'Lifestyle', 'Education'],
    default: 'Technology'
  },
  image: {
    type: String,
    default: ''
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  views: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Auto-generate excerpt from content
newsSchema.pre('save', function (next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.replace(/<[^>]*>/g, '').substring(0, 250) + '...';
  }
  next();
});

export default mongoose.model('News', newsSchema);