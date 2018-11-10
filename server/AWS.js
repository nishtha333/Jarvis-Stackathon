const AWS = require('aws-sdk');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = require('./config'); 

AWS.config = {
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    },
    region: AWS_REGION
};

const S3 =  new AWS.S3();
const Rekognition = new AWS.Rekognition();

module.exports = {
    S3,
    Rekognition
};