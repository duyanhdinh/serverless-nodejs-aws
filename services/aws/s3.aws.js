const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");


const clientDefault = new S3Client({
    credentials: {
        accessKeyId: process.env.ENV_AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.ENV_AWS_SECRET_ACCESS_KEY ?? ""
    },
    region: process.env.ENV_AWS_REGION
});

const S3PutObject = async ({ Body, Bucket, Key }, client = clientDefault) => {
    try {
        const input = {
            Body,
            Bucket,
            Key
        };
        console.log(input);
        return client.send(new PutObjectCommand(input));
    } catch (e) {
        console.log("S3 put object err:", e);
        return { error: e };
    }
};

const S3StoreArticleImg = async ({ Body, Key }, client = clientDefault) => S3PutObject({
    Body,
    Bucket: process.env.AWS_S3_IMAGE_BUCKET,
    Key
}, client
);

module.exports = {
    S3PutObject,
    S3StoreArticleImg
};