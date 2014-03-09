Trie = function(){
  this.characters = {};
  this.isWord = false;
};

Trie.prototype.learn = function(word){
  if (word.length === 0) {
    this.isWord = true;
    return;
  }
  char = word.slice(0,1);
  if (this.characters[char] === undefined) {
    this.characters[char] = new Trie();
  } 
  this.characters[char].learn(word.slice(1, word.length));
};

Trie.prototype.getWords = function(words, currentWord){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.
  words = words || [];
  currentWord = currentWord || "";

  if (this.isWord === true) {
    words.push(currentWord);
  } 
  for (var key in this.characters) {
   words = words.concat(this.characters[key].getWords([],currentWord+key));
  }  
  return words;
};

Trie.prototype.find = function(word){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.
  // Be sure to consider what happens if the word is not in this Trie.
  if (word.length === 0) {
    return this;
  }
  var char = word.slice(0,1);
  if (this.characters[char] === undefined) {
    return;
  } 
  return this.characters[char].find(word.slice(1, word.length));

};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.
  var prefixNode = this.find(prefix);
  if (prefixNode === undefined) {return [];}
  var suffixArr = prefixNode.getWords();
  var resultsArr = [];
  suffixArr.forEach(function(suffix) {
    resultsArr.push(prefix+suffix);
  });
  return resultsArr;
};

// var a = ["a", "b", "c"];
// a.forEach(function(entry) {
//     console.log(entry);
// });
