import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ButtonElement";
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Axios from "axios";
import ReactStars from "react-rating-stars-component";
import VanillaTilt from 'vanilla-tilt';
import { makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { generate } from "short-id";
import EmojiBubble from "../Dashboard/pages/Emoji/EmojiBubble";
import AutoExpire from "../Dashboard/pages/Emoji/AutoExpire";

import {
  InfoContainer,
  InfoWrapper,
  InfoRow,
  Column1,
  Column2,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  BtnWrap,
  ImgWrap,
  Img,
} from "./infoElements";

function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}

const InfoSection = ({ ...props }) => {

  const [click, setClick] = useState();
  const tilt = useRef(null);

  const options = {
    scale: 1.1,
    speed: 1000,
    max: 30
  };

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  const StyledRating = withStyles({
    icon: {
      marginLeft: "0px",
      marginRight:"3vw",
      paddingLeft:"0px",
    },
    iconEmpty:{
      color:"grey"
    }
  })(Rating);

  const [emojiQueue, setEmojiQueue] = useState([]);

  const randomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomPosOrNeg = (max, min) => {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    randomNumber *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

    return randomNumber;
  };

  const [count, setCount] = useState(false);
  const [animate, setAnimate] = useState(localStorage.animate)

  useEffect(() => {
    setTimeout(() => {
      setCount(true)
      localStorage.animate = false;
    }, [2000])
    if (count == false && localStorage.animate == "sign out") {
      handleEmojiClick("label", "💔");
    }
  });

  const handleEmojiClick = (label, symbol) => {
    setEmojiQueue([
      ...emojiQueue,
      {
        label,
        symbol,
        size: randomNumber(3, 2),
        left: randomNumber(100, 0),
        one: randomPosOrNeg(200, 50),
        two: randomPosOrNeg(200, 50),
        id: generate()
      }
    ]);
  };


  return (
    <>
      <InfoContainer lightBg={props.lightBg} id={props.id}>
        {animate != "false" ? <div style={{ zIndex: "999", bottom:"0", right:"0" , position:"fixed", height:"100%", }}>
          {emojiQueue.map(({ id, label, symbol, size, left, one, two }) => (
            <AutoExpire key={id}> 
              <EmojiBubble
                label={label}
                symbol={symbol}
                size={size}
                left={left}
                one={one}
                two={two}
              />
            </AutoExpire>
          ))}
        </div> : null}
        <InfoWrapper>
          <InfoRow imgStart={props.imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>{props.topLine}</TopLine>
                <Heading lightText={props.lightText}>{props.headline}</Heading>
                <Subtitle darkText={props.darkText}>{props.description}</Subtitle>
                <Subtitle darkText={props.darkText}>{props.description2}</Subtitle>

                {props.Rating != undefined ?
                  (<Box component="fieldset" mb={3} borderColor="transparent">
                    <div>
                      <StyledRating
                        style={{ marginLeft: "0px" }}
                        size="large"
                        name="simple-controlled"
                        value={props.Rating}
                        readOnly
                      />
                    </div>
                  </Box>
                  )
                  : null}

              </TextWrapper>
            </Column1>
            <Column2>
              <Tilt options={options} >
                <ImgWrap>
                  <Img src={props.img} alt={props.alt}></Img>
                </ImgWrap>
              </Tilt>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
