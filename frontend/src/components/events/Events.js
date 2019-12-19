import React, {useContext, useState, useEffect} from 'react';
import Modal from '../modals/Modal'
import BackDrop from "../../Backdrop";
import AuthContext from "../../context/auth-context"
import "./events.scss"
import EventList from "./EventList";
import Spinner from "./../spinner/Spinner";


function EventsPage() {

    const [creating, setEventCreatingState] = useState(false);
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

    const fetchEvents = () => {
        setLoading(true);
        const  requestBody = {
            query:`
                query {
  events {
    _id
    date
    title
    description
    price
    creator {
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

            }
        }).then((response) => {
            if(response.status !== 200 && response.status !== 201) {
                //TODO : dont throw error
                throw new Error('Failed');
            }

            return response.json();
        } ).then((response) => {
            console.log(response.data.events)
            setEvents(response.data.events)
            setLoading(false);
        }).catch((e) => {
            setLoading(false);
            throw e;
        });

    };
    useEffect(fetchEvents, []);

    const createEvent = () => {

        const  requestBody = {
            query:`
                mutation {
  createEvent(eventInput : {title: "${event.title}",price: ${event.price},date: "${event.date}",description : "${event.description}"}) {
    _id
    title
    date
    title
    description
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
            let updatedEvents = [...events];
            updatedEvents.push({
                _id : response.data.createEvent._id,
                title : response.data.createEvent.title,
                date : response.data.createEvent.date,
                price : response.data.createEvent.price,
                description : response.data.createEvent.description,
                creator : {
                    _id : authContext.userId,
                }
            });
            console.log("updatedEvents" + updatedEvents);
            setEvents(updatedEvents);
        }).catch((e) => {
            throw e;
        });
    }


    const handleInputValueChanged = (context, evnt) => {
        switch (context) {
            case "title" :
                setEvent({...event, title : evnt.target.value});
                break;
            case "price" :
                setEvent({...event, price : evnt.target.value});
                break;
            case "date":
                setEvent({...event, date : evnt.target.value});
                break;
            case "description" :
                setEvent({...event, description : evnt.target.value});
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
        setEventCreatingState(!creating)
    };

    const createEventHandler = () => {
        createEvent();
        setEventCreatingState(false);
        setSelectedEvent(null);
    };
    const bookEventHandler = (eventId) => {
        console.log(eventId);



        const  requestBody = {
            query:`
                mutation {
  bookEvent(eventId : "${eventId}") {
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
            console.log(response);
        }).catch((e) => {
            throw e;
        });


        setSelectedEvent(null);
    };
    const modalCancelHandler = () => {
        setEventCreatingState(false);
        setSelectedEvent(null);
    };

    const getViewAccordingContext = () => {
        if (creating) {
            return (
                <>
                    <BackDrop/>
                    <Modal title="Create Event"
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
                </>
            )
        }

        if(selectedEvent) {
            return <>
                <BackDrop/>
                <Modal
                    title="Create Event"
                    confrimText = "BookEvent"
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
            </>
        }

        let  createEventView = null;
        if(authContext.token) {
            createEventView = <div className="event-control">
                <p>Share your own Events!</p>
                <button onClick={handleCreateEventClicked}>
                    Create button
                </button>

            </div>
        }

        return <>
            {createEventView}
            {isLoading ? <Spinner /> : <EventList viewDetailsHandler = {viewDetailsHandler} events={events} />}
        </>




    };


    return getViewAccordingContext();
}



export default EventsPage;
