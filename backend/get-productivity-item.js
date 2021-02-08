'use strict';

var dynamodb = require('serverless-dynamodb-client');

const getItem = async (table, keyValue) => {

  const docClient = dynamodb.doc;  // return an instance of new AWS.DynamoDB.DocumentClient()

  const params = {
    TableName: table,
    Key: { "date": keyValue }
   }
    
  return await docClient.get(params).promise()
  .then(function(data) {
    console.log('success', data);
    return data;
  })
  .catch(function(err) {
    console.log(err);
  });
};

const get = async (event, context, callback) => {

  const keyValue = event && event.queryStringParameters && event && event.queryStringParameters.date;

  if (keyValue) {
    const response = await getItem("ProductivityTable", keyValue);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET"
      },
      body: JSON.stringify(
        {
          message: 'Get Item',
          input: response,
        },
        null,
        2
      ),
    };
  } else {
    return {
      statusCode: 404,
      body: `date: ${keyValue}, not found`,
    }
  };
};

module.exports.get = get;