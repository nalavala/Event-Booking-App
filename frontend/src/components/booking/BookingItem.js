import React, {useContext} from "react";

const BookingItem = (props) => {

    return (
        <li className="booking_list_item">
            <div  className="booking_list_item_data">
                {props.title} :{  } {props.price}
            </div>
            <div className="booking_list_item_actions">
                <button onClick={props.onCancel}>Cancel</button>
            </div>
        </li>
    )
}

export default BookingItem;
