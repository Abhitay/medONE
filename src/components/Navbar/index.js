import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import axios from "axios";
import Cards from '../Navbar/Mycard';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  NavBtnLink2
} from "./NavbarElements";

const Navbar = ({ toggle }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [scrollNav, setScrollNav] = useState(false);
  const [data, setData] = useState({});

  const changeNav = () => {
    if (window.scrollY >= 200) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const url = "https://covid19.mathdro.id/api";

  const fetchData = async (country) => {
    let changeableUrl = url;
    if (country) {
      changeableUrl = `${url}/countries/${country}`;
    }

    try {
      const {
        data: { confirmed, recovered, deaths, lastUpdate },
      } = await axios.get(changeableUrl, { withCredentials: false });

      return {
        confirmed,
        recovered,
        deaths,
        lastUpdate,
      };
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchMyData() {
    const fetchedData = await fetchData();
    setData(fetchedData);
  }

  useEffect(() => {
    fetchMyData();
  }, []);

  useEffect(() => {
    console.log("hi: " + JSON.stringify(data));
  });

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo to="/" onClick={toggleHome} className="text-decoration-none text-light">
            med<span style={{ marginLeft: "2px", color: "#01bf71" }}>ONE</span>
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars></FaBars>
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks className="text-decoration-none text-light"
                to="about"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                About
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks className="text-decoration-none text-light"
                to="discover"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Discover
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks className="text-decoration-none text-light"
                to="services"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Services
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks className="text-decoration-none text-light"
                to="signup"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Sign Up
              </NavLinks>
            </NavItem>
          </NavMenu>

          <Dialog
            maxWidth='lg'
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Cards data={data} />
              </DialogContentText>
            </DialogContent>
          </Dialog>

          <NavBtn >
            <NavBtnLink2 style={{ marginRight: "10px",}} className="text-decoration-none text-dark" onClick={handleClickOpen}>
              COVID-19
            </NavBtnLink2>
            <NavBtnLink className="text-decoration-none text-dark" to="/signin">Sign In</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
