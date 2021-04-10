import React, { useState, useEffect } from 'react'
import Axios from "axios";
import { Row } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import { store } from 'react-notifications-component';
import { useHistory } from "react-router-dom";

export default function ConfirmSell({ setMyChange, myChange, setSellClick, canSell }) {
  Axios.defaults.withCredentials = true;
  const [myData, setMydata] = useState([]);
  const [myCusEmail, setMyCusEmail] = useState([]);
  const [myCusPrice, setMyCusPrice] = useState([]);
  const [load, setMyload] = useState();
  var obj;
  let sum = 0;
  let tax = 0;

  // useEffect(() => {
  //   setmyOBJdata((Object.assign({}, [myData])));

  //   console.log("object after: ",myOBJdata);
  // },[load2]);

  const sellNotification = () => {
    store.addNotification({
      title: "Success",
      message: "Sold!",
      type: "success",
      container: "bottom-right",
      insert: "top",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],

      dismiss: {
        duration: 2000,
        showIcon: true,
      }
    })
  }

  const history = useHistory();


  useEffect(() => {
    // console.log("here");
    Axios.get('http://localhost:3001/getselldatatable').then((res) => {
      // console.log("data ",res.data);
      // console.log("123data ", res.data.map((number) => { return number.Brandname }));

      // array object
      // setMydata(res.data.map((number) => {
      //   var tmp = {};
      //   tmp["data"] = number.Brandname
      //   return "Brandname: ", tmp 
      // }));  

      console.log(res.data);



      setMydata(res.data.map((number) => {
        return "Brandname: ", number.Brandname;
      }));

      setMyCusEmail(res.data.map((number) => {
        return "Email: ", number.CustomerEmail;
      }));

      setMyCusPrice(res.data.map((number) => {
        return "Price: ", number.PriceTot;
      }));

      for (let num of myCusPrice) {
        sum = sum + num
      }

      // console.log(sum);

      tax = sum * 1.05;

    }).then(() => {
      // console.log("afterSet: ", myData);
      // console.log("Email: ", myCusEmail);
      // console.log("object: ", (Object.assign({}, [myData], {["mydata"]:myData})));

      obj = Object.assign({}, { ["mydata"]: myData, ["Email"]: myCusEmail, ["Price"]: tax });

      // if (obj.Email.length <=0 && buttonClicked == true) {
      //   console.group("adaw")
      //   setBttnClicked(false)
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
    
      // console.log("final obj: ", obj);

      //EMAIL
      //uncomment this
      if(buttonClicked == true && canSell == true){
        if (obj.Email.length > 0) {
          console.log("EpicMail: ", obj);
          setBttnClicked(false);
        
          // alert(obj.Email);
          emailjs.send('service_ommyfrm', 'template_6o5eywn', obj, 'user_nR6wZZ3yOzHNODELoiMGE')
            .then(function (response) {
              setBttnClicked(false);
              // window.location.reload();
              history.push("Dashboard");
              // console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
              // console.log('FAILED...', error);
            });

        }
        setBttnClicked(false);
      }


    });
  }, [load, myChange]);

  const [buttonClicked, setBttnClicked] = useState(false);

  function FinalSell() {
    let r1 = Math.random().toString(36).substring(7);

    setSellClick(r1);
    setBttnClicked(true);

    // console.log("  Confirm Sell");
    setMyload(null);
    

    // Axios.get('http://localhost:3001/transferget').then((res) => {
    //   console.log("data ",res.data[0]);
    //   console.log("123data ", res.data.map((number) => { return number.Brandname }));
    //   setMydata(res.data.map((number) => { return number.Brandname }));
    //   console.log("afterSet: ", myData);

    // console.log("final obj: ", obj);

    //   // emailjs.send('service_elwn3x6', 'template_6fp3flx', res.data.map((number) => { return number.Brandname }), 'user_kSSaPFksqDyU1q2WgZzCY')
    //   //   .then(function (response) {
    //   //     console.log('SUCCESS!', response.status, response.text);
    //   //   }, function (error) {
    //   //     console.log('FAILED...', error);
    //   //   });

    // }).then(() =>{
    //   console.log("afterSet: ", myData);
    //   // console.log("afterSet: ", myData.Brandname);
    // });

    // Axios.post('http://localhost:3001/checktable', {

    // }).then(() => {
    //   setMyChange(r)
    //   setBttnClicked(true);
    //   // console.log("ConfirmSell")

    // });

  }

  useEffect(()=>{
    if (canSell == true){
      let r = Math.random().toString(36).substring(7);
      Axios.post('http://localhost:3001/checktable', {

      }).then(() => {
        setMyChange(r)
        setBttnClicked(true);
        // console.log("ConfirmSell")

      });
    }
  })

  return (
    <div style={{ backgroundColor: "", alignItems: "center", maxWidth: "100%" }} className="p-3 sellCard">
      <Row >
        <button style={{ padding: "10px", fontSize: "20px", backgroundColor: "black", color: "white" }} className="SellmyButton shadow" onClick={FinalSell}>Sell</button>
      </Row>
    </div>
  )
}
