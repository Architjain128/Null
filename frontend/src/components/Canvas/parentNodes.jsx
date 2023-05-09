import React, { memo } from "react";
import { Handle, useReactFlow, useStoreApi, Position } from "reactflow";
import TextField from "@mui/material/TextField";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

const options = [
  {
    value: "smoothstep",
    label: "Smoothstep",
  },
  {
    value: "step",
    label: "Step",
  },
  {
    value: "default",
    label: "Bezier (default)",
  },
  {
    value: "straight",
    label: "Straight",
  },
];

const datatypes = [
  {
    value: "string",
    label: "String",
  },
  {
    value: "num",
    label: "Number",
  },
  {
    value: "date",
    label: "Date",
  },
  {
    value: "datetime",
    label: "Date Time",
  },
  {
    value: "boolean",
    label: "Boolean",
  },
];

function Select({ value, handleId, nodeId }) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange = (evt) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [handleId]: evt.target.value,
            },
          };
        }

        return node;
      })
    );
  };

  return (
    <div className="custom-node__select">
      <div>Edge Type</div>
      <select className="nodrag" onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Handle type="source" position={Position.Right} id={handleId} />
    </div>
  );
}

function ParentNode({ id, data, handleAddArtibute }) {
  const [buttonVisibility, setButtonVisibility] = React.useState("hidden");
  const [tableName, setTableName] = React.useState(data.tableName);

  function createChildObj(id, ctr) {
    try {
      let newObj = {
        id: id + "_" + ctr,
        type: "child",
        position: { x: 10, y: 80 + 70 * ctr },
        data: {
          name: "",
          type: "",
          key: false,
        },
        parentNode: id,
        extent: "parent",
        draggable: false,
        style: {
          width: 224,
        },
      };
      return newObj;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  const onAddAtribute = (id, data) => {
    let newNode = createChildObj(id, data.attribute_count);
    console.log(">>>",newNode)
    // if (newNode) {
    //   // nodes.append(newNode);
    //   data.attribute_count += 1;
    // }
    // update att cnt
    handleAddArtibute(newNode);
    // add newNode in nodes
  };
  return (
    <>
      <div
        style={{
          border: "1px solid black",
          height: "100%",
          width: "100%",
        }}
      >
        <div className="custom-node__header">
          <div>
            <div>
              <input
                style={{
                  border: "1px grey solid",
                  borderRadius: "2px",
                  fontSize: "18px",
                }}
                value={tableName}
                onChange={(e) => {
                  setTableName(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-between",
                width: "100%",
                gap: "10px",
              }}
            >
              <button
                style={{ flex: 1,fontSize:"10px" }}
                onClick={(e) => {
                  onAddAtribute(id, data);
                }}
              >
                Add Attribute
              </button>
              <button
                style={{ flex: 1,fontSize:"10px" }}
                onClick={(e) => {
                  // onAddAtribute(id, data);
                }}
              >
                Add Constraints 
              </button>
            </div>
          </div>
        </div>

        <hr style={{ height: "1px", margin: 0, padding: 0 }} />
      </div>
    </>
  );
}

export default memo(ParentNode);
