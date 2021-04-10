import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/index";
// import SigninPage from "./pages/signin";
import SignIn from './components/Signin/index';
import Dashboard from "./components/Dashboard";
import History from "./components/Dashboard/pages/History";
import Inventory from "./components/Dashboard/pages/Inventory";
import Feedback from "./components/Dashboard/pages/Feedback";
import Search from "./components/Dashboard/pages/Search";
import Sell from "./components/Dashboard/pages/Sell";
import Reset from './components/Signin/reset';
import Axios from "axios";
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import loadingLogo from './images/loading.gif';
import { ProtectedRoute } from './routes/protected.route';
import { useHistory } from "react-router-dom";
import Radium, { StyleRoot } from 'radium';

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [loadData, setloadData] = useState(false);

  useEffect(() => {
    if (loadData) {
      setTimeout(() => {
        setLoading(false);
        if (localStorage.firstVisit == "true") {
          localStorage.firstVisit = "false";
        }
      }, 5500);
    }

  }, [loadData]);

  useEffect(() => {
    // console.log = console.warn = console.error = () => { };
    // Look ma, no error!
    console.error('Something bad happened.');

    async function fetchUser() {
      const fullResponse = await fetch("http://localhost:3001/checkUser", { credentials: "include" });
      const responseJson = await fullResponse.json().then(setloadData(true));
      setUser(responseJson);
      // Axios(
      //   {
      //     method: "get",
      //     withCredentails: true,
      //     url: "http://localhost:3001/checkUser",
      //   }
      // ).then((response) => {
      //   console.log(response.data);
      //   setUser(response.data);
      // });
    }
    fetchUser();
    if (localStorage.card1X == "NaN" || localStorage.card1Y == "NaN" || localStorage.card1X == null || localStorage.card1Y == null) {
      localStorage.card1X = 2;
      localStorage.card1Y = 2;
    }
    if (localStorage.card2X == "NaN" || localStorage.card2Y == "NaN" || localStorage.card2X == null || localStorage.card2Y == null) {
      localStorage.card2X = 2;
      localStorage.card2Y = 2;
    }
    if (localStorage.card3X == "NaN" || localStorage.card3Y == "NaN" || localStorage.card3X == null || localStorage.card3Y == null) {
      localStorage.card3X = 2;
      localStorage.card3Y = 2;
    }
    if (localStorage.card4X == "NaN" || localStorage.card4Y == "NaN" || localStorage.card4X == null || localStorage.card4Y == null) {
      localStorage.card4X = 2;
      localStorage.card4Y = 2;
    }
    if (localStorage.card5X == "NaN" || localStorage.card5Y == "NaN" || localStorage.card5X == null || localStorage.card5Y == null) {
      localStorage.card5X = 2;
      localStorage.card5Y = 2;
    }
    if (localStorage.firstVisit == "NaN" || localStorage.firstVisit == null) {
      localStorage.firstVisit = "true";
    }
    if (localStorage.cardHeight == "NaN" || localStorage.cardHeight == null) {
      localStorage.cardHeight = 400;
    }
  });

  // useEffect(() => {
  //   async function fetchUser() {
  //     const fullResponse = await fetch("http://localhost:3001/checkUser", { credentials: "include" });
  //     const responseJson = await fullResponse.json().then(setloadData(true));
  //     setUser(responseJson);
  //     // Axios(
  //     //   {
  //     //     method: "get",
  //     //     withCredentails: true,
  //     //     url: "http://localhost:3001/checkUser",
  //     //   }
  //     // ).then((response) => {
  //     //   console.log(response.data);
  //     //   setUser(response.data);
  //     // });
  //   }
  //   fetchUser();
  // }, [user]);

  // window.addEventListener("popstate", () => {
  //   history.go(1);
  // });

  var finalAVG;

  const [avgStar, setAVGStar] = useState();

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    if (loading == false && user) {
      Axios.post("http://localhost:3001/getFeedback", {
      }).then((res) => {
        var avg = (res.data.map((number) => {
          return "Star: ", number.star;
        }));

        var sum = 0;

        for (let num of avg) {
          sum = sum + num;
        }

        finalAVG = sum / avg.length;

        setAVGStar(finalAVG);

      });
    }
  });

  const style = {
    width: "40%",
    '@media (max-width: 1000px)': {
      width: "100%"
    },
  };


  if (loading == true && localStorage.firstVisit == "true") {
    return (
      <div style={{ height: "100vh", width: "100vw", backgroundColor: "#030403", alignItems: "center", display: "flex", justifyContent: "center" }}>
        <StyleRoot style={{ height: "100vh", width: "100vw", backgroundColor: "#030403", alignItems: "center", display: "flex", justifyContent: "center" }}>
          <img style={style} src={loadingLogo} alt="loading..."></img>
        </StyleRoot>
      </div>
    )
  }

  if (user) {
    return (
      <Router>
        <div className="app-container">
          <ReactNotification />
        </div>
        <Switch>
          <Route path="/" render={(props) => (user == "none" ? <Home {...props} avgStar={avgStar} /> : <Redirect to={{ pathname: "/dashboard" }}></Redirect>)} exact></Route>
          <Route path="/Home" render={(props) => (<Home {...props} avgStar={avgStar} />)} exact></Route>
          <Route path="/signin" render={(props) => <SignIn {...props} user={user} />} exact></Route>
          <Route path="/Reset" component={Reset} ></Route>
          <ProtectedRoute path="/Dashboard" user={user} component={Dashboard} exact></ProtectedRoute>
          <ProtectedRoute path="/History" exact user={user} component={History}></ProtectedRoute>
          <ProtectedRoute path='/Inventory' exact user={user} component={Inventory} />
          <ProtectedRoute path='/Profile' exact user={user} component={Feedback} />
          <ProtectedRoute path='/Trade' exact user={user} component={Search} />
          <ProtectedRoute path='/Sell' exact user={user} component={Sell} />
          <Route path="*" component={() => "404 page not found"}></Route>
        </Switch>
      </Router>
    )
  }
  else {
    return (
      <div style={{ height: "100vh", width: "100vw", backgroundColor: "#030403", alignItems: "center", display: "flex", justifyContent: "center" }}>
        <StyleRoot style={{ height: "100vh", width: "100vw", backgroundColor: "#030403", alignItems: "center", display: "flex", justifyContent: "center" }}>
          <img style={style} src={loadingLogo} alt="loading..."></img>
        </StyleRoot>
      </div>
    )
  }




  // if (user == "none") {
  //   return (
  //     <Router>
  //       <div className="app-container">
  //         <ReactNotification />
  //       </div>
  //       <Switch>
  //         <Route path="/" component={user == "none" ? Home : Dashboard} exact></Route>
  //         <Route path="/Home" component={Home} exact></Route>
  //         <Route path="/signin" component={SigninPage} exact></Route>
  //         <ProtectedRoute path="/dashboard" component={Dashboard} exact></ProtectedRoute>
  //         <Route path="/Profile" exact component={Profile}></Route>
  //         <Route path='/Inventory' exact component={Inventory} />
  //         <Route path='/Feedback' exact component={Feedback} />
  //         <Route path='/Search' exact component={Search} />
  //         <Route path='/Sell' exact component={Sell} />
  //       </Switch>
  //     </Router>
  //   )
  // }
  // else {
  //   return (
  //     <Router>
  //       <Switch>
  //         <Route path="/" component={Dashboard} exact></Route>
  //         <Route path="/Home" component={Home} exact></Route>
  //         <Route path="/Profile" exact component={Profile}></Route>
  //         <Route path='/Inventory' exact component={Inventory} />
  //         <Route path='/Feedback' exact component={Feedback} />
  //         <Route path='/Search' exact component={Search} />
  //         <Route path='/Sell' exact component={Sell} />
  //       </Switch>
  //     </Router>
  //   )
  // }


}

export default App;
