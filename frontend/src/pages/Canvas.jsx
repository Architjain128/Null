import React from "react";
import { CanvasContextProvider } from "../context/canvasContext";
import CanvasTest from "../components/Canvas/test";
import Canvas from "../components/Canvas/Canvas";
import Menubar from "../components/Canvas/Menubar";
import Toolbar from "../components/Canvas/Toolbar";
import "../styles/Canvas.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, Typography } from "@mui/material";

export default function CanvasPage() {
  const [preview, setPreview] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState({ type: "", data: "" });

  const exportJSON = (data) => {};

  return (
    // <CanvasContextProvider>
    <div class="shell">
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        scroll="paper"
      >
        <DialogTitle>{modalData.title}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            {modalData.type === "preview" ? (
              <>
                <div
                  style={{
                    width: "500px",
                    overflowY: "hidden",
                    padding: "5px",
                  }}
                >
                  <Typography>Nodes</Typography>
                  <div
                    style={{
                      height: "100%",
                      background: "#242424",
                      color: "white",
                    }}
                  >
                    <pre>{JSON.stringify(modalData.data.nodes, null, 2)}</pre>
                  </div>
                  <Divider />
                  <Typography>Edges</Typography>
                  <div
                    style={{
                      height: "100%",
                      background: "#242424",
                      color: "white",
                    }}
                  >
                    <pre>{JSON.stringify(modalData.data.edges, null, 2)}</pre>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {}}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <div class="menubar">
        <Menubar
          preview={preview}
          setPreview={setPreview}
          open={open}
          setModalData={setModalData}
        />
      </div>
      <div class="bottom">
        <div class="toolbar">
          <Toolbar />
        </div>
        <div class="canvas">
          <Canvas
            preview={preview}
            setOpen={setOpen}
            setModalData={setModalData}
          />
        </div>
      </div>
    </div>
    // </CanvasContextProvider>
  );
}
