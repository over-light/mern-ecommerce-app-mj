const Aws = require('aws-sdk');
const {
  AWS_ACCESS_KEY_SECRET,
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET_NAME,
  AWS_REGION
} = require('../config/env');

const s3 = new Aws.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_ACCESS_KEY_SECRET,
  signatureVersion: 'v4',
  region: AWS_REGION
});

exports.s3Upload = async (image,fileName) => {
  let imageUrl = '';
  let imageKey = '';

  if (image) {
    
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
      Body: image.buffer,
      ContentType: image.mimetype,
      ACL: 'public-read'
    };

    const s3Upload = await s3.upload(params).promise();

    imageUrl = s3Upload.Location;
    imageKey = s3Upload.key;
  }

  return { imageUrl, imageKey };
};

exports.S3DeleteObject = async (Key) => {
  s3.deleteObject({ Bucket: AWS_BUCKET_NAME, Key }).promise();
};