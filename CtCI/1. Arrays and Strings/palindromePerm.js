var palindromPerm = (str) => {
  const occurencesSet = new Set();
  for(var i=0; i<str.length; i++) {
    const char = str[i];
    if(occurencesSet.has(char)) {
      occurencesSet.delete(char);
    } else {
      occurencesSet.add(char);
    }
  }
  return occurencesSet.size === 1;
}