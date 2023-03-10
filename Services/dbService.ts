import mongoose from "mongoose";
import Task, { ITask } from "../models/task.model";

export default class Todo {

  constructor() { }

  async connectDB(URI: string) {

    let conn = await mongoose.connect(URI);
    if (!conn) throw new Error();
    else return conn;
  }

  async create(taskName: string, priority: string, status: string): Promise<ITask>{

    let data = new Task({
      taskName: taskName,
      priority: priority,
      status: status,
    });
    let newTask = await data.save();
    console.log("newTask ----->> ", newTask);
    if (!newTask) throw new Error();
    else return newTask;
  }
}




// export default connectDB;
