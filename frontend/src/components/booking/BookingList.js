import React from 'react';
import BookingItem from "./BookingItem";

const BookingList = (props) => {


    const bookings = props.bookings.map((booking) => {
        return <BookingItem
            key={booking._id}
            price={booking.event.price}
            title={booking.event.title}
            onCancel = {props.onCancel.bind(this, booking._id)}
        />
    });


    return (
        <ul className="booking_list">
            {bookings}
        </ul>
    )
}

export default BookingList;
