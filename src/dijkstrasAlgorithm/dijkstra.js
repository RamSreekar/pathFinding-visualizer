// Performs Dijkstra's algorithm, returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the end node.

function dijkstraHelper(grid, rows, cols, startNode, endNode) {
  let visited = new Array(rows);

  for (let i = 0; i < rows; i++) {
    visited[i] = new Array(cols);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      visited[i][j] = false;
    }
  }

  const visitedNodesInOrder = [];
  startNode.distance = 0;
  let unvisitedNodes = getAllNodes(grid, rows, cols);

  while (!!unvisitedNodes.length) {
    console.log("Inside while loop");
    let res = [];
    res = sortNodesByDistance(unvisitedNodes);
    unvisitedNodes = res;
    const closestNode = unvisitedNodes.shift();
    console.log("unvisitedNodes : ");
    console.log(unvisitedNodes);
    console.log("closestNode : ");
    console.log(closestNode);
    if (closestNode.isWall) continue;

    if (closestNode.distance === Infinity) {
      console.log("if dist == -1 => YESS");
      return visitedNodesInOrder;
    }
    console.log("line 40");
    closestNode.isVisited = true;
    let r = closestNode.x;
    let c = closestNode.Array;
    visited[r][c] = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode.isEndNode) return visitedNodesInOrder;
    console.log("before calling updateUnvisitedNeighbors");
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  return unvisitedNodes;
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previous = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = node.neighbours;
  //   const { col, row } = node;
  //   if (row > 0) neighbors.push(grid[row - 1][col]);
  //   if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  //   if (col > 0) neighbors.push(grid[row][col - 1]);
  //   if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid, rows, cols) {
  const nodes = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      nodes.push(grid[r][c]);
    }
  }
  return nodes;
}

// Backtracks from the endNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
function getNodesInShortestPathOrder(endNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    //if (currentNode.isWall) continue;
    console.log("currentNode : ");
    console.log(currentNode);
    nodesInShortestPathOrder.unshift(currentNode);
    if (currentNode.isStartNode) break;
    currentNode = currentNode.previous;
  }
  return nodesInShortestPathOrder;
}

function dijkstra(grid, rows, cols, startNode, endNode) {
  const visitedNodes = dijkstraHelper(grid, rows, cols, startNode, endNode);
  const pathTraversed = getNodesInShortestPathOrder(endNode);
  console.log("Path Traversed : ");
  console.log(pathTraversed);
  console.log("visitedNodes : ");
  console.log(visitedNodes);
  return {
    path: pathTraversed,
    visitedNodes: visitedNodes,
    reachedGoal: true,
  };
}

export default dijkstra;
