/*global chrome*/
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if(request.type === 'reactInit') {
        let array = [];
        let portions = 1;
        let url = window.location.href;

        if(url.includes("ica")){

            let portionsNode = document.querySelector(".servings-picker");
            if(portionsNode !== null){
                portions = findPortionsRegex(portionsNode.dataset.currentPortions);
            }

            let nodesArray = Array.from(document.querySelectorAll(".ingredients__list__item"));
            let option1 = nodesArray[0].querySelector('.ingredient');
            let option2 = nodesArray[0].querySelector('span');
            if(option1) {
                array = nodesArray.map((node) => {
                    return useRegex(node.querySelector('.ingredient').innerText);
                });
            }
            else if (option2) {
                array = nodesArray.map((node) => {
                    return useRegex(node.innerText);
                });
            }
        }
        else if(url.includes("koket")){
            let portionsNode = document.querySelector("span.amount");
            if(portionsNode !== null){
                portions = findPortionsRegex(portionsNode.innerText);
            }
            let nodesArray = Array.from(document.querySelectorAll(".ingredient"));
            array = nodesArray.map((node) => {
                return useRegex(node.innerText);
            });
        }
        else if(url.includes("coop")){
            let portionsNode = document.querySelector(".Recipe-portionsCount");
            if(portionsNode !== null){
                portions = findPortionsRegex(portionsNode.innerText);
            }

            let nodesArray = Array.from(document.querySelectorAll(".Recipe-ingredient"));
            array = nodesArray.map((node) => {
                return useRegex(node.innerText);
            });
        }
        sendResponse({array, portions});
    }
});


function useRegex(inputString = '') {

    inputString = inputString.trim();

    const re1 = /(\d+)\s*(kilo|kg|gram|g|milligram|mg|liter|l|deciliter|dl|centiliter|cl|milliliter|ml|matsked|msk|tesked|tsk|kryddmått|krm|blad|krukor|kruka|koppar|kopp|nypor|nypa|stycken|st|förpackning|förpackningar|förp|klyftor|klyfta)\s(\D+)/;
    const re2 = /\d+\s+\D+/;
    const re3 = /^\D+/;   // \D is "not digit"
    const fraction = /(\/)/;

    let ingredientArray = [];
    let ingredientObject = {
        amount: 0,
        type: '',
        name: ''
    };

    if(inputString.match(re1)){
        //separate amount, type and name
        ingredientArray = inputString.split(/\s(kilo|kg|gram|g|milligram|mg|liter|l|deciliter|dl|centiliter|cl|milliliter|ml|matsked|msk|tesked|tsk|kryddmått|krm|blad|krukor|kruka|koppar|kopp|nypor|nypa|stycken|st|förpackning|förpackningar|förp|klyftor|klyfta)\s/);
        let ingredientAmount = ingredientArray[0].match(/[^a-z+å+ä+ö]+/)[0];

        if(ingredientAmount.match(fraction)){    //calculate fraction
            let index = (ingredientAmount.match(fraction))['index'];
            let numerator = Number(ingredientAmount.substring(0,index));
            let denominator = Number(ingredientAmount.substring(index+1));
            ingredientObject.amount = numerator/denominator;
        }
        else {
            ingredientObject.amount = ingredientAmount;//not containing a slash (fraction)
        }
        ingredientObject.type = ingredientArray[1];
        ingredientObject.name = ingredientArray[2];

    }
    else if (inputString.match(re2)) {
        //separate amount and name
        index = inputString.search(/\d\s+\D/);
        ingredientObject.amount = inputString.substring(0,index+1);
        let ingredientAmount = ingredientObject['amount'].match(/[^a-z+å+ä+ö]+/)[0]

        if(ingredientAmount.match(fraction)){    //calculate fraction
            let index = (ingredientAmount.match(fraction))['index'];
            let numerator = Number(ingredientAmount.substring(0,index));
            let denominator = Number(ingredientAmount.substring(index+1));
            ingredientObject.amount = numerator/denominator;
        }
        ingredientObject.name = inputString.slice(index+2);
        ingredientObject.type = "st";
    }
    else if (inputString.match(re3)) {
        // don't separate
        ingredientObject.name = inputString;
    }

    for (let property in ingredientObject){
        if(typeof ingredientObject[property] === 'string'){
            // remove whitespace
            ingredientObject[property] = ingredientObject[property].trim();

            // change amount to number
            if(property === 'amount'){
                if(ingredientObject[property].match(/\d+/)){
                    ingredientObject[property] = ingredientObject[property].replace(',','.');
                    ingredientObject[property] = Number(ingredientObject[property])
                }
            }
        } else if(typeof ingredientObject[property] === 'undefined') {
            // reset if undefined
            ingredientObject[property] = '';
        }
    }
    return ingredientObject;
}

function findPortionsRegex(inputString) {
    inputString.trim();
    var r = /\d+/;
    regexResult = inputString.match(r);

    if(regexResult === null) {
        return 1;                   // default if no number is found
    } else {
        portionsNumber = Number(regexResult[0]);
    }
    return portionsNumber;
}