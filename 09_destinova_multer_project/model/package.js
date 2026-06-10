import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
    trim: true,
  },
  packagePrice: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  duration: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },

  cloudinary_id: {
    type: String
  }

},
  {
    timestamps: true
  });

const Package = mongoose.model("package", packageSchema);

export default Package;