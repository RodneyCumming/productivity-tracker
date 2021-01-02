var AWS = require("aws-sdk");
const awsRegion = "us-east-1";

const accessKeyId = "AKIAJNNH6I2WEFQDUA2Q";
const secretAccessKey = "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";

const putItem = async (table, record) => {
  AWS.config.update({
    region: "us-east-1",
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  console.log("Put record");
  const params = {
    TableName: table,
    Item: record,
  };

  docClient.put(params, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
};

const getAllItems = async (table) => {
  AWS.config.update({
    region: "us-east-1",
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  const scamParams = {
    TableName: table,
  };


  const results = docClient.scan(scamParams, (err, results) => {
    if (err) console.log(err)
    return results;
  }).promise();

  return results;
};

module.exports = { putItem, getAllItems };
