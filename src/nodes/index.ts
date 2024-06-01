import type { Node, NodeTypes } from "reactflow";
import { DefaultNode } from "./DefaultNode";

export const initialNodes = [] satisfies Node[];

export const nodeTypes = {
  "message": DefaultNode,
  "alert": DefaultNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;

export interface NodeType {
  type: string;
  label: string;
}

export const nodePanelNodeTypes: NodeType[] = [
  { type: 'message', label: 'Message Node' },
  { type: 'alert', label: 'Alert Node' },
];
