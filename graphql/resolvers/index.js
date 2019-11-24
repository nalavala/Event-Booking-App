// Modals for mongo DB
const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking')
const bcrypt = require('bcryptjs');


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


const eventRootValue = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                //console.log(event.creator);
                return {
                    ...event._doc,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event.creator)
                };
            })
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args) => {
        try {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: + args.eventInput.price,
                date: new Date(),
                creator: "5dd9ee61b2a78a0d0c591965"
            });
            const result = await event
                .save();
            console.log("event saved successfully");
            var createdEvent = {
                ...result._doc,
                date: new Date(result._doc.date).toISOString(),
                creator: user(result._doc.creator)
            };
            const foundUser = await User.findById("5dd9ee61b2a78a0d0c591965");
            if (!foundUser) {
                throw new Error('user not found.')
            }
            foundUser.createdEvents.push(event);
            console.log("event added to user");
            await foundUser.save();
            console.log("user saved successfully");

            return createdEvent;
        } catch (err) {
            throw err;
        }
    },
    createUser: (args) => {
        return User
            .findOne({email: args.userInput.email})
            .then(user => {
                if (user) {
                    throw new Error('user existss already.')
                }
                return bcrypt.hash(args.userInput.password, 12);
            })
            .then(hashedPassword => {
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                })
                return user.save();
            })
            .then(result => {
                console.log(result);
                return {...result._doc, password: null}
            })
            .catch(err => {
                return err;
            })

    },
    bookings: async () => {
        try {
            const bookings = await Booking.find();

            return bookings.map((booking) => {
                return {
                    ...booking._doc,
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString(),
                    user : user.bind(this, booking._doc.user)
                }
            });
        } catch (e) {
            throw e;
        }
    },
    bookEvent: async (args) => {
        try {
            const event = await Event.findOne({_id: args.eventId});
            const booking = new Booking({
                event: event,
                user: '5dd9ee61b2a78a0d0c591965'
            });
            const bookingResult = await booking.save();
            console.log("event booked successfully");

            return {
                ...bookingResult._doc,
                createdAt: new Date(bookingResult._doc.createdAt).toISOString(),
                updatedAt: new Date(bookingResult._doc.updatedAt).toISOString(),
                user : user.bind(this, booking._doc.user)
            }
        } catch (e) {
            throw e;
        }
    }
};

module.exports = eventRootValue;
