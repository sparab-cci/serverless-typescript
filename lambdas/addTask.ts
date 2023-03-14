import type {
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
    APIGatewayProxyEvent,
} from "aws-lambda";
import Todo from "../Services/dbService";
import mongoose from "mongoose";

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let payload = {
        taskName: "task123",
        priority: "LOW",
        status: "DONE",
    };
    let body = _event.body ? JSON.parse(_event.body) : payload;
    let { taskName, priority, status } = body;
    let dbConnection = null;
    try {
        dbConnection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected ::: ${dbConnection.connection.host}`);
        if (dbConnection) {
            const todo = new Todo();
            await todo.addTask(taskName, priority, status);
                return {
                    statusCode: 200,
                    body: "{ \"message\": \"task added!\" }"
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
