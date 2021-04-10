import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from "axios";
import { Card, Col, Container, Dropdown, Row } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTable } from 'react-table';
import ReactTable from "react-table";
import { store } from 'react-notifications-component';
import { createMuiTheme, ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core";

export default function DisplaySell({ myChange, setIsDeleted, setDeleteData, mail, setUpdate, sellClick, setCanSell }) {


  var rows = [];
  const TAX_RATE = 0.05;
  const [inventoryList, setinventoryList] = useState([]);
  const [invoiceSubtotal, setinvoiceSubtotal] = useState([]);
  const [invoiceTaxes, setinvoiceTaxes] = useState([]);
  const [invoiceTotal, setinvoiceTotal] = useState([]);
  Axios.defaults.withCredentials = true;



  function priceRow(Quantity, unit) {
    return Quantity * unit;
  }
  function createRow(Brandname, Quantity, unit) {
    const price = priceRow(Quantity, unit);
    return { Brandname, Quantity, unit, price };
  }

  useEffect(() => {
    //console.log("Display Sell",rows)
    async function fetchUser() {
      const fullResponse = await (fetch("http://localhost:3001/getselldatatable", { credentials: "include" }));
      const responseJson = await fullResponse.json();
      setinventoryList(responseJson);
      // console.log("transferget");
      // console.log("inventory list in display",inventoryList)

    }
    fetchUser();
    // if(mail != undefined){
    //   Axios.post('http://localhost:3001/getselldatatable', {
    //     custMail: mail
    //   }).then((res) => {
    //     setinventoryList(res.data);
    //     console.log(mail);
    //     console.log(res.data);
    //   })
    // }
    console.log(mail);

  }, [myChange]);

  useEffect(() => {
    rows = inventoryList.map((e, key) => {
      return createRow(e.Brandname, Number(e.NumberItems), Number(e.Price))
    });
    //console.log("Display Sell",rows)

    setinvoiceSubtotal(rows.reduce((totalsum, row) => totalsum + row.price, 0));
    setinvoiceTaxes(TAX_RATE * invoiceSubtotal);
    setinvoiceTotal(invoiceTaxes + invoiceSubtotal);
    // console.log("invoiceSubtotal", invoiceSubtotal)
    // console.log("invoiceTaxes", invoiceTaxes)
    // console.log("invoiceTotal", invoiceTotal)
    // console.log("rows", rows)
  })

  const columns = [
    {
      title: "Brand Name",
      field: "Brandname",
      editable: 'never'
    },
    {
      title: "Manufacturer",
      field: "Manufacturer",
      editable: 'never'
    },
    {
      title: "NumberItems",
      field: "NumberItems",
    },
    {
      title: "Price Per Unit",
      field: "Price",
      editable: 'never'
    },
    {
      title: "Price",
      field: "PriceTot",
      editable: 'never'
    }
  ];

  const [open, setOpen] = useState(false);

  const [myData2, setMyData2] = useState(
    {
      Brandname: null,
      Manufacturer: null,
    }
  );

  const handleClickOpen2 = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    setIsDeleted("Deleted")
    setDeleteData(myData2)
  };

  const [mydata, mysetData] = useState();

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  const [open3, setOpen3] = useState(false);

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {

    setOpen3(false);
  };

  const handleSell = () => {
    setCanSell(true);
    setOpen3(false);
  };

  useEffect(() => {
    if (invoiceTotal > 0) {
      handleClickOpen3();
    }
    // else if (invoiceTotal <= 0) {
    //   store.addNotification({
    //     title: "Warning",
    //     message: "Add something first!",
    //     type: "success",
    //     container: "bottom-right",
    //     insert: "top",
    //     animationIn: ["animated", "fadeIn"],
    //     animationOut: ["animated", "fadeOut"],

    //     dismiss: {
    //       duration: 2000,
    //       showIcon: true,
    //     }
    //   })
    // }
  }, [sellClick]);

  const [orderNum, setOrderNum] = useState();

  useEffect(() => {
    setOrderNum(Math.floor(Math.random() * (999 - 100 + 1) + 100));
  }, []);

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
      <Row style={{ backgroundColor: "", height: "100%" }}>
        <Col style={{ height: "100%" }}>
          <Card style={{ backgroundColor: "", overflowY: "scroll", overflowX: "hidden", height: "100%" }} className="box handle p-1 mb-5 rounded">
            <div className={classes.root}>
              <MuiThemeProvider theme={theme}>
                <MaterialTable title={null} style={{ border: "none", padding: "2vw" }}
                  data={inventoryList}

                  components={{
                    Container: props => <Paper {...props} elevation={0} />
                  }}
                  columns={columns}
                  options={{
                    search: false,
                    paging: true,
                    pageSize: 8,
                    pageSizeOptions: false,
                    //filtering: true,
                    exportButton: false,
                    actionsColumnIndex: -1
                    //header:false,
                    //grouping: true
                  }}
                  editable={{

                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          // const dataUpdate = [...data];
                          // const index = oldData.tableData.id;
                          // dataUpdate[index] = newData;
                          // setData([...dataUpdate]);

                          console.log(newData)
                          setUpdate(newData)

                          resolve();
                        }, 1000)
                      }),

                  }}
                  actions={[
                    {
                      icon: () => <Icons.ArchiveFill></Icons.ArchiveFill>,
                      tooltip: "Delete",
                      onClick: (event, rowData) => (
                        console.log(rowData),
                        handleClickOpen2(),
                        setMyData2(rowData)
                        // setIsDeleted("Deleted"),
                        // setDeleteData(rowData)
                      )
                    }
                  ]}
                />
              </MuiThemeProvider>
            </div>
            <Dialog
              open={open3}
              onClose={handleClose3}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <h3 style={{ fontWeight: "bold" }}>Order #{orderNum}</h3>

                  <Card className="p-4 " style={{ margin: "2%" }}>

                    <Row style={{ display: "flex", justifyContent: "space-between", width: "50%", left: "50%" }}>
                      <h6>
                        From: medONE
                      </h6>
                      <h6>
                        To: {mail}
                      </h6>
                    </Row>
                    <Row>
                      <h6>Date: {date}-{month}-{year}</h6>
                    </Row>
                  </Card>

                  <Card className="p-3 " style={{ margin: "2%" }}>

                    <Row>
                      <Col className="p-4">

                        <Row>
                          <h5>SubTotal: {invoiceSubtotal}</h5>
                        </Row>

                        <Row>

                          <h6>Taxes: {Math.round((invoiceTaxes + Number.EPSILON) * 200) / 200}</h6>
                        </Row>

                        <Row style={{ display: "flex", justifyContent: "center" }}>
                          <h7>——————————</h7>
                        </Row>

                        <Row>
                          <h4>Total: {invoiceTotal}</h4>
                        </Row>
                      </Col>

                    </Row>
                  </Card>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose3}>
                  Cancel
          </Button>
                <Button onClick={handleSell} style={{ color: "#01bf71" }}>
                  Sell
          </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Want to delete?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete {JSON.stringify(myData2.Brandname)}, {JSON.stringify(myData2.Manufacturer)}?
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
            {/*<div style={{ borderTop: "0.5px solid grey" }} className="p-4">
              <h3 style={{ fontWeight: "bold" }}>Order #253</h3>

              <Card className="p-4 " style={{ margin: "2%" }}>

                <Row style={{ display: "flex", justifyContent: "space-between", width: "50%", left: "50%" }}>
                  <h6>
                    From: <br></br>
                medONE
                </h6>
                  <h6>
                    To: <br></br>
                    {mail}
                  </h6>
                </Row>
                <Row>
                  <h6>Date: {date}-{month}-{year}</h6>
                </Row>
              </Card>

              <Card className="p-3 " style={{ margin: "2%" }}>

                <Row>
                  <Col className="p-4">

                    <Row>
                      <h5>SubTotal: {invoiceSubtotal}</h5>
                    </Row>

                    <Row>

                      <h6>Taxes: {Math.round((invoiceTaxes + Number.EPSILON) * 200) / 200}</h6>
                    </Row>

                    <Row>
                      <h7>——————————————</h7>
                    </Row>

                    <Row>
                      <h4>Total: {invoiceTotal}</h4>
                    </Row>
                  </Col>

                </Row>
              </Card>
              </div>*/}
          </Card>
        </Col>
      </Row>
    </div >
  )
}