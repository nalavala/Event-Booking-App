// module dependencies
const express = require('express');
const bodyParser = require('body-parser');
const graphQLHTTP = require('express-graphql');
const mongoose = require('mongoose');
// graphql schemas and rootvalues
const graphqlSchema = require('./graphql/schema/index');
const graphqlRoolValue = require('./graphql/resolvers/index');

// It create a express app server
const app = new express();

app.use(bodyParser.json());

app.use('/graphql', graphQLHTTP({

    // This schema defination which gets exposed to UI to request data
    schema: graphqlSchema,
    // Build of resolvers
    // This should contains types resolvers like events resolvers
    rootValue: graphqlRoolValue,
    // This enable graphical URL to debug and test out app
    graphiql: true
}));

console.log("trying to connect")

// it needs connection string which contains the address of database
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
    }@cluster0-ewwii.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    console.log("mongoDB connected")
    app.listen(1742);
}).catch(err => {
    console.log(err);
});
