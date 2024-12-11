const fs = require("fs");

const text = fs.readFileSync("days/day-11/input.txt", "utf-8");

// Convert to stones
const stones = text.split(" ").map(Number);

// Use a cache for efficiency
const cache = new Map();

const blinks = 75;

// For part 2, we transform one stone at a time
const transformStone = (stone, blinks) => {
  // Check the cache for a quickly returned result
  const cacheKey = `${stone}:${blinks}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  if (blinks === 0) return 1;

  // If zero, convert to 1
  if (stone === 0) {
    const result = transformStone(1, blinks - 1);
    return cache.set(cacheKey, result), result;
  }

  const stoneString = stone.toString();
  const length = stoneString.length;

  if (length % 2 === 0) {
    const middle = length / 2;

    const left = parseInt(stoneString.slice(0, middle));
    const right = parseInt(stoneString.slice(middle));

    const result =
      transformStone(left, blinks - 1) + transformStone(right, blinks - 1);

    return cache.set(cacheKey, result), result;
  }

  // If it doesn't meet any rules, multiply by 2024
  const result = transformStone(stone * 2024, blinks - 1);

  return cache.set(cacheKey, result), result;
};

const totalStones = stones.reduce((a, b) => a + transformStone(b, blinks), 0);

console.log(
  `After ${blinks} transformations, the stones have a length of ${totalStones}`
);
