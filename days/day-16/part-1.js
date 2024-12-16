////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 16: Reindeer Maze
// Link: https://adventofcode.com/2024/day/16
////////////////////////////////////////////////////////////////

// maze
// lowest score
// starting tile S facing EAST needing to reach end tile E
// move forward one at a time, never into a wall, each move forward += 1 score
// rotate by 90 clockwise or counter increasing score 1000

const fs = require("fs");
const input = fs.readFileSync("days/day-16/input.txt", "utf8").trim();

const grid = input.split("\n").map((row) => row.trim().split(""));

const rows = grid.length;
const cols = grid[0].length;

// Add a heap implementation
class Heap {
  constructor() {
    this.heap = [];
  }

  /**
   * Pushes a value onto the heap.
   * @param {Array} value - The value to push onto the heap.
   */
  heappush(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  /**
   * Pops the smallest value from the heap.
   * @returns {Array|null} The smallest value, or null if the heap is empty.
   */
  heappop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const smallest = this.heap[0];
    this.heap[0] = this.heap.pop();

    this.heapifyDown(0);

    return smallest;
  }

  /**
   * Returns the length of the heap.
   * @returns {number} The length of the heap.
   */
  length() {
    return this.heap.length;
  }

  /**
   * Moves the element at the given index up the heap.
   * @param {number} index - The index of the element.
   */
  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[parentIndex][0] <= this.heap[index][0]) break;

      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  /**
   * Moves the element at the given index down the heap.
   * @param {number} index - The index of the element.
   */
  heapifyDown(index) {
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallest = index;

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex][0] < this.heap[smallest][0]
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex][0] < this.heap[smallest][0]
      ) {
        smallest = rightChildIndex;
      }

      if (smallest === index) break;
      this.swap(smallest, index);
      index = smallest;
    }
  }

  /**
   * Swaps two elements in the heap.
   * @param {number} i - The index of the first element.
   * @param {number} j - The index of the second element.
   */
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

let position;

// Find the starting position of the reindeer
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const char = grid[r][c];

    if (char === "S") position = [r, c];
  }
}

let [startRow, startColumn] = position;

const priorityQueue = new Heap();
const seen = new Set();

// Add the starting position to the seen positions + since turning isn't free it must be tracked (start facing east)
seen.add(`${startRow},${startColumn},1,0`);

// Add the starting position r and c to the queue and the directional x and y
priorityQueue.heappush([0, startRow, startColumn, 0, 1]);

while (priorityQueue.length()) {
  // Get the next row and column as well as the direction
  const [cost, r, c, dr, dc] = priorityQueue.heappop();

  seen.add(`${r},${c},${dr},${dc}`);

  // Processed cheapest way to the end
  if (grid[r][c] === "E") {
    console.log(cost);
    break;
  }

  // These are simply established from:
  // moving in the direction we are facing
  // the fact that to turn we can swap the directions and reverse the sign of one

  const movements = [
    [cost + 1, r + dr, c + dc, dr, dc], // move forward
    [cost + 1000, r, c, dc, -dr], // turn clockwise
    [cost + 1000, r, c, -dc, dr], // turn counter-clockwise
  ];

  // Check all potential direction movements - either go forward, or turn either direction while still tracking the cost
  for (const [newCost, nr, nc, ndr, ndc] of movements) {
    // Ignore if hitting a wall
    if (grid[nr][nc] === "#") continue;

    // Ignore if already processed
    if (seen.has(`${nr},${nc},${ndr},${ndc}`)) continue;

    priorityQueue.heappush([newCost, nr, nc, ndr, ndc]);
  }
}
