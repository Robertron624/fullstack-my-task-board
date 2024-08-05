import mongoose, { Schema, Document, Model } from "mongoose";
import TaskSchema from "./Task";

export interface Task {
  name: string;
  description: string;
  status: "in-progress" | "completed" | "won't-do" | "to-do";
  icon?: string;
}

export interface IBoard extends Document {
  name?: string;
  tasks: Task[];
}


const BoardSchema: Schema = new Schema({
  name: { type: String },
  tasks: { type: [TaskSchema], default: [] },
});

// BoardSchema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: function (doc, ret) {
//     ret.id = ret._id;
//     delete ret._id;
//   },
// });


export default mongoose.models.Board || mongoose.model<IBoard>("Board", BoardSchema);
