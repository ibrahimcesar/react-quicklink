import React from "react";
import { render } from "react-dom";
import { Quicklink } from "./lib";

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <h1>Oh, hi mark!</h1>
    <Quicklink />
  </div>
);

render(<App />, document.getElementById("root"));
