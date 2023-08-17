const {handlerSQS} = require("../../common/handler-lambda-event");
const handler = async (event) => {
    if (event.Records) {
        return handlerSQS(event, handling);
    }

    if (event.invoke) {
        return handling(event.invoke);
    }
};

const handling = async (data) => {}

module.exports = {
    handler
};