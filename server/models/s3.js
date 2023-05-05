const Aws = require('aws-sdk');
const { AWS_ACCESS_KEY_SECRET, AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_REGION } = require('../config/env');

const s3 = new Aws.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_ACCESS_KEY_SECRET,
    signatureVersion: 'v4',
    region: AWS_REGION,
});

exports.uploadFile = async (req, res, fileName) => {
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ACL: 'public-read-write',
    };
    const response = await new Promise((resolve, reject) => {
        s3.upload(params, async (error, data) => {
            if (error) {
                reject(new Error(error.message));

            }
            resolve(data);
        });
    });
    return response;
};

exports.getSignedUrl = async (Key) => {
    const url = await s3.getSignedUrl('getObject', { Bucket: AWS_BUCKET_NAME, Key });
    return url;
};
exports.deleteObject = async (Key) => {
    s3.deleteObject({ Bucket: AWS_BUCKET_NAME, Key }).promise();

};