import React, {useContext} from "react";
import AuthContext from './../../context/auth-context'

const EventItem = (props) => {
    const authContext = useContext(AuthContext);
    let isUserCreator = props.creatorId === authContext.userId;

    const eventViewHandler = (eventId) => {
        props.viewDetailsHandler(eventId);
    }
    return (
        <li className="event_list_item">
            <div>
                <h1>
                    {props.title}
                </h1>
                <h2>
                    ${props.price} - {new Date(props.date).toLocaleString()}
                </h2>
            </div>
            <div>
                {
                    !isUserCreator ? <button onClick={eventViewHandler.bind(this, props.eventId)}>View Details</button> :
                        <p> you are owner of this event</p>
                }

            </div>

        </li>
    )
}

export default EventItem;
