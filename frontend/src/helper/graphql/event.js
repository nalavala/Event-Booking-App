export const fetchEventsQuery = {
    query: `
        query {
            events {
                _id
                date
                title
                description
                price
                creator {
                    _id
                }
            }
        }
    `
};


export const getCreateEventQuery = (event) => {
    const  query = {
        query:`
            mutation createEvent ($title : String!, $price : Float!, $date : String!, $description : String!){
              createEvent(eventInput : {title: $title,price: $price,date: $date,description : $description}) {
                _id
                title
                date
                title
                description
              }
            }`,
        variables : {
            title : event.title,
            price : +event.price,
            date : event.date,
            description : event.description

        }
    };

    return query;
};

export const bookEventQuery = (eventId) => {
    const  requestBody = {
        query:`
            mutation {
              bookEvent(eventId : "${eventId}") {
                _id
              }
            }`
    };

    return requestBody;
};
