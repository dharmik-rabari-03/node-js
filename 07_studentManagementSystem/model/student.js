import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  GRid: {
    type: Number,
    required: true,
    unique: true,
  },

  course: {
    type: String,
    required: true,
    enum: ["full stack development", "graphic design", "UI/UX"],
  },

  MobileNumber: {
    type: Number,
    required: true,
  },
});

const student = mongoose.model("student", studentSchema);

export default student;
