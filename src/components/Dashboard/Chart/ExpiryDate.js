import React, { useEffect, useState } from 'react'
import Axios from "axios";
import MaterialTable from 'material-table'
import moment from "moment";
import { Paper } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core";

export default function ExpiryDate() {
    const [ExpiryDate, setExpiryDate] = useState([]);
    const today = moment().format("YYYY-MM-DD").toString();
    Axios.defaults.withCredentials = true;


    useEffect(() => {

        Axios.post('http://localhost:3001/getdate1', {
            day1: today,
        }).then(() => {
            Axios.get('http://localhost:3001/getexpirydate').then((response) => {
                setExpiryDate(response.data)
                // console.log("getminorderinv", response.data);
            });
        });
    }, []);
    const columns = [
        {
            title: "Brand Name",
            field: "Brandname",
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
            title: "Price(₹)",
            field: "Price",
        },
        {
            title: "Expiry date",
            field: "ExpDate",
            type: "date"
        }

    ]

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
            }
        }
    }));

    const classes = useStyles();
    
    return (
        <div style={{width:"100%"}}>
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <MaterialTable title="Expired"
                        components={{
                            Container: props => <Paper {...props} elevation={0} />
                        }}
                        data={ExpiryDate}
                        columns={columns}
                        style={{width:"100%"}}
                        options={{
                            search: true,
                            paging: true,
                            //filtering: true,
                            exportButton: true,
                            pageSizeOptions: []
                            //    grouping: true

                        }}

                    />
                </MuiThemeProvider>
            </div>
        </div>
    )
}
