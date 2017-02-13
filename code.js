//
// this is just a stub for a function you need to implement
//
function getStats(txt) {
    return {
        nChars: findNumberOfChars(txt),
        nWords: findNumberOfWords(txt),
        nLines: findNumberOfLines(txt),
        nNonEmptyLines: findNonEmptyLines(txt),
        maxLineLength: findMaxLineLength(txt),
        averageWordLength: findAverageWordLength(txt),
        palindromes: findPalindromes(txt),
        longestWords: findLongestWords(txt),
        mostFrequentWords: findMostFrequentWords(txt)
    };
}

function findNumberOfChars(txt) {
    return txt.length;
}

function findNumberOfWords(txt) {
    var startedWordFlag = false;
    var wordCount = 0;
    for(i = 0; i < txt.length; i++) {
        if((txt.charAt(i) != ' ') && (txt.charAt(i).match(/^[a-z0-9]+/i)) && (startedWordFlag == false)) {
            wordCount++;
            startedWordFlag = true;
        }
        else if(!(txt.charAt(i).match(/^[a-z0-9]+/i)) && (startedWordFlag == true)) {
            startedWordFlag = false;
        }
    }
    return wordCount;
}

function findNumberOfLines(txt) {
    var lineCount = 1;
    if(txt == "") {
        lineCount = 0;
    }
    else {
        for(i = 0; i < txt.length; i++){
            if(txt.charAt(i) == '\n') {
                lineCount++;
            }
        }
    }
    return lineCount;
}

function findNonEmptyLines(txt) {
    var nonEmptyLineCount = 0;
    var currentLineEmptyFlag = true;
    for(i = 0; i < txt.length; i++) {
        if(txt.charAt(i) == '\n') {
            if(!currentLineEmptyFlag) {
                nonEmptyLineCount++;
            }
            currentLineEmptyFlag = true;
        }
        else if((txt.charAt(i) == ' ') || (txt.charAt(i) == '\t')) {

        }
        else {
            currentLineEmptyFlag = false;
        }
    }
    if(!currentLineEmptyFlag) {
        nonEmptyLineCount++;
    }
    return nonEmptyLineCount;
}

function findMaxLineLength(txt) {
    var currentLineLength = 0;
    var maxLineLength = 0;
    var endLineFlag = false;
    for(i = 0; i < txt.length; i++) {
        if((txt.charAt(i) == '\n')) {
            if(currentLineLength > maxLineLength) {
                maxLineLength = currentLineLength;
            }
            currentLineLength = 0;
        }
        else {
            currentLineLength++;
        }
    }
    if(currentLineLength > maxLineLength) {
        maxLineLength = currentLineLength;
    }

    return maxLineLength;
}

function findAverageWordLength(txt) {
    var startedWordFlag = false;
    var wordCount = 0;
    var wordSizeCount = 0;
    var sumWordSize = 0;
    for(i = 0; i < txt.length; i++) {
        if((txt.charAt(i) != ' ') && (txt.charAt(i).match(/^[a-z0-9]+/i)) && (startedWordFlag == false)) {
            wordSizeCount++;
            wordCount++;
            startedWordFlag = true;
        }
        else if ((txt.charAt(i).match(/^[a-z0-9]+/i)) && (startedWordFlag == true)) {
            wordSizeCount++;
        }
        else if(!(txt.charAt(i).match(/^[a-z0-9]+/i)) && (startedWordFlag == true)) {
            startedWordFlag = false;
            sumWordSize += wordSizeCount;
            wordSizeCount = 0;
        }
    }
    if(startedWordFlag == true) {
        sumWordSize += wordSizeCount;
    }
    return sumWordSize / wordCount;
}

function makeWordsArray(txt) {
    var startedWordFlag = false;
    var currentWord = '';
    var wordArray = [];
    for(i = 0; i < txt.length; i++) {
        if((txt.charAt(i) != ' ') && (txt.charAt(i).match(/^[a-z0-9]+/i)) && (startedWordFlag == false)) {
            currentWord += txt.charAt(i);
            startedWordFlag = true;
        }
        else if(!(txt.charAt(i).match(/^[a-z0-9]+/i)) && (startedWordFlag == true)) {
            wordArray.push(currentWord.toLowerCase());
            currentWord = '';
            startedWordFlag = false;
        }
        else if((txt.charAt(i).match(/^[a-z0-9]+/i)) && (startedWordFlag == true)){
            currentWord += txt.charAt(i);
        }
    }
    if(startedWordFlag == true) {
        wordArray.push(currentWord.toLowerCase());
    }
    return wordArray;
}

function findPalindromes(txt) {
    var wordArray = makeWordsArray(txt);
    var palindromesArray = [];
    var reverseWord = '';
    var duplicateFlag = false;
    for(i = 0; i < wordArray.length; i++) {
        if(wordArray[i].length > 2) {
            for(j = wordArray[i].length-1; j >= 0; j--) {
                reverseWord += wordArray[i].charAt(j);
            }
            if(reverseWord == wordArray[i]) {
                for(k = 0; (k < palindromesArray.length) && (duplicateFlag == false); k++) {
                    if(wordArray[i] == palindromesArray[k]) {
                        duplicateFlag = true;
                    }
                }
                if(!duplicateFlag) {
                    palindromesArray.push(wordArray[i]);
                }
            }
            var reverseWord = '';
        }
    }
    return palindromesArray;
}


function sortWordsByUniqueLength(wordArray) {
    var sortFinishFlag = true;
    while (sortFinishFlag) {
        sortFinishFlag = false;
        for(i = 0; i < wordArray.length - 1; i++) {
            if(wordArray[i].length > wordArray[i+1].length) {
                var temp = wordArray[i];
                wordArray[i] = wordArray[i+1];
                wordArray[i+1] = temp;
                sortFinishFlag = true;
            }
        }
    }
    return wordArray.reverse();
}

