import type {
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
    APIGatewayProxyEvent,
} from "aws-lambda";
import Todo from "../Services/dbService";

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let dbConnection = null;
    let payload = {
        taskName: "get sweets",
        priority: "MED",
        status: "DONE",
    };
    let body = _event.body ? JSON.parse(_event.body) : payload;
    let taskId: string = _event.queryStringParameters ? _event.queryStringParameters.id : '640b4a31b5086f1941cb7e10'; //specify the taskId when invoking locally
    try {
        const todo = new Todo();
        dbConnection = todo.connectDB(process.env.MONGO_URI);
        if (dbConnection) {
            const response = await todo.updateTask(taskId, body);
            if (response) {
                return {
                    statusCode: 200,
                    body: "{ \"message\": \"task updated!\" }"
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

