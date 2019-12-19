import React, {useState, useEffect, useContext} from 'react';
import Spinner from "../spinner/Spinner";
import './booking.scss'
import BookingList from "./BookingList";
import AuthContext from "../../context/auth-context"

function BookingsPage() {

    const [isLoading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const authContext = useContext(AuthContext);


    const fetchBookings = () => {

        setLoading(true);
        const  requestBody = {
            query:`
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


        fetch('http://localhost:1742/graphql', {
            method : 'POST',
            body : JSON.stringify(requestBody),
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : "Bearer " + authContext.token

            }
        }).then((response) => {
            if(response.status !== 200 && response.status !== 201) {
                //TODO : dont throw error
                throw new Error('Failed');
            }

            return response.json();
        } ).then((response) => {
            console.log(response.data.bookings)
            setBookings(response.data.bookings)
            setLoading(false);
        }).catch((e) => {
            setLoading(false);
            throw e;
        });


    };
    useEffect(fetchBookings, []);


    const cancelBooking = (bookingId) => {

        console.log("booking cancel" + bookingId);


        const  requestBody = {
            query:`
                mutation {
  cancelBooking(bookingId : "${bookingId}") {
    _id
  }
}`
        };


        fetch('http://localhost:1742/graphql', {
            method : 'POST',
            body : JSON.stringify(requestBody),
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : "Bearer " + authContext.token

            }
        }).then((response) => {
            if(response.status !== 200 && response.status !== 201) {
                //TODO : dont throw error
                throw new Error('Failed');
            }

            return response.json();
        } ).then((response) => {

            let updatedBookings = [...bookings];
            updatedBookings = updatedBookings.filter(function( booking ) {
                return booking._id !== bookingId;
            });

            console.log("updatedEvents" + updatedBookings);
            setBookings(updatedBookings);
        }).catch((e) => {
            setLoading(false);
            throw e;
        });
    };




    return isLoading ? <Spinner /> : <BookingList onCancel={cancelBooking} bookings={bookings} />
}

export default BookingsPage;
