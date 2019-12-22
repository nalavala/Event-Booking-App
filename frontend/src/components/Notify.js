import {useSnackbar} from 'notistack';

const Notify = () => {

    const {enqueueSnackbar} = useSnackbar();

    const success = (message) => {
        enqueueSnackbar(message, {
            variant: 'success',
        });
    };

    const error = (message) => {
        enqueueSnackbar(message, {
            variant: 'error',
        });
    };

    const warning = (message) => {
        enqueueSnackbar(message, {
            variant: 'warning',
        });
    };

    const info = (message) => {
        enqueueSnackbar(message, {
            variant: 'info',
        });
    }

    return{
        success
    }
};


export default Notify;
