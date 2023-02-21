let calculatedP = new Map();

function p(number) {

    if (calculatedP.has(number)){return calculatedP.get(number)};
    let result = 0;

    if(number>=2) {
        result = 2*p(number - 1)+p(Math.trunc(number / 2));
        calculatedP.set(number,result);
        return result;
    }
    else {
        return number;
    }
}

console.log(p(60));
// 9223372036854775807
// 1770720133430443500