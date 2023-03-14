import type {
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
    APIGatewayProxyEvent,
} from "aws-lambda";
import Todo from "../Services/dbService";
import mongoose from "mongoose";

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let dbConnection = null;
    let taskId: string = _event.queryStringParameters ? _event.queryStringParameters.id : '640998a39dfacee6868ed488';//specify the taskId when invoking locally
    console.log("task id in handler ", taskId);
    try {
        dbConnection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected ::: ${dbConnection.connection.host}`);
        if (dbConnection) {
            const todo = new Todo();
            const response = await todo.getTask(taskId);
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        }
    } catch (error) {
        console.error(`Error::: ${error.message}`);
        return {
            statusCode: 400,
            body: error.message,
        };
    }

};

