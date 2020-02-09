var AWS = require('aws-sdk');
//import { CognitoIdentityServiceProvider } from 'aws-sdk';

exports.handler = async function(event) {
    const cognitoIdentityService = new AWS.CognitoIdentityServiceProvider();
    
    const params = {
        UserPoolId: 'eu-central-1_DqGXBQm3S'//process.env.userPoolId
    }
    
    try {
        const data = await cognitoIdentityService.listUsers(params).promise();
        console.log("data: ",data);
    } 
    catch (error) {
        console.log('Error', error)
    }
    
    console.log("test output 123");
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
