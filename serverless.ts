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
    getCityInfo: {
      handler: "lambdas/getCityInfo.handler",
      events: [
        {
          http: {
            path: "get-city/{city}",
            method: "get",
            cors: true,
          },
        },
      ],
    },
    getTodo: {
      handler: "lambdas/getTodo.handler",
      events: [
        {
          http: {
            path: "get-todo",
            method: "get",
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
