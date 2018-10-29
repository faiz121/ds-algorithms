const productOfAllExceptIndex = input => {
	if(input.length < 2) throw new Error('Input array should be of size at least 2')
  // [1, 2, 3, 4]
  // [2*3*4, 1*3*4, 1*2*4, 1*2*3]
  // before [1, 1, 2, 6]
  // after [24, 12, 4, 1]

  let productSoFar = 1;
  let productOfAllNumbersExceptIndex = [];
  for (let i = 0; i < input.length; i++) {
    productOfAllNumbersExceptIndex[i] = productSoFar;
    productSoFar *= input[i];
  }
  productSoFar = 1;
  for (let j = input.length - 1; j >= 0; j--) {
    productOfAllNumbersExceptIndex[j] *= productSoFar;
    productSoFar *= input[j];
  }
  return productOfAllNumbersExceptIndex;
};

// Tests

let desc = "short array";
let actual = productOfAllExceptIndex([1, 2, 3]);
let expected = [6, 3, 2];
assertArrayEquals(actual, expected, desc);

(desc = "longer array"),
  (actual = productOfAllExceptIndex([8, 2, 4, 3, 1, 5]));
expected = [120, 480, 240, 320, 960, 192];
assertArrayEquals(actual, expected, desc);

(desc = "array has one zero"),
  (actual = productOfAllExceptIndex([6, 2, 0, 3]));
expected = [0, 0, 36, 0];
assertArrayEquals(actual, expected, desc);

desc = "array has two zeros";
actual = productOfAllExceptIndex([4, 0, 9, 1, 0]);
expected = [0, 0, 0, 0, 0];
assertArrayEquals(actual, expected, desc);

desc = "one negative number";
actual = productOfAllExceptIndex([-3, 8, 4]);
expected = [32, -12, -24];
assertArrayEquals(actual, expected, desc);

desc = "all negative numbers";
actual = productOfAllExceptIndex([-7, -1, -4, -2]);
expected = [-8, -56, -14, -28];
assertArrayEquals(actual, expected, desc);

desc = "error with empty array";
const emptyArray = () => productOfAllExceptIndex([]);
assertThrowsError(emptyArray, desc);

desc = "error with one number";
const oneNumber = () => productOfAllExceptIndex([1]);
assertThrowsError(oneNumber, desc);

function assertArrayEquals(a, b, desc) {
  const arrayA = JSON.stringify(a);
  const arrayB = JSON.stringify(b);
  if (arrayA !== arrayB) {
    console.log(`${desc} ... FAIL: ${arrayA} != ${arrayB}`);
  } else {
    console.log(`${desc} ... PASS`);
  }
}

function assertThrowsError(func, desc) {
  try {
    func();
    console.log(`${desc} ... FAIL`);
  } catch (e) {
    console.log(`${desc} ... PASS`);
  }
}
