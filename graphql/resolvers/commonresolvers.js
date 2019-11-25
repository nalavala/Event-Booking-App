const User = require('../../models/user');
const Event = require('../../models/event');
const {dateToString} = require('../../helpers/date')
/**
 * This method returns the user if found for particular userId
 * @param userId
 * @returns {Promise<T | never>}
 */
const user = async (userId) => {

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw Error("User not found");
        }
        return {
            ...user._doc,
            createdEvents: events.bind(this, user.createdEvents)
        };
    } catch (e) {
        throw e;
    }

};

/**
 * This method returns the events arrays from given events ids
 * @param eventIds
 * @returns {Promise<T | never>}
 */
const events = async (eventIds) => {

    try {
        const events = await Event.find({_id: {$in: eventIds}});
        return events.map((event) => {
            return {
                ...event._doc,
                creator: user.bind(this, event.creator)
            }
        });
    } catch (err) {
        throw err
    }

};

// TODO : add resolver for single event
const singleEvent = async (eventId) => {
    try {
        const event = await Event.findById(eventId)
        return transformEvent(event);
    } catch (e) {
        throw e;
    }

}

/**
 * This function trasform the mangoose booking model to the booking that need to be send to UI
 * @param event
 * @returns {booking}
 */
const transformBooking = (booking) => {
    return {
        ...booking._doc,
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt),
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event)
    }
};


/**
 * This function trasform the mangoose model to the event that need to be send to UI
 * @param event
 * @returns {event}
 */
const transformEvent = (event) => {
    return {
        ...event._doc,
        date: dateToString(event._doc.date),
        creator: user(event._doc.creator)
    }
};


module.exports = {
    transformBooking: transformBooking,
    transformEvent: transformEvent
}
