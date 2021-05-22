export const handleError = (error) => {
    let errorMesage = 'Some error occurred, Unable to connect to server';

    if (error.response) {
        console.error('error.response', error.response);
        let {status} = error.response;
        if(status >= 500 ){
            errorMesage = "Server Error Occurred !";
            return errorMesage;
        }
    }

    if (error.response && error.response.data) {
        errorMesage = error.response.data._error;
    }

    return errorMesage;
};