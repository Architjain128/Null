import React, { useCallback, useState, useMemo, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import ParentNode from "./parentNodes.jsx";
import CustomNodeEdit from "./customNodesEdit.jsx";
import CustomEdge from "./customEdges.jsx";
// import CustomNodeView from './customNodesView.js';
import "reactflow/dist/style.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Select, MenuItem } from "@mui/material";
import { nodes as initialNodes, edges as initialEdges } from "./data.jsx";
import { Typography, FormControl, InputLabel, Chip } from "@mui/material";

const constraintsBox = [
  {
    id: "0",
    label: "Not Null",
    field: "not_null",
    type: "array",
  },
  {
    id: "1",
    label: "Unique",
    field: "unique",
    type: "array",
  },
  {
    id: "2",
    label: "Primary Key",
    field: "primary_key",
    type: "array",
  },
  {
    id: "3",
    label: "Candidate Key",
    field: "candidate_key",
    type: "2Darray",
  },
  {
    id: "4",
    label: "Foreign Key",
    field: "foreign_key",
    type: "2Darray",
  },
  {
    id: "5",
    label: "Default",
    field: "default",
    type: "arrayObj",
    obj: {
      attribute_name: "",
      value: "",
    },
  },
  {
    id: "6",
    label: "Check",
    field: "check",
    type: "arrayObj",
    obj: {
      attribute_name: "",
      condition: "",
    },
  },
];

const types = [
  {
    value: "1:1",
    label: "one to one",
  },
  {
    value: "1:n",
    label: "one to many",
  },
  {
    value: "n:1",
    label: "many to one",
  },
  {
    value: "m:n",
    label: "many to many",
  },
];

const attributes = ["attribute1", "attribute2", "attribute3", "attribute4"];

export default function Canvas({
  count,
  setCount,
  preview,
  setOpen,
  setModalData,
  // nodes,
  // edges,
  // setNodes,
  // setEdges,
}) {
  const [constraints, setConstraints] = React.useState({});
  const [tableId, setTableId] = React.useState("");
  const [tableData, setTableData] = React.useState([]);

  const handleChangeConstraint = (event, name) => {
    console.log(event.target.value,name,tableId)
    let temp = constraints;
    if(!temp[tableId]){
      temp[tableId] = {};
    }
    let tmp= temp[tableId];
    if (!tmp[name]) {
      tmp[name] = [];
    }
    tmp[name] = event.target.value;
    setConstraints(temp);
  };

  const [nodes, setNodes] = React.useState(initialNodes);
  const [edges, setEdges] = React.useState(initialEdges);
  const [eOpen, setEOpen] = useState(false);
  const [eName, setEName] = useState("");
  const [eType, setEType] = useState("1:1");
  const [eData, setEData] = useState({});

  useEffect(() => {
    console.log("nodes", nodes);
    localStorage.setItem(
      "null-db1-data",
      JSON.stringify({
        nodes: nodes,
        edges: edges,
      })
    );
  }, [nodes, edges]);

  useEffect(() => {  
    if (preview === true) {
      let modalData = {
        type: "preview",
        title: "Preview of JSON",
        data: {
          nodes: nodes,
          edges: edges,
          constraints: constraints,
          // constraints: tableData,
        },
      };
      setModalData(modalData);
      setOpen(true);
    }
  }, [preview]);

  const addNode = () => {
    let tmp = {
      id: count.toString(),
      type: "parent",
      position: { x: 200, y: 10 },
      data: {
        tableName: "table " + count.toString(),
        link_to_file: "/",
        attribute_count: 0,
      },
      style: {
        width: 244,
        height: 60,
      },
    };
    console.log(tmp);
    setNodes((eds) => eds.concat(tmp));
    setCount(count + 1);
  };

  const handleAddArtibute = (attribute) => {
    let nodes = JSON.parse(localStorage.getItem("null-db1-data")).nodes || [];
    let allNodes = nodes;
    let parent = nodes.filter((x) => x.id === attribute.parentNode)[0];
    parent.data.attribute_count++;
    parent.style.height += 70;
    allNodes.push(attribute);
    setNodes(allNodes);
  };

  const handleArtibuteChange = (id, data) => {
    console.log(data);
    let allNodes = nodes;
    let node = nodes.filter((x) => x.id === id)[0];
    node.data = data;
    setNodes(allNodes);
    console.log(allNodes);
  };

  const nodeTypes = useMemo(
    () => ({
      child: (props) => (
        <CustomNodeEdit
          handleArtibuteChange={handleArtibuteChange}
          nodes={nodes}
          setNodes={setNodes}
          {...props}
        />
      ),
      parent: (props) => (
        <ParentNode
          handleAddArtibute={handleAddArtibute}
          handleTableDataChange={handleArtibuteChange}
          deleteTable={deleteTable}
          setTableId={setTableId}
          setConstraints={setTableData}
          {...props}
        />
      ),
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      buttonedge: (props) => (
        <CustomEdge
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
          {...props}
        />
      ),
    }),
    []
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => {
      console.log(connection);
      let nodes = JSON.parse(localStorage.getItem("null-db1-data")).nodes || [];
      console.log(nodes);
      let data = {};
      let tb1ID = connection.source.split("_")[0];
      let fk1ID =
        connection.source.split("_")[0] + "_" + connection.source.split("_")[1];
      let tb2ID = connection.target.split("_")[0];
      let fk2ID =
        connection.target.split("_")[0] + "_" + connection.target.split("_")[1];
      data.tb1 = nodes.filter((x) => x.id === tb1ID)[0].data.tableName;
      data.tb2 = nodes.filter((x) => x.id === tb2ID)[0].data.tableName;
      data.fk1 = nodes.filter((x) => x.id === fk1ID)[0].data.name;
      data.fk2 = nodes.filter((x) => x.id === fk2ID)[0].data.name;
      data.source = connection.source;
      data.target = connection.target;
      data.sourceHandle = connection.sourceHandle;
      data.targetHandle = connection.targetHandle;
      data.id = "edge_" + connection.source + "_" + connection.target;
      data.type = "buttonedge";
      data.RType = eType;
      console.log(data);
      setEData(data);
      setEOpen(true);
    },
    [setEdges]
  );

  const deleteTable = (id) => {
    let newNode = nodes.filter((x) => x.id.split("_")[0] != id.toString());
    let newEdge = edges.filter(
      (x) =>
        x.source.split("_")[0] != id.toString() &&
        x.target.split("_")[0] != id.toString()
    );
    // console.log(newNode)
    setNodes(newNode);
    setEdges(newEdge);
  };
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          position: "absolute",
          background: "rgba(200,200,200, 0.8)",
          padding: "10px",
          maxWidth: "400px",
          minWidth: "200px",
          zIndex: 100,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Button variant="contained" color="info" fullWidth onClick={addNode}>
          Add a node
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "space-between",
            width: "100%",
            gap: "4px",
          }}
        >
          <Button
            style={{ flex: 1 }}
            variant="contained"
            color="info"
            fullWidth
            onClick={() => {}}
          >
            Undo
          </Button>
          <Button
            style={{ flex: 1 }}
            variant="contained"
            color="info"
            fullWidth
            onClick={() => {}}
          >
            Redo
          </Button>
        </div>
        {tableId === "" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",
              borderRadius: "5px",
              padding: "5px",
              margin: "5px",
              backgroundColor: "cyan",
            }}
          >
            <div
              style={{
                padding: "5px",
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: "5px",
                maxWidth:"200px",
                textAlign: "center",
              }}
            >
            Select a table and click on <strong>Add Constraints</strong>  to add constraints for that table.
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              border: "1px solid black",
              borderRadius: "5px",
              padding: "5px",
              margin: "5px",
              backgroundColor: "cyan",
            }}
          >
            CONSTRAINTS for <strong>{tableData.table.name}</strong>
            <div
            key={constraints}
              style={{
                width: "100%",
              }}
            >
              {constraintsBox.map((obj) => {
                return (
                  <div
                    style={{
                      margin: "2px",
                      border: "1px solid grey",
                      padding: "5px",
                    }}
                  >
                    <Typography variant="subtitle" gutterBottom>
                      {obj.label}
                    </Typography>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      multiple={true}
                      value={constraints[tableId.toString()] && constraints[tableId.toString()][obj.field] ? constraints[tableId.toString()][obj.field]:[{id:"12_1",name:"fef"},{id:"12_2",name:"fedf"}]}
                      onChange={(e) => handleChangeConstraint(e, obj.field)}
                      style={{
                        width: "100%",
                        padding: "0px",
                      }}
                      renderValue={(selected) => (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {selected.map((value) => (
                            <Chip
                              style={{ margin: 2 }}
                              key={value.id}
                              label={value.name}
                            />
                          ))}
                        </div>
                      )}
                    >
                      {tableData.attributes.map((obj) => {
                        return <option value={obj}>{obj.name}</option>;
                      })}
                    </Select>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Dialog
        open={eOpen}
        onClose={() => {
          setEOpen(false);
        }}
        scroll="paper"
      >
        <DialogTitle>Realtion</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            <div
              style={{
                width: "500px",
              }}
            >
              {/* <TextField label="Name" fullWidth defaultValue={" "} />
              <br />
              <br /> */}
              <TextField
                id="outlined-select-currency"
                select
                label="Type"
                value={eType}
                fullWidth
                required
                onChange={(e) => {
                  setEType(e.target.value);
                }}
              >
                {types.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <br />
              <TextField
                label="Foriegn Key 1"
                disabled
                defaultValue={eData.fk1}
                fullWidth
              />
              <br />
              <br />
              <TextField
                label="Foriegn Key 2"
                disabled
                defaultValue={eData.fk2}
                fullWidth
              />
              <br />
              <br />
              <TextField
                label="Table 1"
                disabled
                defaultValue={eData.tb1}
                fullWidth
              />
              <br />
              <br />
              <TextField
                label="Table 2"
                disabled
                defaultValue={eData.tb2}
                fullWidth
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setEdges((eds) => [...eds, eData]);
              setEOpen(false);
            }}
          >
            Done
          </Button>
          <Button
            onClick={() => {
              setEType("1:1");
              setEData({});
              setEOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
