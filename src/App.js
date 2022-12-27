import React, { useEffect, useRef, useState } from "react";
import { handleClick, onGenerateRandomNumber } from "./utility";
import { onPlaceDiv, handleMove, onClear } from "./utility";

function App() {
  const [divsCordinates, setDivsCordinates] = useState([]);
  const [currentDiv, setCurrentDiv] = useState(null);
  const [speed, setSpeed] = useState(0);
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
    childDiv.setAttribute("tabindex", "0");
    childDiv.addEventListener("click", (e) => {
      handleClick(e, setCurrentDiv, parentDiv);
    });
    setDivsCordinates((state) => {
      return [...state, currentCordinates];
    });
  };

  useEffect(() => {
    if (!currentDiv) return;
    currentDiv.addEventListener("keyup", (e) => {
      handleMove(e, currentDiv, speed);
    });
    return window.removeEventListener("keyup", (e) => {
      handleMove(e, currentDiv, speed);
    });
  });
  return (
    <div className="appWrapper">
      <div className="canvas" ref={canvas}></div>
      <div className="controlPanelContainer">
        <label>Speed</label>
        <input onChange={(e) => setSpeed(Number(e.target.value))}></input>
        <button onClick={onAddDiv}>Add</button>
        <button onClick={() => onClear(canvas.current)}>Clear</button>
      </div>
    </div>
  );
}

export default App;
