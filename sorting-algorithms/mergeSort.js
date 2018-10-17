/* Merge Sort

   Description : divide-and-conquer algorithm
   It's easier to conceptualize than some of the other ones. 
   A key to merge sort is that it is recursive.

   The basic gist of merge sort is that you're going to take your big list, 
   and first divide down in two half size lists and recursively call merge sort 
   on those smaller list, which in turn will do the same. The base case is when 
   you have a list of one, at which point you will return that sorted list of one. 
   On the way up the recursive calls, you will merge those sorted lists together

   When you call Array.prototype.sort it often uses MergeSort 
   (depending on the engine and the types of the elements in the array.) 
   MergeSort is also stable which just means if you have equivalent elements, 
   it will keep their original order in the array. This is sometimes important and 
   sometimes not.

   Big O: O(n log n)
   
   Space Complexity: O(n) which is worse than others

   Use cases:
   If stabilty is a requirement and using extra space is no concern, 
   merge sort is great because it's simple to implement, 
   it's the only stable O(nlog(n)) sorting algorithm.

   Link: https://codepen.io/faiz121/pen/gBWjOx?editors=0010
   Credits: CodePen is a fork from Brian Holt
*/

const mergeSortRecursive = nums => {
  if (nums.length < 2) return nums;

  const length = nums.length;
  const middle = Math.floor(length / 2);
  const left = nums.slice(0, middle);
  const right = nums.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
};

const mergeSortIterative = array => {
    // create array of subarrays with each element
    var splitArr = array.map(function(element) { return [element]; });
    // while there is more than one subarray
    while (splitArr.length > 1) {
      var result = [];
      // merge adjacent
      for (var i=0; i<splitArr.length; i+=2) {
        // for pairs merge
        if (splitArr[i+1]) result.push(merge(splitArr[i], splitArr[i+1]));
        // for last odd element, just add to results
        else result.push(splitArr[i]);
      }
      // overwrite old splitArr
      splitArr = result;
    }
    return splitArr[0];
  
  };

const merge = (array1, array2) => {
  var results = [];
  while (array1.length && array2.length) {
    if (array1[0] <= array2[0]) {
      results.push(array1.shift());
    } else {
      results.push(array2.shift());
    }
  }
  return [...results, ...array1, ...array2];
};

var nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
var ans = mergeSortIterative(nums);
console.log(ans, "Actual");
console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "expected");
