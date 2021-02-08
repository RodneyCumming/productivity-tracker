'use strict';

var dynamodb = require('serverless-dynamodb-client');

const putItem = async (table, record) => {

  const docClient = dynamodb.doc;  // return an instance of new AWS.DynamoDB.DocumentClient()

  console.log("Put record");
  const params = {
    TableName: table,
    Item: record,
  };

  await docClient.put(params).promise()
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });
};

const update = async (event, context, callback) => {
  const record = JSON.parse(event.body);

  console.log('parsed body: ', record)

  await putItem("ProductivityTable", record);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Item Added',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.update = update;