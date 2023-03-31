import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import ParentNode from "./parentNodes.jsx";
import CustomNodeEdit from "./customNodesEdit.jsx";
// import CustomNodeView from './customNodesView.js';

import "reactflow/dist/style.css";
import { nodes as initialNodes, edges as initialEdges } from "./data.jsx";

const nodeTypes = {
  child: CustomNodeEdit,
  // parent: ({ nodes, setNodes }) => (
  //   <ParentNode nodes={nodes} setNodes={setNodes} />
  // ),
  parent:ParentNode,
    // childView: CustomNodeView,
};

export default function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
