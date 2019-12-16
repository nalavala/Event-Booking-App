import React from 'react';
import EventItem from "./EventItem";

const EventList = (props) => {


    const viewHandler = (eventId) => {
        props.viewDetailsHandler(eventId);
    }
    const events = props.events.map((event) => {
        return <EventItem key={event._id}
                          title={event.title}
                          eventId={event._id}
                          creatorId={event.creator._id}
                          price = {event.price}
                          date = {event.date}
                          viewDetailsHandler = {viewHandler}
        />
    });


    return (
        <ul className="event_list">
            {events}
        </ul>
    )
}

export default EventList;
