import React, { useState, useEffect, useCallback } from "react";
import Node from "./Node";
import "./PathFinder.css";
import dfs from "../dfsAlgorithm/dfs.js";
import bfs from "../bfsAlgorithm/bfs.js";
import aStar from "../aStarAlgorithm/aStar.js";
import dijkstra from "../dijkstrasAlgorithm/dijkstra.js";

const rows = 22;
const cols = 45;

const FIRST_ROW = 0;
const FIRST_COL = 0;
const LAST_ROW = rows - 1;
const LAST_COL = cols - 1;

let curAlog = dfs;

const PathFinder = () => {
  const [Grid, setGrid] = useState([]);

  const initializeGrid = useCallback(() => {
    const grid = new Array(rows);

    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }

    setGrid(grid);

    addAllNeighbours(grid);

    // console.log("Inside initialize : ");
    // console.log(Grid);
  }, []);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const addAllNeighbours = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addNeighbours(grid);
      }
    }
  };

  function Spot(i, j) {
    this.x = i;
    this.y = j;

    this.isStartNode = this.x === FIRST_ROW && this.y === FIRST_COL;
    this.isEndNode = this.x === LAST_ROW && this.y === LAST_COL;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.distance = Infinity;
    this.isVisited = false;
    this.neighbours = [];
    this.previous = undefined;
    this.isWall = false;
    //if (Math.random(1) < 0.25) this.isWall = true;
    this.addNeighbours = function (grid) {
      let i = this.x;
      let j = this.y;
      if (i > 0) this.neighbours.push(grid[i - 1][j]);
      if (i < rows - 1) this.neighbours.push(grid[i + 1][j]);
      if (j > 0) this.neighbours.push(grid[i][j - 1]);
      if (j < cols - 1) this.neighbours.push(grid[i][j + 1]);
    };
  }

  const gridWithNodes = (
    <div>
      {Grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStartNode, isEndNode, isWall } = col;
              return (
                <Node
                  key={colIndex}
                  isStartNode={isStartNode}
                  isEndNode={isEndNode}
                  row={rowIndex}
                  col={colIndex}
                  isWall={isWall}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  // console.log("GRID : ");
  // console.log(Grid);

  const setAlgorithm = (algoName) => {
    console.log("algoName : " + algoName);
    const algorithm = {
      bfs: bfs,
      dfs: dfs,
      aStar: aStar,
      dijkstra: dijkstra,
    };
    curAlog = algorithm[algoName];
    //console.log("curAlgo : " + curAlog);
  };

  const callAlgorithm = () => {
    console.log("GRID : ");
    console.log(Grid);

    const startNode = Grid[FIRST_ROW][FIRST_COL];
    const endNode = Grid[LAST_ROW][LAST_COL];

    let algoResult;
    // console.log("curAlgo : ");
    // console.log(curAlog);
    // console.log("curAlog === dijkstra : ");
    // console.log(curAlog === dijkstra);
    if (curAlog === dijkstra)
      algoResult = curAlog(Grid, rows, cols, startNode, endNode);
    else algoResult = curAlog(rows, cols, startNode, endNode);
    // setPath(dfsResult.path);
    // setVisitedNodes(dfsResult.visitedNodes);
    console.log("Alog Result : ");
    console.log(algoResult);
    let resObj;
    if (algoResult !== undefined) {
      console.log("PATH: ");
      console.log(algoResult.path);
      console.log("Visited Nodes : ");
      console.log(algoResult.visitedNodes);

      resObj = {
        resPath: algoResult.path,
        resVisitedNodes: algoResult.visitedNodes,
        reachedGoal: algoResult.reachedGoal,
      };
    } else {
      resObj = {
        resPath: [],
        resVisitedNodes: [],
        reachedGoal: false,
      };
    }

    return resObj;
  };

  const visualizeShortestPath = (shortestPath) => {
    console.log("shortest path - START");
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
      }, 10 * i);
    }
    console.log("shortest path - END");
  };

  const visualizePath = () => {
    //callAlgorithm();
    //setAlgorithm(algoName);
    const algoResult = callAlgorithm();
    console.log("Algo Reslut : ");
    console.log(algoResult);
    algoResult.reachedGoal
      ? console.log("Reached Goal")
      : console.log("Not reached Goal");
    if (algoResult.reachedGoal) {
      let path = algoResult.resPath;
      let visitedNodes = algoResult.resVisitedNodes;

      console.log("Visualize path - START");
      for (let i = 0; i <= visitedNodes.length; i++) {
        if (i === visitedNodes.length) {
          setTimeout(() => {
            visualizeShortestPath(path);
          }, 20 * i);
        } else {
          setTimeout(() => {
            const node = visitedNodes[i];
            document.getElementById(`node-${node.x}-${node.y}`).className =
              "node node-visited";
          }, 20 * i);
        }
      }
      console.log("Visualize path - END");
    } else
      alert(
        "OOPS!! Path not found( Goal node is Unreachable )\n...Please reset and try again."
      );

    //initializeGrid();
  };

  const generateWalls = () => {
    console.log("generateWalls called");

    //resetGrid();
    const grid = Grid;
    for (const rowArray of grid) {
      for (const node of rowArray) {
        if (!node.isStartNode && !node.isEndNode) {
          if (Math.random() < 0.15) {
            node.isWall = true;
            document.getElementById(`node-${node.x}-${node.y}`).className =
              "node is-wall";
          }
        }
      }
    }

    console.log(Grid);
  };

  const resetGrid = () => {
    console.log("Reset Grid : ");
    for (const rowArray of Grid) {
      for (const node of rowArray) {
        let classname = "";
        if (node.isStartNode) classname = "node start-node";
        else if (node.isEndNode) classname = "node end-node";
        else classname = "node";
        document.getElementById(`node-${node.x}-${node.y}`).className =
          classname;
      }
    }

    initializeGrid();
  };

  return (
    <div>
      <h1 style={{ color: "black" }}> Path Finding Algoritm Visualizer </h1>

      <div className="wrapper">
        <div id="grid">{gridWithNodes}</div>

        <div className="options">
          <label htmlFor="algorithms">
            <strong>Choose an algorithm </strong>
          </label>
          <select
            name="algorithms"
            className="algorithms"
            id="algorithms"
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="dfs">Depth First Search</option>
            <option value="bfs">Breadth First Search</option>
            <option value="aStar">A Star algorithm</option>
            <option value="dijkstra">Dijkstra's algorithm</option>
          </select>
          &nbsp; <br /> <br />
          <button onClick={resetGrid} className="resetBtn">
            Reset
          </button>
          &nbsp;
          <button onClick={generateWalls} className="genWallsBtn">
            Generate Walls
          </button>
          &nbsp;
          <button className="visualizeBtn" onClick={visualizePath}>
            Visualize Path
          </button>
          <div id="info">
            <div className="square fill-green">
              <h3>Start Node</h3>
            </div>
            <br />
            <div className="square fill-red">
              <h3>End Node</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathFinder;

/*
const bfsAlgo = () => {
    console.log("Bfs Starts");
    const startNode = Grid[FIRST_ROW][FIRST_COL];
    const endNode = Grid[LAST_ROW][LAST_COL];
    bfs(rows, cols, startNode, endNode);
    console.log("Bfs ends");
  };
*/
