import type { APIGatewayProxyHandler } from "aws-lambda";
import { apiResponses } from "../apiResponses/apiResponses";
import Todo from '../Services/dbService';
// import { ITask } from "../models/task.model";

export const handler: APIGatewayProxyHandler = async (event, _context) => {
try {
  const data = event.queryStringParameters;
  const todo = new Todo();
  const bool = todo.connectDB(process.env.MONGO_URI);
   if (bool) {
  const response = todo.create(data.taskName, data.priority, data.status);
  return apiResponses._200(response);
  }
   else {
     return apiResponses._400('connection failed');
  }
  // const response = await todo.create(data.taskName, data.priority, data.status);
  // return apiResponses._200(response);
} catch (error) {
  console.log(error);
}

  // const data = event.queryStringParameters;
  // console.log("data ", data);
  // const todo = new Todo();
  // const bool = todo.connectDB(process.env.MONGO_URI);
  // console.log("boolean val ", bool);
  // const todo = new Todo(data.taskName, data.priority, data.status);
  // if (todo.connectDB(process.env.MONGO_URI)) {
  // const response = todo.create(data.taskName, data.priority, data.status);
  // return apiResponses._200(response);
  // }
  // else {
  //  return apiResponses._400({
  //   message: "missing task or no data for the task",
  // });
  // }
  // const task = event.pathParameters?.task;

  // if (!task || !taskData[task]) {
  //   return apiResponses._400({
  //     message: "missing task or no data for the task",
  //   });
  // }

  // return apiResponses._200(taskData[task]);
};

// interface TaskData {
//   taskName: string;
//   priority: string;
//   status: string;
// }

// const taskData: { [key: string]: TaskData } = {

//   Task1: {
//     taskName: "Plant a seed",
//     priority: "High",
//     status: "To do",
//   },
//   Task2: {
//     taskName: "Drink water",
//     priority: "Med",
//     status: "To do",
//   },
//   Task3: {
//     taskName: "Go to gym",
//     priority: "High",
//     status: "To do",
//   },
// };
