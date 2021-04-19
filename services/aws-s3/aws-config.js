const S3 = require('aws-sdk/clients/s3');

const configs = {
    bucketNameCSV: "apartment-management-csv",
    accessKey: process.env.AWS_ACCESSKEY,
    secretKey: process.env.AWS_SECRETKEY,
};

const s3 = new S3({
    credentials: {
    accessKeyId: configs.accessKey,
    secretAccessKey: configs.secretKey,
    },
});

module.exports = {configs, s3};

