// const originalPara = "The biggest risk is not taking any risk… In a world that’s changing really quickly, the only strategy that is guaranteed to fail is not taking risks.";
// console.log("original Paragraph: ", originalPara);

// const distortedPara = getDistortedPara(originalPara);
// console.log("Distorted: ", distortedPara);

// const submission = 'The biggest risk is not takingany risk… In a world t hat’s changing really quickly, the only strategy that is gu ar anteed to failisn ott akingr isk s.'

export function getDistortedPara(originalPara) {
    const totalSpaces = originalPara.split(" ").length - 1;
    const withoutSpacesPara = originalPara.replaceAll(" ", "");
    const words = withoutSpacesPara.split("");
    for (let i = 0; i < totalSpaces; i++) {
        const randomIndex = getRandomInt(withoutSpacesPara.length);
        const selectedChar = withoutSpacesPara.charAt(randomIndex);
        words[randomIndex] = ` ${selectedChar}`
    }
    const distortedPara = words.join('');
    return distortedPara;
}

export function getSubmitResult(originalPara, submission) {
    const ogWords = originalPara.split(' ');
    const totalScore = ogWords.length;
    var score = totalScore
    // console.log("ogWords: ",ogWords);
    const sbWords = submission.split(' ');
    // console.log("sbWords: ",sbWords);
    if (ogWords.length != sbWords.length) {
        // console.log("Point -1");
        score = score - 1;
    }
    for (let wordIndex = 0; wordIndex < ogWords.length; wordIndex++) {
        const ogWord = ogWords[wordIndex];
        if (wordIndex < sbWords.length) {
            const sbWord = sbWords[wordIndex];

            // calcualtion 
            if (ogWord != sbWord) {
                score = score - 1;
            }
        }
    }
    const accuracy = (score / totalScore * 100).toFixed();
    
    const result = {
        score: score,
        total:totalScore,
        accuracy: accuracy
    }
    // console.log("Score:", score);
    // console.log("Total Score:", totalScore);
    // console.log("Accuracy:", accuracy);
    return result;
}

function getRandomInt(bound) {
    return Math.floor(Math.random() * bound);
}
