import React, { useEffect, useState } from 'react'
import Axios from "axios";
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core";

export default function LessStock() {
    const [MinOrder, setMinOrder] = useState([]);
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get('http://localhost:3001/getminorderinv').then((response) => {
            setMinOrder(response.data)
            console.log("getminorderinv", response.data)
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
            title: "Minimum Stock",
            field: "minStock",
        },
        {
            title: "Price(₹)",
            field: "Price",
        },

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
            }
        }
    }));

    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <MaterialTable title="Low stock"
                        data={MinOrder}
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
                            exportButton: true,
                            //header:false,

                            //    grouping: true

                        }}

                    />
                </MuiThemeProvider>
            </div>
        </div>
    )
}
