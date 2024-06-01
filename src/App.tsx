import { useCallback, useEffect, useState } from "react";
import { EdgeContext, NodesContext, SelectedNodeContext } from "./context/nodeContext";
import { Node, Edge, ReactFlowProvider, useNodesState, useEdgesState } from "reactflow";
import { initialNodes } from "./nodes";
import NodesPanel from "./components/NodesPanel";
import FlowCanvas from "./components/FlowCanvas";
import DragDropContext from "./components/utils/DragDropContext";
import { initialEdges } from "./edges";
import Header from "./components/Header";

export default function App() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const [savedNodes, setSavedNodes] = useState<Node[]>([]);
  const [savedEdges, setSavedEdges] = useState<Edge[]>([]);

  const [showToast, setShowToast] = useState("")

  // Function to load data from local storage
  const getLocalStoreData = useCallback(() => {
    const storedNodes = localStorage.getItem("flowNodes");
    const storedEdges = localStorage.getItem("flowEdges");
    if (storedNodes) {
      setSavedNodes(JSON.parse(storedNodes));
    }
    if (storedEdges) {
      setSavedEdges(JSON.parse(storedEdges));
    }
  }, []);

  // Check if all nodes are connected
  const areAllNodesConnected = useCallback(() => {
    // Create a set of node ids that are in the edges
    const connectedNodes = new Set<string>();

    edges.forEach((edge: Edge) => {
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    });

    // Check if all nodes are in the set of connected nodes
    return nodes.every(node => connectedNodes.has(node.id));
  }, [nodes, edges]);

  // Function to save data to local storage
  const saveJsonToLocalStorage = useCallback(() => {
    if (nodes.length>1 && !areAllNodesConnected()) {
      setShowToast("error")
      return;
    }

    localStorage.setItem("flowNodes", JSON.stringify([...nodes]));
    localStorage.setItem("flowEdges", JSON.stringify([...edges]));
    setShowToast("success")
  }, [nodes, edges, areAllNodesConnected]);

  // Load data from local storage on component mount
  useEffect(() => {
    getLocalStoreData();
  }, [getLocalStoreData]);

  // Close toast after 5 seconds
  useEffect(() => {
    if (showToast.length) {
      setTimeout(() => {
        setShowToast("")
      }, 5000)
    }
  }, [showToast])

  // Restore saved nodes on component mount
  useEffect(() => {
    if (savedNodes.length > 0) {
      setNodes(savedNodes);
    }
  }, [savedNodes, setNodes]);

  // Restore saved edges on component mount
  useEffect(() => {
    if (savedEdges.length > 0) {
      setEdges(savedEdges);
    }
  }, [savedEdges, setEdges]);

  return (
    <>
      <ReactFlowProvider>
        {/* Toast for showing save status */}
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: "1100" }}>
          <div className={`toast ${showToast ? 'show' : 'hide'} align-items-center text-white ${showToast=="success" ? "bg-green-500" : 'bg-red-500'} border-0`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body">
                {showToast == "success" &&
                  (<div>
                    Saved Successfully
                  </div>)}

                {showToast == "error" &&
                  (<div>
                    All nodes must be connected before saving.
                  </div>)}
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        </div>
        {/* Context providers for nodes, edges, and selected node */}
        <NodesContext.Provider value={{ nodes, setNodes }}>
          <EdgeContext.Provider value={{ edges, setEdges }}>
            <SelectedNodeContext.Provider value={{ selectedNode, setSelectedNode }}>
              {/* Drag and drop context for nodes */}
              <DragDropContext>
                {/* Header component with save button */}
                <Header saveJsonToLocalStorage={saveJsonToLocalStorage} />
                {/* Main canvas for displaying nodes and edges */}
                <FlowCanvas />
                {/* Panel for displaying and selecting nodes */}
                <NodesPanel />
              </DragDropContext>
            </SelectedNodeContext.Provider>
          </EdgeContext.Provider>
        </NodesContext.Provider>
      </ReactFlowProvider>
    </>
  );
}
