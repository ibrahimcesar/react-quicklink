import React, { Fragment } from "react";
import { render } from "react-dom";
import { Quicklink } from "./lib";

const App = () => (
  <Fragment>
    <section style={{ width: 640, margin: "15px auto", height: "100vh" }}>
        <h1>Oh, hi mark!</h1>
        <Quicklink to="https://google.com" alt="Alt" title="Title">Link</Quicklink>
      </section>

    <section style={{height: "500px"}}>
      <Quicklink to="https://example.com" alt="Alt" title="Title" content="I will Fetch example.com!"/>
    </section>
  </Fragment>

);

render(<App />, document.getElementById("root"));
