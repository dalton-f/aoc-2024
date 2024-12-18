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

### Day 8:

The problem made more sense after watching a couple of videos, but I drew a blank trying to solve it alone

### Day 9:

A much easier part 1 problem compared to the previous few days, I was able to get 99% of the solution by myself and only struggled when it came to dealing with multi-digit ids, after swapping to using arrays instead of strings my pointer approach had some bugs to iron out. Overall I am very happy with the code I have written for todays solution.

Part 2 was a lot harder, my solution idea generally worked but I needed to work out a lot of random cases and such to prevent weird behaviour from occuring.

### Day 10:

I felt relatively confident approaching this problem, and was able to come up with a recursive DFS without much trouble. The code however took a lot of effort to simplify and I had to swap to using a stack to get the correct answer out of part 1 - I did not consider to track visited positions. Part 2 was very simple after completing part 1, just had to remove the "visited" check and count the length of endpoints

### Day 11:

I am glad today's problem wasn't any array traversal or graphing algorithm - relaively simple problem on the surface and didn't take long to code up and work for the example inputs, I did not consider that performance was going to be a problem and running it on the real input takes quite a while - I need to figure out some optimisations to speed this up. I guess my console.logs were slowing the code down quite a lot, but it is still a slower solution than I'd like for part 1.

Originally in part 1 I did all the changes in place, but I swapped to generating a new array because I believe .splice was causing the code to be very slow and now the part 1 code runs much faster

In hindsight, making this change was necessary for a chance at part 2 working (which of course it didn't) - the code is identical, just with more transformations. I hadn't realised this puzzle would be so focused on performance, but by adding a simple cache and checking each stone indiviudally we can improve the run time singificantly to 135ms

### Day 12:

Pretty similar to day 10, the bfs pretty much just solves the perimeter and area at once so you don't have to think too much and just add to the total price - interestingly enough, you cannot simply have [x, y] as a key for the set and MUST convert to a string for the tracking of visited cells to work. Another day with another graphing algorithm, but good practice nonetheless.

I have no idea how to do part 2

### Day 13:

A brute force solution makes sense, but is slow. The input formatting is very inconvinent so takes up a lot of the code. Obviously brute forcing part 2 is impossible, similar to day 11. I had to watch a video for part 2 to understand the maths and optimisations. It is getting to a point in the event where it is difficult for me to come up with these soltuions by myself. The linear algebra makes sense, but my math isn't that strong

### Day 14:

After yesterday, I changed my approach to the problems and tried to get a deep understanding of the problem outside of the context of the event to attempt and find a more clear solution - I think a lot of the AOC "story" is throwing me off so I want to look at the problems from a wider perspective in a more general manner and then add the context back in. I am also starting to wish I set up a better environment for this event, certainly something I need to look at for next year

Today I created the create-day.js file to generate a days folder more easily withthe command node create-day {number}

Part 1 I generally had the right idea, just executed slightly poorly, especially when it came to using a loop when I didn't have to. I thought one modulus operation on width and height would be enough, but clearly not. Happy that I derived a similar way to deal with the quadrants as most others by using the middle values and testing if it was before or after.

Part 2 simply does not provide enough context to be meaningfully solved without making major assumptions, or brute forcing to look for a Christmas tree. I think this is probably an issue with the way the problem is written, but the code/solution is pretty slow too. Assuming the link between part 1 and 2 without additional details probably makes this the hardest part 2 to understand.

For part 2 you can test for:

- brute forcing the minimum safety factor
- the first point where no robot overlaps
- a much lower entropy where robots have more neighbours
- search for a vertical lineup and assume it is the trunk?
- search for largest contiguous regions

### Day 15:

Relatively happy solving part 1 myself, with some adjustments and optimisations to move the boxes, keep coming across a weird bug with the direction offsets though. I struggled for a logn time as my x and y directions had to be reversed, for some reason

Part 2 I can get as far as doubleing the input, but adding logic for all the checks and things isn't something I want to spend time on right now

### Day 16:

My first instinct for part 1 is that it is obviously trying to the find the shorest path, so Dijkstra's algorithm might be the way to go. This may still be a possible solution, but you would have to derive an adjacecy list from the input and also consider a way to track the direction changes for score counting. I am unsure if we can assume that the shortest path = lowest score, especially if there are multiple paths of the same length with different scores, additional checks would have to be performed to account for this. But this turns out to work quite well with as a solution anyway because we are told the "cost" of each potential movement so we actually look for the lowest cost and not the shortest number of edges. I think there is a way to solve part 1 with a bfs or dfs but swapping the valid directions and things is quite complicated, and since dijkstras is more focused on shortets path, this works fine. Since we can't simulate a heap or priority queue effectively, we can use an array that is constantly sorted

My initial heap implementation was actually slowing me down because of using .sort in the full input, so had to optimise it with some research.

Like I kind of assumed in part 1, many of the paths have the exact same cost so the search has to be extended in part 2 to count all tiles visited by all best paths. I have no understanding of part 2, even after watching a video which taks about backtracking etc.

### Day 17:

I overestimated how difficult part 1 of today would be, it is quite simple once you get past all the words.. I think I am starting to reach the limit of my capabilities when it comes to these problems, but I am glad it isn't another grid problem.

I am very impressed I managed to get part 1 with almost no bugs, and some very clean code after deciphering the puzzle.

Brute forcing part 2 is not even slightly possible due to the scale of numbers. It has to be reverse engineered by hand, where we drop 3 bits from the binary value of register A and print them until we have no bits left, which prints out the program

### Day 18:

Part 1 seems simple, another grid and bfs problem. Very similar to previous problems. Part 2 can be done with a linear or binear search. Linear makes more sense to me but is slower (taking about 3 seconds to run). I managed to create a linear search by myself and solve the problem, but of course a binear search would be much faster.
