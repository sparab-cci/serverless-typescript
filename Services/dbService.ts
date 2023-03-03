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
    const conn = mongoose
      .connect(URI)
      .then(() => {
        console.log("DB connected");
        return true;
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
        return false;
      });
    return conn;
  }

  create(taskName: string, priority: string, status: string) {
    let data: ITask = new Task({
      taskName: taskName,
      priority: priority,
      status: status,
    });
    // return data;
    let newTask = data.save();
    // if (!newTask) throw new Error();
    // else
    console.log(newTask);
      return newTask;
  }
}

// export default connectDB;
