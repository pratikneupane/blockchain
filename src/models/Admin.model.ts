import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
