import React, { useState, useEffect } from 'react';
import Axios from "axios";
import './AddMedicineStyle.css';
import { Card, Col, Container, Dropdown, Row } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function AddMedicine({ setMyChange }) {
    Axios.defaults.withCredentials = true;
    const [Brandname, setBrandname] = useState([]);
    const [Manufacturer, setManufacturer] = useState();
    const [Stock, setStock] = useState(0);
    const [minStock, setminStock] = useState(0);
    const [Category, setCategory] = useState("");
    const [Price, setPrice] = useState(0.0);
    const [ExpDate, setExpDate] = useState();
    const EmailID = "";
    const ChemicalName = "";
    const [brandnamemedicineList, setbrandnamemedicineList] = useState([])
    const [manufacmedicineList, setmanufacmedicineList] = useState([])
    const [myError, setMyError] = useState();

    useEffect(() => {
        Axios.get('http://localhost:3001/getBrandandManufacturerOg').then((response) => {
            setbrandnamemedicineList(response.data);
            //console.log(response)
        });
    },[]);
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

    async function AddMedicineFunction() {

        // console.log("Brand: ", { Brandname });
        // console.log("Manufacturer: ", { Manufacturer });
        // console.log("Stock: ", { Stock });
        // console.log("minStock: ", { minStock });
        // console.log("Price: ", { Price });
        // console.log("Date: ", { ExpDate });
        setMyError(null);

        // setMyChange(Stock)
        let r = Math.random().toString(36).substring(7);

        Axios.post('http://localhost:3001/add', {
            Brandname: Brandname,
            Manufacturer: Manufacturer,
            Stock: Stock,
            minStock: minStock,
            Category: Category,
            ChemicalName: ChemicalName,
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

    const getmanufac = (e) => {
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
                    setmanufacmedicineList(response.data);
                    setManufacturer(response.data)
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
        <div style={{ backgroundColor: "", maxHeight: "40vh", minHeight: "20vh", alignItems: "center", maxWidth: "100%", height:"100%" }} className="p-3">
            <Card style={{ maxHeight: "40vh", minHeight: "20vh", maxWidth: "100%", }} className="card mb-4 p-1 shadow bg-white rounded">
                <Card.Body>
                    <Row>
                        <Col>
                            <select className="inputfield" name="Brand Name" onChange={getmanufac}>
                                <option value=''>Select Brand Name</option>
                                {brandnamemedicineList.map((e, key) => {
                                    return <option value={e.Brandname}>{e.Brandname}</option>;
                                })}
                            </select>
                        </Col>
                        <Col>
                            <select className="inputfield" name="Manufacturer" onChange={(event) => { setManufacturer(event.target.value); }}>
                                <option value=''>Select Manufacturer</option>
                                {manufacmedicineList.map((e, key) => {
                                    return <option value={e.Manufacturer}>{e.Manufacturer}</option>;
                                })}
                            </select>
                        </Col>

                    </Row>


                    <Row>
                        <Col>
                            <input className="inputfield" type="text" placeholder="Stock Available" onChange={(event) => { setStock(event.target.value); }} />
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
                        <button className="myButton shadow" onClick={AddMedicineFunction}>Add</button>
                    </Row>

                </Card.Body>

            </Card>
        </div>
    )
}
