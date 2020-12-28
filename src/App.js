import { React, useRef, useEffect } from "react";
import "./App.css";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import { drawMesh } from "./utilities";

function App() {
  // setup references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // load facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });

    setInterval(() => {
      detect(net);
    }, [10]); // run detect function every 100 milliseconds
  };

  // detect function
  const detect = async (net) => {
    if (
      // checking the webcam is up and running, and we're receiving data
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth; // !typo!
      const videoHeight = webcamRef.current.video.videoHeight;

      // set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // make detections
      const face = await net.estimateFaces(video);
      // console.log(face);

      // get canvas context for drawing
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);
    }
  };

  useEffect(() => {
    runFacemesh();
  }, []);

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
