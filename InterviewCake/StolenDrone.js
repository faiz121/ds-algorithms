const findUniqueDeliveryId = inputArray => {
	const mySet = new Set();
	for (var i = 0; i < inputArray.length; i++) {
		const currentId = inputArray[i];
		if (mySet.has(currentId)) mySet.delete(currentId);
		else mySet.add(currentId);
	}
	const [value] = [...mySet]; // converting set to an array and taking that one value out
	return value;
};
// function findUniqueDeliveryId(deliveryIds) {
// 	var uniqueDeliveryId = 0;
// 	deliveryIds.forEach(function(deliveryId) {
// 		uniqueDeliveryId ^= deliveryId; // XOR operator
// 	});
// 	return uniqueDeliveryId;
// }

//Tests
desc = "oneDroneTest";
expected = 1;
actual = findUniqueDeliveryId([1]);
assertEqual(expected, actual, desc);

desc = "uniqueIdComesFirstTest";
expected = 1;
actual = findUniqueDeliveryId([1, 2, 2]);
assertEqual(expected, actual, desc);

desc = "uniqueIdComesLastTest";
expected = 1;
actual = findUniqueDeliveryId([3, 3, 2, 2, 1]);
assertEqual(expected, actual, desc);

desc = "uniqueIdInTheMiddleTest";
expected = 1;
actual = findUniqueDeliveryId([3, 2, 1, 2, 3]);
assertEqual(expected, actual, desc);

desc = "manyDronesTest";
expected = 8;
actual = findUniqueDeliveryId([2, 5, 4, 8, 6, 3, 1, 4, 2, 3, 6, 5, 1]);
assertEqual(expected, actual, desc);

function assertEqual(a, b, desc) {
	if (a === b) {
		console.log(`${desc} ... PASS`);
	} else {
		console.log(`${desc} ... FAIL: ${a} != ${b}`);
	}
}
