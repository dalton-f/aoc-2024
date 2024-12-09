const fs = require("fs");

const diskmaps = fs
  .readFileSync("days/day-09/input.txt", "utf-8")
  .trim()
  .split("\n");

// First part of the puzzle to reformat the diskmap by expanding the space blocks
const reformatDiskmap = (diskmap) => {
  // Use an array instead of a string to handle multi-digit ids
  let reformattedDiskMap = [];

  let fileIndex = 0;

  // Loop over every character of the diskmap
  for (let i = 0; i < diskmap.length; i++) {
    const char = diskmap[i];

    // File block
    if (i % 2 === 0) {
      // Expand out the file block using the current index
      const fileSize = parseInt(char);

      for (let j = 0; j < fileSize; j++) {
        reformattedDiskMap.push(fileIndex);
      }

      // Cannot use i directly as it is incremented with the space digits as well as the files digits so track fileIndex seperately
      fileIndex++;
    }

    // Every other char (represented by an odd index) will represent a free space block
    // Space block
    if (i % 2 !== 0) {
      // Expand out the space block
      const spaceSize = parseInt(char);

      // Represent each space with a dot
      for (let j = 0; j < spaceSize; j++) {
        reformattedDiskMap.push(".");
      }
    }
  }

  return reformattedDiskMap;
};

const compactDiskmap = (diskmap) => {
  // Take a shallow copy of diskmap
  let compactedDiskmap = [...diskmap];

  // Create a hashmap of each unique file and store its starting and ending index
  const files = {};

  for (let i = 0; i < diskmap.length; i++) {
    const char = diskmap[i];

    if (char !== ".") {
      if (!files[char]) {
        let startingIndex = i;
        let endingIndex = i;

        // Find the ending index of the file
        while (endingIndex < diskmap.length && diskmap[endingIndex] === char) {
          endingIndex++;
        }

        files[char] = [startingIndex, endingIndex];
      }
    }
  }

  // Loop over each file in reverse order so that the highest file ids are first
  for (const file of Object.keys(files).reverse()) {
    // Extract data
    const data = files[file];
    const [startIndex, endIndex] = data;

    // Get file size
    const fileSize = endIndex - startIndex;

    let leftmostSpace = -1;

    // Check if the file is already in the leftmost position
    if (startIndex === 0) {
      continue;
    }

    // Find the earliest leftmost space that can fit the file size

    for (let i = 0; i <= compactedDiskmap.length - fileSize; i++) {
      // Manually check chunks of the array and find the earliest one that has minimum space for the file
      if (
        compactedDiskmap.slice(i, i + fileSize).every((cell) => cell === ".")
      ) {
        leftmostSpace = i;
        break;
      }
    }

    // Don't move further to the right if already moved
    if (leftmostSpace > startIndex) continue;

    if (leftmostSpace !== -1) {
      // Fill the space with the file
      for (let i = leftmostSpace; i < leftmostSpace + fileSize; i++) {
        compactedDiskmap[i] = parseInt(file);
      }

      // Replace the file with the empty space it displaces
      for (let i = startIndex; i < endIndex; i++) {
        compactedDiskmap[i] = ".";
      }
    }
  }

  return compactedDiskmap;
};

// Third part of the problem to find the checksum
const calculateChecksum = (diskmap) => {
  let checksum = 0;

  for (let i = 0; i < diskmap.length; i++) {
    // If we have reached a space, then we have reached the end of file digits and can skip it
    if (diskmap[i] == ".") continue;

    const char = parseInt(diskmap[i]);

    const product = char * i;

    checksum += product;
  }

  return checksum;
};

// The code below just handles ensuring that the diskmap is passed through each part in order and then handles output
// This code is more complicated than it needs to be so that it can work with multiple different diskmaps at once for testing the given example inputs
const reformattedDiskmaps = diskmaps.map((diskmap) => reformatDiskmap(diskmap));

const compactedDiskmaps = reformattedDiskmaps.map((diskmap) =>
  compactDiskmap(diskmap)
);

const checksums = compactedDiskmaps.map((diskmap) =>
  calculateChecksum(diskmap)
);

console.log(`Checksums: [${checksums}]`);
