import mongoose, { Schema, Document, Model } from "mongoose";


export interface Task {
  name: string;
  description: string;
  status: "in-progress" | "completed" | "won't-do" | "to-do";
  icon?: string;
}

export interface Board extends Document {
  name?: string;
  tasks: Task[];
}

const TaskSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["in-progress", "completed", "won't-do", "to-do"],
      default: "to-do",
    },
    icon: { type: String },
  },
  { _id: true }
);

const BoardSchema: Schema = new Schema({
  name: { type: String },
  tasks: { type: [TaskSchema], default: [] },
});

BoardSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Board: Model<Board> =
  mongoose.models.Board ||
  mongoose.model<Board>("Board", BoardSchema, "task-board-tm.boards");

export default Board;
