import React from "react";
import Home from "./Home";
import Go from "./Go";

export default function App() {
  console.log(window.location.pathname);

  return (
    <div className="App">
      {window.location.pathname === "/" && <Home />}
      {window.location.pathname.substr(0, 3) === "/go" && <Go />}
    </div>
  );
}
