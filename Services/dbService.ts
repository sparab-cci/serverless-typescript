import mongoose from "mongoose";
import Task, { ITask } from "../models/task.model";

export default class Todo {

  constructor() { }

  async connectDB(URI: string): Promise<typeof mongoose> {

    let conn = await mongoose.connect(URI);
    if (!conn) throw new Error();
    else return conn;
  }

  async addTask(taskName: string, priority: string, status: string): Promise<ITask | Error> {

    let data = new Task({
      taskName: taskName,
      priority: priority,
      status: status,
    });
    let newTask: ITask = await data.save();
    console.log("newTask ----->> ", newTask);
    if (!newTask) throw new Error();
    else return newTask;

  }

  async getTaskList(): Promise<ITask[] | Error> {

    let tasks: ITask[] = await Task.find();
    if (!tasks) throw new Error();
    else return tasks;

  }

}









// export default connectDB;
