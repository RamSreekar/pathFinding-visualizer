class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  printQueue() {
    //var str = "";
    for (var i = 0; i < this.items.length; i++) {
      //str += this.items[i] + " ";
      console.log(this.items[i]);
    }
    //return str;
    //console.log(str);
  }

  front() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }
}

function bfs(rows, cols, startNode, endNode) {
  var q = new Queue();

  let visited = new Array(rows);
  for (let i = 0; i < rows; i++) {
    visited[i] = new Array(cols);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      visited[i][j] = false;
    }
  }
  let obj = {
    queue: q,
    isVisited: visited,
    visitedNodes: [],
    path: [],
    reachedGoalNode: false,
  };

  //obj.isVisited[0][0] = true;
  obj.queue.enqueue(startNode);
  obj.path.push(startNode);
  obj.visitedNodes.push(startNode);
  bfsHelper(obj);

  return {
    path: obj.path.slice(),
    visitedNodes: obj.visitedNodes.slice(),
    reachedGoal: obj.reachedGoalNode,
  };
}

function bfsHelper(obj) {
  while (!obj.queue.isEmpty()) {
    //console.log("obj.isVisited[row][col] : " + obj.isVisited[0][0]);
    const node = obj.queue.dequeue();
    if (node.isEndNode) {
      console.log("DONE...Path found !!!!");
      obj.reachedGoalNode = true;
      return;
    }
    const row = node.x;
    const col = node.y;
    if (!obj.isVisited[row][col] && !node.isWall && !obj.reachedGoalNode) {
      obj.isVisited[row][col] = true;
      obj.path.push(node);
      obj.visitedNodes.push(node);

      for (let i = 0; i < node.neighbours.length; i++) {
        obj.queue.enqueue(node.neighbours[i]);
      }
    }
  }
}

export default bfs;
