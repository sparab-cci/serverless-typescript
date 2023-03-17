import type {
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
    APIGatewayProxyEvent,
} from "aws-lambda";
import Todo from "../Services/dbService";

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let dbConnection = null;
    let taskId: string = _event.queryStringParameters ? _event.queryStringParameters.id : '6409a1bae3d07ddb1095592c'; //specify the taskId when invoking locally
    try {
        const todo = new Todo();
        dbConnection = todo.connectDB(process.env.MONGO_URI);
        if (dbConnection) {
            const response = await todo.removeTask(taskId);
            if (response) {
                return {
                    statusCode: 200,
                    body: "{ \"message\": \"task deleted!\" }"
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
            body: "{ \"message\": \""+ error.message +"\" }",
        };
    }

};

