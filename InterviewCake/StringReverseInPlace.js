const stringReverseInPlace = (string) => {
  const stringArray = string.split(' ');

  let left = 0;
  let right = stringArray.length - 1;

  while(left < right) {
    const tmp = stringArray[right];
    stringArray[right] = stringArray[left];
    stringArray[left] = tmp;

    left++;
    right--;
  }
  return stringArray.join(' ')
}

console.log(stringReverseInPlace('find you will pain only go you recordings security the into if'))