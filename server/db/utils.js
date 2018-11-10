const { S3, Rekognition } = require('../AWS');
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

        const result = await S3.putObject({
            Bucket: AWS_S3_BUCKET_NAME,
            Body,
            ContentType: `image/${extension}`,
            Key
        }).promise();

        console.log("Loading to S3");
        console.log(result);
        return {
            url: `https://s3.amazonaws.com/${AWS_S3_BUCKET_NAME}/${Key}`,
            imageName: Key
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
            faceId: face.FaceRecords[0].Face.FaceId,
            imageId: face.FaceRecords[0].Face.ImageId
        }
    }
    catch(ex) {
        throw ex;
    }
}

const searchFaceByImageInCollection = async (image) => {
    try {
        const result = await Rekognition.searchFacesByImage({
            CollectionId: AWS_REKOGNITION_COLLECTION_ID,
            FaceMatchThreshold: AWS_FACE_MATCH_THRESHOLD,
            MaxFaces: 1,
            Image: {
                Bytes: image,
            }
        }).promise();
        console.log("Search for Face")
        console.log(result);
    }
    catch(ex) {
        throw ex;
    }
}

module.exports = {
    uploadImageToS3,
    uploadImageToFaceCollection,
    searchFaceByImageInCollection
}