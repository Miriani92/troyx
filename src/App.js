import React, { useRef, useState } from "react";
import { onGenerateRandomNumber } from "./utility";
import { onPlaceDiv } from "./utility";

function App() {
  const [divsCordinates, setDivsCordinates] = useState([]);
  const canvas = useRef(null);

  const onAddDiv = () => {
    const parentDiv = canvas.current;
    const childDiv = document.createElement("div");
    parentDiv.appendChild(childDiv);
    childDiv.style.position = "absolute";
    childDiv.style.width = `${onGenerateRandomNumber()}px`;
    childDiv.style.height = `${onGenerateRandomNumber()}px`;

    const { marginLeft, marginTop, currentCordinates } = onPlaceDiv(
      childDiv.style.width,
      childDiv.style.height,
      divsCordinates
    );
    childDiv.style.marginLeft = `${marginLeft}px`;
    childDiv.style.marginTop = `${marginTop}px`;
    childDiv.style.borderRadius = "5px";
    childDiv.style.background = "yellow";
    setDivsCordinates((state) => {
      return [...state, currentCordinates];
    });
  };
  console.log(divsCordinates);
  return (
    <div className="appWrapper">
      <div className="canvas" ref={canvas}></div>
      <div className="controlPanelContainer">
        <label>Speed</label>
        <input></input>
        <button onClick={onAddDiv}>Add</button>
        <button>Clear</button>
      </div>
    </div>
  );
}

export default App;
