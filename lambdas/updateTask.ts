import type {
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
    APIGatewayProxyEvent,
} from "aws-lambda";
import Todo from "../Services/dbService";
import mongoose from "mongoose";

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let payload = {
        taskName: "get sweets",
        priority: "MED",
        status: "DONE",
    };
    let body = _event.body ? JSON.parse(_event.body) : payload;
    let dbConnection = null;
    let taskId: string = _event.queryStringParameters ? _event.queryStringParameters.id : '640b4a31b5086f1941cb7e10'; //specify the taskId when invoking locally
    try {
        dbConnection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected ::: ${dbConnection.connection.host}`);
        if (dbConnection) {
            const todo = new Todo();
            const response = await todo.updateTask(taskId, body);
            if (response) {
                return {
                    statusCode: 200,
                    body: "{ \"message\": \"task updated!\" }"
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

