import React from 'react';
import { MarkerType, Position } from 'reactflow';

export const nodes = [
  {
    id: '1',
    type: 'parent',
    position: { x: 50, y: 50 },
    data: {
      tableName: 'orgId',
      link_to_file: '/',
      attribute_count : 3, 
    },
    style: {
      width: 244,
      height: 380,
    },
  },
  {
    id: '1_0',
    type: 'child',
    position: { x: 10, y: 50 },
    data: {
      name: '_id',
      type: 'Obj',
      key: true,
    },
    parentNode: '1',
    extent: 'parent',
    draggable: false,
    style: {
      width: 224,
    },
  },
  {
    id: '1_1',
    type: 'child',
    position: { x: 10, y: 150 },
    data: {
      name: 'Name',
      type: 'string',
      key: false,
    },
    draggable: false,
    parentNode: '1',
    extent: 'parent',
    style: {
      width: 224,
    },
  },
  {
    id: '1_2',
    type: 'child',
    position: { x: 10, y: 250 },
    data: {
      name: 'val',
      type: 'num',
      key: false,
    },
    parentNode: '1',
    extent: 'parent',
    draggable: false,
    style: {
      width: 224,
    },
  },
];

export const edges = [];
