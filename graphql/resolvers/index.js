// Modals for mongo DB
const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking')
const bcrypt = require('bcryptjs');


var counter =    1;
/**
 * This method returns the user if found for particular userId
 * @param userId
 * @returns {Promise<T | never>}
 */
const user = (userId) => {

    return User
        .findById(userId)
        .then(user => {
            if (!user) {
                throw Error("User not found");
            }
            console.log(counter++)
            return {
                ...user._doc,
                createdEvents: events.bind(this ,user.createdEvents)
            };
        })
        .catch(err => {
            throw err;
        })

};

/**
 * This method returns the events arrays from given events ids
 * @param eventIds
 * @returns {Promise<T | never>}
 */
const events = (eventIds) => {
    return Event.find({_id: {$in: eventIds}})
        .then(events => {
            return events.map((event) => {
                return {
                    ...event._doc,
                    creator: user.bind(this, event.creator)
                }
            })
        })
        .catch(err => {
            throw err;
        })
};


const eventRootValue = {
    events: () => {
        return Event
            .find()
            .then(events => {
                return events.map(event => {
                    //console.log(event.creator);
                    return {
                        ...event._doc,
                        date : new Date(event._doc.date).toISOString(),
                        creator: user.bind(this,event.creator)
                    };
                })
            }).catch(err => {
                console.log(err);
            })
    },
    createEvent: (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(),
            creator: "5dd9ee61b2a78a0d0c591965"
        });

        var createdEvent;
        return event
            .save()
            .then((result) => {
                createdEvent = {
                    ...result._doc,
                    date : new Date(result._doc.data).toISOString(),
                    creator : user(result._doc.creator)
                };
                return User.findById("5dd9ee61b2a78a0d0c591965");
            })
            .then(user => {
                if (!user) {
                    throw new Error('user not found.')
                }
                user.createdEvents.push(event);
                return user.save();
            })
            .then(result => {
                return {...createdEvent, creator : user(createdEvent.creator)};
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
    event: () => {
        return "All Time Coding"
    },
    createUser: (args) => {
        return User.findOne({email: args.userInput.email})
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
    booking : (args) => {
        return Booking
            .find()
            .then(bookings => {
                return bookings.map((booking) => {

                    return {
                        ...booking._doc,
                        createdAt : new Date(booking._doc.createdAt).toISOString(),
                        updatedAt : new Date(booking._doc.updatedAt).toISOString()
                    }
                })
            })
            .catch(err => {
                throw err;
            })
    },
    bookEvent: (args) => {
        var eventId = args.eventId;
        return Event.findOne({_id : args.eventId})
            .then(event => {
                const booking = new Booking({
                    event : event,
                    user : '5dd9ee61b2a78a0d0c591965'
                });
               return booking.save();
            })
            .then(result => {
                console.log("event booked succesfully")
                console.log(result._doc);
                return {
                    ...result._doc,
                    createdAt : new Date(result._doc.createdAt).toISOString(),
                    updatedAt : new Date(result._doc.updatedAt).toISOString()
                }
            })
            .catch(err => {
                throw err;
            })

    }
}

module.exports = eventRootValue;
