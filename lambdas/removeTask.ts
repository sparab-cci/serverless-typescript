import type {
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
    APIGatewayProxyEvent,
} from "aws-lambda";
import Todo from "../Services/dbService";
import mongoose from "mongoose";
// import { report } from "process";

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let dbConnection = null;
    let taskId: string = _event.queryStringParameters ? _event.queryStringParameters.id : '640b35911683d344322eacbd'; //specify the taskId when invoking locally
    console.log("task id in handler ", taskId);
    try {
        dbConnection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected ::: ${dbConnection.connection.host}`);
        if (dbConnection) {
            const todo = new Todo();
            const response = await todo.removeTask(taskId);
            if (response) {
                return {
                    statusCode: 200,
                    body: "{ \"message\": \"task deleted!\" }"
                };
            }
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(error.message),
        };
    }

};