function sortLengthSortedArrayAlphabetically(lengthSortedArray) {
    var alphabetizedArray = [];
    var arrayOfSimilarLengthArrays = [];
    var similarLengthArray = [];
    for(i = 0; i < lengthSortedArray.length - 1; i++) {
        similarLengthArray.push(lengthSortedArray[i]);
        if(lengthSortedArray[i].length != lengthSortedArray[i+1].length) {
            similarLengthArray.sort();
            arrayOfSimilarLengthArrays.push(similarLengthArray);
            similarLengthArray = [];
        }
    }
    if(lengthSortedArray[i].length == arrayOfSimilarLengthArrays[arrayOfSimilarLengthArrays.length-1][0].length) {
        arrayOfSimilarLengthArrays[arrayOfSimilarLengthArrays.length-1].push(lengthSortedArray[i]);
        arrayOfSimilarLengthArrays[arrayOfSimilarLengthArrays.length-1].sort();
    }
    else {
        arrayOfSimilarLengthArrays.push(lengthSortedArray[i]);
    }
    for(i = 0; i < arrayOfSimilarLengthArrays.length; i++) {
        alphabetizedArray = alphabetizedArray.concat(arrayOfSimilarLengthArrays[i]);
    }
    return alphabetizedArray;
}

function removeDuplicates(wordArray) {
    var uniqueWordArray = wordArray.slice(0);
    for(i = 0; i < uniqueWordArray.length - 1; i++) {
        for(j = i+1; j < uniqueWordArray.length; j++) {
            if(uniqueWordArray[i] == uniqueWordArray[j])
                uniqueWordArray.splice(j,1);
        }
    }
    return uniqueWordArray;
}
function findLongestWords(txt) {
    var wordArray = makeWordsArray(txt);
    wordArray = removeDuplicates(wordArray);
    var lengthSortedArray = sortWordsByUniqueLength(wordArray);
    var alphabetizedArray = sortLengthSortedArrayAlphabetically(lengthSortedArray);

    var finalArray = []
    for(i = 0; i < 10; i++) {
        if(alphabetizedArray[i] != null) {
            finalArray.push(alphabetizedArray[i]);
        }
    }   
    return finalArray;
}

function findWordFrequencies(wordArray) {
    var arrayOfWordsWithFrequencies = [];
    var uniqueWordArray = removeDuplicates(wordArray);
    var currentWordFrequency = 0;
    for(i = 0;i < uniqueWordArray.length;i++) {
        for(j = 0;j < wordArray.length;j++) {
            if(uniqueWordArray[i] == wordArray[j]) {
                currentWordFrequency++;
            }
        }
        var uniqueWordWithFrequency = {word: uniqueWordArray[i],count: currentWordFrequency};
        arrayOfWordsWithFrequencies.push(uniqueWordWithFrequency);
        currentWordFrequency = 0;
    }
    return arrayOfWordsWithFrequencies;
}

function sortArrayOfWordsWithFrequenciesByFrequencyAndAlphabetically(arrayOfWordsWithFrequencies) {
    return arrayOfWordsWithFrequencies;
}

function compareCount(a,b) {
    return b.count - a.count;
}

function compareWords(a,b) {
    if(a.word < b.word)
        return -1;
    if(a.word > b.word)
        return 1;
    return 0;
}

function sortFrequencySortedArrayAlphabetically(frequencySortedArray) {
    var alphabetizedArray = [];
    var arrayOfSimilarFrequencyArrays = [];
    var similarFrequencyArray = [];
    for(i = 0; i < frequencySortedArray.length - 1; i++) {
        similarFrequencyArray.push(frequencySortedArray[i]);
        if(frequencySortedArray[i].count != frequencySortedArray[i+1].count) {
            similarFrequencyArray.sort(compareWords);
            arrayOfSimilarFrequencyArrays.push(similarFrequencyArray);
            similarFrequencyArray = [];
        }
    }
    similarFrequencyArray.sort(compareWords);
    arrayOfSimilarFrequencyArrays.push(similarFrequencyArray);
    if(frequencySortedArray[i].count == arrayOfSimilarFrequencyArrays[arrayOfSimilarFrequencyArrays.length-1].count) {
        arrayOfSimilarFrequencyArrays[arrayOfSimilarFrequencyArrays.length-1].push(frequencySortedArray[i]);
        arrayOfSimilarFrequencyArrays[arrayOfSimilarFrequencyArrays.length-1].sort(compareWords);
    }
    else {
        arrayOfSimilarFrequencyArrays.push(frequencySortedArray[i]);
    }
    for(i = 0; i < arrayOfSimilarFrequencyArrays.length; i++) {
        alphabetizedArray = alphabetizedArray.concat(arrayOfSimilarFrequencyArrays[i]);
    }
    return alphabetizedArray;
}

function findMostFrequentWords(txt) {
    var wordArray = makeWordsArray(txt);
    var arrayOfWordsWithFrequencies = findWordFrequencies(wordArray);
    var arrayOfWordsWithFrequenciesSortedByCount = arrayOfWordsWithFrequencies.sort(compareCount);
    var alphabetizedArray = sortFrequencySortedArrayAlphabetically(arrayOfWordsWithFrequenciesSortedByCount);
    var stringArray = [];
    for(i = 0;i < alphabetizedArray.length;i++) {
        var string = alphabetizedArray[i].word+"("+alphabetizedArray[i].count+")";
        stringArray.push(string);
    }
    var finalArray = [];
    for(i = 0; i < 10; i++) {
        if(stringArray[i] != null) {
            finalArray.push(stringArray[i]);
        }
    }   
    return finalArray;
}