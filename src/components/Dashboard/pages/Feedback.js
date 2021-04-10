import React, { useState, useEffect } from 'react';
import HomepageNavbar from "../Navbar/HomepageNavbar";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import { DialogContentText } from '@material-ui/core';
import Axios from "axios";
import ExpDate from '../Chart/ExpiryDate';
import LessStock from '../Chart/LessStock';
import * as Icon from 'react-bootstrap-icons';
import InputAdornment from "@material-ui/core/InputAdornment";
import { store } from 'react-notifications-component';

export default function Feedback(props) {
    const history = useHistory();
    const [value, setValue] = React.useState(0);
    var Star = 0;

    const [Pharmacy_name, setName] = useState("");
    const [error, setError] = useState();
    const [Feedback, setFeed] = useState("");
    const [type, setType] = useState("password");
    const [type2, setType2] = useState("password");
    const [Rate, setStar] = useState();

    const [oldPass, setOldPass] = useState();
    const [newPass, setNewPass] = useState();
    const [confirmPass, setConfirmPass] = useState();

    const [passError, setPassError] = useState();

    Axios.defaults.withCredentials = true;

    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

    const passNotification = () => {
        store.addNotification({
            title: "Success",
            message: "Password changed",
            type: "success",
            container: "bottom-right",
            insert: "top",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],

            dismiss: {
                duration: 2000,
                showIcon: true,
            }
        })
    }

    const changePass = () => {
        Axios.post('http://localhost:3001/changePass', {
            oldPass: oldPass,
            newPass: newPass,
            confirmPass: confirmPass,
        }).then((res) => {
            setPassError(res.data);

            if (res.data == "password changed") {
                setpassOpen(false);
                setOldPass(null);
                setNewPass(null);
                setConfirmPass(null);
                setPassError(null);
                setType("password")
                passNotification();
            }
        });
    }

    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton style={{ backgroundColor: 'transparent' }} aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
        },
    }))(MuiDialogContent);

    const DialogActions = withStyles((theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(1),
        },
    }))(MuiDialogActions);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        feeds()
        { error == "Values Inserted!" ? setOpen(false) : setOpen(true) }

    };
    const handleOutsideClose = () => {
        setError(null);
        setOpen(false);
        setpassOpen(false);
        setOldPass(null);
        setNewPass(null);
        setConfirmPass(null);
        setPassError(null);
        setType("password")
    };

    const changeType = () => {
        type == "password" ? setType("text") : setType("password")
    }

    const changeType2 = () => {
        type2 == "password" ? setType2("text") : setType2("password")
    }

    const [passOpen, setpassOpen] = useState(false);

    const changePasshandle = () => {
        setpassOpen(true)
    }

    useEffect(() => {
        // handleClickOpen();
        Axios.post('http://localhost:3001/getName', {

        }).then((res) => {
            setName(res.data);
        })
    }, [])

    const feeds = () => {
        Axios.post('http://localhost:3001/feedback', {
            Feedback: Feedback,
            Star: Rate,
        }).then((res) => {
            setError(res.data);
            if (res.data == "Thank you for your feedback") {
                setValue(0)
                setFeed('')
                setOpen(false)
                setError(null);
            }

            // console.log(SimpleRating.newValue);
        });
    };

    return (
        <div style={{ height: "100vh", backgroundColor: "#e8eff3" }}>
            <HomepageNavbar></HomepageNavbar>
            <Container style={{ marginLeft: "0px", }} >
                <Row style={{ backgroundColor: "", width: "100vw", padding: "1%" }}>
                    <Row style={{ backgroundColor: "white", height: "100%", width: "100vw", overflow: "hidden", margin: "0", padding: "1%" }} className="shadow-sm">
                        <Col style={{ backgroundColor: "", height: "100%", overflow: "hidden", margin: "0", padding: "1%" }}>
                            <Row style={{ backgroundColor: "", height: "30vh", width: "100%", overflow: "hidden", margin: "0", padding: "1%" }}>
                                <Card style={{ height: "90%", width: "100%", padding: "1%" }} className="shadow-sm">
                                    <Row style={{ backgroundColor: "", width: "100%", height: "100%" }}>
                                        <Col className="col-xl-4 d-none d-xl-block" style={{ backgroundColor: "", height: "100%" }}>
                                            <img src={`https://joeschmoe.io/api/v1/random`} style={{ height: "100%" }}></img>
                                        </Col>
                                        <Col style={{ backgroundColor: "", marginTop: "4%" }}>
                                            <Row style={{ backgroundColor: "", padding: "10px" }}>
                                                <Col style={{ backgroundColor: "" }}>
                                                    <h2>{Pharmacy_name}</h2>
                                                    <span style={{ marginLeft: "0", color: "grey" }}>{props.user}</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Button variant="outlined" onClick={changePasshandle} style={{ minWidth: "40%", margin: "1%", color: "black", borderColor: "green", padding: "1%" }}>
                                                        Change password
                                                    </Button>
                                                    <Button variant="outlined" onClick={handleClickOpen} style={{ minWidth: "25%", margin: "1%", }}>
                                                        Feedback
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                </Card>
                            </Row>
                            <Row style={{ backgroundColor: "", height: "100%", width: "100%", padding: "1%" }}>
                                <ExpDate></ExpDate>
                            </Row>
                        </Col>
                        <Col style={{ backgroundColor: "", height: "100%", width: "100%", borderLeft: "0.5px solid grey", marginTop: "25px" }}>
                            <LessStock></LessStock>
                        </Col>

                    </Row>
                </Row>
            </Container>

            <div>
                <Dialog onClose={handleOutsideClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogContent>
                        <Card style={{ height: "10vh", width: "50vh" }} className="shadow-sm p-3 bg-white rounded">
                            <div className="stir">

                                Rate your experience with our project...
                            <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        padding: "1%"
                                    }}
                                >
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend"></Typography>
                                        <Rating
                                            size="large"
                                            name="simple-controlled"
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setStar(newValue);
                                                setValue(newValue);
                                                setError(null);
                                                Star = newValue;
                                            }}
                                        />
                                    </Box>
                                </div>
                            </div>
                        </Card>
                    </DialogContent>
                    <DialogContentText style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "1%"
                    }}>
                        <Card style={{ height: "20vh", width: "50vh" }} className="shadow-sm p-3 bg-white rounded">
                            Anything that can be improved?
                            <textarea
                                type="text"
                                placeholder="Feedback"
                                // value={Feedback}
                                style={{ margin: "1%", border: "1px solid grey", borderRadius: "3px", height: "90%", padding: "2%", wordWrap: "break-word", }}
                                // onChange={(event) => {
                                //     setFeed(event.target.value);
                                // }}
                                onBlur={(event) => {
                                    setFeed(event.target.value);
                                }}
                            />
                        </Card>
                    </DialogContentText>
                    {error &&
                        <DialogContent>
                            <Card className="shadow-sm p-3 bg-white rounded">
                                <span style={{ padding: "1%", color: "red" }}><Icon.ExclamationTriangleFill size={20}></Icon.ExclamationTriangleFill> {error}</span>
                            </Card>
                        </DialogContent>}
                    <DialogActions>
                        <Button onClick={handleClose} style={{ color: "#01bf71" }}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
                <Dialog onClose={handleOutsideClose} aria-labelledby="customized-dialog-title" open={passOpen}>
                    <DialogTitle id="customized-dialog-title" style={{ backgroundColor: 'transparent' }} onClose={handleOutsideClose}>
                        Change password
                    </DialogTitle>
                    <DialogContentText style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "1%"
                    }}>
                        <Card style={{ height: "10vh", width: "50vh" }} className="shadow-sm p-3 bg-white rounded">
                            <input
                                onBlur={(event) => (setOldPass(event.target.value), setPassError(null))}
                                // onChange={(event) => (setOldPass(event.target.value), setPassError(null))}
                                type="password"
                                placeholder="Old password"
                                style={{ margin: "1%", border: "1px solid grey", borderRadius: "3px", padding: "2%", wordWrap: "break-word", }}
                            />
                        </Card>
                    </DialogContentText>
                    <DialogContentText style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "1%"
                    }}>
                        <Card style={{ height: "15vh", width: "50vh" }} className="shadow-sm p-3 bg-white rounded">
                            <TextField
                                onBlur={(event) => (setNewPass(event.target.value), setPassError(null))}
                                // onChange={(event) => (setNewPass(event.target.value), setPassError(null))}
                                type={type}
                                InputProps={{
                                    disableUnderline: true,
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton style={{ backgroundColor: 'transparent' }} onClick={changeType}>
                                                {type == "password" ? <Icon.EyeSlash></Icon.EyeSlash> : <Icon.Eye></Icon.Eye>}


                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                placeholder="New password"
                                style={{ margin: "1%", border: "1px solid grey", borderRadius: "3px", padding: "2%", wordWrap: "break-word", }}
                            />
                            <TextField
                                onBlur={(event) => (setConfirmPass(event.target.value), setPassError(null))}
                                // onChange={(event) => (setConfirmPass(event.target.value), setPassError(null))}
                                type={type2}
                                InputProps={{
                                    disableUnderline: true,
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton style={{ backgroundColor: 'transparent' }} onClick={changeType2}>
                                                {type2 == "password" ? <Icon.EyeSlash></Icon.EyeSlash> : <Icon.Eye></Icon.Eye>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                placeholder="Confirm password"
                                style={{ margin: "1%", border: "1px solid grey", borderRadius: "3px", padding: "2%", wordWrap: "break-word", }}
                            />
                        </Card>
                    </DialogContentText>
                    {passError &&
                        <DialogContent>
                            <Card className="shadow-sm p-3 bg-white rounded">
                                <span style={{ padding: "1%", color: "red" }}><Icon.ExclamationTriangleFill size={20}></Icon.ExclamationTriangleFill> {passError}</span>
                            </Card>
                        </DialogContent>}
                    <DialogActions>
                        <Button style={{ color: "#01bf71" }} onClick={changePass}>
                            Change
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </div>
    )
}
