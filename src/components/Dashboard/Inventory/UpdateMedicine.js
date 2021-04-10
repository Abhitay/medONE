import React, { useState, useEffect } from 'react'
import Axios from "axios";
import './AddMedicineStyle.css';
import { Card, Col, Container, Dropdown, Row } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

export default function UpdateMedicine({ setMyChange, myChange }) {
    Axios.defaults.withCredentials = true;
    const [Brandname, setBrandname] = useState("");
    const [Manufacturer, setManufacturer] = useState("");
    const [Stock, setStock] = useState(0);
    const [minStock, setminStock] = useState(0);
    const EmailID = "";
    const [Price, setPrice] = useState(0.0);
    // const [ExpDate, setExpDate] = useState(new Date());
    const [ExpDate, setExpDate] = useState();
    const [inventoryList, setinventoryList] = useState([]);
    const [inventorymanList, setinventorymanList] = useState([]);
    const [myError, setMyError] = useState();

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

    // useEffect(() => {
    //         Axios.get('http://localhost:3001/getinventory').then((response) => {
    //         setinventoryList(response.data);
    //         console.log("Update",response)


    //   });
    // },[]);

    useEffect(() => {
        async function fetchUser() {
            const fullResponse = await (fetch("http://localhost:3001/getinventory", {credentials: "include"}));
            const responseJson = await fullResponse.json();
            setinventoryList(responseJson);
            if(responseJson == null){
                setinventoryList([])
            }
            //   console.log("called",inventoryList);
        }
        fetchUser();
    }, [myChange]);
    const testfunc = () => {
        Axios.get('http://localhost:3001/getinventory').then((response) => {
            setinventoryList(response.data);
            // console.log("called", response)
        });
    };

    const DelMedicineFunction = () => {
        // setMyChange(Stock)
        // console.log("Date", Date)
        setMyError(null);
        let r = Math.random().toString(36).substring(7);

        Axios.post('http://localhost:3001/update', {
            Brandname: Brandname,
            Manufacturer: Manufacturer,
            Stock: Stock,
            minStock: minStock,
            EmailID: EmailID,
            Price: Price,
            ExpDate: ExpDate
        }).then((response) => {
            setMyChange(r)
            if (response.data) {
                setMyError(response.data);
            }
            // console.log("Success!");
        });
    };
    const updatemanufac = (e) => {
        // console.log(Brandname)
        if (e.target.value == "Select Brand Name" || e.target.value == null || e.target.value == undefined || e.target.value == "") {
            // setMyError("");
        }
        else{
            Axios.post('http://localhost:3001/getBrandandManufacturer1', {
                Brandname: e.target.value
                // Brandname: Brandname,
            }).then(() => {
                // console.log("Success!");
                Axios.get('http://localhost:3001/getBrandandManufacturer').then((response) => {
                    setinventorymanList(response.data);
                    // console.log("Update", response)
                    Axios.get('http://localhost:3001/getBrandname2').then((response) => {
                        setBrandname(response.data)
                        // console.log("UpdatejtBrandname", response)
                        // console.log("UpdatejtBrandname", Brandname)
                        Axios.get('http://localhost:3001/getBrandname3').then((response) => {
                            setManufacturer(response.data)
                            // console.log("UpdatejtManu", response)


                        });
                    });
                });

            });
        }
    }

    return (
        <div style={{ backgroundColor: "", maxHeight: "40vh", minHeight: "20vh", alignItems: "center", maxWidth: "100%" }} className="p-3">
            <Card style={{ maxHeight: "40vh", minHeight: "20vh", maxWidth: "100%", }} className="card mb-4 p-1 shadow bg-white rounded">
                <Card.Body>
                    <Row>
                        <Col>
                            <select className="inputfield" name="Brand Name" onChange={updatemanufac}>
                                <option value=''>Select Brand Name</option>
                                {inventoryList.map((e, key) => {
                                    return <option value={e.Brandname}>{e.Brandname}</option>;
                                })}
                            </select>
                        </Col>
                        <Col>
                            <select className="inputfield" name="Manufacturer" onChange={(event) => { setManufacturer(event.target.value); }}>
                                <option value=''>Select Manufacturer</option>
                                {inventorymanList.map((e, key) => {
                                    return <option value={e.Manufacturer}>{e.Manufacturer}</option>;
                                })}
                            </select>
                        </Col>

                    </Row>


                    <Row>
                        <Col>
                            <input className="inputfield" type="text" placeholder="Stock Availaible" onChange={(event) => { setStock(event.target.value); }} />
                        </Col>
                        <Col>
                            <input className="inputfield" type="text" placeholder="Minimum Stock" onChange={(event) => { setminStock(event.target.value); }} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <input className="inputfield" type="text" placeholder="Price" onChange={(event) => { setPrice(event.target.value); }} />
                        </Col>

                        <Col>
                            <input className="inputfield" type="date" placeholder="Date" onChange={(event) => { setExpDate(event.target.value); }} />
                        </Col>
                    </Row>

                    <Row style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <button className="myButton shadow" onClick={DelMedicineFunction}>update</button>
                    </Row>

                </Card.Body>

            </Card>
        </div>
    )
}
