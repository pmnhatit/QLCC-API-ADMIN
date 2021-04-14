const S3 = require('aws-sdk/clients/s3');
const {v4 : uuidv4} = require('uuid');

const configs = {
    bucketName: "apartment-management",
    accessKey: process.env.AWS_ACCESSKEY,
    secretKey: process.env.AWS_SECRETKEY,
};

module.exports.getSignedUrl = async (req, res, next) =>{
    try {
        const {
            fileName, extension, mediaType
        } = req.query;
        const id = uuidv4();
        
        const s3 = new S3({
            credentials: {
            accessKeyId: configs.accessKey,
            secretAccessKey: configs.secretKey,
            },
        });
        
        const params = {
            Bucket: configs.bucketName,
            Key: `${fileName}-${id}`,
            Expires: 300, //s - 5mins
            ContentType: `${mediaType}/${extension}`,
        };
        const key = `${fileName}-${id}`;
        const url = await s3.getSignedUrlPromise("putObject", params);
        res.json({ uploadUrl: url, key: key});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
    
}
module.exports.getImageUrl = async (req, res, next) =>{
    try {
        const {
            key
        } = req.query;
        
        const s3 = new S3({
            credentials: {
            accessKeyId: configs.accessKey,
            secretAccessKey: configs.secretKey,
            },
        });
        
        const params = {
            Bucket: configs.bucketName,
            Key: key,
            Expires: 86400, //s - 24 hour
        };
        
        const url = await s3.getSignedUrlPromise("getObject", params);
        res.json({ imageUrl: url });
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
    
}