function dfs(rows, cols, startNode, endNode) {
  console.log("rows : " + rows);
  console.log("cols : " + cols);
  let visited = new Array(rows);
  for (let i = 0; i < rows; i++) {
    visited[i] = new Array(cols);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      visited[i][j] = false;
    }
  }

  var obj = {
    isVisited: visited,
    visitedNodes: [],
    path: [],
    reachedGoalNode: false,
  };

  //console.log("startNode(x,y) : " + startNode.x + " & " + startNode.y);
  obj.isVisited[0][0] = true;
  obj.path.push(startNode);
  obj.visitedNodes.push(startNode);
  dfsHelper(startNode, obj);

  return {
    path: obj.path,
    visitedNodes: obj.visitedNodes,
    reachedGoal: obj.reachedGoalNode,
  };
}

function dfsHelper(node, obj) {
  let curNode = node;

  for (let node of curNode.neighbours) {
    const row = node.x;
    const col = node.y;

    if (!obj.isVisited[row][col] && !node.isWall && !obj.reachedGoalNode) {
      obj.isVisited[row][col] = true;
      obj.visitedNodes.push(node);
      obj.path.push(node);
      if (node.isEndNode) {
        console.log("DONE...Path found !!!!");
        obj.reachedGoalNode = true;
        return;
      }
      dfsHelper(node, obj);
    } //else console.log(row + "-" + col + " VISITED");
  }
}
export default dfs;

/*
function dfsHelperOld(row, col, visited, rows, cols, startNode, endNode, path) {
  if (!visited[row][col]) {
    visited[row][col] = true;
    console.log(row + " - " + col);

    if (row === rows - 1 && col === cols - 1) {
      console.log("DFS - Path Found!!!");
      console.log(row + " & " + col);
    }

    if (row > 0)
      dfsHelper(row - 1, col, visited, rows, cols, startNode, endNode, path);
    if (row < 4)
      dfsHelper(row + 1, col, visited, rows, cols, startNode, endNode, path);
    if (col > 0)
      dfsHelper(row, col - 1, visited, rows, cols, startNode, endNode, path);
    if (col < 4)
      dfsHelper(row, col + 1, visited, rows, cols, startNode, endNode, path);
  }
}
*/
