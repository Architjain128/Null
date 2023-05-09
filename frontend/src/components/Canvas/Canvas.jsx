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
import "reactflow/dist/style.css";
// import CustomNodeView from './customNodesView.js';
import { nodes as initialNodes } from "./data.jsx";

// const nodeTypes = {
//   child: (props) => <CustomNodeEdit {...props}/>,
//   parent:ParentNode,
//     // childView: CustomNodeView,
// };

const initialEdges = [
  { id: "edge-1", sourceHandle: "1_0_r", targetHandle: "2_0_l" },
  { id: "edge-2", sourceHandle: "1_1_r", targetHandle: "2_2_l" },
];

export default function Canvas({ preview, setOpen, setModalData }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  useEffect(() => {
    if (preview === true) {
      let modalData = {
        type: "preview",
        title: "Preview of JSON",
        data: {
          nodes: nodes,
          edges: edges,
        },
      };
      setModalData(modalData);
      setOpen(true);
    }
  }, [preview]);

  const handleAddArtibute = (attribute) => {
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
        <ParentNode handleAddArtibute={handleAddArtibute} {...props} />
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
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
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
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
