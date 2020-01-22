export const getURL = () => {
    if(process.env.NODE_ENV === 'development') {
        return "http://localhost:1742/graphql"
    }
    return "https://event-booking-graphql-app.herokuapp.com/graphql"
};




