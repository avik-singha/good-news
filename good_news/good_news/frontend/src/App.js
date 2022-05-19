﻿import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import NewsPage from "./components/Main";

import About from "./components/About/About.js";
import Map from "./components/Viz/Map.js"


const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" component={NewsPage} />
        <Route path="/About" component={About} />
        <Route path="/Map" component={Map} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default App;
