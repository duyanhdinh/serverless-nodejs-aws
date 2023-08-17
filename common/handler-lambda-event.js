const handlerSQS = async (event, callback) => Promise.all(
    event.Records.map(async (record) => callback(JSON.parse(record.body)))
);

module.exports = {
    handlerSQS
};