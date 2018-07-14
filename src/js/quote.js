let quotesArray = [
    "Anyone who has ever made anything of importance was disciplined. — Andrew Hendrixson",
    "Don’t spend time beating on a wall, hoping to transform it into a door. — Coco Chanel",
    "Creativity is intelligence having fun. — Albert Einstein",
    "Optimism is the one quality more associated with success and happiness than any other. — Brian Tracy",
    "Always keep your eyes open. Keep watching. Because whatever you see can inspire you. — Grace Coddington",
    "What you get by achieving your goals is not as important as what you become by achieving your goals. — Henry David Thoreau",
    "If the plan doesn’t work, change the plan, but never the goal. — Author Unknown"
];

export function randomizeQuote() {    
    let quoteSelection = Math.floor((Math.random() * (quotesArray.length)));
    console.log("quote selection: " + quoteSelection);
    console.log("quote: " + quotesArray[quoteSelection]);

    document.getElementById("quote").innerHTML = quotesArray[quoteSelection];

    // Math.floor((Math.random() * 10) + 1); -> return a random number between 1 and 10
}