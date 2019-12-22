import React from 'react';
import { SnackbarProvider } from 'notistack';
import App from "./../App";
const HomeComponent = () => {
    return (<SnackbarProvider maxSnack={3}>
        <App />
    </SnackbarProvider>)
};

export default HomeComponent;
