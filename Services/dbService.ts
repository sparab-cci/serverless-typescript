import mongoose from "mongoose";
import Task, { ITask } from "../models/task.model";

export default class Todo {

  constructor() { }

  async connectDB(URI: string): Promise<typeof mongoose> {
    try {
      let dbConnection = await mongoose.connect(URI);
      return dbConnection;
    } catch (error) {
      throw error;
    }
  }

  async addTask(...taskDetails: string[]): Promise<ITask> {

    try {
      let data = new Task({
        taskName: taskDetails[0],
        priority: taskDetails[1],
        status: taskDetails[2],
      });
      let newTask: ITask = await data.save();
      return newTask;
    } catch (error) {
      throw error;
    }

  }
  async getTaskList(): Promise<ITask[]> {

    try {
      let tasks: ITask[] | null = await Task.find();
      return tasks;
    } catch (error) {
      throw error;
    }

  }
  async getTask(taskId: string): Promise<ITask> {

    try {
      let task: ITask | null = await Task.findOne({ _id: taskId });
      return task;
    } catch (error) {
      throw error;
    }

  }
  async removeTask(taskId: string): Promise<ITask> {

    try {
      let task: ITask | null = await Task.findByIdAndDelete(taskId);
      return task;
    } catch (error) {
      throw error;
    }

  }
  async updateTask(taskId: string, body: ITask): Promise<ITask> {

    try {
      let task: ITask | null = await Task.findByIdAndUpdate(taskId, body);
      return task;
    } catch (error) {
      throw error;
    }

  }

}

