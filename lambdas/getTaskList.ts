import type {
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
} from "aws-lambda";
import Todo from "../Services/dbService";
import mongoose from "mongoose";

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  let dbConnection = null;
  try {
    dbConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected ::: ${dbConnection.connection.host}`);
    if (dbConnection) {
      const todo = new Todo();
      const response = await todo.getTaskList();
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    }
  } catch (error) {
    console.error(`Error::: ${error.message}`);
    return {
      statusCode: 400,
      body: "{ \"message\": \"" + error.message + "\" }",
    };
  }

};

