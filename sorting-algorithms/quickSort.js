/* Quicksort Sort

   Description : Another divide-and-conquer algorithm
   Quicksort is one of the most useful and powerful sorting algorithms out there.
   occasionally JavaScript doesn't mergesort for Array.prototype.sort. In those other cases, 
   it's usually some variant on quicksort.

   The basic gist is that you take the last element in the list and call that the pivot. 
   Everything that's smaller than the pivot gets put into a "left" list and everything 
   that's greater get's put in a "right" list. You then call quick sort on the left and 
   right lists independently (hence the recursion.) After those two sorts come back, 
   you concatenate the sorted left list, the pivot, and then the right list (in that order.) 
   The base case is when you have a list of length 1 or 0, where you just return the list 
   given to you.

   Working:
    [4,9,3,5] list
    -> 5 is made the pivot since it's the last in the array
    -> divide list into two lists, [4,3] and [9]
    -> call quicksort on those two lists

    [4, 3]
    -> 3 is pivot
    -> call quicksort on [] and [4]
    -> those both return as is as they are the base case of length 0 or 1
    -> concat [], 3, and [4]
    -> return [3,4]

    [9]
    -> returns as this it is a base case of length 1

    (back into the original function call)
    -> call concat on [3,4], 5, and [9]
    -> return [3,4,5,9]

   Big O: O(n log n)
    Takes up less memory than mergesort so it is often favored. 
    However it does really poorly if you pass it a sorted list.
    There are a lot of subtle variants on quicksort.

   UseCase:
    Quicksort is in place and has low overhead. 
    If a stable sort is not necessary. It has a higher worstcase time complexity
    than merge sort (if pivot is not in center of array)

   Link: https://codepen.io/faiz121/pen/LymoPz?editors=0010
   CodePen is a fork from Brian Holt
*/


const quickSort = nums => {
    if (nums.length <= 1) return nums;
    
    const pivot = nums[nums.length-1];
    const left = [];
    const right = [];
    
    for (let i = 0; i < nums.length-1; i++) {
      if (nums[i] < pivot) {
        left.push(nums[i]);
      }
      else {
        right.push(nums[i]);
      }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
  };
  
const input = [10, 8, 2, 1, 6, 3, 9, 4, 7, 5];
const answer = quickSort(input);
console.log(answer, "Actual");
console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "expected");
