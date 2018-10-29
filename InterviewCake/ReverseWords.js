// const ReverseWords = (string) => {
//   const stringArray = string.split(' ');

//   let left = 0;
//   let right = stringArray.length - 1;

//   while(left < right) {
//     const tmp = stringArray[right];
//     stringArray[right] = stringArray[left];
//     stringArray[left] = tmp;

//     left++;
//     right--;
//   }
//   return stringArray.join(' ')
// }

// console.log(ReverseWords('find you will pain only go you recordings security the into if'))
// console.log('if into the security recordings you go only pain will you find', '<---Actual')

const merge = function(nums1, m, nums2, n) {
	const maxLength = m > n ? m : n;
	let i = 0;
	while (i <= m) {
		if (nums1[i] < nums2[0]) {
			i++;
		} else {
			nums1.splice(i, 0, nums2.shift());
			i++;
		}
	}
  nums1.push(...nums2);
  return nums1;
};

console.log(merge([1, 2, 5], 3, [2, 4, 6], 3));
console.log('[1, 2, 2, 4, 5, 6] <--- expected')
