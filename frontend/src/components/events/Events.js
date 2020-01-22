import React, {useContext, useState, useEffect} from 'react';
import Modal from '../modals/Modal'
import AuthContext from "../../context/auth-context"
import "./events.scss"
import EventList from "./EventList";
import Spinner from "./../spinner/Spinner";
import { useSnackbar } from 'notistack';
import {APP} from '../../helper/axios/custom-axios'
import {getCreateEventQuery, fetchEventsQuery, bookEventQuery} from './../../helper/graphql/event'


function EventsPage() {
    const { enqueueSnackbar } = useSnackbar();
    const [isEventCreating, setEventCreatingState] = useState(false);
    const [event, setEvent] = useState({
        title : "",
        price : "",
        date : "",
        description : ""
    });
    const [events, setEvents] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const authContext = useContext(AuthContext);

    /*---------------- Fetch Events ------------------ */

    const successFetchEvents = (response) => {
        setEvents(response.data.data.events);
        setLoading(false);
    };
    const failureFetchEvents = (response) => {
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
    const fetchEvents = () => {
        APP.POST(fetchEventsQuery, successFetchEvents, failureFetchEvents)
    };
    useEffect(fetchEvents, []);

    /*---------------- Fetch Events --------------------- */
    /* ---------- create Event ---------------*/
    const successCreateEvent = (response) => {

        let updatedEvents = [...events];
        let createEvent = response.data.data.createEvent;
        updatedEvents.push({
            _id : createEvent._id,
            title : createEvent.title,
            date : createEvent.date,
            price : createEvent.price,
            description : createEvent.description,
            creator : {
                _id : authContext.userId,
            }
        });
        setEvents(updatedEvents);
        setEvent({
            title : "",
            price : "",
            date : "",
            description : ""
        });
        enqueueSnackbar("Event Created Successfully", {
            variant : "success"
        })
    };

    const failureCreateEvent = (response) => {
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
    };

    const createEvent = () => {
        let options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + authContext.token
            }
        };
        APP.POST(getCreateEventQuery(event), successCreateEvent, failureCreateEvent, options);
    };
    /* ---------- create Event ---------------*/
    /* --------------------Book Event ------------------ */
    const successBookEventHandler = (response) => {
        enqueueSnackbar("Event Booked Successfully", {
            variant : "success"
        });
        setSelectedEvent(null);
    };
    const failureBookEventHandler = (response) => {
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
    };
    const bookEventHandler = (eventId) => {
        let options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + authContext.token
            }
        };
        APP.POST(bookEventQuery(eventId), successBookEventHandler, failureBookEventHandler, options);
    };
    /* --------------------Book Event ------------------ */


    const handleInputValueChanged = (context, event) => {
        switch (context) {
            case "title" :
                setEvent({...event, title : event.target.value});
                break;
            case "price" :
                setEvent({...event, price : event.target.value});
                break;
            case "date":
                setEvent({...event, date : event.target.value});
                break;
            case "description" :
                setEvent({...event, description : event.target.value});
                break;
        }
    };

    const viewDetailsHandler = (eventId)  => {
       const selectedEvent =  events.find(event => {
            return event._id == eventId;
        });
        setSelectedEvent(selectedEvent);
    };

    const handleCreateEventClicked = () => {
        setEventCreatingState(!isEventCreating)
    };

    const createEventHandler = () => {
        createEvent();
        setEventCreatingState(false);
        setSelectedEvent(null);
    };

    const modalCancelHandler = () => {
        setEventCreatingState(false);
        setSelectedEvent(null);
    };

    const getViewAccordingContext = () => {
        let modalView = null;
        if (isEventCreating) {
            modalView =  <Modal title="Create Event"
                           cancelHandler={modalCancelHandler}
                           confirmHandler={createEventHandler}
                           confrimText = "CreateEvent">
                        <form className="event-form" onSubmit={""}>
                            <div className="form-control">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" value={event.title} onChange={handleInputValueChanged.bind(this, "title")}/>
                            </div>
                            <div className="form-control">
                                <label htmlFor="price"> Price </label>
                                <input type="number" id="price" value={event.price} onChange={handleInputValueChanged.bind(this, "price")}/>
                            </div>
                            <div className="form-control">
                                <label htmlFor="date">Date</label>
                                <input type="datetime-local" id="date" value={event.date} onChange={handleInputValueChanged.bind(this, "date")} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="description"> Description </label>
                                <textarea id="description" rows="4" value={event.description} onChange={handleInputValueChanged.bind(this, "description")}/>
                            </div>
                        </form>
                    </Modal>
        }

        if (selectedEvent) {
            modalView = <Modal
                    title="Create Event"
                    confrimText="BookEvent"
                    cancelHandler={modalCancelHandler}
                    confirmHandler={bookEventHandler.bind(this, selectedEvent._id)}>

                    <h1>
                        {selectedEvent.title}
                    </h1>
                    <h2>
                        ${selectedEvent.price} - {new Date(selectedEvent.date).toLocaleString()}
                    </h2>
                    <p>{selectedEvent.description}</p>
                </Modal>
        }

        let  createEventView = null;
        if(authContext.token) {
            createEventView = <div className="event-control">
                <p>Share your own Events!</p>
                <button className="btn" onClick={handleCreateEventClicked}>
                    Create button
                </button>

            </div>
        }

        return <>
            {createEventView}
            {modalView}
            {isLoading ? <Spinner /> : <EventList viewDetailsHandler = {viewDetailsHandler} events={events} />}
        </>




    };


    return getViewAccordingContext();
}



export default EventsPage;
