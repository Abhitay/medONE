import React, { useState, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";
import loadingLogo from '../images/loading2.GIF';


export const ProtectedRoute = ({ component: Component, user: User, ...rest }) => {

    useEffect(() => {
        // console.log("protected:", User);
    });

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState("none");

    async function fetchUser() {
        const fullResponse = await fetch("http://localhost:3001/checkUser", { credentials: "include" });
        const responseJson = await fullResponse.json();
        setUser(responseJson);
    }

    useEffect(() => {
        fetchUser()
            // .then(console.log(user));
        setTimeout(() => {
            setLoading(false);
        }, 5500);
    }, [user]);

    return (
        <Route
            {...rest}
            render={props => {
                // if (User) {
                //     if (User != "none") {
                //         return <Component {...props} />;
                //     }
                //     else {
                //         return <Redirect to={
                //             {
                //                 pathname: "/",
                //                 state: {
                //                     from: props.location
                //                 }
                //             }
                //         } />
                //     }
                // }
                // else 
                if (user != "none") {
                    return <Component {...props} user={user} />;

                }
                else {

                    if (loading == true) {
                        return (
                            <div style={{ height: "100vh", width: "100vw", backgroundColor: "#030403", alignItems: "center", display: "flex", justifyContent: "center" }}>
                                <img style={{ height: "50%" }} src={loadingLogo} alt="loading..."></img>
                            </div>
                        )
                    }
                    else {
                        return <Redirect to={
                            {
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }
                        } />
                    }

                }


            }
            } />
    );
}