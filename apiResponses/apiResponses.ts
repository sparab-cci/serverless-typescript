export const apiResponses = {
  _200: (body) => {
    return {
      statusCode: 200,
      body: JSON.stringify(body, null, 2),
    };
  },
  _400: (body) => {
    return {
      statusCode: 200,
      body: JSON.stringify(body, null, 2),
    };
  },
};
