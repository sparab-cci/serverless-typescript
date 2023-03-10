import type {
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
    APIGatewayProxyEvent,
} from "aws-lambda";
import Todo from "../Services/dbService";
import mongoose from "mongoose";

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let payload = {
        taskName: "task3",
        priority: "MED",
        status: "DONE",
    };
    let body = _event.body ? JSON.parse(_event.body) : payload;
    let { taskName, priority, status } = body;
    let conn = null;
        try {
            conn = await mongoose.connect(process.env.MONGO_URI);
            console.log(`Database connected ::: ${conn.connection.host}`);
            if (conn) {
                const todo = new Todo();
                const response = await todo.create(taskName, priority, status);
                return {
                    statusCode: 200,
                    body: JSON.stringify(response),
                };
            }
        } catch (error) {
            console.error(`Error::: ${error.message}`);
            return {
                statusCode: 400,
                body: error,
            };
        }
};

