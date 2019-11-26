const {dateToString} = require('../../helpers/date');
const Event = require('../../models/event');
const User = require('../../models/user');
const {transformEvent} = require('./commonresolvers');


module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                //console.log(event.creator);
                return transformEvent(event);
            })
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args, req) => {
        if(!req.isAuth) {
            throw Error("Not Authenticated");
        }
        try {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(),
                creator: req.userId
            });
            const result = await event
                .save();
            console.log("event saved successfully");
            var createdEvent = transformEvent(result);
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
    }
};
