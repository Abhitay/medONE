import React, { useState, useEffect } from 'react'
import Axios from "axios";
import moment from "moment";
import { Card } from '@material-ui/core';
import { Col, Row } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

export default function Sell({ setMyChange, isDeleted, setIsDeleted, deleteData, update }) {
  const [Brandname1, setBrandname1] = useState("");
  const [Manufacturer1, setManufacturer1] = useState("");
  const [ItemNumber1, setItemNumber1] = useState("");
  const [custEmail1, setcustEmail1] = useState("");
  const [myError, setMyError] = useState();

  Axios.defaults.withCredentials = true;


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
      console.log(deleteData.Brandname, deleteData.Manufacturer, deleteData.CustomerEmail);

      setMyError(null);
      setMyError(null);
      Axios.post('http://localhost:3001/deleteselltable', {
        Brandname: deleteData.Brandname,
        Manufacturer: deleteData.Manufacturer,
        customerEmail: deleteData.custEmail,


      }).then((response) => {
        setMyChange(r);
        if (response.data) {
          setMyError(response.data);
        }

        if (response.data == "deleted") {
          // alert("hmmm");

          // window.location.reload();
        }
        // console.log("DeleteSell");

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


  const EmailID = "";
  const [sellinventoryList1, setsellinventoryList1] = useState([])
  const [sellinventorymanList1, setsellinventorymanList1] = useState([])


  const Delfromsales = () => {
    setMyError(null);
    let r = Math.random().toString(36).substring(7);

    Axios.post('http://localhost:3001/deleteselltable', {
      Brandname: Brandname1,
      Manufacturer: Manufacturer1,
      customerEmail: custEmail1,


    }).then((response) => {
      setMyChange(r)
      if (response.data) {
        setMyError(response.data);
      }

      if (response.data == "deleted") {
        // alert("hmmm");

        // window.location.reload();
      }
      // console.log("DeleteSell");

    });
  };

  useEffect(()=>{
    setMyError(null);
    console.log(update)
    if(update != undefined){
      let r = Math.random().toString(36).substring(7);

      Axios.post('http://localhost:3001/updateselltable', {
        Brandname: update.Brandname,
        Manufacturer: update.Manufacturer,
        Stock: update.NumberItems,


      }).then((response) => {
        setMyChange(r)
        if (response.data) {
          setMyError(response.data);
        }

        if (response.data == "Updated") {
          // console.log("UpdateSell");
          Axios.get('http://localhost:3001/getselldatatable').then((response) => {
            //setinventoryList(response.data);
            // console.log("getselldatatable")
            // console.log("response.data", response.data)

            Axios.post('http://localhost:3001/transferpost', {
              value1: response.data,
            }).then(() => {

              // window.location.reload();
              // console.log("AddSell")
            })
          })
        }

      });
    }

  }, [update])
  
  const Updfromsales = () => {
    setMyError(null);
    let r = Math.random().toString(36).substring(7);

    Axios.post('http://localhost:3001/updateselltable', {
      Brandname: Brandname1,
      Manufacturer: Manufacturer1,
      Stock: ItemNumber1,


    }).then((response) => {
      setMyChange(r)
      if (response.data) {
        setMyError(response.data);
      }

      if (response.data == "Updated") {
        // console.log("UpdateSell");
        Axios.get('http://localhost:3001/getselldatatable').then((response) => {
          //setinventoryList(response.data);
          // console.log("getselldatatable")
          // console.log("response.data", response.data)

          Axios.post('http://localhost:3001/transferpost', {
            value1: response.data,
          }).then(() => {
            
            // window.location.reload();
            // console.log("AddSell")
          })
        })
      }

    });
  };

  const sellmanufac1 = (e) => {
    // console.log(Brandname1)
    Axios.post('http://localhost:3001/getBrandandManufacturer1', {
      Brandname: e.target.value
    }).then(() => {

      // console.log("Success!");
      Axios.get('http://localhost:3001/getBrandandManufacturer').then((response) => {
        setsellinventorymanList1(response.data);
        // console.log("Update", response)
        Axios.get('http://localhost:3001/getBrandname2').then((response) => {
          setBrandname1(response.data)
          // console.log("UpdatejtBrandname", response)
          // console.log("UpdatejtBrandname", Brandname1)
          Axios.get('http://localhost:3001/getBrandname3').then((response) => {
            setManufacturer1(response.data)
            // console.log("UpdatejtManu", response)

          });
        });
      });

    });

  }

  useEffect(() => {
    //console.log("called ")
    async function fetchUser1() {
      const fullResponse = await (fetch("http://localhost:3001/getselldatatable", { credentials: "include" }));
      const responseJson = await fullResponse.json();
      setsellinventoryList1(responseJson);
    }
    fetchUser1();
    // console.log("sellinventoryList1",sellinventoryList1)

  });

  return (
    <div style={{ backgroundColor: "",alignItems: "center", maxWidth: "100%" }} className="p-2 sellCard">
      <Card className="card mb-4 p-4 shadow bg-white rounded" style={{width:"100%"}}>

        <div >

          <Row>

            <Col>
              <select className="inputfield" name="Brand Name" onChange={sellmanufac1}>
                <option value=''>Select Brand Name</option>
                {sellinventoryList1.map((e, key) => {
                  return <option value={e.Brandname}>{e.Brandname}</option>;
                })}
              </select>
            </Col>

            <Col>
              <select className="inputfield" name="Manufacturer" onChange={(event) => { setManufacturer1(event.target.value); }}>
                <option value=''>Select Manufacturer</option>
                {sellinventorymanList1.map((e, key) => {
                  return <option value={e.Manufacturer}>{e.Manufacturer}</option>;
                })}
              </select>
            </Col>
            
          </Row>

          <Row style={{ display: "flex", justifyContent: "center",}}>
            <input className="inputfield" type="text" style={{ height: "15px", width:"70%", marginTop:"10px" }} placeholder="Item Number" onChange={(event) => { setItemNumber1(event.target.value); }} />
          </Row>

          <Row>

            <Col style={{display:"flex", justifyContent:"flex-end"}}>
              <button className="SellmyButton" onClick={Updfromsales}>Update</button>
            </Col>
            <Col>
              <button className="SellmyButton" onClick={Delfromsales}>Delete</button>
            </Col>

          </Row>

        </div>

      </Card>

    </div>
  )

}


