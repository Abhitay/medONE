import React, { useState } from "react";
// import { Button } from "react-scroll";
import Video from "../../videos/video.mp4";
import { Button } from "../ButtonElement";
import Typical from "react-typical";
import Typewriter from 'typewriter-effect';

import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";

const HeroSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4"></VideoBg>
      </HeroBg>
      <HeroContent>
        <HeroH1>
          med<span style={{ marginLeft:"2px",color: "#01bf71" }}>ONE</span>
        </HeroH1>
        <HeroP>
          <Typewriter
            options={{ loop : true }}
            onInit={(typewriter) => {
              typewriter
                .typeString("Sign Up for a new account today")
                .pauseFor(2000)
                .deleteAll()
                .typeString("आज एक नए खाते के लिए साइन अप करें")
                .pauseFor(2000)
                .deleteAll()
                .typeString("आज नवीन खात्यासाठी साइन अप करा")
                .pauseFor(2000)
                .deleteAll()
                .typeString("આજે નવા ખાતા માટે સાઇન અપ કરો")
                .pauseFor(2000)
                .deleteAll()
                .start();
            }}
          />{" "}
        </HeroP>
        <HeroBtnWrapper>
          <Button className="text-decoration-none text-dark"
            to="signup"
            smooth={true}
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
          >
            {" "}
            Get started {hover ? <ArrowForward /> : <ArrowRight />}{" "}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
