import React, { useState, useEffect } from 'react'

const FormSuccess = (props) => {
    const [user, setUser] = useState("none");

    useEffect(() => {
        async function fetchUser() {
            const fullResponse = await (fetch("http://localhost:3001/checkUser"));
            const responseJson = await fullResponse.json();
            setUser(responseJson);
        }
        fetchUser();
    }, []);

    function sayHello() {
        alert(user);
      }

    return (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={sayHello}>Close</button>
                {props.children}
            </div>
        </div>
    )
}

export default FormSuccess
