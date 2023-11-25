import mongoose from "mongoose";

const fiSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  profilePictureUrl: {
    type: String,
    required: true,
  }

});

const FI = mongoose.model("Fi", fiSchema);

export default FI;
