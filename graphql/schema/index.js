const {buildSchema} = require('graphql');

const eventSchema = buildSchema(`

    type Booking {
        _id : ID!
        event : Event!,
        user : User!,
        createdAt : String!,
        updatedAt : String!
    }
    
    type Event {
        _id : ID!
        title : String!
        description : String!
        price : Float!
        date : String!
        creator: User!
    } 
    
    type User {
        _id : ID
        email : String!
        password: String
        createdEvents : [Event!]
    }
    
    input EventInput {
        title : String!
        description : String!
        price : Float!
    }
    
    input UserInput {
        email : String!
        password : String!
    }
    
    type AuthData {
        userId : ID!,
        email : String!,
        token : String!,
        tokenExpiration : Int!
    }
    
    type RootQuery {
        events : [Event!]!
        bookings : [Booking!]!
        login(email : String!, password : String!) : AuthData!
    }
    
    type RootMutation {
        createEvent(eventInput : EventInput) : Event
        createUser(userInput : UserInput) : User
        bookEvent(eventId : ID!) : Booking!
        cancelBooking(bookingId : ID!) : Event!
    }
    schema {
        query : RootQuery
        mutation : RootMutation
    }
`);


module.exports = eventSchema
