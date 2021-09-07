import React from "react";

import "./Node.css";

const Node = ({ isStartNode, isEndNode, col, row, isWall }) => {
  const startOrEndclass = isStartNode
    ? "start-node"
    : isWall
    ? "is-wall"
    : isEndNode
    ? "end-node"
    : "";
  return (
    <div className={`node ${startOrEndclass}`} id={`node-${row}-${col}`}></div>
  );
};

export default Node;
