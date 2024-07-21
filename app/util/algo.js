// const originalPara = "The biggest risk is not taking any risk… In a world that’s changing really quickly, the only strategy that is guaranteed to fail is not taking risks.";
// console.log("original Paragraph: ", originalPara);

// const distortedPara = getDistortedPara(originalPara);
// console.log("Distorted: ", distortedPara);



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
    console.log("Submission: ",submission);
    const ogWords = originalPara.split(' ');
    const totalScore = ogWords.length;
    var score = 0;
    console.log("ogWords: ",ogWords);
    const sbWords = submission.split(' ');
    console.log("sbWords: ",sbWords);
    if (ogWords.length != sbWords.length) {
        // console.log("Point -1");
        score -= 1;
    }

    for (let wordIndex = 0; wordIndex < ogWords.length; wordIndex++) {
        const ogWord = ogWords[wordIndex];
        if (wordIndex < sbWords.length) {
            const sbWord = sbWords[wordIndex];

            // calcualtion 
            if (ogWord == sbWord) {
                
                score =score + 1;
                
                console.log(`# ${ogWord} == ${sbWord} ${score} +1`);
            }else{
                console.log(`# ${ogWord} != ${sbWord} ${score} -1`);
            }

        } else {
            // console.log(`${wordIndex} bigger than ${ogWords.length}`);
        }
    }
    console.log("Score: ",score);
    const accuracy = (score / totalScore * 100).toFixed();
    
    const result = {
        score: score,
        total:totalScore,
        accuracy: accuracy
    }

    console.log("Score:", score);
    console.log("Total Score:", totalScore);
    console.log("Accuracy:", accuracy);

    return result;

}

function getRandomInt(bound) {
    return Math.floor(Math.random() * bound);
}
