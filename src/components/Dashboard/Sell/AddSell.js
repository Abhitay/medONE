import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import { Card } from '@material-ui/core';
import { Col, Row } from 'react-bootstrap';
import '../pages/Sell.css';
import { confirmAlert } from 'react-confirm-alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


export default function Sell({ setMyChange, setEmail }) {
    const [Brandname, setBrandname] = useState("");
    const [Manufacturer, setManufacturer] = useState("");
    const [ItemNumber, setItemNumber] = useState("");
    const [custEmail, setcustEmail] = useState("");
    const [sellDate, setsellDate] = useState(new Date());
    const [inventoryList, setinventoryList] = useState([]);
    const [sellinventoryList, setsellinventoryList] = useState([]);
    const [sellinventorymanList, setsellinventorymanList] = useState([]);
    const [myError, setMyError] = useState();
    const [value, setValue] = useState(sellinventoryList[0]);
    const [inputValue, setInputValue] = useState('');


    Axios.defaults.withCredentials = true;

    useEffect(() => {
        if (myError) {
            confirmAlert(options);
        }
    }, [myError]);

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
        customUI: ({ onClose }) => <div>{myError}</div>,
        closeOnEscape: true,
        closeOnClickOutside: true,
        willUnmount: () => { },
        afterClose: () => { },
        onKeypressEscape: () => { },
        overlayClassName: "overlay-custom-class-name"
    };


    useEffect(() => {
        async function fetchUser() {
            const fullResponse = await (fetch("http://localhost:3001/getinventory", { credentials: "include" }));
            const responseJson = await fullResponse.json();
            setsellinventoryList(responseJson);
        }
        fetchUser();
        // console.log(sellinventoryList);
        setsellDate(moment().format("YYYY-MM-DD"))
    });



    const SellUpdate = () => {
        setMyError(null);
        let r = Math.random().toString(36).substring(7);
        //console.log("here2")
        //console.log("Brand: ",{Brandname});
        //console.log("Manufacturer: ",{Manufacturer});
        setEmail(custEmail)
        Axios.post('http://localhost:3001/sellcust', {
            Brandname: Brandname,
            Manufacturer: Manufacturer,
            Stock: ItemNumber,
            customerEmail: custEmail,
            SaleDate: sellDate,

        }).then((response) => {
            setMyChange(r)
            // setEmail(custEmail)
            // console.log("sellcust");
            if (response.data) {
                setMyError(response.data);
            }

            if (response.data == "Values Updated!") {
                
            }


        });
    };

    const theme = createMuiTheme({
        palette: {
            primary: {
                main:"#808080"
            },
        },
    });

    const sellmanufac = (e) => {
        console.log(e.target.value)
        Axios.post('http://localhost:3001/getBrandandManufacturer1', {
            Brandname: e.target.value
        }).then(() => {
            //console.log("Success!");
            Axios.get('http://localhost:3001/getBrandandManufacturer').then((response) => {
                setsellinventorymanList(response.data);
                //console.log("Update",response)
                Axios.get('http://localhost:3001/getBrandname2').then((response) => {
                    setBrandname(response.data)
                    //console.log("UpdatejtBrandname",response)
                    //console.log("UpdatejtBrandname",Brandname)
                    Axios.get('http://localhost:3001/getBrandname3').then((response) => {
                        setManufacturer(response.data)
                        //console.log("UpdatejtManu",response)

                    });
                });
            });

        });

    }

    // useEffect(() => {
    //     if (inputValue != '' && value != undefined) {
    //         Axios.post('http://localhost:3001/getBrandandManufacturer1', {
    //             Brandname: value.Brandname
    //         }).then(() => {
    //             //console.log("Success!");
    //             Axios.get('http://localhost:3001/getBrandandManufacturer').then((response) => {
    //                 setsellinventorymanList(response.data);
    //                 //console.log("Update",response)
    //                 Axios.get('http://localhost:3001/getBrandname2').then((response) => {
    //                     setBrandname(response.data)
    //                     //console.log("UpdatejtBrandname",response)
    //                     //console.log("UpdatejtBrandname",Brandname)
    //                     Axios.get('http://localhost:3001/getBrandname3').then((response) => {
    //                         setManufacturer(response.data)
    //                         //console.log("UpdatejtManu",response)

    //                     });
    //                 });
    //             });

    //         });
    //     }
    // })



    return (
        <div style={{ backgroundColor: "", alignItems: "center", maxWidth: "100%" }} className="p-2 sellCard">


            <Card className="card mb-4 p-4 shadow bg-white rounded" style={{width:"100%"}}>

                <div >
                    <Row>
                        <Col>
                            
                            <select className="inputfield" name="Brand Name" onChange={sellmanufac}>
                                <option value=''>Select Brand Name</option>
                                {sellinventoryList.map((e, key) => {
                                    return <option value={e.Brandname}>{e.Brandname}</option>;
                                })}
                            </select>
                            
                        </Col>
                        <Col>
                            <select className="inputfield" name="Manufacturer" onChange={(event) => { setManufacturer(event.target.value); }}>
                                <option value=''>Select Manufacturer</option>
                                {sellinventorymanList.map((e, key) => {
                                    return <option value={e.Manufacturer}>{e.Manufacturer}</option>;
                                })}
                            </select>
                        </Col>
                    </Row>

                    <Row>
                        <Col >
                            <input className="inputfield" type="text" placeholder="Item Number" onChange={(event) => { setItemNumber(event.target.value); }} />
                        </Col>
                        <Col>
                            <input className="inputfield" type="text" placeholder="Customer Email" onChange={(event) => { setcustEmail(event.target.value); }} />
                        </Col>
                    </Row>

                    <Row style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: ""
                    }}>
                        <button className="SellmyButton" onClick={SellUpdate}>Add</button>
                    </Row>
                </div>
            </Card>

            <div>
            </div>




        </div>
    )

}


