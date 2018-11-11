const { S3, Rekognition, Polly } = require('../AWS');
const { AWS_S3_BUCKET_NAME, AWS_REKOGNITION_COLLECTION_ID, AWS_FACE_MATCH_THRESHOLD } = require('../config'); 

const checkBucketExists = async (bucket) => { 
    try {
        await S3.headBucket({ Bucket: bucket }).promise();
        return true;
    } 
    catch (error) {
        if (error.statusCode === 404) {
            return false;
        }
        throw error;
    }
};

const uploadImageToS3 = async (image, name) => {
    try {
        const regex = /data:image\/(\w+);base64,(.*)/
        const matches = regex.exec(image);

        const extension = matches[1];
        const Body = new Buffer(matches[2], 'base64');
        const Key = `${name}.${extension}`;

        if(!checkBucketExists(AWS_S3_BUCKET_NAME)) {
            await S3.createBucket({ Bucket: AWS_S3_BUCKET_NAME}).promise();
        }

        await S3.putObject({
            Bucket: AWS_S3_BUCKET_NAME,
            ACL: 'public-read',
            Body,
            ContentType: `image/${extension}`,
            Key
        }).promise();

        return {
            imageKey: Key,
            url: `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${Key}`
        }
    }
    catch(ex) {
        throw ex;
    }
}

const uploadImageToFaceCollection = async (imageName) => {
    try {
        const collections = await Rekognition.listCollections().promise();
        if (!collections.CollectionIds.includes(AWS_REKOGNITION_COLLECTION_ID)) {
            await Rekognition.createCollection({ CollectionId: AWS_REKOGNITION_COLLECTION_ID }).promise();
        }
        const face = await Rekognition.indexFaces({ 
            CollectionId: AWS_REKOGNITION_COLLECTION_ID, 
            Image: {
                S3Object: {
                    Bucket: AWS_S3_BUCKET_NAME,
                    Name: imageName
                }
            }
        }).promise();
        return {
            id: face.FaceRecords[0].Face.FaceId
        }
    }
    catch(ex) {
        throw ex;
    }
}

const deleteImageFromFaceCollection = (faceId) => {
    return Rekognition.deleteFaces({ 
            CollectionId: AWS_REKOGNITION_COLLECTION_ID, 
            FaceIds: [faceId]
    }).promise();
}

const deleteFromS3 = (Key) => {
    return S3.deleteObjects({ 
        Bucket: AWS_S3_BUCKET_NAME,
        Delete: {
            Objects: [ { Key } ],
            Quiet: true
        }, 
    }).promise();
}

const searchFaceByImageInCollection = async (image) => {
    try {
        const regex = /data:image\/(\w+);base64,(.*)/
        const matches = regex.exec(image);
        const Bytes = new Buffer(matches[2], 'base64');

        const result = await Rekognition.searchFacesByImage({
            CollectionId: AWS_REKOGNITION_COLLECTION_ID,
            FaceMatchThreshold: AWS_FACE_MATCH_THRESHOLD,
            MaxFaces: 1,
            Image: { Bytes }
        }).promise();

        return (result.FaceMatches[0] ? result.FaceMatches[0].Face.FaceId : null);
    }
    catch(ex) {
        throw ex;
    }
}

const createAndUploadWelcomeMsg = async (firstName) => {
    try {
        
        const Key = `${firstName}.mp3`
        const speech = await Polly.synthesizeSpeech({
            OutputFormat: "mp3",
            Text: `Hello ${firstName}. Welcome to Jarvis`,
            TextType: 'text',
            VoiceId: 'Amy'
        }).promise();

        await S3.putObject({
            Bucket: AWS_S3_BUCKET_NAME,
            ACL: 'public-read',
            Body: speech.AudioStream,
            ContentType: `audio/mpeg`,
            Key
        }).promise();

        return {
            audioName: Key,
            audioUrl: `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${Key}`,
        }        
    }
    catch(ex) {
        throw ex;
    }
}

module.exports = {
    uploadImageToS3,
    uploadImageToFaceCollection,
    searchFaceByImageInCollection,
    createAndUploadWelcomeMsg,
    deleteImageFromFaceCollection,
    deleteFromS3
}