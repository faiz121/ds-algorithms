var palindromPerm = (str1, str2) => {
  const occurencesSet = new Set();
  for(var i=0; i<str1.length; i++) {
    const char = str1[i];
    occurencesSet.add(char);
  }
  for(var i=0; i<str2.length; i++) {
    const char = str2[i];
    if(occurencesSet.has(char)) {
      occurencesSet.delete(char);
    }
  }
  return occurencesSet.size === 1;
}

palindromPerm("pale", "ple") // true
palindromPerm("pale", "bale") // true
palindromPerm("pale", "bake") // false