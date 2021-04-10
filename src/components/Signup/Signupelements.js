import styled from "styled-components";
import { Link } from "react-router-dom";

export const InfoContainer = styled.div`
  color: #fff;
  background: "#f9f9f9";

  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

export const InfoWrapper = styled.div`
  display: grid;
  z-index: 1;
  height: 886px;
  width: 100%;
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  justify-content: center;
`;

export const InfoRow = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({ imgStart }) =>
    imgStart ? `'col2 col1'` : `'col1 col2'`};

  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgStart }) =>
    imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`};
  }
`;

export const Column1 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col1;
`;

export const Column2 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col2;
`;

export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
`;

export const TopLine = styled.p`
  color: #01bf71;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 5px;
  margin-top: 50px;
`;

export const Heading = styled.h1`
  margin-bottom: 50px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: #010606;
  z-index: 1;

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 24px;
  color: red;
`;

export const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const ImgWrap = styled.div`
  max-width: 555px;
  height: 100%;
`;

export const Img = styled.img`
  width: 100%;
  margin: 0 0 10px 0;
  padding-right: 0;
`;

export const FormWrap = styled.div`
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 400px) {
    height: 80%;
  }
`;

export const Icon = styled(Link)`
  margin-left: 32px;
  /* margin-top: 32px; */
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 32px;

  @media screen and (max-width: 480px) {
    margin-left: 16px;
    /* margin-top: 8px; */
  }
`;

export const FormContent = styled.div`
  background: #fff;
  /* height: 100%; */
  width: 100%;
  /* padding: 10px 10px; */
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 400px) {
    padding: 10px;
  }
`;

export const Form = styled.div`
  background: #fff;
  max-width: 800px;
  /* height: auto; */
  width: 100%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  /* padding: 80px 32px; */
  border-radius: 4px;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9); */

  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  } ;
`;

export const FormH1 = styled.h1`
  margin-bottom: 40px;
  color: #000;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #000;
`;

export const FormInput = styled.input`
  padding: 16px 16px;
  margin-bottom: 15px;
  /* border: none; */
  border-radius: 4px;
  border-color: #000;
  border: 1px solid
`;

export const FormButton = styled.button`
  background: #000;
  padding: 16px 0;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

export const Text = styled.span`
  text-align: center;
  margin-top: 24px;
  color: #000;
  font-size: 14px;
`;

export const Span = styled.span`
  text-align: center;
  margin-top: 30px;
  color: #000;
  font-size: 14px;
`;