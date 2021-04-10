import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Section = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1a1a1a;
`;

export const Containers = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  width: 100%;
  padding: 3rem calc((100vw - 1300px) / 2);
  /* background: red; */

  @media screen and (max-width: 768) {
    grid-template-columns: 1fr;
  }
`;

export const FormWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 400px) {
    height: 80%;
    width: 100%
  }
`;

export const FormContent = styled.div`
  height: auto;
  width:100%;
  /* padding: 10px 10px; */
  display: flex;
  justify-content: center;


`;

export const Form = styled.div`
  background: #000;
  height: 100%;
  width: 100%;
  /* margin: 0 auto; */
  padding: 80px 32px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* display:grid; */


`;

export const FormH1 = styled.h1`
  margin-bottom: 30px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

export const FormLabel = styled.label`
  margin-top: 23px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #fff;
  width:100%;
`;

export const FormInput = styled.input`
  padding: 16px 16px;
  border: none;
  border-radius: 4px;
  width: 100%;
`;

export const FormButton = styled.button`
  background: #01bf71;
  padding: 16px 0;
  border: none;
  margin-top: 30px;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

export const Text = styled.span`
  text-align: center;
  margin-top: 24px;
  color: #fff;
  font-size: 14px;
`;

export const HeroBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const VideoBg = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
`;

export const Icon = styled(Link)`
  margin-left: 32px;
  margin-top: 32px;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 32px;

  @media screen and (max-width: 480px) {
    margin-left: 16px;
    margin-top: 8px;
  }
`;

export const Image = styled(motion.img)`
  /* position: absolute; */
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 200px;

  @media screen and (max-width: 1000px) {
    display: none
  } ;

`;

export const col2 = styled(motion.img)`
  background-color:red;

  @media screen and (max-width: 1000px) {
    display: none
  } ;

`;

export const ColumnLeft = styled.div`
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5rem 6rem;
  /* width: 100%; */
  /* background: green; */
`;
export const ColumnRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  /* background: yellow; */

  ${Image}:nth-child(1) {
    top: 50px;
    left: 10px;
    /* z-index: 1; */

    
  }

  ${Image}:nth-child(3) {
    top: 160px;
    left: 200px;
    /* z-index: 1; */
  }

  ${Image}:nth-child(2) {
    top: 155px;
    left: 90px;
  }

  ${Image}:nth-child(4) {
    bottom: 250px;
    left: 5px;
  }

  ${Image}:nth-child(5) {
    bottom: 230px;
    left: 140px;
    /* z-index: 1; */
  }

  ${Image}:nth-child(6) {
    bottom: 120px;
    left: 80px;
    /* z-index: 1; */
  }

  @media screen and (max-width: 1000px) {
    display: none
  } ;
`;
