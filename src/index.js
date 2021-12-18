import React from "react";
import ReactDOM from "react-dom";
import 'animate.css';
import './index.css';
import App from "./App.tsx";
import Navbar from "../src/components/Navbar/Navbar.tsx";
import CardTest from "../src/components/CardTest/CardTest.tsx";
import Unity1 from "./components/Unity/Unity.tsx";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    {/* <Navbar /> */}
    <App />
    {/* <Unity1 />
    <CardTest /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
