'use strict';

var dynamodb = require('serverless-dynamodb-client');
const docClient = dynamodb.doc;  

const putItem = async (table, record) => {

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


// {tableName: '', record: {}}
const put = async (event, context, callback) => {
  const parsedBody = JSON.parse(event.body);

  console.log('parsed body: ', parsedBody)

  if (parsedBody.tableName && parsedBody.record) {
    await putItem(parsedBody.tableName, parsedBody.record);

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
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: 'Missing Table Name or Record',
          input: event,
        },
        null,
        2
      ),
    };
  }

  

  
};

module.exports.put = put;