import mongoose from 'mongoose';

// Define the Category schema
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    trim: true,
    maxlength: [50, 'Category name cannot be more than 50 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Define the MenuItem schema
const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a menu item name'],
    trim: true,
    maxlength: [100, 'Menu item name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    default: '/images/default-food.png'
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please select a category']
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isSpicy: {
    type: Boolean,
    default: false
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  ingredients: {
    type: [String],
    default: []
  },
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  available: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create models if they don't exist
export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
export const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);
