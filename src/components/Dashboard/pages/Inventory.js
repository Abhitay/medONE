import React, { useState, useEffect } from 'react';
import AddMedicine from '../Inventory/AddMedicine';
import RemoveMedicine from '../Inventory/RemoveMedicine';
import UpdateMedicine from '../Inventory/UpdateMedicine';
import HomepageNavbar from "../Navbar/HomepageNavbar";
import DisplayMedicine from '../Inventory/DisplayMedicine';
import { Card, Container, Row, Col } from "react-bootstrap";


export default function Inventory() {
    const [brandnamemedicineList, setbrandnamemedicineList] = useState([]);
    const [myChange, setMyChange] = useState("none");

    const [isDeleted, setIsDeleted] = useState();
    const [deleteData, setDeleteData] = useState();

    return (
        <div className="Inventory" style={{ backgroundColor: "#e8eff3", overflowX:"hidden" }}>
            <HomepageNavbar></HomepageNavbar>
            <Container style={{ backgroundColor: "#e8eff3", marginLeft: "0px", width: "100vw", height:"100vh" }}>
                <Row style={{ width: "100vw", backgroundColor: "#e8eff3", display:"flex", justifyContent:"center"}}>
                    <Col className="col-xl-8 p-2">
                        <DisplayMedicine myChange={myChange} setIsDeleted={setIsDeleted} setDeleteData={setDeleteData}></DisplayMedicine>
                    </Col>
                    <Col style={{ backgroundColor: "white", overflow: "hidden", height:"100%" }} className="col-xl-4 p-2 d-none d-sm-block shadow col-lg-10">
                        <AddMedicine setMyChange={setMyChange} />
                        <UpdateMedicine setMyChange={setMyChange} myChange={myChange} />
                        <RemoveMedicine setMyChange={setMyChange} isDeleted={isDeleted} setIsDeleted={setIsDeleted} deleteData={deleteData} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
