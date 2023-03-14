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
    if (!newTask) throw new Error();
    else return newTask;

  }
  async getTaskList(): Promise<ITask[] | Error> {

    let tasks: ITask[] | null = await Task.find();
    if (!tasks) throw new Error();
    else return tasks;

  }
  async getTask(taskId: string): Promise<ITask | Error> {

    console.log("task id ", taskId);
    let task: ITask | null = await Task.findOne({ _id: taskId });
    if (!task) throw new Error();
    else return task;

  }
  async removeTask(taskId: string): Promise<ITask | Error> {

    console.log("task id ", taskId);
    let task: ITask | null = await Task.findByIdAndDelete({ _id: taskId });
    console.log("deleted task ", task);
    if (!task) throw new Error();
    else return task;

  }
  async updateTask(taskId: string, body: ITask): Promise<ITask | Error> {

    console.log("task id ", taskId);
    console.log("body ", body);
    let task: ITask | null = await Task.findByIdAndUpdate({ _id: taskId }, body);
    console.log("task in updateTask ---->> ", task);
    if (!task) throw new Error();
    else return task;

  }

}









// export default connectDB;
