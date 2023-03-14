import mongoose from "mongoose";
import Task, { ITask } from "../models/task.model";

export default class Todo {

  constructor() { }

  async connectDB(URI: string): Promise<typeof mongoose> {

    let conn = await mongoose.connect(URI);
    if (!conn) throw new Error();
    else return conn;
  }

  async addTask(...taskDetails: string[]): Promise<ITask | Error> {

    let data = new Task({
      taskName: taskDetails[0],
      priority: taskDetails[1],
      status: taskDetails[2],
    });
    let newTask: ITask | null = await data.save();
    if (!newTask) throw new Error("Task could not be added");
    else return newTask;

  }
  async getTaskList(): Promise<ITask[] | Error> {

    let tasks: ITask[] | null = await Task.find();
    if (!tasks) throw new Error("Task list is empty");
    else return tasks;

  }
  async getTask(taskId: string): Promise<ITask | Error> {

    let task: ITask | null = await Task.findOne({ _id: taskId });
    if (!task) throw new Error("Task " + taskId + " not found");
    else return task;

  }
  async removeTask(taskId: string): Promise<ITask | Error> {

    let task: ITask | null = await Task.findByIdAndDelete(taskId);
    if (!task) throw new Error("Task " + taskId + " not found");
    else return task;

  }
  async updateTask(taskId: string, body: ITask): Promise<ITask | Error> {

    let task: ITask | null = await Task.findByIdAndUpdate(taskId, body);
    if (!task) throw new Error("Task " + taskId + " not found");
    else return task;

  }

}

