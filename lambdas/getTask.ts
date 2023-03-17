import type {
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
    APIGatewayProxyEvent,
} from "aws-lambda";
import Todo from "../Services/dbService";
// import mongoose from "mongoose";

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let dbConnection = null;
    let taskId: string = _event.queryStringParameters ? _event.queryStringParameters.id : '640e6df0f38ec7c6616588fe';//specify the taskId when invoking locally
    try {
        const todo = new Todo();
        dbConnection = todo.connectDB(process.env.MONGO_URI);
        if (dbConnection) {
            const response = await todo.getTask(taskId);
            if (response) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(response),
                };
            } else {
                return {
                    statusCode: 404,
                    body: "{ \"message\": \" task " + taskId + " not found \" }",
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

