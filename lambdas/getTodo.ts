import type {
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
} from "aws-lambda";
// import { apiResponses } from "../apiResponses/apiResponses";
// import Todo from "../Services/dbService";
// import Task, { ITask } from "../models/task.model";
import mongoose from "mongoose";
// import { ITask } from "models/task.model";

export const handler:APIGatewayProxyHandler= async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let conn = null;
  try {
    conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected ::: ${conn.connection.host}`);
    // return apiResponses._200(conn.connection.host);
    return {
      statusCode: 200,
      body: conn.connection.host,
    };
  } catch (error) {
    console.error(`Error::: ${error.message}`);
    return {
      statusCode: 400,
      body: error,
    };
  }
};

// export const handler: APIGatewayProxyHandler = async (event) => {
//   let data = event.queryStringParameters;
//   try {
//     const todo = new Todo();
//     const conn: Promise<boolean> = todo.connectDB(process.env.MONGO_URI);
//     // console.log("boolean val ", bool);
//     // const todo = new Todo(data.taskName, data.priority, data.status);
//     if (conn) {
//     const response: Promise<ITask> = todo.create(data.taskName, data.priority, data.status);
//     return apiResponses._200(response);
//     }
//     else {
//      return apiResponses._400({
//       message: "------>> There was an error creating a task <<----------",
//     });
//     }
//   } catch (error) {
//     console.error(`Error::: ${error.message}`);
//     throw error;
//   }
// };

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
