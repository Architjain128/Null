import React, { useCallback, useState, useEffect } from 'react';
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
// import CustomNodeView from './customNodesView.js';


import "reactflow/dist/style.css";
import { nodes as initialNodes } from "./data.jsx";

const nodeTypes = {
  child: CustomNodeEdit,
  // parent: ({ nodes, setNodes }) => (
  //   <ParentNode nodes={nodes} setNodes={setNodes} />
  // ),
  parent:ParentNode,
    // childView: CustomNodeView,
};
const initialEdges = [
  { id: 'edge-1', source:'1_0', target:'2_0' ,sourceHandle: '1_0_r'},
  // { id: 'edge-2', sourceHandle: '1_1_r', targetHandle: '2_2_l'},
];

export default function Canvas() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  useEffect(() => {
  setEdges([
    {
      id: 'edge-1', source: "2_1", sourceHandle: "2_1_r", target: "1_1",
      type: 'straight',
      // animated: true,
      // style: { stroke: 'black' },
    },
  ]);
}, []);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  // const onConnect = useCallback(
  //   (connection) => setEdges((eds) => addEdge(connection, eds)),
  //   [setEdges]
  // );
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: 'straight', }, eds)),
    []
  );
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      // style={rfStyle}
      />
       
    // </div>
  );
}
