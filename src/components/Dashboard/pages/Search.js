import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import HomepageNavbar from "../Navbar/HomepageNavbar";
import { useHistory } from "react-router-dom";
import emailjs from 'emailjs-com';
import Axios from "axios";
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import { IconContext } from 'react-icons/lib';
import * as Icons from 'react-bootstrap-icons';
import Icon from '@material-ui/core/Icon';
import { Alert } from 'react-bootstrap';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { store } from 'react-notifications-component';
import { createMuiTheme, ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';

const Search = (props) => {
    const history = useHistory();

    const [mailDetail, setmailDetail] = useState({});

    const [mailDetailDisplay, setmailDetailDisplay] = useState({ data: {} });

    useEffect(() => {
        // handleClickOpen();
        Axios.post('http://localhost:3001/getName', {

        }).then((res) => {
            setmailDetail({ Name: res.data, Email: props.user });
            console.log(mailDetail);
        });
    }, []);

    useEffect(() => {
        Axios.post('http://localhost:3001/tradeGet', {

        }).then((res) => {
            if (res.data == null) {
                handleClickOpen();
            }
        });
    });

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
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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
    const outsideclick = () => {
        setOpen(false);
        history.push('/dashboard')
    }
    const handleClose = () => {
        localStorage.tradeFirst = "none"
        setOpen(false);
        Axios.post('http://localhost:3001/tradeCheck');
        // console.log(props)

        //uncomment this
        emailjs.send('service_8tz5i76', 'template_ddyitvu', props, 'user_0ku1D7tTUuVvaMwtfYbnT')
          .then(function (response) {
            // console.log('SUCCESS!', response.status, response.text);
          }, function (error) {
            // console.log('FAILED...', error);
          });
    };
    const handledisagree = () => {
        history.push('/dashboard')
        setOpen(false);
    };

    Axios.defaults.withCredentials = true;
    const [trade, setTrade] = useState([]);

    const columns = [
        {
            title: "Pharmacy Name",
            field: "pharmacy_name",
        },

        {
            title: "Brandname",
            field: "Brandname",
            defaultGroupOrder: 0,
        },

        {
            title: "Category",
            field: "Category",
        },

        {
            title: "Price",
            field: "Price",
        },

        {
            title: "Expiry",
            field: "ExpDate",
            type: "date"
        },
    ];

    const useStyles = makeStyles(theme => ({
        root: {
            "& .MuiButtonBase-root": {
                backgroundColor: "transparent",
            },
            "& .MuiIconButton-label": {
                backgroundColor: "transparent",
                borderRadius: "50%",
                height: "30px",
                width: "30px",
                marginLeft: "0px",
                marginTop: "0px",
                alignItems: "center"
            },
            "& .material- icons MuiIcon- root": {
                backgroundColor: "transparent",
                borderRadius: "50%",
                height: "30px",
                width: "30px",
                marginTop: "0px",
                marginLeft: "0px",
                alignItems: "center"
            },
            "& .MuiButtonBase-root MuiIconButton-root": {
                backgroundColor: "transparent",
            },

        }
    }));

    const classes = useStyles();

    useEffect(() => {
        Axios.get('http://localhost:3001/Trade').then((response) => {
            setTrade(response.data);
        });
    }, []);

    let myChange = {
        Email: {},
        Name: {},
        Data: {},
    };

    const [open2, setOpen2] = useState(false);


    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleAgree = () => {
        console.log("change:", mailDetailDisplay);
        //UNCOMMENT THIS:
        emailjs.send('service_8tz5i76', 'template_imksyfd', mailDetailDisplay, 'user_0ku1D7tTUuVvaMwtfYbnT')
        .then(function (response) {
            // console.log('SUCCESS!', response.status, response.text);
            mailNotify();
        }, function (error) {
            // console.log('FAILED...', error);
        })
        setOpen2(false);
    };

    const mailNotify = () => {
        store.addNotification({
            title: "Success",
            message: "Trade requested",
            type: "success",
            container: "bottom-right",
            insert: "top",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],

            dismiss: {
                duration: 2000,
                showIcon: true,
                pauseOnHover: true
            }
        })
    }

    const theme = createMuiTheme({
        // overrides: {
        //     MuiTableSortLabel: {
        //         root: {
        //             color: '#fff',
        //             '&:hover': {
        //                 color: '#bbdefb',
        //             },
        //         },
        //         active: {
        //             color: '#bbdefb',
        //         },
        //     },
        // },
        palette: {
            primary: {
                main: '#01bf71',
            },
            secondary: {
                main: '#01bf71',
            },
        },

    });

    return (
        <div className="Search">
            <HomepageNavbar></HomepageNavbar>
            <div>
                <Dialog onClose={outsideclick} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={outsideclick}>
                        <h3>You are entering <br></br>med<span style={{ marginLeft: "2px", color: "#01bf71" }}>ONE</span> trading</h3>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Welcome to medONE! {props.user}
                        </Typography>
                        <Typography gutterBottom>
                            <tr></tr>
                        </Typography>
                        <Typography gutterBottom>
                            These terms and conditions outline the rules and regulations for the use of medONE's Website.
                        </Typography>
                        <Typography gutterBottom>
                            By accessing this website we assume you accept these terms and conditions. Do not continue to use medONE if you do not agree to take all of the terms and conditions stated on this page.
                        </Typography>
                        <Typography gutterBottom>
                            <br></br>
                        </Typography>
                        <Typography gutterBottom>
                            Cookies
                        </Typography>
                        <Typography gutterBottom>
                            <tr></tr>
                        </Typography>
                        <Typography gutterBottom>
                            We employ the use of cookies. By accessing medONE, you agreed to use cookies in agreement with the medONE's Privacy Policy.
                            Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                        </Typography>
                        <Typography gutterBottom>
                            <br></br>
                        </Typography>
                        <Typography gutterBottom>
                            License
                        </Typography>
                        <Typography gutterBottom>
                            <tr></tr>
                        </Typography>
                        <Typography gutterBottom>
                            Unless otherwise stated, medONE and/or its licensors own the intellectual property rights for all material on medONE. All intellectual property rights are reserved. You may access this from medONE for your own personal use subjected to restrictions set in these terms and conditions.
                        </Typography>
                        <Typography gutterBottom>
                            You must not: <br></br>
                            •	Republish material from medONE <br></br>
                            •	Sell, rent or sub-license material from medONE <br></br>
                            •	Reproduce, duplicate or copy material from medONE <br></br>
                            •	Redistribute content from medONE
                        </Typography>
                        <Typography gutterBottom>
                            <br></br>
                        </Typography>
                        <Typography gutterBottom>
                            Content Liability
                        </Typography>
                        <Typography gutterBottom>
                            <tr></tr>
                        </Typography>
                        <Typography gutterBottom>
                            We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third-party rights
                        </Typography>
                        <Typography gutterBottom>
                            <br></br>
                        </Typography>
                        <Typography gutterBottom>
                            Removal of links from our website
                        </Typography>
                        <Typography gutterBottom>
                            <tr></tr>
                        </Typography>
                        <Typography gutterBottom>
                            If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
                            We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
                        </Typography>
                        <Typography gutterBottom>
                            <br></br>
                        </Typography>
                        <Typography gutterBottom>
                            Disclaimer
                        </Typography>
                        <Typography gutterBottom>
                            <tr></tr>
                        </Typography>
                        <Typography gutterBottom>
                            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will: <br></br><br></br>
                            •	limit or exclude our or your liability for death or personal injury;<br></br>
                            •	limit or exclude our or your liability for fraud or fraudulent misrepresentation;<br></br>
                            •	limit any of our or your liabilities in any way that is not permitted under applicable law; or<br></br>
                            •	exclude any of our or your liabilities that may not be excluded under applicable law.<br></br><br></br>
                            The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty. <br></br><br></br>
                            As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.

                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handledisagree} color="secondary">
                            Disagree
                        </Button>
                        <Button onClick={handleClose}>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div className={classes.root} style={{padding:"10px"}}>
                <MuiThemeProvider theme={theme}>
                    <MaterialTable title="Search"
                        data={trade}
                        components={{
                            Container: props => <Paper {...props} elevation={0} />
                        }}
                        columns={columns}
                        options={{
                            search: true,
                            paging: true,
                            pageSize: 12,
                            pageSizeOptions: [],
                            //filtering: true,
                            exportButton: false,
                            grouping: true,
                            actionsColumnIndex: -1
                            //header:false,

                            //    grouping: true

                        }}
                        actions={[
                            {
                                icon: () => <Icons.EnvelopeFill></Icons.EnvelopeFill>,
                                tooltip: "Send mail",
                                onClick: (event, rowData) => (
                                    myChange = Object.assign({}, mailDetail, { data: rowData }),
                                    // console.log("change:", myChange),
                                    setmailDetailDisplay(myChange),
                                    setOpen2(true)
                                )
                            }
                        ]}
                    // components={{
                    //     Action: props => (
                    //         <Button
                    //             onClick={event => props.action.onClick(event, props.data)}
                    //             color="primary"
                    //             variant="text"
                    //             style={{ textTransform: "none" }}
                    //             size="small"
                    //         >
                    //             Save
                    //         </Button>
                    //     )
                    // }}
                    />
                </MuiThemeProvider>
            </div>
            <Dialog
                open={open2}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle style={{ paddingLeft: "5%", paddingTop: "5%" }} id="alert-dialog-title">{"Want to trade?"}</DialogTitle>
                <DialogContent style={{
                    paddingLeft: "5%"
                }}>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to request a trade of {JSON.stringify(mailDetailDisplay.data.Brandname)}, {JSON.stringify(mailDetailDisplay.data.Manufacturer)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose2}>
                        Disagree
                        </Button>
                    <Button onClick={handleAgree} style={{ color: "#01bf71" }} autoFocus>
                        Agree
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default Search;
