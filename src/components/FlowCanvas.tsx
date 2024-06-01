import type { Connection, Edge, NodeChange, OnSelectionChangeFunc } from "reactflow";
import { useCallback, useContext, useRef } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes } from "./../nodes";
import { edgeTypes } from "./../edges";
import { ItemType } from "./NodesPanel";
import { useDrop } from 'react-dnd';
import { EdgeContext, NodesContext, SelectedNodeContext } from "../context/nodeContext";

export default function FlowCanvas() {
  const { _, setSelectedNode } = useContext(SelectedNodeContext);
  const { nodes, setNodes } = useContext(NodesContext);
  const { edges, setEdges } = useContext(EdgeContext);
  const nodeCount = useRef<number>(nodes.length + 1);

  // Handle node changes
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds: Node<any>[]) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // Handle new connections
  const onConnect = useCallback(
    (connection: Edge | Connection) => setEdges((eds: Edge[]) => addEdge({ ...connection, type: 'pointedEdge' }, eds)),
    [setEdges]
  );

  // Handle selection change
  const onSelectionChange: OnSelectionChangeFunc = (selectedItems: any) => {
    const selectedNode = selectedItems.nodes[0] || {};
    setSelectedNode(selectedNode?.id ?? null);
  };

  // Handle drag and drop
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        const position = {
          x: offset.x - 200, // Adjust for side panel width
          y: offset.y - 700,
        };
        const newNode: Node = {
          id: `node-${nodeCount.current}-${Math.floor(Math.random() * 1000)}`,
          type: item?.type || 'draggableNode',
          position,
          data: { label: `${item?.label || "New Message"}` },
        };
        nodeCount.current++; // Increment node count for next node
        setNodes((nds: Node[]) => nds.concat(newNode));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} style={{ width: '80%', height: '95%' }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onSelectionChange={onSelectionChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 5 }}
      >
        <MiniMap />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
