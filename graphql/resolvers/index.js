const bookingResolver = require('./booking');
const eventResolver = require('./event');
const authResolver = require('./auth');

const rootResolver = {
    ...authResolver,
    ...bookingResolver,
    ...eventResolver
};


module.exports = rootResolver;
