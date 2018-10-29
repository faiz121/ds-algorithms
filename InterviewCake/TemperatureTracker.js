class TemperatureTracker {
	constructor() {
		this.maxValue = null;
		this.minValue = null;
		this.mean = null;
		this.sum = 0;
		this.count = 0;
		this.occurences = {};
		this.maxOccurences = 0;
		this.mode = null;
	}
	insert(value) {
		// for Mode related
		if (value in this.occurences) this.occurences[value]++;
		else this.occurences[value] = 1;

		if (this.occurences[value] > this.maxOccurences) {
			this.maxOccurences = this.occurences[value];
			this.mode = value;
		}
		// for Mean
		this.sum += value;
		this.count++;
		this.mean = this.sum / this.count;
		if (this.maxValue === null || value > this.maxValue) {
			this.maxValue = value;
		}
		if (this.minValue === null || value < this.minValue) {
			this.minValue = value;
		}
		return this;
	}
	getMax() {
		return this.maxValue;
	}
	getMin() {
		return this.minValue;
	}
	getMean() {
		return this.mean;
	}
	getMode() {
		return this.mode;
	}
}

const temp = new TemperatureTracker();
temp
	.insert(1)
	.insert(2)
	.insert(3)
	.insert(3)
	.insert(4)
	.insert(4)
	.insert(4);
console.log("getMax", temp.getMax(), " Expected 4");
console.log("getMin", temp.getMin(), " Expected 1");
console.log("Actual Mean ", temp.getMean(), " Expected Mean 3"); //3
console.log("Actual Mode ", temp.getMode(), " Expected Mode 4"); // 4

// getMean() sum of all / total no. of values
// getMode() value that occurs the most no. of times
