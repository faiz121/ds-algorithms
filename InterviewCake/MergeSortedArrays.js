const mergeArrays = (array1, array2) => {
	const results = [];
	while (array1.length && array2.length) {
		if (array1[0] <= array2[0]) results.push(array1.shift());
		else results.push(array2.shift());
	}
	return [...results, ...array1, ...array2];
};

// tests
desc = "bothArraysAreEmptyTest";
let myArray = [];
let alicesArray = [];
let expected = [];
let actual = mergeArrays(myArray, alicesArray);
assertArrayEquals(expected, actual, desc);

desc = "firstArrayIsEmptyTest";
myArray = [];
alicesArray[(1, 2, 3)];
expected[(1, 2, 3)];
actual = mergeArrays(myArray, alicesArray);
assertArrayEquals(expected, actual, desc);

desc = "secondArrayIsEmptyTest";
myArray[(5, 6, 7)];
alicesArray = [];
expected[(5, 6, 7)];
actual = mergeArrays(myArray, alicesArray);
assertArrayEquals(expected, actual, desc);

desc = "bothArraysHaveSomeNumbersTest";
myArray[(2, 4, 6)];
alicesArray[(1, 3, 7)];
expected[(1, 2, 3, 4, 6, 7)];
actual = mergeArrays(myArray, alicesArray);
assertArrayEquals(expected, actual, desc);

desc = "arraysAreDifferentLengthsTest";
myArray[(2, 4, 6, 8)];
alicesArray[(1, 7)];
expected[(1, 2, 4, 6, 7, 8)];
actual = mergeArrays(myArray, alicesArray);
assertArrayEquals(expected, actual, desc);

function assertArrayEquals(a, b, desc) {
	if (a.sort().join(",") === b.sort().join(",")) {
		console.log(`${desc} ... PASS`);
	} else {
		console.log(`${desc} ... FAIL: ${a} != ${b}`);
	}
}
