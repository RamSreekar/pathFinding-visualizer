function aStar(rows, cols, startNode, endNode) {
  console.log("End Node : ");
  console.log(endNode);
  let toVisit = [];
  let visitedNodes = [];
  let path = [];

  let isVisited = new Array(rows);
  for (let i = 0; i < rows; i++) {
    isVisited[i] = new Array(cols);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      isVisited[i][j] = false;
    }
  }

  toVisit.push(startNode);

  while (toVisit.length > 0) {
    let minIndex = 0;
    for (let i = 0; i < toVisit.length; i++) {
      if (toVisit[i].f < toVisit[minIndex].f) {
        minIndex = i;
      }
    }
    //console.log("minIndex : " + minIndex);
    let currentNode = toVisit[minIndex];

    // console.log("currentNode : ");
    // console.log(currentNode);

    if (currentNode.isEndNode) {
      console.log("DONE !!! Found PATH");

      let temp = currentNode;
      path.push(temp.previous);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }

      //console.log(path);

      return {
        path: path,
        visitedNodes: visitedNodes,
        reachedGoal: true,
      };
    }

    toVisit = toVisit.filter((node) => node !== currentNode);

    // console.log("toVisit : ");
    // console.log(...toVisit);
    visitedNodes.push(currentNode);
    // console.log("visitedNodes : ");
    // console.log(...visitedNodes);
    isVisited[currentNode.x][currentNode.y] = true;

    let neighbours = currentNode.neighbours;
    // console.log("neighbours : ");
    // console.log(...neighbours);

    for (let i = 0; i < neighbours.length; i++) {
      let curNeighbour = neighbours[i];
      let row = curNeighbour.x;
      let col = curNeighbour.y;

      if (!isVisited[row][col] && !curNeighbour.isWall) {
        let tempG = currentNode.g + 1;
        let newPath = false;

        if (toVisit.includes(curNeighbour)) {
          if (tempG < curNeighbour.g) {
            curNeighbour.g = tempG;
            newPath = true;
          }
        } else {
          curNeighbour.g = tempG;
          newPath = true;
          toVisit.push(curNeighbour);
        }

        if (newPath) {
          curNeighbour.h = heuristic(curNeighbour, endNode);
          curNeighbour.f = curNeighbour.g + curNeighbour.h;
          curNeighbour.previous = currentNode;
        }
      }
    }
  }
}

function heuristic(node1, node2) {
  let heuristicValue =
    Math.abs(node1.x - node1.y) + Math.abs(node2.x - node2.y);
  return heuristicValue;
}

export default aStar;
