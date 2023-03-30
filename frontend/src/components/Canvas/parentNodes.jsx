import React, { memo } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';
import TextField from '@mui/material/TextField';
const options = [
  {
    value: 'smoothstep',
    label: 'Smoothstep',
  },
  {
    value: 'step',
    label: 'Step',
  },
  {
    value: 'default',
    label: 'Bezier (default)',
  },
  {
    value: 'straight',
    label: 'Straight',
  },
];

const datatypes = [
  {
    value: 'string',
    label: 'String',
  },
  {
    value: 'num',
    label: 'Number',
  },
  {
    value: 'date',
    label: 'Date',
  },
  {
    value: 'datetime',
    label: 'Date Time',
  },
  {
    value: 'boolean',
    label: 'Boolean',
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

function childObj(id, ctr) {
  let newObj = {
    id: id + '_' + ctr,
    type: 'child',
    position: { x: 10, y: 50 + 100 * ctr },
    data: {
      name: '',
      type: '',
      key: false,
    },
    parentNode: id,
    extent: 'parent',
    draggable: false,
    style: {
      width: 224,
    },
  };
  return newObj;
}

function ParentNode({ id, data }) {
  const onAddAtribute = (id, data) => {
    let newNode = childObj(id, data.attribute_count);
    // update att cnt
    // add newNode in nodes
  };
  return (
    <>
      <div
        style={{
          border: '1px solid black',
          height: '100%',
          weight: '100%',
        }}
      >
        <div className="custom-node__header">
          <input
            style={{
              border: '1px grey solid',
              borderRadius: '2px',
              fontSize: '18px',
              width: '150px',
            }}
            value={data.tableName}
          />
          <button
            onClick={(e) => {
              onAddAtribute(id);
            }}
          >
            add attribute
          </button>
        </div>
        <hr />
      </div>
    </>
  );
}

export default memo(ParentNode);
