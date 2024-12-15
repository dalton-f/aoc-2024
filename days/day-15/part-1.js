////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 15: Warehouse Woes
// Link: https://adventofcode.com/2024/day/15
////////////////////////////////////////////////////////////////

// lantern fish pop^ grows rapidly so needs lot of food + storage for said food
// given map of warehouse and movements that will be attempted to be made as input
// robot is @
// if box O, attempt to push
// if box or robot would be pushed into a wall (#), nothing moves
// ignore new lines in movement input

// gps coordinate of a box is 100 * (dst from top + dst from left) aka the zero index coordinate * 100
// sum of all gps coordinates after the robot finishes moving

const fs = require("fs");
const input = fs.readFileSync("days/day-15/input.txt", "utf8").trim();

let total = 0;

let [warehouse, movements] = input.split("\n\n");

// Create grid
warehouse = warehouse.split("\n").map((row) => row.split(""));

// Remove new lines to create one grid
movements = movements.replaceAll("\n", "");

const rows = warehouse.length;
const cols = warehouse[0].length;

const displayGrid = (grid) => {
  for (const row of grid) {
    console.log(row);
  }
};

// Set orthongonal directions with up, down, left and right offsets
const dirs = {
  "^": [-1, 0],
  v: [1, 0],
  ">": [0, 1],
  "<": [0, -1],
};

// Find the robot starting position
let position;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    if (warehouse[i][j] === "@") {
      position = [i, j];
      break;
    }
  }
}

// Loop through each of the moves the robot attempts to make
for (const move of movements) {
  const movementOffset = dirs[move];

  // Break down into current position x and y
  const [px, py] = position;

  // Break down into offset x and y
  const [ox, oy] = movementOffset;

  // Generate the next x and y
  const nx = px + ox;
  const ny = py + oy;

  let safeToMove = true;

  // Everything in the targets array is stuff to move, including the robot an any boxes it pushes
  const targets = [];

  let tx = px;
  let ty = py;

  while (true) {
    // Continue iterating on target x and y
    tx += ox;
    ty += oy;

    const char = warehouse[tx][ty];

    // If we run into a wall or there is no free space ahead of boxes, we cannot move
    if (char === "#") {
      safeToMove = false;
      break;
    }

    // Store all connected boxes in the direction we are facing
    if (char === "O") targets.push([tx, ty]);

    // If empty, break as we can continue
    if (char === ".") break;
  }

  // Skip invalid moves
  if (!safeToMove) continue;

  // Original robot position becomes empty
  warehouse[px][py] = ".";
  // Robot have moved over by one
  warehouse[nx][ny] = "@";
  position = [nx, ny];

  // Shift all remaining boxes
  for (const target of targets) {
    const [tx, ty] = target;

    warehouse[tx + ox][ty + oy] = "O";
  }
}

displayGrid(warehouse);

// Once all moves are done, loop over the new warehouse grid
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    // If there is a box
    if (warehouse[i][j] === "O") {
      total += 100 * i + j;
    }
  }
}

console.log(total);
