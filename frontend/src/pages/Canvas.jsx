import React from "react";
import { CanvasContextProvider } from "../context/canvasContext";
import CanvasTest from "../components/Canvas/test";
import Canvas from "../components/Canvas/Canvas";
import Menubar from "../components/Canvas/Menubar";
import Toolbar from "../components/Canvas/Toolbar";
import "../styles/Canvas.css";

export default function CanvasPage() {
  return (
    <CanvasContextProvider>
      {/* <CanvasTest /> */}
      <div class="shell">
        <div class="menubar">
          <Menubar />
        </div>
        <div class="bottom">
          <div class="toolbar">
            <Toolbar />
          </div>
          <div class="canvas">
            <Canvas />
          </div>
        </div>
      </div>
    </CanvasContextProvider>
  );
}
