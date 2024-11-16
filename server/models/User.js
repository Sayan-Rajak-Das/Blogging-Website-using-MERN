const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  visibleBlogTypes: {
    type: [String],
    enum: ["Technology", "Health", "Travel", "Education", "Food"], // Enum values for blog types
    default: ["Technology", "Health", "Travel", "Education", "Food"], // Default to all blog types
  },
});

module.exports = mongoose.model('User', UserSchema);
