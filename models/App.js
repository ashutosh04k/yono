import mongoose from "mongoose";

const appSchema = new mongoose.Schema({
  name: String,
  bonus: String,
  withdraw: String,
  icon: String,
  downloadLink: String,
  isNew: Boolean
}, { timestamps: true });

export default mongoose.model("App", appSchema);