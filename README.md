# Advent of Code 2024

Welcome to my Advent of Code 2024 repository! 🎄

This markdown file will serve as a log to track my progress, thoughts, and solutions throughout the event.

Please note: none of these solutions should be considered correct, or even optimal, they are just simply what I can come up with

## Overview

- **Language:** JavaScript
- **Repository:** [https://github.com/dalton-f/aoc-2024](https://github.com/dalton-f/aoc-2024)
- **Advent of Code:** [Advent of Code 2024](https://adventofcode.com/2024)

## Days

### Day 1:

I found today relatively simple. The input parsing was the most "tricky" part but this felt like a very standard Day 1 problem.

### Day 2:

I struggled with part 2 of this problem, until refactoring the code to be more modualar. I do not believe brute-forcing the solution is the best solution, but I cannot think of anything better

### Day 3:

Easiest day so far, could have used regex but glad I found a more intuitive solution that I can understand - part 2 required very little changes to the code

### Day 4:

Relatively simple problem, I found part 2 much easier than part 1 due to the way I solved it, very much spaghetti code to traverse the array both vertically and diagonally. Could easily be compacted down to one loop. I like how simple my part 2 code is after struggling to land on the right solution for a while due to weird out of bound errors.

### Day 5:

Very wordy problem, the multi-part input threw me off a bit, but my first idea for a solution seemed to work (thank god for hashmaps) and the part 2 code was very similar to part one, although I had to make some slight changes so the swapping of values didn't reverse itself and had to make sure the code did enough passes to fix all rules. Happy with today, compared to last year I am glad that this wasn't a brute-force solution

### Day 6:

Hardest day so far, attempted part 1 without using a 2d array and still think it is possible to get to work, struggled a lot with part 2 even after looking at videos and other peoples solution. Using this brute force technique is obviously a lot of wasted time and resources, so I will look to adjust it

After going back over the problem, my original more optimised solution was using only the intersections of positions without considering the orientation, which is why it created a higher value - so now we use the part 1 distinct squares and test all of them, instead of every square. It is slightly faster but still not very quick.

This solution also reuses a lot of logic that is slightly altered, so I imagine the code could become more modular

### Day 7:

Hardest day so far compared to day 6 - I could not come up with a woring brute-force solution let alone one that was intuitive. Opted to use recursion after some research, but I am unsure if I could recreate a recursive or iterative solution for a similar problem given the chance. Luckily part 2 required very little changes to the code, but I do not think I would have come up with a recursive solution by myself. I wonder if there is a dynamic programming way to solve this.
