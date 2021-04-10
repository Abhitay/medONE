import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { Card, Col, Container, Dropdown, Row } from 'react-bootstrap';
import { shadows } from '@material-ui/system';
import { Paper } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';
import * as Icons from 'react-bootstrap-icons';
import { makeStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DisplayMedicine({ myChange, setIsDeleted, setDeleteData }) {
    const [inventoryList, setinventoryList] = useState([])

    useEffect(() => {
        console.log("adkbnawd");
        console.log(myChange);
    })

    useEffect(() => {
        console.log("epic")
        async function fetchUser() {
            const fullResponse = await (fetch("http://localhost:3001/gettable", { credentials: "include" }));
            const responseJson = await fullResponse.json();
            setinventoryList(responseJson);
            if(responseJson == null){
                setinventoryList([]);
            }
            // console.log("called", inventoryList);
        }
        fetchUser();
    }, [myChange]);

    const columns = [
        {
            title: "Brand Name",
            field: "Brandname",
        },
        {
            title: "Manufacturer",
            field: "Manufacturer",
        },
        {
            title: "Category",
            field: "Category",
        },
        {
            title: "Stock",
            field: "Stock",
        },
        {
            title: "Minimum Stock",
            field: "minStock",
        },
        {
            title: "Price(₹)",
            field: "Price",
        },
        {
            title: "Expiry date",
            field: "ExpDate",
            type: 'date'
        }
    ];

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

    const useStyles = makeStyles(theme => ({
        root: {
            "& .MuiButtonBase-root": {
                backgroundColor: "transparent",
            },
            "& .MuiIconButton-label": {
                backgroundColor: "",
                borderRadius: "50%",
                height: "30px",
                width: "30px",
                marginLeft: "0px",
                alignItems: "center"
            },
        }
    }));

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [myData, setMyData] = useState(
        { 
            Brandname: null,
            Manufacturer: null,
        }
        );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        setOpen(false);
        setIsDeleted("Deleted")
        setDeleteData(myData)
    }

    return (
        <div>
            <Card style={{ backgroundColor: "", overflowY: "scroll", overflowX: "hidden", maxHeight: "100vh" }} className="box handle shadow p-1 mb-5 rounded">
                <div className={classes.root}>
                    <MuiThemeProvider theme={theme}>
                        <MaterialTable title="Inventory" style={{ border: "none", padding: "2vw" }}
                            data={inventoryList}
                            columns={columns}
                            components={{
                                Container: props => <Paper {...props} elevation={0} />
                            }}
                            options={{
                                search: true,
                                paging: true,
                                pageSize: 7,
                                pageSizeOptions: false,
                                // filtering: true,
                                exportButton: true,
                                actionsColumnIndex: -1
                                // grouping: true
                                // sorting: false,
                            }}
                            actions={[
                                {
                                    icon: () => <Icons.ArchiveFill></Icons.ArchiveFill>,
                                    tooltip: "Delete",
                                    onClick: (event, rowData) => (
                                        console.log(rowData),
                                        handleClickOpen(),
                                        setMyData(rowData)
                                        // setIsDeleted("Deleted"),
                                        // setDeleteData(rowData)
                                    )
                                }
                            ]}
                        />
                    </MuiThemeProvider>
                </div>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Want to delete?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete {JSON.stringify(myData.Brandname)}, {JSON.stringify(myData.Manufacturer)}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        No
                    </Button>
                    <Button onClick={handleAgree} style={{ color: "#01bf71" }} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
