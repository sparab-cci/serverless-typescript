import type {
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
    APIGatewayProxyEvent,
} from "aws-lambda";
import Todo from "../Services/dbService";

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let dbConnection = null;
    let payload = {
        taskName: "task1",
        priority: "MED",
        status: "DONE",
    };
    let body = _event.body ? JSON.parse(_event.body) : payload;
    let { taskName, priority, status } = body;
    try {
        const todo = new Todo();
        dbConnection = todo.connectDB(process.env.MONGO_URI);
        if (dbConnection) {
            await todo.addTask(taskName, priority, status);
                return {
                    statusCode: 200,
                    body: "{ \"message\": \"task added!\" }"
                };
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: "{ \"message\": \"" + error.message + "\" }",
        };
    }
};
