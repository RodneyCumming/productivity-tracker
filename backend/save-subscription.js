'use strict';

var dynamodb = require('serverless-dynamodb-client');

// Todo: move to services
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

const save = async (event, context, callback) => {
  console.log('body: ', event.body)

  // const requestBody = JSON.parse(event.body);

  await putItem("Subscriptions", { subscription: event.body});

  // //Send 201 - resource created
  // res.status(203).json({});


  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Subscription Saved.',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.save = save;