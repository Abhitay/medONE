import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { Container, Col } from "react-bootstrap";
import { store } from 'react-notifications-component';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Icon from 'react-bootstrap-icons';

import {
    FormWrap,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    Text,
    Section,
} from "./SigninElements";

const reset = () => {
    Axios.defaults.withCredentials = true;

    const [pathName, setMyPath] = useState([]);
    const [myError, setMyError] = useState();
    const history = useHistory();

    const [myPass, setMyPass] = useState();
    const [myCPass, setMyCPass] = useState();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        history.push("/");
        setOpen(false);
    };

    useEffect(() => {
        setMyPath(window.location.pathname.split("+++"));
        if (window.location.pathname.split("+++").length < 2) {
            history.push("/");
        }

    }, []);

    useEffect(() => {
        if (pathName.length > 1) {
            console.log(pathName[1]);
            Axios(
                {
                    method: "post",
                    data: {
                        myKey: pathName[1],
                    },
                    url: "http://localhost:3001/checkEmailReset",
                }
            ).then((res) => {
                console.log(res.data);
                setMyError(res.data);
                if (res.data != "reset") {
                    handleClickOpen();
                }
            });
        }
    }, [pathName]);

    const resetPass = () => {
        if (myPass == "" || myCPass == "" || myPass == undefined || myCPass == undefined) {
            store.addNotification({
                title: "Warning",
                message: "Enter valid password",
                type: "success",
                container: "bottom-right",
                insert: "top",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],

                dismiss: {
                    duration: 2000,
                    showIcon: true,
                }
            });
        }
        else if (myPass != myCPass) {
            store.addNotification({
                title: "Warning",
                message: "Confirm password doesn't match",
                type: "success",
                container: "bottom-right",
                insert: "top",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],

                dismiss: {
                    duration: 2000,
                    showIcon: true,
                }
            });
        }
        else {
            Axios(
                {
                    method: "post",
                    data: {
                        myKey: pathName[1],
                        Password: myPass,
                    },
                    url: "http://localhost:3001/emailReset",
                }
            ).then((res) => {
                store.addNotification({
                    title: "Warning",
                    message: res.data,
                    type: "success",
                    container: "bottom-right",
                    insert: "top",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],

                    dismiss: {
                        duration: 2000,
                        showIcon: true,
                    }
                });
                if (res.data == "Password changed"){
                    setTimeout(()=>{
                        history.push("/");
                    },2000);
                }
            });
        }
    };

    const [passwordType, setPasswordType] = useState(true);

    const passwordIcon = () => {
        setPasswordType(!passwordType);
    };

    const [passwordType2, setPasswordType2] = useState(true);

    const passwordIcon2 = () => {
        setPasswordType2(!passwordType2);
    };

    return (
        <Section>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{myError}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        There seems to be some kind of problem...
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <Container>

                <Col style={{ display: "flex", justifyContent: "center" }}>
                    {/* {pathName[1]}<br></br>
                {myError} */}
                    <FormWrap>
                        <FormContent>
                            <Form action="#">
                                <FormH1>Password reset</FormH1>
                                <FormLabel htmlFor="for">New Password</FormLabel>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <FormInput type={passwordType == true ? "password" : "text"} required placeholder="Enter your password" onChange={(event) => { setMyPass(event.target.value) }}></FormInput>
                                    <Button onClick={passwordIcon} style={{ position: "absolute", right: "48px", zIndex: "1", border: "none", padding: "12px", background: "transparent" }}>{passwordType == false ? <Icon.EyeFill size={30}></Icon.EyeFill> : <Icon.EyeSlashFill size={30}></Icon.EyeSlashFill>}</Button>
                                </div>
                                <FormLabel htmlFor="for">Confirm password</FormLabel>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <FormInput type={passwordType2 == true ? "password" : "text"} required placeholder="Confirm your password" onChange={(event) => { setMyCPass(event.target.value) }}></FormInput>
                                    <Button onClick={passwordIcon2} style={{ position: "absolute", right: "48px", zIndex: "1", border: "none", padding: "12px", background: "transparent" }}>{passwordType2 == false ? <Icon.EyeFill size={30}></Icon.EyeFill> : <Icon.EyeSlashFill size={30}></Icon.EyeSlashFill>}</Button>
                                </div>
                                <FormButton type="submit" onClick={resetPass}>Reset</FormButton>
                            </Form>
                        </FormContent>
                    </FormWrap>
                </Col>

            </Container>
        </Section>
    )
}

export default reset
