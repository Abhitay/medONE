import React, { useState } from 'react';
import Signup from './index';
import { BrowserRouter as Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";


const Form = () => {
    const [isSubmitted, setIsSubmited] = useState(false);
    const history = useHistory();

    function submitForm() {
        setIsSubmited(true);
    }
    return (
        <>
            {!isSubmitted ? (<Signup submitForm={submitForm}></Signup>) : (history.push("/dashboard"))}
        </>
    )
}

export default Form