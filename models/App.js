import mongoose from "mongoose";

const appSchema = new mongoose.Schema({
  name: String,
  bonus: String,
  withdraw: String,
  icon: String,
  downloadLink: String,
  isNew: Boolean,
  metatitle: String,
  metadescription: String,
  slug: {
    type: String,
    unique: true,
    index: true,
  },
}, { timestamps: true });

export default mongoose.model("App", appSchema);