// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
let wordsToScore;

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";
   let scrabblescore = 0;
 
   for (let i = 0; i < word.length; i++) {
 
     for (const pointValue in oldPointStructure) {
 
       if (oldPointStructure[pointValue].includes(word[i])) {
         letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         scrabblescore += Number(pointValue);
       }
 
     }
     
   }
   // console.log(letterPoints);
   return scrabblescore;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!")
   wordsToScore = input.question("\nEnter a word to score: ");
   console.log(`scrabblerScrorer: ${scrabbleScorer(wordsToScore)}`);
   
};

function simpleScorer(word){
   word = word.toUpperCase();
   let simpleScorer = 0;
   for (let i = 0; i < word.length; i++){
      simpleScorer += 1;
   }
   return simpleScorer;
}

//Each vowel within the word is worth 3 points, and each consonant is worth 1 point.
function vowelBonusScorer(word){
   word = word.toUpperCase()
   let vowelBonusScorer = 0;
   for (i = 0; i < word.length; i++){
      if("AEIOU".includes(word[i])){
         //vowels worth 3 points
         vowelBonusScorer += 3;
      }
      else {
         //consonants worth 1 point
         vowelBonusScorer += 1;
      }      
   }
   return vowelBonusScorer
}

let scrabbleScorer  = function(word){
   let score = 0;
   let wordsarr = word.split('');
   wordsarr.forEach( element => {
       score += Number(newPointStructure[element.toLowerCase()]);            
   });
   return score;
}

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "BonusVowels",
      description: "Each vowels is worth 3 pts, Each consonants is worth 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?");
   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");
   let option = input.question("Enter 0, 1, or 2: ");
   while((isNaN(option)) || (Number(option)>2) || (Number(option)<0) || (option.length>1))
   {
       option = input.question("Invalid Input Please Enter 0, 1, or 2:");
   }
    
      // Simple scoring
      
      console.log(`algorithm name: ${scoringAlgorithms[option].name}`);
      console.log(`Score for '${wordsToScore}' : ${scoringAlgorithms[option].scorerFunction(wordsToScore)}`);
   }
   
   
   function transform(oldPointStructure) {
   const newPointStructure = {}
   //console.log("999")
   //newPointStructure[' '] = 0;
   for (const points in oldPointStructure){
      const letters = oldPointStructure[points];

      for (i = 0; i < letters.length; i++){
         //console.log("777")
         // if (i == 0){
         //    //console.log("ppp")
         //    newPointStructure[' '] = 0;
         // }
         const letter = letters[i];
         newPointStructure[letter.toLowerCase()] = Number(points);
      }
   }
   console.log(newPointStructure);
   return newPointStructure;
   // console.log("Scrabble scoring values for");
   // console.log("letter a: ", newPointStructure.A);
   // console.log("letter j: ", newPointStructure.J);
   // console.log("letter z: ", newPointStructure["Z"]);
   
};
let newPointStructure = transform(oldPointStructure);
//newPointStructure[' '] = 0;
//console.log(newPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};