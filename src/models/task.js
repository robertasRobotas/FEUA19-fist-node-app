import mongoose from "mongoose";

const schema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true, min: 3 },
  isCompleted: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
});

export default mongoose.model("Task", schema);
