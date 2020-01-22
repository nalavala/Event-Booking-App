const {errorType} = require('./error-contants')

const getErrorCode = errorName => {
    if (errorType[errorName]) {
        return errorType[errorName];
    }
    return {
        message: errorName,
        statusCode: 123
    };
};

module.exports = getErrorCode;
