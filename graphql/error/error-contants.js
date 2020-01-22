exports.errorConstants = {
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
    SERVER_ERROR: 'SERVER_ERROR',
    INVALID_CREDENTIALS : "INVALID_CREDENTIALS",
    NOT_AUTHENTICATED : "NOT_AUTHENTICATED"
}

exports.errorType = {
    USER_ALREADY_EXISTS: {
        message: 'User already exists.',
        statusCode: 345
    },
    SERVER_ERROR: {
        message: 'Server error.',
        statusCode: 500
    },
    INVALID_CREDENTIALS : {
        message : "Invalid Credentials",
        statusCode : 345
    },
    NOT_AUTHENTICATED : {
        message : "Please login to continue",
        statusCode : 346
    }
}
