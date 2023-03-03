import { Document, Schema, model } from "mongoose";

//define interface that describes document
export interface ITask extends Document {
  taskName: string;
  priority: string;
  status: string;
}

const taskSchema: Schema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
      index: {
        unique: true,
        dropDups: true,
      },
    },
    priority: {
      type: String,
      required: true,
      enum: ["HIGH", "LOW", "MED"],
      default: "MED",
    },
    status: {
      type: String,
      required: true,
      enum: ["TO DO", "DONE"],
      default: "TO DO",
    },
  },
  {
    versionKey: false,
  }
);

//export task model
export default model<ITask>("Task", taskSchema);
