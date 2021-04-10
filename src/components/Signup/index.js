import React, { useState, useEffect, useRef } from "react";
import Image from "../../images/svg-4.svg";
import useForm from "./useForm";
import validate from "./validateInfo";
import VanillaTilt from 'vanilla-tilt';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import {
  InfoContainer,
  InfoWrapper,
  InfoRow,
  Column1,
  Column2,
  TextWrapper,
  TopLine,
  Heading,
  ImgWrap,
  Img,
  FormWrap,
  FormContent,
  Form,
  FormLabel,
  FormInput,
  FormButton,
  Text,
  Span,
  Subtitle,
} from "./Signupelements";
import { Link } from "react-router-dom";

const Signup = ({ submitForm }) => {

  const [myTextField, handleTextField] = useState(false);

  const handleOnClickDefaultPharmacy = () => {
    store.addNotification({
      title: "Warning",
      message: errors.Pharmacy_name,
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

  const handleOnClickDefaultEmail = () => {
    store.addNotification({
      title: "Warning",
      message: errors.Email,
      type: "success",
      container: "bottom-right",
      insert: "top",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],

      dismiss: {
        duration: 2000,
        showIcon: true,
        pauseOnHover: true
      }
    })
  }

  const handleOnClickDefaultPass = () => {
    store.addNotification({
      title: "Warning",
      message: errors.Password,
      type: "success",
      container: "bottom-right",
      insert: "top",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],

      dismiss: {
        duration: 2000,
        showIcon: true,
        pauseOnHover: true
      }
    })
  }

  const handleOnClickDefaultPass2 = () => {
    store.addNotification({
      title: "Warning",
      message: errors.Password2,
      type: "success",
      container: "bottom-right",
      insert: "top",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],

      dismiss: {
        duration: 2000,
        showIcon: true,
        pauseOnHover: true
      }
    })
  }

  const handleOnClickDefaultAdd = () => {
    store.addNotification({
      title: "Warning",
      message: errors.Address,
      type: "success",
      container: "bottom-right",
      insert: "top",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],

      dismiss: {
        duration: 2000,
        showIcon: true,
        pauseOnHover: true
      }
    })
  }

  const handleOnClickDefaultPhone = () => {
    store.addNotification({
      title: "Warning",
      message: errors.Phone_no,
      type: "success",
      container: "bottom-right",
      insert: "top",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],

      dismiss: {
        duration: 2000,
        showIcon: true,
        pauseOnHover: true
      }
    })
  }

  const handleOnClickDefaultDB = () => {
    store.addNotification({
      title: "Warning",
      message: errors.dbError,
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
    })
  }

  function handleGameClick() {
    handleTextField(!myTextField);
  }

  const { handleChange, values, handleSubmit, errors, OTPvalues, verifyOTP, verifiedOTP } = useForm(submitForm, validate, handleGameClick);

  useEffect(() => {
    if (errors.Pharmacy_name) {
      handleOnClickDefaultPharmacy();
      errors.Pharmacy_name = null;
    }
    if (errors.Email) {
      handleOnClickDefaultEmail();
      errors.Email = null;
    }
    if (errors.Password) {
      handleOnClickDefaultPass();
      errors.Password = null;
    }
    if (errors.Password2) {
      handleOnClickDefaultPass2();
      errors.Password2 = null;
    }
    if (errors.Address) {
      handleOnClickDefaultAdd();
      errors.Address = null;
    }
    if (errors.Phone_no) {
      handleOnClickDefaultPhone();
      errors.Phone_no = null;
    }
    if (errors.dbError) {
      handleOnClickDefaultDB();
      errors.dbError = null;
      setTimeout(() => {
        window.location.reload();
      }, 5000);

    }

  });

  function Tilt(props) {
    const { options, ...rest } = props;
    const tilt = useRef(null);

    useEffect(() => {
      VanillaTilt.init(tilt.current, options);
    }, [options]);

    return <div ref={tilt} {...rest} />;
  }

  const options = {
    speed: 1000,
    max: 30
  };

  return (
    <InfoContainer id="signup" style={{ backgroundColor: "#fff" }}>
      <InfoWrapper>
        <InfoRow>
          <Column1>
            <TextWrapper>
              <TopLine>Ready?</TopLine>
              <Heading>Signup</Heading>
              <FormWrap>
                <FormContent style={{ backgroundColor: "#fff" }}>
                  <Form style={{ backgroundColor: "#fff" }}>
                    <FormLabel htmlFor="for">Pharmacy name</FormLabel>
                    <FormInput
                      type="text"
                      required
                      name="Pharmacy_name"
                      placeholder="Enter your Pharmacy name"
                      value={values.Pharmacy_name}
                      onChange={handleChange}
                      disabled={myTextField}
                    ></FormInput>

                    <FormLabel htmlFor="for">Email</FormLabel>
                    <FormInput
                      type="email"
                      required
                      name="Email"
                      placeholder="Enter your email id"
                      value={values.Email}
                      onChange={handleChange}
                      disabled={myTextField}
                    ></FormInput>

                    <FormLabel htmlFor="for">Password</FormLabel>
                    <FormInput
                      type="password"
                      required
                      name="Password"
                      placeholder="Enter your password"
                      value={values.Password}
                      onChange={handleChange}
                      disabled={myTextField}
                    ></FormInput>

                    <FormInput
                      type="password"
                      required
                      name="Password2"
                      placeholder="Re-enter your password"
                      value={values.Password2}
                      onChange={handleChange}
                      disabled={myTextField}
                    ></FormInput>

                    <FormLabel htmlFor="for">Address</FormLabel>
                    <FormInput
                      type="text"
                      required
                      name="Address"
                      placeholder="Enter your Pharmacy address"
                      value={values.Address}
                      onChange={handleChange}
                      disabled={myTextField}
                    ></FormInput>

                    <FormLabel htmlFor="for">Phone Number</FormLabel>
                    <FormInput
                      type="text"
                      required
                      name="Phone_no"
                      placeholder="Enter your Pharmacy number"
                      value={values.Phone_no}
                      onChange={handleChange}
                      disabled={myTextField}
                    ></FormInput>

                    {myTextField == true ? <FormInput type="text"
                      required
                      name="OTP"
                      placeholder="Enter your OTP"
                      onChange={verifyOTP}
                      value={OTPvalues.OTP}
                    ></FormInput> : <></>}

                    {errors.otp && <Subtitle>{errors.otp}</Subtitle>}

                    {myTextField == true ?
                      (
                        <FormButton type="submit" onClick={verifiedOTP}>
                          Verify </FormButton>
                      ) : <FormButton type="submit" onClick={handleSubmit}>
                        Signup
                  </FormButton>}

                  </Form>
                  <Span style={{ backgroundColor: "#fff" }}>
                    <Text>Already have an account?</Text><Link to="/signin" style={{ textDecoration: "none", color: "#01bf71" }}> Sign in</Link>
                  </Span>
                </FormContent>
              </FormWrap>
            </TextWrapper>
          </Column1>
          <Column2>
            <Tilt options={options} >
              <ImgWrap>
                <Img src={Image} alt="Signup"></Img>
              </ImgWrap>
            </Tilt>
          </Column2>
        </InfoRow>
      </InfoWrapper>
    </InfoContainer>
  );
};

export default Signup;
