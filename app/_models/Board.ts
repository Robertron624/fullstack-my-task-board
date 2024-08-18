import mongoose, { Schema, Document, Model } from "mongoose";
import TaskSchema from "./Task";

export interface Task {
  name: string;
  description: string;
  status: "in-progress" | "completed" | "won't-do" | "to-do";
  icon?: string;
}

export interface IBoard extends Document {
  name: string;
  tasks: Task[];
  // Adding an optional description field
  description?: string;
}


const BoardSchema: Schema = new Schema({
  name: { type: String },
  tasks: { type: [TaskSchema], default: [] },
  description: { type: String, default: "" },
});


export default mongoose.models.Board || mongoose.model<IBoard>("Board", BoardSchema);
