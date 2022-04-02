const fs = require("fs");
const { questions } = require("./allQuestions");

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

let results = [];

questions.forEach((q) => {
    results = [...results, ...q.results];
});

let mapResults = results.map((a) => {
    return {
        question: a.question,
        content: shuffle([...a.incorrect_answers, a.correct_answer]),
        correct: a.correct_answer,
    };
});

let knownQuestions = [];
let finalResults = [];
let duplicateResults = [];

mapResults.forEach((m) => {
    if (knownQuestions.includes(m.question)) {
        duplicateResults.push(m);
        return;
    }

    knownQuestions.push(m.question);
    finalResults.push(m);
});

fs.writeFile("allResults.json", JSON.stringify(finalResults), (err) => {
    if (err) {
        console.error(err);
        return;
    }
});
