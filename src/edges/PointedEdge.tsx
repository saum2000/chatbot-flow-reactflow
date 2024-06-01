import React from 'react';
import { BaseEdge, EdgeProps, getBezierPath } from 'reactflow';

const PointedEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd="url(#arrowhead)"
        style={{marginRight:'1rem'}}
      />
      <svg>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="8"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#000" />
          </marker>
        </defs>
      </svg>
    </>
  );
};

export default PointedEdge;
