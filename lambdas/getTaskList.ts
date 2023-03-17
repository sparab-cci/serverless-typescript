import type {
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
} from "aws-lambda";
import Todo from "../Services/dbService";

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  let dbConnection = null;
  try {
    const todo = new Todo();
    dbConnection = todo.connectDB(process.env.MONGO_URI);
    if (dbConnection) {
      const response = await todo.getTaskList();
      if (response.length != 0) {
        return {
          statusCode: 200,
          body: JSON.stringify(response),
        };
      } else {
        return {
          statusCode: 404,
          body: "{ \"message\": \" task list empty \" }",
        };
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: "{ \"message\": \"" + error.message + "\" }",
    };
  }

};

