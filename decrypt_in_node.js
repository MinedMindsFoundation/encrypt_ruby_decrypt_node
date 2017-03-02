var AWS = require("aws-sdk");
var sjcl = require('sjcl');


AWS.config.update({
  region: "us-west-2",
  //endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName : "password",
    KeyConditionExpression: "#us = :user",
    ExpressionAttributeNames:{
        "#us": "user"
    },
    ExpressionAttributeValues: {
        ":user":"2"
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log(data.Items.length);
        data.Items.forEach(function(item) {
            //datakey is the key you previously stored in a local env somewhere
            var result = sjcl.decrypt("datakey", item.password);
            console.log(result);

        });
    }
});

