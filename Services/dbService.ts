import mongoose from "mongoose";
import Task, { ITask } from "../models/task.model";

export default class Todo {
  // private taskName: string;
  // private priority: string;
  // private status: string;

  constructor() {
    // this.taskName = taskName;
    // this.priority = priority;
    // this.status = status;
  }

  connectDB(URI: string) {
    let conn = mongoose
      .connect(URI)
      .then(() => {
        console.log("db connected");
        return true;
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
        return false;
      });
    return conn;
  }

  async create(taskName: string, priority: string, status: string) {
    let data = new Task({
      taskName: taskName,
      priority: priority,
      status: status,
    });
    // return data;
    let newTask: ITask = await data.save();
    if (!newTask) throw new Error();
    else return newTask;
  }
}

// export default connectDB;
