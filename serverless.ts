import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: "aws-ts-api",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      MONGO_URI:
        "mongodb+srv://sneha:su170277@cluster2.asmzl5e.mongodb.net/?retryWrites=true&w=majority",
    },
  },
  // import the function via paths
  functions: {
    getTaskList: {
      handler: "lambdas/getTaskList.handler",
      events: [
        {
          http: {
            path: "get-task-list",
            method: "get",
            cors: true,
          },
        },
      ],
    },
    addTask: {
      handler: "lambdas/addTask.handler",
      events: [
        {
          http: {
            path: "add-task",
            method: "post",
            cors: true,
          },
        },
      ],
    },
    getTask: {
      handler: "lambdas/getTask.handler",
      events: [
        {
          http: {
            path: "get-task",
            method: "get",
            cors: true,
          },
        },
      ],
    },
    removeTask: {
      handler: "lambdas/removeTask.handler",
      events: [
        {
          http: {
            path: "remove-task",
            method: "delete",
            cors: true,
          },
        },
      ],
    },
    updateTask: {
      handler: "lambdas/updateTask.handler",
      events: [
        {
          http: {
            path: "update-task",
            method: "patch",
            cors: true,
          },
        },
      ],
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
