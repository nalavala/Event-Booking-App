export const fetchBookingQuery = () => {
    const  query = {
        query: `
                query {
                  bookings {
                    _id
                    createdAt
                    updatedAt
                    event {
                    _id
                    title
                    price
                    }
                    user{
                    _id
                    }
                  }
                }`
    };

    return query;
};

export const cancelBookingQuery = (bookingId) => {
    const  query = {
        query:`
                mutation cancelBooking ($id : ID!) {
                  cancelBooking(bookingId : $id) {
                    _id
                  }
                }`,
        variables : {
            id : bookingId
        }


    };
    return query;
};
