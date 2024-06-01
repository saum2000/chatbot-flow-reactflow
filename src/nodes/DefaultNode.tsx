import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";

export type DefaultNodeData = {
  label?: string;
};

export function DefaultNode({
  data, type
}: NodeProps<DefaultNodeData>) {

  return (

    <>
      <div className="shadow-md rounded-md bg-white border-2 border-stone-400 w-44">
        <div className={`py-2 px-1 flex gap-2 items-center justify-center  w-full ${type == "alert" ? "bg-red-500" : "bg-indigo-300"}`}>
          <div className="rounded-full h-4 w-4 flex justify-around items-center bg-gray-100">
            <img src="src/assets/images/message.svg" height="10px" width="10px" />
          </div>
          <div className={`font-bold text-medium ${type == "alert" ? "text-white" : "text-indigo-900"}`}>
            {type == "alert" ? 'Alert' : 'Message'}
          </div>
        </div>

        <div className="text-gray-500 text-xs leading-4 p-2 text-left">{data.label}</div>

      </div>

      <Handle type="source" position={Position.Right} className={`w-2 rounded-none ${type == "alert"? "bg-red-500" :"bg-indigo-400"}`} />
      <Handle type="target" position={Position.Left} className={`w-2 rounded-none ${type == "alert"? "bg-red-500" :"bg-indigo-400"}`} />
    </>
  );
}
