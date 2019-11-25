const Booking = require('../../models/booking');
const Event = require('../../models/event');
const {transformBooking, transformEvent} = require('./commonresolvers');

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();

            return bookings.map((booking) => {
                return transformBooking(booking);
            });
        } catch (e) {
            throw e;
        }
    },
    bookEvent: async (args) => {
        try {
            const fetchedEvent = await Event.findOne({_id: args.eventId});
            const booking = new Booking({
                event: fetchedEvent,
                user: '5dd9ee61b2a78a0d0c591965'
            });
            const bookingResult = await booking.save();
            console.log("event booked successfully");

            return transformBooking(booking);
        } catch (e) {
            throw e;
        }
    },
    cancelBooking: async (args) => {
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
