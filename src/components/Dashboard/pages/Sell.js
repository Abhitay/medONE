import React, { useState } from 'react';
import AddSell from '../Sell/AddSell';
import DisplaySell from '../Sell/DisplaySell';
import DeleteSell from '../Sell/DeleteSell';
import ConfirmSell from '../Sell/ConfirmSell';
import HomepageNavbar from "../Navbar/HomepageNavbar";
import { Card, Container, Row, Col } from "react-bootstrap";

export default function Sell() {
    const [myChange, setMyChange] = useState("none");
    const [isDeleted, setIsDeleted] = useState();
    const [deleteData, setDeleteData] = useState();

    const [mail, setEmail] = useState();

    const [update, setUpdate] = useState();

    const[sellClick, setSellClick] = useState();

    const [canSell, setCanSell] = useState(false);

    return (
        <div style={{ height: "100vh", backgroundColor: "#e8eff3", overflowX: "hidden"  }}>
            <HomepageNavbar></HomepageNavbar>
            <Container style={{ marginLeft: "0" }}>
                <Row style={{ backgroundColor: "#e8eff3", height: "90vh", width: "100vw", display:"flex", justifyContent:"center"}}>
                    <Col className="p-2">
                        <DisplaySell myChange={myChange} setIsDeleted={setIsDeleted} setDeleteData={setDeleteData} mail={mail} setUpdate={setUpdate} sellClick={sellClick} setCanSell={setCanSell} />
                    </Col>
                    <Col style={{ backgroundColor: "white", overflow: "hidden" }} className="col-xl-4 p-2 shadow col-lg-10">
                        <AddSell setMyChange={setMyChange} setEmail={setEmail} />
                        <DeleteSell setMyChange={setMyChange} isDeleted={isDeleted} setIsDeleted={setIsDeleted} deleteData={deleteData} update={update} />
                        <ConfirmSell setMyChange={setMyChange} myChange={myChange} setSellClick={setSellClick} canSell={canSell}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}