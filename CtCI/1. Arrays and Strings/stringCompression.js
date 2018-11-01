const stringCompress = (string) => {
  let result = '';
  let currentChar = string[1];
  let currentCount = 1;
  for(var i=1; i<string.length; i++) {
    const char = string[i];
    if(currentChar === char) {
      currentCount++
    } else {
      result += currentChar + currentCount;
      currentCount = 1;
      currentChar = char;
    }
  }
  result += currentChar + currentCount;
  return result.length > string.length ? string : result;
}

console.log(stringCompress('aabccc'));