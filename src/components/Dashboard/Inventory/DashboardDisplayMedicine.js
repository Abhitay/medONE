import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { Card, Col, Container, Dropdown, Row } from 'react-bootstrap';
import { shadows } from '@material-ui/system';
import { Paper } from '@material-ui/core';
import { TruckFlatbed } from 'react-bootstrap-icons';
import { createMuiTheme, ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core";


export default function DashboardDisplayMedicine() {
    const [inventoryList, setinventoryList] = useState([])

    useEffect(() => {
        async function fetchUser() {
            const fullResponse = await (fetch("http://localhost:3001/gettable", { credentials: "include" }));
            const responseJson = await fullResponse.json();
            setinventoryList(responseJson);
            // console.log("called", inventoryList);
        }
        fetchUser();
    }, []);

    const columns = [
        {
            title: "Brand Name",
            field: "Brandname",
        },
        {
            title: "Stock",
            field: "Stock",
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
            <Card style={{ backgroundColor: "", overflowY: "scroll", overflowX: "hidden", maxHeight: "100vh", overflow: "hidden" }} className="box handle shadow p-1 mb-5 rounded">
                <div>
                    <div className={classes.root}>
                        <MuiThemeProvider theme={theme}>
                            <MaterialTable title={null} style={{ border: "none", padding: "2vw" }}
                                data={inventoryList}
                                columns={columns}
                                options={{
                                    search: true,
                                    paging: false,
                                    pageSize: 10,
                                    pageSizeOptions: false,
                                    // filtering: true,
                                    // exportButton: true,
                                    // grouping: true
                                    sorting: false,

                                }}
                            />
                        </MuiThemeProvider>
                    </div>
                </div>
            </Card>

        </div>
    )
}
