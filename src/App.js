import { React, useRef } from "react";
import "./App.css";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  return (
    <div className="app">
      <div className="app_header">
        <Webcam className="webcam" ref={webcamRef} />
        <canvas className="canvas" ref={canvasRef} />
      </div>
    </div>
  );
}

export default App;
