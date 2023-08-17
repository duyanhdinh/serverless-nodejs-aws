const { GetQueueUrlCommand, SendMessageCommand, SQSClient } = require("@aws-sdk/client-sqs");


const clientDefault = new SQSClient({
    credentials: {
        accessKeyId: process.env.ENV_AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.ENV_AWS_SECRET_ACCESS_KEY ?? "",
    },
    region: process.env.ENV_AWS_REGION,
});

const SQSCreateClient = ({ accessKeyId, secretAccessKey, region }) =>
    new SQSClient({
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
        region,
    });

const SQSGetQueueUrl = async (
    { QueueName },
    client = clientDefault
) => {
    try {
        const input = { QueueName };

        return client.send(new GetQueueUrlCommand(input));
    } catch (e) {
        console.log("SQS get queue url err:", e);
    }
};

const SQSSendMessage = async (
    {
        QueueUrl,
        MessageBody = "",
        DelaySeconds = 0,
    },
    client = clientDefault
) => {
    try {
        const input = {
            QueueUrl,
            MessageBody,
            DelaySeconds,
        };

        return client.send(new SendMessageCommand(input));
    } catch (e) {
        console.log("SQS send message err:", e);
    }
};


module.exports = {
    SQSCreateClient,
    SQSGetQueueUrl,
    SQSSendMessage
};