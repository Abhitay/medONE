import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import InfoSection from "../components/InfoSection";
import { homeObjOne, homeObjTwo, homeObjThree } from "../components/InfoSection/Data";
import Form from "../components/Signup/Form";
import Axios from "axios";

const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  var finalAVG;

  const [MyavgStar, setAVGStar] = useState();

  Axios.defaults.withCredentials = true;


  // useEffect(() => {
  //   Axios.post("http://localhost:3001/getFeedback", {
  //   }).then((res) => {
  //     var avg = (res.data.map((number) => {
  //       return "Star: ", number.star;
  //     }));

  //     console.log("hmmmm: " + avg);

  //     var sum = 0;

  //     for (let num of avg) {
  //       sum = sum + num;
  //     }

  //     finalAVG = sum / avg.length;

  //     setAVGStar(finalAVG)
  //     console.log("avg:" + finalAVG);
  //   });
  // }, []);

  useEffect(()=>{
    setAVGStar(props.avgStar);
  });

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle}></Sidebar>
      <Navbar toggle={toggle}></Navbar>
      <HeroSection></HeroSection>
      <InfoSection {...homeObjOne}></InfoSection>
      <InfoSection {...homeObjTwo}></InfoSection>
      <InfoSection {...homeObjThree} Rating={props.avgStar}></InfoSection>
      <Form></Form>
    </>
  );
};

export default Home;