import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as CgIcons from 'react-icons/cg';
import * as VscIcons from 'react-icons/vsc';
import * as GiIcons from 'react-icons/gi';
import { Link } from 'react-router-dom';
import './HomepageNavbarStyle.css'
import { IconContext } from 'react-icons';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { store } from 'react-notifications-component';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Hint } from 'react-autocomplete-hint';
import { DialogContentText } from '@material-ui/core';
import { Card, Container, Row, Col } from "react-bootstrap";

// import 'tachyons';

function HomepageNavbar() {
    
    const history = useHistory();

    Axios.defaults.withCredentials = true;
    const signOut = () => {
        Axios.post("http://localhost:3001/deleteResUser", {
        }).then(() => {
            localStorage.animate = "sign out";
            
            localStorage.card1X = 2;
            localStorage.card1Y = 2;

            localStorage.card2X = 2;
            localStorage.card2Y = 2;

            localStorage.card3X = 2;
            localStorage.card3Y = 2;

            localStorage.card4X = 94;
            localStorage.card4Y = 81;

            localStorage.card5X = 112;
            localStorage.card5Y = 81;

            localStorage.cardHeight = 400;

            localStorage.firstVisit = "false";
        }).then(history.push("Home"));
    };

    const HomepageSidebar = [
        {
            title: 'Dashboard',
            path: '/dashboard',
            icon: <Icon.HouseDoorFill></Icon.HouseDoorFill>,
        },
        {
            title: 'Profile',
            path: '/Profile',
            icon: <CgIcons.CgProfile />,
        },
        {
            title: 'Trade',
            path: '/Trade',
            icon: <Icon.Shop></Icon.Shop>,
        },
        {
            title: 'Inventory',
            path: '/Inventory',
            icon: <FaIcons.FaListOl />,
        },
        {
            title: 'Sell',
            path: '/Sell',
            icon: <Icon.BagPlusFill></Icon.BagPlusFill>,
        },
        {
            title: 'History',
            path: '/History',
            icon: <Icon.ClockHistory></Icon.ClockHistory>,
        },
    ]
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

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

    const myOptions = ["dashboard", "profile", "trade", "inventory", "sell", "history"];


    const searchLocation = () => {
        if (myLocation) {
            if (myLocation == "dashboard" || myLocation == "profile" || myLocation == "trade" || myLocation == "inventory" || myLocation == "sell" || myLocation == "history") {
                history.push(myLocation)
            }
            else {
                setOpen(false)
                notify();
            }
        }
    }

    const [myLocation, setmyLocation] = useState();

    const modifyValue = (value: string) => value.toLowerCase();


    var myText;

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchLocation();
        }
    }

    return (
        <>
            <IconContext.Provider value={{ color: 'white' }}>
                <div className='navbar' >
                    <Link to="#" className='menu-link grow f2'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <span className='menu-link grow f2' style={{cursor:"pointer"}} onClick={() => handleClickOpen()}>
                        <Icon.Search size={25} color="white"></Icon.Search>
                    </span>
                </div>

                <Dialog
                    maxWidth={maxWidth}
                    fullWidth={fullWidth}
                    open={open}
                    onClose={handleClose}
                    style={{ marginBottom: "40vh" }}
                    PaperProps={{
                        style: {
                            boxShadow: 'none',
                            backgroundColor: "transparent",
                        },
                    }}
                >

                    <DialogContentText style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "1%",
                    }}>
                        <Row style={{width:"100%", overflow:"hidden", display:"flex", justifyContent:"center"}}>

                            <Hint options={myOptions} valueModifier={modifyValue} style={{ minWidth: "100%", }}>
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Search"
                                    onKeyDown={handleKeyDown}
                                    onChange={e => setmyLocation(modifyValue(e.target.value))}
                                    style={{
                                        border: "none", borderRadius: "10px", width: "100%", overflow: "hidden", outline: "none", padding: "25px",
                                    }}
                                />
                            </Hint>
                            <Button onClick={searchLocation} style={{ position: "absolute",right: "0", zIndex: "1", border: "none", padding: "25px", marginRight:"20px", backgroundColor:"transparent" }}><Icon.Search size={25}></Icon.Search></Button>
                        </Row>
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

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items ' onClick={showSidebar}>
                        <li className='navbar-toggle '  >
                            <Link to="#" className='menu-link dim '>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {HomepageSidebar.map((item, index) => {

                            return (
                                <li key={index} className='nav-text grow ' >
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })};
                        <li className='nav-text grow '>
                            <Link onClick={signOut}><span style={{ marginLeft: "0px" }}><button><Icon.BoxArrowDownRight style={{ marginRight: "5px" }}></Icon.BoxArrowDownRight> Sign out</button></span></Link>
                        </li>

                    </ul>
                </nav>

            </IconContext.Provider>
        </>
    )
}

export default HomepageNavbar
