import React, {useState, useEffect, useContext} from 'react';
import Spinner from "../spinner/Spinner";
import BookingList from "./BookingList";
import AuthContext from "../../context/auth-context";
import {cancelBookingQuery, fetchBookingQuery} from "../../helper/graphql/booking";
import {APP} from '../../helper/axios/custom-axios';
import { useSnackbar } from 'notistack';
import './booking.scss';

function BookingsPage() {

    const [isLoading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const authContext = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    /* -------------- cancel Booking --------------*/
    const successCancelBooking = (response ,callbackData) => {
        let bookingId = callbackData.bookingId;
        let updatedBookings = [...bookings];
        updatedBookings = updatedBookings.filter(function( booking ) {
            return booking._id !== bookingId;
        });
        setBookings(updatedBookings);
        setLoading(false);
    };
    const failureCancelBooking = (response) => {
        if(response && response.data && response.data.errors && response.data.errors.length > 0) {
            let errorMessage = response.data.errors[0].message;
            enqueueSnackbar(errorMessage, {
                variant : "error"
            });
        } else {
            enqueueSnackbar("something went wrong", {
                variant : "error"
            });
        }
        setLoading(false);
    };

    const cancelBooking = (bookingId) => {
        let options = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : "Bearer " + authContext.token
            }
        };
        let callbackData = {
            bookingId : bookingId
        };
        APP.POST(cancelBookingQuery(bookingId), successCancelBooking, failureCancelBooking, options, callbackData);
    };
    /* -------------- cancel Booking --------------*/
    /* -------------- fetch Booking --------------*/
    const successFetchBooking = (response) => {
        setBookings(response.data.data.bookings);
        setLoading(false);
    };
    const failureFetchBooking = (response) => {
        if(response && response.data && response.data.errors && response.data.errors.length > 0) {
            let errorMessage = response.data.errors[0].message;
            enqueueSnackbar(errorMessage, {
                variant : "error"
            });
        } else {
            enqueueSnackbar("something went wrong", {
                variant : "error"
            });
        }
        setLoading(false);
    };
    const fetchBookings = () => {
        setLoading(true);
        let options = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : "Bearer " + authContext.token
            }
        };
        APP.POST(fetchBookingQuery(), successFetchBooking, failureFetchBooking, options)
    };
    /* -------------- fetch Booking --------------*/

    useEffect(fetchBookings, []);

    return isLoading ? <Spinner /> : <BookingList onCancel={cancelBooking} bookings={bookings} />
}

export default BookingsPage;
