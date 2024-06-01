import { useContext } from 'react';
import '../styles/nodesPanel.css';
import { useDrag } from 'react-dnd';
import { SelectedNodeContext } from '../context/nodeContext';
import SelectedNode from './SelectedNode';
import { NodeType, nodePanelNodeTypes } from '../nodes';


const ItemType = 'NODE';

export default function NodesPanel() {
    const { selectedNode } = useContext(SelectedNodeContext);

    return (
        <div
            className='new-node'
        >
            <h2 className='mb-2 text-xl font-semibold'>
                {selectedNode ? "Settings Panel": "Nodes Panel"}
            </h2>
            <hr/>
            {selectedNode ? (
                <SelectedNode selectedNode={selectedNode} />
            ) : (
                nodePanelNodeTypes.map((node: NodeType, index: number) => (
                    <DraggableNode key={index} node={node} />
                ))
            )}
        </div>
    );
}

const DraggableNode: React.FC<{ node: NodeType }> = ({ node }) => {
    const [, drag] = useDrag(() => ({
        type: ItemType,
        item: { type: node.type, label: node.label },
    }));

    return (
          <div
            ref={drag}
            className='draggable-node'
          > 
            <div className="shadow-md rounded-md bg-white border-2 border-stone-400">
                <div className={`py-2 px-1 flex gap-2 items-center justify-center  w-full ${node.type == "alert" ? "bg-red-500" : "bg-indigo-300"}`}>
                    <div className="rounded-full h-4 w-4 flex justify-around items-center bg-gray-100">
                        <img src="assets/message.svg" height="10px" width="10px" />
                    </div>
                    <div className={`font-bold text-medium ${node.type == "alert" ? "text-white" : "text-indigo-900"}`}>
                        {node.type == "alert" ? 'Alert' : 'Message'}
                    </div>
                </div>

                <div className="text-gray-500 text-xs leading-4 p-2 text-left">{node.label}</div>

            </div>
        </div>
    );
};

export { ItemType };