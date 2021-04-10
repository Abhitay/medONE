import React, { useState, useEffect } from 'react'
import Axios from "axios";
import './AddMedicineStyle.css';
import { Card, Col, Container, Dropdown, Row } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

export default function RemoveMedicine({ setMyChange, isDeleted, setIsDeleted, deleteData }) {
    Axios.defaults.withCredentials = true;
    const [Brandname, setBrandname] = useState("");
    const [Manufacturer, setManufacturer] = useState("");
    const EmailID = "";
    const [delinventoryList, setdelinventoryList] = useState([]);
    const [delinventorymanList, setdelinventorymanList] = useState([]);
    const [myError, setMyError] = useState();

    useEffect(() => {
        if (myError) {
            confirmAlert(options);
        }
    }, [myError]);

    useEffect(() => {
        if (isDeleted == "Deleted") {
            setIsDeleted(null);
            // setMyChange(deleteData.Brandname)
            let r = Math.random().toString(36).substring(7);

            setMyError(null);

            Axios.post('http://localhost:3001/delete', {
                Brandname: deleteData.Brandname,
                Manufacturer: deleteData.Manufacturer,
                EmailID: EmailID,
            }).then((response) => {
                setMyChange(r);
                if (response.data) {
                    setMyError(response.data);
                }
                // console.log("Success!");
            });
        }
    }, [isDeleted]);

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
            setdelinventoryList(responseJson);
            // console.log("called",delinventoryList);
        }
        fetchUser();
    });

    const DelMedicineFunction = () => {
        // setMyChange(Brandname)
        let r = Math.random().toString(36).substring(7);

        setMyError(null);
        if (Brandname == "Select Brand Name" || Manufacturer == "Select Manufacturer"){
            setMyError("");
        }
        else{
            Axios.post('http://localhost:3001/delete', {
                Brandname: Brandname,
                Manufacturer: Manufacturer,
                EmailID: EmailID,
            }).then((response) => {
                setMyChange(r)
                if (response.data) {
                    setMyError(response.data);
                    if (response.data == "Deleted!") {
                        setBrandname(null);
                        setManufacturer(null);
                    }
                }
                // console.log("Success!");
            });
        }
    };

    const delmanufac = (e) => {
        console.log(e.target.value)
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
                    setdelinventorymanList(response.data);
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
            <Card style={{ maxHeight: "40vh", maxWidth: "100%", }} className="card mb-4 p-1 shadow bg-white rounded">
                <Card.Body>
                    <Row>
                        <Col>
                            <select className="inputfield" name="Brand Name" value={Brandname} onChange={delmanufac}>
                                <option value=''>Select Brand Name</option>
                                {delinventoryList.map((e, key) => {
                                    return <option value={e.Brandname}>{e.Brandname}</option>;
                                })}
                            </select>
                        </Col>
                        <Col>
                            <select className="inputfield" name="Manufacturer" value={Manufacturer} onChange={(event) => { setManufacturer(event.target.value); }}>
                                <option value=''>Select Manufacturer</option>
                                {delinventorymanList.map((e, key) => {
                                    return <option value={e.Manufacturer}>{e.Manufacturer}</option>;
                                })}
                            </select>
                        </Col>

                    </Row>


                    <Row style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <button className="myButton shadow" onClick={DelMedicineFunction}>Delete</button>
                    </Row>

                </Card.Body>

            </Card>
        </div>
    )
}
