import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Redirect, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { Card, Container, Row, Col } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { store } from 'react-notifications-component';
import emailjs from 'emailjs-com';
import * as Icon from 'react-bootstrap-icons';

import {
  Section,
  Containers,
  FormWrap,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  Text,
  Image,
  ColumnLeft,
  ColumnRight,
  VideoBg,
  HeroBg,
} from "./SigninElements";
import M from "../../images/M.png";
import E from "../../images/E.png";
import D from "../../images/D.png";
import O from "../../images/O.png";
import N from "../../images/N.png";
import E2 from "../../images/E2.png";
import { icons } from "react-icons/lib";

const SignIn = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [myError, setError] = useState();
  const history = useHistory();

  const [resetMail, setRestMail] = useState();
  const [resetMailMessage, setRestMailMessage] = useState();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState("none");

  async function fetchUser() {
    const fullResponse = await fetch("http://localhost:3001/checkUser", { credentials: "include" });
    const responseJson = await fullResponse.json();
    setUser(responseJson);
  }

  useEffect(() => {
    fetchUser()
    // .then(console.log(user));
  }, [user]);

  useEffect(()=>{
    console.log("asdawda: " + user);
    if (user != 'none'){
      history.replace("/dashboard");
    }
  });


  const sendMail = () => {
    console.log(resetMail);
    Axios(
      {
        method: "post",
        data: {
          email: resetMail,
        },
        url: "http://localhost:3001/resetCheck",
      }
    ).then((response) => {

      store.addNotification({
        message: response.data,
        type: "success",
        container: "bottom-right",
        insert: "top",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],

        dismiss: {
          duration: 5000,
          showIcon: true,
          pauseOnHover: true
        }
      });

      if (response.data == "Please check your mail!") {
        var crypto = require("crypto");
        var id = crypto.randomBytes(20).toString('hex');
        console.log("random", id);

        var mailObj = {
          email: resetMail,
          key: id
        };
        emailjs.send('service_elwn3x6', 'template_giclh4m', mailObj, 'user_kSSaPFksqDyU1q2WgZzCY')
          .then(function (response) {
            // console.log('SUCCESS!', response.status, response.text);
          }, function (error) {
            // console.log('FAILED...', error);
          });
        Axios(
          {
            method: "post",
            data: {
              email: resetMail,
              key: id,
            },
            url: "http://localhost:3001/reset",
          }
        );
      }

    });
    setRestMail(null);

    setOpen(false);

  };

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios(
      {
        method: "post",
        data: {
          email: email,
          password: password
        },
        url: "http://localhost:3001/login",
      }
    ).then((response) => {
      if (response.data == "Successful") {

        props.history.push({
          pathname: '/dashboard',
          state: { user: email }
        });
      }
      setError(response.data);
    });
  };

  const [passwordType, setPasswordType] = useState(true);

  const passwordIcon = () => {
    setPasswordType(!passwordType);
  };

  return (
    <>
      <Section>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Reset password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Want to reset password? A link will be sent to your email which will be valid for 15 minutes.
          </DialogContentText>
            <input
              onChange={(event) => (setRestMail(event.target.value))}
              type="email"
              placeholder="Email id"
              style={{ margin: "1%", border: "1px solid grey", borderRadius: "3px", padding: "2%", wordWrap: "break-word", width: "100%" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
          </Button>
            <Button onClick={sendMail} style={{ color: "red" }}>
              Reset
          </Button>
          </DialogActions>
        </Dialog>
        <Container>
          <Row>
            <Col style={{ display: "flex", justifyContent: "center", backgroundColor: "", }}>
              <FormWrap >
                <FormContent style={{
                  display: "flex",
                  justifyContent: "center",
                }}>
                  <Form action="#">
                    <FormH1>Sign in</FormH1>
                    <FormLabel htmlFor="for">Email</FormLabel>
                    <FormInput type="email" required placeholder="Enter your email id" onChange={(event) => { setEmail(event.target.value) }}></FormInput>
                    <FormLabel htmlFor="for">Password</FormLabel>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <FormInput type={passwordType == true ? "password" : "text"} required placeholder="Enter your password" onChange={(event) => { setPassword(event.target.value) }}></FormInput>
                      <Button onClick={passwordIcon} style={{ position: "absolute", right: "48px", zIndex: "1", border: "none", padding: "12px", background: "transparent" }}>{passwordType == false ? <Icon.EyeFill size={30}></Icon.EyeFill> : <Icon.EyeSlashFill size={30}></Icon.EyeSlashFill>}</Button>
                    </div>
                    {myError && <Text>{myError}</Text>}
                    <FormButton type="submit" onClick={login}>Sign in</FormButton>
                    <Text onClick={handleClickOpen} style={{ cursor: "pointer" }}>Forgot password?</Text>
                  </Form>
                </FormContent>
              </FormWrap>
            </Col>
            <Col className="d-none d-lg-block">
              <Image
                src={M}
                alt="M"
                whileTap={{ scale: 0.9 }}
                drag={true}
                dragConstraints={{ left: -100, right: 100, top: 0, bottom: 100 }}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              ></Image>
              <Image
                src={O}
                alt="O"
                whileTap={{ scale: 0.9 }}
                drag={true}
                dragConstraints={{ left: -100, right: 100, top: 0, bottom: 100 }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
              ></Image>
              <Image
                src={E}
                alt="E"
                whileTap={{ scale: 0.6 }}
                drag={true}
                dragConstraints={{ left: -100, right: 100, top: 0, bottom: 100 }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
              ></Image>
              <Image
                src={N}
                alt="N"
                whileTap={{ scale: 0.9 }}
                drag={true}
                dragConstraints={{ left: -100, right: 100, top: 0, bottom: 100 }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
              ></Image>
              <Image
                src={D}
                alt="D"
                whileTap={{ scale: 0.8 }}
                drag={true}
                dragConstraints={{ left: -100, right: 100, top: 0, bottom: 100 }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
              ></Image>
              <Image
                src={E2}
                alt="E2"
                whileTap={{ scale: 0.9 }}
                drag={true}
                dragConstraints={{ left: -100, right: 100, top: 0, bottom: 100 }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              ></Image>
            </Col>
          </Row>
        </Container>
      </Section>
    </>
  );
};

export default SignIn;
