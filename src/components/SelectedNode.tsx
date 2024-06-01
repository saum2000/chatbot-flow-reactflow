import { useState } from "react";
import { useReactFlow } from "reactflow";


interface SelectedNodeProps {
    selectedNode: string;
}

const SelectedNode: React.FC<SelectedNodeProps> = ({ selectedNode }) => {
    const reactFlow = useReactFlow();
    const [label] = useState(reactFlow.getNode(selectedNode)?.data?.label)

    const updateText = (e: any) => {
        let newNodes = reactFlow.getNodes().map((node) => {
            if (node.id === selectedNode) {
                node.data = {
                    ...node.data,
                    label: e.target.value
                };
            }
            return node;

        })

        reactFlow.setNodes(newNodes)
    }

    return (
        <div>
            <div className="text-sm font-semibold text-indigo-900 my-4">Edit the text message to be sent.</div>
            <textarea placeholder='Enter message'
                defaultValue={label}
                onInput={updateText}
                className="p-2 text-base w-full h-40 border border-indigo-800 rounded-lg"
            ></textarea>
        </div>
    )
}

export default SelectedNode;
