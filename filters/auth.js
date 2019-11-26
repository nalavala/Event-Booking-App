const jwt = require('jsonwebtoken');
// This is middle with intercept every request and set whether user is authenticated or not
// This never throw error it just adds metadata
module.exports = (request , response, next) => {

    const authHeader = request.get('authorization');

    if(!authHeader) {
        request.isAuth = false;
        return next();
    }

    var token = authHeader.split(" ")[1] // Bearer {token}

    if(!token) {
        request.isAuth = false;
        return next();
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, "My secret key")
    } catch (e) {
        request.isAuth = false;
        return next();
    }

    request.isAuth = true;
    request.userId = decodedToken.userId;
    next();

};
