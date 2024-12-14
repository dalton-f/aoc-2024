////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 14: Restroom Redoubt
// Link: https://adventofcode.com/2024/day/14
////////////////////////////////////////////////////////////////

// predict where robots will be from moving in predictable straight lines
// input = list of positions p and velocities v, each line = one robot

// p = x,y x tiles from left y tiles from top
// v = x,y in tiles per second +x = right +y = down so 1, 2 = 1 tile right, 2 down every second

// 101 x 103 tiles for actual input
// robots can share positions

// if on edge, teleport to other side
// where are robots after 100 seconds

// count robots in each quadrant, mutiply the nums of robots per each quadrant = safety factor = solution

// out of context:
// given a position and velocity p=0,4 v=3,-3
// where will robot be after 100 movements based on the velocity
// p = 12, 8 would be off the grid so check and loop back around to origin, maintaing whichever axis isn't overflowing

const fs = require("fs");
const input = fs.readFileSync("days/day-14/input.txt", "utf8").trim();

const iterations = 100;

const width = 101;
const height = 103;

// Rounded down instead of up as the width and height will always be odd
const midX = (width - 1) / 2;
const midY = (height - 1) / 2;

const robots = input.split("\n");

const finalPositions = [];

// Loop over robots
for (const robot of robots) {
  // Break down the robot into an array which contains, in order, the starting position x and position y, then the velocity of x and y per second
  const [px, py, vx, vy] = robot
    .trim()
    .split(" ")
    .map((data) => data.split("=")[1])
    .map((data) => data.split(","))
    .flat()
    .map(Number);

  // Since modulus doesn't care about addition, we can just do it after all of the iterations, and we don't even need a loop because of this, so do everything in place
  // + width and modulus again to ensure within the grid, not sure why % width doesn't keep it inside the grid itself

  finalPositions.push([
    (((px + iterations * vx) % width) + width) % width,
    (((py + iterations * vy) % height) + height) % height,
  ]);
}

// We can check for which quadrant the position is on based on if x < midX and y < midY (top left) etc.
const quadrants = Array(4).fill(0);

for (const position of finalPositions) {
  const [px, py] = position;

  // If it sits along one of the middle lines, ignore it
  if (px === midX || py == midY) continue;

  // Otherwise find the quadrant and update the count

  // Top left = 0
  if (px < midX && py < midY) {
    quadrants[0] += 1;
    continue;
  }

  // Bottom left = 1
  if (px < midX && py > midY) {
    quadrants[1] += 1;
    continue;
  }

  // Top right = 2
  if (px > midX && py < midY) {
    quadrants[2] += 1;
    continue;
  }

  // Bottom right = 3
  if (px > midX && py > midY) {
    quadrants[3] += 1;
    continue;
  }
}

// Ensure the product of all quadrant counts is the safety factor
const total = quadrants.reduce((acc, curr) => (acc *= curr), 1);

console.log("Part 1:", total);
