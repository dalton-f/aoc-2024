////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 9 - Disk Fragmenter
// Link: https://adventofcode.com/2024/day/9
////////////////////////////////////////////////////////////////

// The digits in the disk map alternate to indicate the length of a file and the length of free space
// Free space can be a 0
// Each file has an ID number based on the order before they are rearranged - the disk map 12345 has three files: a one-block file with ID 0, a three-block file with ID 1, and a five-block file with ID 2
// A . is a free space and the digits are the files index so 12345 would become 0..111....22222

// So the first step of the puzzle is reformatting the diskmap to display the free spaces as dots

// The second part of the puzzle is to move the rightmost file from the end to the leftmost free space block until there are no more gaps between the files
// This process takes x amount of steps, for 12345 it would take 6

// The final step of this file-compacting process is to update the filesystem checksum
// To calculate the checksum, add up the result of multiplying each of these blocks' position with the index

// Return the checksum of the reformatted data as the result/solution

const fs = require("fs");

// The input will always be one long strong
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

// Second part of the problem to make the files contiguous
const compactDiskmap = (diskmap) => {
  let leftPointer = 0;
  let rightPointer = diskmap.length - 1;

  // Copy the diskmap into a new variable as an array
  let compactedDiskmap = [...diskmap];

  // Loop over the pairs using the pointers until they meet, meaning there is no space left between files
  while (leftPointer < rightPointer) {
    // Move the left pointer to the next available empty space
    while (
      leftPointer < rightPointer &&
      compactedDiskmap[leftPointer] !== "."
    ) {
      // We don't have to do anything if there is a file on the left - it is already in the right position
      leftPointer++;
    }

    // Ensure that the right pointer is focused on the right most file digit
    while (
      leftPointer < rightPointer &&
      compactedDiskmap[rightPointer] === "."
    ) {
      rightPointer--;
    }

    // Do the swaps of the leftmostSpace (compactedDiskmap[leftPointer]) and the rightmostFile (compactedDiskmap[rightPointer]) in-place
    [compactedDiskmap[leftPointer], compactedDiskmap[rightPointer]] = [
      compactedDiskmap[rightPointer],
      compactedDiskmap[leftPointer],
    ];

    // Move the pointers forward in both directions
    leftPointer++;
    rightPointer--;
  }

  // Convert back to string
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
