exports.errorName = {
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
    SERVER_ERROR: 'SERVER_ERROR',
    INVALID_CREDENTIALS : "INVALID_CREDENTIALS"
}

exports.errorType = {
    USER_ALREADY_EXISTS: {
        message: 'User is already exists.',
        statusCode: 403
    },
    SERVER_ERROR: {
        message: 'Server error.',
        statusCode: 500
    },
    INVALID_CREDENTIALS : {
        message : "Invalid Credentials",
        statusCode : 345
    }
}
