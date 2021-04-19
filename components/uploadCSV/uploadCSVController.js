const S3 = require('aws-sdk/clients/s3');
const {v4 : uuidv4} = require('uuid');
const {configs, s3} = require('../../services/aws-s3/aws-config');

module.exports.getSignedUrl = async (req, res, next) =>{
    try {
        const {
            fileName, extension, mediaType
        } = req.query;
        const id = uuidv4();
        
        const params = {
            Bucket: configs.bucketNameCSV,
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
