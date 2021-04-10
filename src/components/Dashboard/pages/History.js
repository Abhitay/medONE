import React, { useEffect, useState } from 'react';
import HomepageNavbar from '../Navbar/HomepageNavbar';
import Axios from "axios";
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import { createMuiTheme, ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';
import { Card, Container, Row, Col } from "react-bootstrap";
import Chart1 from '../Chart/Chart1';

export default function History() {
    Axios.defaults.withCredentials = true;
    const [history, setHistory] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/getHistory').then((response) => {
            setHistory(response.data);
        });
    }, []);

    const [chartvalues, setchartvalues] = useState([])
    const [labelchartvalues, setlabelchartvalues] = useState([])

    const [chartvalues2, setchartvalues2] = useState([])
    const [labelchartvalues2, setlabelchartvalues2] = useState([])
    useEffect(() => {
        Axios.post('http://localhost:3001/allHistoryChart').then((response) => {
            setchartvalues2(response.data)
            setlabelchartvalues2(response.data.map((number) => {
                return number.SaleDate;
            }));

        });

    }, []);

    useEffect(() => {
        Axios.post('http://localhost:3001/HistoryChart').then((response) => {
            setchartvalues(response.data);

            setlabelchartvalues(response.data.map((number) => {
                return number.SaleDate;
            }));

        });


    }, []);

    const columns = [
        {
            title: "Customer Email",
            field: "CustomerEmail",
            defaultGroupOrder: 0,
        },

        {
            title: "Items",
            field: "NumberItems",
        },
        {
            title: "Date",
            field: "SaleDate",
            type: "date"
        },
        {
            title: "Name",
            field: "Brandname",
        },
    ];

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
        <div className="History" style={{ overflowX: "hidden", backgroundColor:"#e8eff3" }}>
            <HomepageNavbar></HomepageNavbar>
            <Container style={{ marginLeft: "0" }}>
                <Row style={{ width: "100vw", display: "flex", justifyContent: "center", backgroundColor: "#dee7ed" }} className="p-4">
                    <Chart1 legendPosition="bottom" chartvalues={chartvalues} labelchartvalues={labelchartvalues} labelchartvalues2={labelchartvalues2} chartvalues2={chartvalues2}></Chart1>
                </Row>
                <Row style={{ width: "100vw", display:"flex", justifyContent:"center", backgroundColor:"white" }}>
                    <Col style={{justifyContent: "center", backgroundColor:"white" }}>
                        <div className={classes.root}>
                            <MuiThemeProvider theme={theme}>
                                <MaterialTable title="History"
                                    data={history}
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
                                        grouping: true,
                                        //header:false,

                                        //    grouping: true

                                    }}

                                />
                            </MuiThemeProvider>
                        </div></Col>

                </Row>
            </Container>

        </div>
    )
}
