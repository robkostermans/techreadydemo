/*
    6. TOP IT OFF

    keywords: vanillaJS, ES6, polyfiil/shim vs Babel
*/


//esc closes dialog
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 27) {
        event.preventDefault();
        document.getElementById('calltoaction').checked = false;
    }
});

// arrow right - next step
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 39) {
        event.preventDefault();
        var nextButton = document.querySelector('.question__selector:checked + .question + .question__selector');
        if (nextButton)
            nextButton.checked = true;
    }
});

//ES6: multiline String
var roadPoem = `Then took the other, as just as fair,
    And having perhaps the better claim
    Because it was grassy and wanted wear,
    Though as for that the passing there
    Had worn them really about the same,`

//ES6: promises and arrow functions(this)
var wait1000 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000)
}).then(() => {
    console.log('Yay!')
})