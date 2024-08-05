import { Schema } from 'mongoose';

const TaskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, enum: ["in-progress", "completed", "won't-do", "to-do"] },
  icon: { type: String },
});

export default TaskSchema;