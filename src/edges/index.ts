import { type Edge, type EdgeTypes } from "reactflow";
import PointedEdge from "./PointedEdge";

export const initialEdges = [

] satisfies Edge[];

export const edgeTypes = {
   pointedEdge: PointedEdge
} satisfies EdgeTypes;
