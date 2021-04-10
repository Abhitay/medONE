import React, { useState, useEffect } from 'react'
import { Card, Container, Row, Col } from "react-bootstrap";
import Draggable from 'react-draggable';
import * as Icon from 'react-bootstrap-icons';
import { ResizableBox } from 'react-resizable';
import "react-resizable/css/styles.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import HomepageNavbar from "./Navbar/HomepageNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayMedicine from './Inventory/DisplayMedicine';
import DashboardDisplayMedicine from './Inventory/DashboardDisplayMedicine';
import Axios from "axios";
import TodoList from './toDo/TodoList';
import './toDo.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/RotateLeft';
import Chart from '../Dashboard/Chart/Chart';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DialogContentText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Hint } from 'react-autocomplete-hint';
import { CollectionsOutlined } from '@material-ui/icons';

const Dashboard = () => {
    Axios.defaults.withCredentials = true;
    useEffect(() => {
        localStorage.animate = "sign out";
        return () => {
            localStorage.animate = "sign out";
            if (localStorage.card1X == "NaN" || localStorage.card1Y == "NaN" || localStorage.card1X == null || localStorage.card1Y == null) {
                localStorage.card1X = 2;
                localStorage.card1Y = 2;
            }
            if (localStorage.card2X == "NaN" || localStorage.card2Y == "NaN" || localStorage.card2X == null || localStorage.card2Y == null) {
                localStorage.card2X = 2;
                localStorage.card2Y = 2;
            }
            if (localStorage.card3X == "NaN" || localStorage.card3Y == "NaN" || localStorage.card3X == null || localStorage.card3Y == null) {
                localStorage.card3X = 2;
                localStorage.card3Y = 2;
            }
            if (localStorage.card4X == "NaN" || localStorage.card4Y == "NaN" || localStorage.card4X == null || localStorage.card4Y == null) {
                localStorage.card4X = 2;
                localStorage.card4Y = 2;
            }
            if (localStorage.card5X == "NaN" || localStorage.card5Y == "NaN" || localStorage.card5X == null || localStorage.card5Y == null) {
                localStorage.card5X = 2;
                localStorage.card5Y = 2;
            }
            if (localStorage.firstVisit == "NaN" || localStorage.firstVisit == null) {
                localStorage.firstVisit = "false";
            }
            if (localStorage.cardHeight == "NaN" || localStorage.cardHeight == null) {
                localStorage.cardHeight = 400;
            }
        }
    }, [])

    const print = ()=>{
        console.log("sup")
    }


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

    const history = useHistory();

    const [user, setUser] = useState("none");

    const [myCard1X, setcard1X] = useState(Number(localStorage.card1X));
    const [myCard1Y, setcard1Y] = useState(Number(localStorage.card1Y));

    const [myCard2X, setcard2X] = useState(Number(localStorage.card2X));
    const [myCard2Y, setcard2Y] = useState(Number(localStorage.card2Y));

    const [myCard3X, setcard3X] = useState(Number(localStorage.card3X));
    const [myCard3Y, setcard3Y] = useState(Number(localStorage.card3Y));

    const [myCard4X, setcard4X] = useState(Number(localStorage.card4X));
    const [myCard4Y, setcard4Y] = useState(Number(localStorage.card4Y));

    const [myCard5X, setcard5X] = useState(Number(localStorage.card5X));
    const [myCard5Y, setcard5Y] = useState(Number(localStorage.card5Y));

    const [myCardHeight, setcardHeight] = useState(Number(localStorage.cardHeight));


    let handleEvent = (e, data) => {
        // console.log('Event Type', e.type);
        // console.log(e);
        // console.log(data);

        localStorage.card1X = data.x;
        localStorage.card1Y = data.y;
    }

    let handleEvent2 = (e, data) => {
        // console.log('Event Type', e.type);
        // console.log(e);

        localStorage.card2X = data.x;
        localStorage.card2Y = data.y;
    }

    let handleEvent3 = (e, data) => {
        // console.log('Event Type', e.type);
        // console.log(e);

        localStorage.card3X = data.x;
        localStorage.card3Y = data.y;
    }

    let handleEvent4 = (e, data) => {
        // console.log('Event Type', e.type);
        // console.log(e);

        localStorage.card4X = data.x;
        localStorage.card4Y = data.y;
    }

    let handleEvent5 = (e, data) => {
        // console.log('Event Type', e.type);
        // console.log(e);

        localStorage.card5X = data.x;
        localStorage.card5Y = data.y;
    }

    let handleSize = (e, data) => {
        // console.log('Event Type', e.type);
        // console.log(data.size.height);
        setCardtodoMyHeight(data.size.height + "px");
        localStorage.cardHeight = data.size.height;

        // localStorage.card5X = data.x;
        // localStorage.card5Y = data.y;
    }

    let handleEventReset = () => {

        localStorage.card1X = 2;
        localStorage.card1Y = 2;

        localStorage.card2X = 2;
        localStorage.card2Y = 2;

        localStorage.card3X = 2;
        localStorage.card3Y = 2;

        localStorage.card4X = 2;
        localStorage.card4Y = 2;

        localStorage.card5X = 2;
        localStorage.card5Y = 2;

        localStorage.cardHeight = 400;

        window.location.reload();
    }

    // useEffect(() => {
    //     if (localStorage.card1X == "NaN" ||localStorage.card1Y == "NaN" ) {
    //         localStorage.card1X = 2;
    //         localStorage.card1Y = 2;
    //     }


    //     localStorage.card2X = 2;
    //     localStorage.card2Y = 2;

    //     localStorage.card3X = 2;
    //     localStorage.card3Y = 2;
    // }, [localStorage.card1X])

    // This imp
    // useEffect(() => {
    //     // async function fetchUser() {
    //     //     const fullResponse = await fetch("http://localhost:3001/checkUser");
    //     //     const responseJson = await fullResponse.json();
    //     //     setUser(responseJson);
    //     //     // await setcard1X(Number(localStorage.card1X));
    //     //     // await setcard1Y(Number(localStorage.card1Y));
    //     // }
    //     // const fullResponse = await fetch("http://localhost:3001/checkUser");
    //     // const responseJson = await fullResponse.json();
    //     Axios(
    //         {
    //             method: "get",
    //             withCredentails: true,
    //             url: "http://localhost:3001/checkUser",
    //         }
    //     ).then((response) => {
    //         console.log(response.data);
    //         setUser(response.data);
    //     });

    //     // fetchUser();
    // }, [user]);



    const options = {
        title: 'Title',
        message: 'Message',
        buttons: [
            {
                label: 'Yes',
                // onClick: () => alert('Click Yes')
            },
            {
                label: 'No',
                // onClick: () => alert('Click No')
            }
        ],
        childrenElement: () => <div>Hi</div>,
        customUI: ({ onClose }) => <div>Hmmm.... are you sure about the stocks?</div>,
        closeOnEscape: true,
        closeOnClickOutside: true,
        willUnmount: () => { },
        afterClose: () => { },
        onKeypressEscape: () => { },
        overlayClassName: "overlay-custom-class-name"
    };

    // useEffect(() => {
    //     sayHello();
    // },[]);

    // function sayHello() {
    //     Axios.get('http://localhost:3001/checkUser').then((response) => {
    //         setUser(response);
    //         console.log(response)
    //         //console.log(response)
    //     });
    //     // const fullResponse =  (fetch("http://localhost:3001/checkUser"));
    //     // const responseJson =  fullResponse.json();
    //     // setUser(responseJson);
    //     // confirmAlert(options);

    // }

    const useStyles = makeStyles((theme) => ({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }));

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const notify = () => {
        store.addNotification({
            title: "Warning",
            message: "No such path found",
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

    const myOptions = ["dashboard", "feedback", "search", "inventory", "sell"];


    const searchLocation = () => {
        if (myText) {
            if (myText == "dashboard" || myText == "feedback" || myText == "search" || myText == "inventory" || myText == "sell") {
                history.push(myText)
            }
            else {
                setOpen(false)
                notify();
            }
        }
    }

    const [myLocation, setmyLocation] = useState();

    var myText;

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchLocation();
        }
    }

    const [myHeight, setMyHeight] = useState();
    useEffect(()=>{
        setMyHeight(localStorage.cardHeight);
    })

    // useEffect(() => {
    //     if (window.screen.width <= 1000) {
    //         handleClickOpen2();
    //     }
    // });

    const [open2, setOpen2] = useState(false);

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        history.push("/Inventory")
        setOpen2(false);
    };

    const [myCardtodoHeight, setCardtodoMyHeight] = useState();

    useEffect(()=>{
        setCardtodoMyHeight(localStorage.cardHeight + "px");
    })

    return (
        <div style={{ height: '100vh', minWidth: '100vw', backgroundColor: "#e8eff3", overflow: "hidden"}}>
            <HomepageNavbar></HomepageNavbar>

            <Dialog
                open={open2}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Is this a mobile?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Dashboard is advised to be used on desktop!
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose2} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog maxWidth={maxWidth} fullWidth={fullWidth} open={open} onClose={handleClose} style={{ marginBottom: "300px" }}>

                <DialogContentText style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "1%"
                }}>

                    <Hint options={myOptions}>
                        <input
                            className="shadow"
                            type="text"
                            autoFocus
                            placeholder="Search"
                            onKeyDown={handleKeyDown}
                            onChange={(event) => (myText = (event.target.value))}
                            style={{
                                margin: "1%", border: "none", borderRadius: "3px", outline: "none", padding: "2%", width: "60vw", boxShadow: "0 6.7px 5.3px rgba(0, 0, 0, 0.044), 0 22.3px 17.9px rgba(0, 0, 0, 0.066),0 100px 80px rgba(0, 0, 0, 0.02)"
                            }}
                        />
                    </Hint>
                    <Button onClick={searchLocation} style={{ position: "absolute", marginLeft: "55vw", marginTop: "30px", backgroundColor: "transparent" }}><Icon.Search size={20}></Icon.Search></Button>

                    {/* <TextField
                        type="text"
                        autoFocus
                        onKeyDown={handleKeyDown}
                        onChange={(event) => (myText = (event.target.value))}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton style={{ backgroundColor: 'transparent' }} onClick={searchLocation}>
                                        <Icon.Search></Icon.Search>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        placeholder="Search"
                        style={{ margin: "1%", border: "1px solid grey", borderRadius: "3px", padding: "2%", minWidth: "95%" }}
                    /> */}
                </DialogContentText>
            </Dialog>

            <Container style={{ height: '95vh', minWidth: '100vw', backgroundColor: "", position: "absolute", bottom: 0, overflow: "hidden" }}>

                <div style={{ position: "fixed", bottom: "10px", right: "10px", zIndex: "999" }} className="d-none d-md-block">
                    <Fab style={{ backgroundColor: "#01bf71", display: "flex", alignItems: "center", flexWrap: "center" }} onClick={() => handleEventReset()}>
                        <span style={{ display: "flex", marginRight: "30px", marginTop: "2px", justifyContent: "center" }}><AddIcon ></AddIcon></span>
                    </Fab>
                </div>

                {/*<div style={{ position: "absolute", bottom: "3%", right: "6%", zIndex: "999" }}>
                    <Fab style={{ backgroundColor: "#01bf71", display: "flex", alignItems: "center", flexWrap: "center" }}>
                        <span style={{ display: "flex", marginRight: "30px", marginTop: "2px", justifyContent: "center" }} onClick={() => handleClickOpen()}><Icon.Search size={20}></Icon.Search></span>
                    </Fab>

                </div>*/}

                <Row style={{ height: '100vh', minWidth: '100vw', backgroundColor: "#e8eff3", overflow: "auto", padding:"30px", paddingTop:"40px" }}>
                    <Draggable bounds="parent" defaultPosition={{ x: myCard1X, y: myCard1Y }} onStop={handleEvent}>
                        <Col style={{ backgroundColor: "", height: "70%" }} className="col-lg-4 p-2">
                            <Card style={{ height:"100%" }} className="box handle card mb-4 p-1 shadow bg-white rounded">
                                <Card className="box handle shadow p-1 mb-5 bg-white rounded">
                                    <Card.Body>
                                        <Card.Title>
                                            <Card.Link href="Inventory"><Icon.Plus color="#01bf71" size={36}></Icon.Plus></Card.Link>  Manage inventory</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                        <Card.Text></Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card.Body style={{ height:"100%", overflow: "auto" }}>
                                    <Card.Text>
                                        <DashboardDisplayMedicine></DashboardDisplayMedicine>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Draggable>

                    <Draggable bounds="parent" defaultPosition={{ x: myCard2X, y: myCard2Y }} onDrag={handleEvent2}>
                        <Col style={{ backgroundColor: "", height: "70%" }} className="col-lg-5 p-2 d-none d-md-block">
                            <Card style={{ height:"100%" }} className="box handle card mb-4 p-1 shadow bg-white rounded">
                                <Card className="box handle shadow p-1 mb-5 bg-white rounded">
                                    <Card.Body>
                                        <Card.Title>
                                            <Icon.CreditCard color="#01bf71" size={30}></Icon.CreditCard>  Recent sales</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                        <Card.Text></Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card.Body style={{ height:"100%", overflow: "auto" }}>
                                    <Chart legendPosition="bottom" />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Draggable>

                    <Draggable bounds="parent" handle=".handle" defaultPosition={{ x: myCard3X, y: myCard3Y }} onDrag={handleEvent3}>
                        <Col style={{ backgroundColor: "", height: myCardtodoHeight, }} className="col-lg-3 p-2 " >

                            <ResizableBox onResizeStop={handleSize} height={myCardHeight} minConstraints={[500, 300]} maxConstraints={[500, 600]} style={{ maxHeight: "60vh",}} className="box card p-1 shadow bg-white rounded">

                                <Card className="box handle shadow p-1 mb-5 bg-white rounded">
                                    <Card.Body>
                                        <Card.Title>
                                            <Icon.ListCheck color="#01bf71" size={30}></Icon.ListCheck>   Notes</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                        <Card.Text></Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card.Body style={{ overflow: "auto" }}>
                                    <TodoList></TodoList>
                                </Card.Body>

                            </ResizableBox>
                        </Col>
                    </Draggable>

                    <Draggable bounds="parent" defaultPosition={{ x: myCard4X, y: myCard4Y }} onStop={handleEvent4}>
                        <div style={{ backgroundColor: "", height: "10%", margin:"10px" }} className="d-none d-md-block">
                            <Card style={{ backgroundColor: "black" }} className="box handle card mb-4 shadow rounded">
                                <Card.Body style={{}}>
                                    <Card.Text>
                                        <Card.Link href="Sell"> <Icon.BagPlusFill color="#01bf71" size={30}></Icon.BagPlusFill> </Card.Link>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Draggable>

                    <Draggable bounds="parent" defaultPosition={{ x: myCard5X, y: myCard5Y }} onStop={handleEvent5}>
                        <div style={{ backgroundColor: "", height: "10%", margin: "10px"  }} className="d-none d-md-block">
                            <Card style={{ backgroundColor: "#01bf71" }} className="box handle card mb-4 shadow rounded">
                                <Card.Body style={{}}>
                                    <Card.Text>
                                        <Card.Link href="Trade"> <Icon.Shop color="black" size={30}></Icon.Shop> </Card.Link>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Draggable>

                </Row>

            </Container >
        </div>
    )
}

export default Dashboard



