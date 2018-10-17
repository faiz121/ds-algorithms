/* Bubble Sort

   Description :
   In bubble sort, we're going to loop through the array and 
   compare each index with the index next to it.
   If the those two numbers are out of order 
   (the lesser index's value is greater than the greater index's value) 
   we swap those two numbers' places in the array. 

   Big O: O(n²)
   There's an inner loop to check to see if indexes need to be swapped, 
   and an outer loop that's just checking to see if anything was swapped. 
   That would be make it O(n²). Not efficient, but a great learning tool. 
   You'll never use bubble sort for anything serious.

   Link: https://codepen.io/faiz121/pen/VEQLmW?editors=001
   CodePen is a fork from Brian Holt
*/

const bubbleSort = nums => {
  do {
    var swapped = false;
    for (var i = 0; i < nums.length; i++) {
      // every element in the array is compared against
      // every other element in the array. 
      // The do while loop keeps running until all the elements are swapped
      // and there are no more swaps (swapped is not true anymore)
      if (nums[i] > nums[i + 1]) {
        var temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
};

const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
bubbleSort(nums);
console.log(nums, 'Actual');
console.log([1,2,3,4,5,6,7,8,9,10], 'expected');
