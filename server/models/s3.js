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

exports.uploadFile = async (req, res, fileName) => {
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileName,
    Body: req.file.buffer,
    ACL: 'public-read-write'
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
  const url = await s3.getSignedUrlPromise('getObject', {
    Bucket: AWS_BUCKET_NAME,
    Key,
    Expires: 3600
  });

  return url;
};

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