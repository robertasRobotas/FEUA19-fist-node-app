import mongoose from "mongoose";

const schema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, min: 3 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  taskIds: { type: [String], required: true },
});

export default mongoose.model("User", schema);
