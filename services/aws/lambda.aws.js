const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const clientDefault = new LambdaClient({
    credentials: {
        accessKeyId: process.env.ENV_AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.ENV_AWS_SECRET_ACCESS_KEY ?? ""
    },
    region: process.env.ENV_AWS_REGION
});

const invokeLambda = async ({
    FunctionName,
    ArrayPayload,
    InvocationType = "RequestResponse"
}, client = clientDefault) =>
    client.send(new InvokeCommand({
        FunctionName, // required
        InvocationType, // "Event" for not waiting
        LogType: "Tail",
        Payload: JSON.stringify({ invoke: ArrayPayload })
    }));

const invokeLambdaEvent = async ({ FunctionName, ArrayPayload }, client = clientDefault) =>
    invokeLambda({ FunctionName, ArrayPayload, InvocationType: "Event" }, client);

const invokeGetPayloadResponse = (response) => JSON.parse(new TextDecoder().decode(response.Payload));

const invokeLambdaAndGetPayloadResponse = async (invokeData, client = clientDefault) =>
    JSON.parse(new TextDecoder().decode({ ...await invokeLambda(invokeData, client) }.Payload));

module.exports = {
    invokeLambda,
    invokeLambdaAndGetPayloadResponse,
    invokeLambdaEvent,
    invokeGetPayloadResponse
};