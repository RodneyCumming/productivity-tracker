'use strict';

var dynamodb = require('serverless-dynamodb-client');
const webpush = require("web-push");

// Todo: move to services
const getAllItems = async (table) => {
  const docClient = dynamodb.doc;  // return an instance of new AWS.DynamoDB.DocumentClient()

  const scamParams = {
    TableName: table,
  };


  const results = docClient.scan(scamParams, (err, results) => {
    if (err) console.log(err)
    return results;
  }).promise();

  return results;
};

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey =  process.env.PRIVATE_VAPID_KEY;
const maltoEmail =  process.env.MALTO_EMAIL;

webpush.setVapidDetails(
  maltoEmail,
  publicVapidKey,
  privateVapidKey
);

const push = async event => {

  const currentTime = new Date();
  console.log('current time', currentTime)
  console.log('--event--', event)
  console.log('--event.type--', event.type)

  // todo: move to env

  // Get subscriptions from dynamoDb Table
  const dbItems = await getAllItems("Subscriptions");
  console.log('dbItems', dbItems);
  const subscriptionsArray = dbItems.Items.map(
    (item) => item.subscription
  );

  // for each subscription send notification?
  // Pass Object into send Notification
  const payload = JSON.stringify({ title: "push testing...." });

  for (const subscription of subscriptionsArray) {
    await webpush
      .sendNotification(JSON.parse(subscription), payload)
      .catch((err) => console.log(err));
  }
  

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.push = push;