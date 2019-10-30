symbolList = [];
currentSymbol = 0;

function textChanged(input) {
    var word = input.value;
    if (word !== "") {
        var xhttp = new XMLHttpRequest;
        xhttp.open("POST", "https://point.widgit.com/point.php?format=json&word=" + word, true);
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp.send("account=WidgitRecruitment1&size=250");

        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == XMLHttpRequest.DONE) {
                var response = JSON.parse(xhttp.response);
                if(response.cmaps.length > 0) {
                    if (response.text == input.value) {
                        setSymbols(response.cmaps);    
                    }
                }
                else {
                    resetSymbol();
                }
            }
        }
    }
}

function resetSymbol() {
    document.getElementsByClassName("flashcard-image-holder")[0].style.backgroundColor = "#cccccc";
    document.getElementById("flashcard-image").setAttribute("src", "");
    document.getElementById("next-symbol").style.display = "none";
    document.getElementById("previous-symbol").style.display = "none";
    document.getElementsByClassName("multiple-message")[0].style.display = "none";
}

function setSymbols(symbols) {
    symbolList = symbols;
    currentSymbol = 0;
    if(symbolList.length > 1) {
        document.getElementById("next-symbol").style.display = "inline-block";
        document.getElementById("previous-symbol").style.display = "inline-block";
        document.getElementsByClassName("multiple-message")[0].style.display = "block";
    }
    else {
        document.getElementById("next-symbol").style.display = "none";
        document.getElementById("previous-symbol").style.display = "none";
        document.getElementsByClassName("multiple-message")[0].style.display = "none";
    }
    document.getElementsByClassName("flashcard-image-holder")[0].style.backgroundColor = "white";
    document.getElementById("flashcard-image").setAttribute("src", symbolList[currentSymbol][0].src);
}

function nextSymbol() {
    if((currentSymbol + 1) > (symbolList.length - 1)) {
        currentSymbol = 0;
    }
    else {
        currentSymbol += 1;
    }
    document.getElementsByClassName("flashcard-image-holder")[0].style.backgroundColor = "white";
    document.getElementById("flashcard-image").setAttribute("src", symbolList[currentSymbol][0].src);
}

function previousSymbol() {
    if((currentSymbol - 1) < 0) {
        currentSymbol = (symbolList.length - 1);
    }
    else {
        currentSymbol -= 1;
    }
    document.getElementsByClassName("flashcard-image-holder")[0].style.backgroundColor = "white";
    document.getElementById("flashcard-image").setAttribute("src", symbolList[currentSymbol][0].src);
}