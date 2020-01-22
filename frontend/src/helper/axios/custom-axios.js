import axios from "axios";
import {getURL} from '../helper';


export const APP = {

    POST : (requestBody, successCallback, failureCallback, options = {}, callbackData) => {
        console.log("post call to " + requestBody);
        axios.post(getURL(), requestBody, options)
            .then((response) => {
                successCallback(response, callbackData)
            })
            .catch((error) => {
                console.log("erorr : " + JSON.stringify(error.response));
                failureCallback(error.response);
            })
    },
    GET : (successCallback, failureCallback) => {

    }
};
