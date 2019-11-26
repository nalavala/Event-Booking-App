const Booking = require('../../models/booking');
const Event = require('../../models/event');
const {transformBooking, transformEvent} = require('./commonresolvers');

module.exports = {
    bookings: async (args, req) => {
        if(!req.isAuth) {
            throw Error("Not Authenticated");
        }
        try {
            const bookings = await Booking.find();

            return bookings.map((booking) => {
                return transformBooking(booking);
            });
        } catch (e) {
            throw e;
        }
    },
    bookEvent: async (args, req) => {
        if(!req.isAuth) {
            throw Error("Not Authenticated");
        }
        try {
            const fetchedEvent = await Event.findOne({_id: args.eventId});
            const booking = new Booking({
                event: fetchedEvent,
                user: req.userId,
            });
            const bookingResult = await booking.save();
            console.log("event booked successfully");

            return transformBooking(booking);
        } catch (e) {
            throw e;
        }
    },
    cancelBooking: async (args, req) => {
        if(!req.isAuth) {
            throw Error("Not Authenticated");
        }
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            if (!booking) {
                throw Error("No bookings found for id: " + args.bookingId);
            }
            console.log(booking);
            const event = transformEvent(booking.event);
            await Booking.deleteOne({_id: args.bookingId});
            return event;
        } catch (e) {
            throw e;
        }
    }
};
