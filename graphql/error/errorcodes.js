const { errorType } = require('./error-contants')

const getErrorCode = errorName => {
    return errorType[errorName]
}

module.exports = getErrorCode
