function getComments(arr) {
    return arr.filter((str) => { str.match("^[[:space:]]*#[[:space:]]*") }).join("<br>");

}

console.log(getComments(['  #aaaa', '   bbbbb', '  cccc#']))