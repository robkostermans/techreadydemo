/*
    6. TOP IT OFF

    keywords: vanillaJS, ES6, polyfill/shim vs Babel
*/

// RECIPE
var steps = document.querySelectorAll("input.recipe__step");
for (i = 0; i < steps.length; i++) {
    steps[i].addEventListener('change', function (event) {
        var selectedStep = this.getAttribute("data-step");
        if (this.checked)
            this.checked = false;
        for (a = 0; a <= steps.length; a++){
            if (a <= selectedStep){
                document.getElementById("stage" + a).checked = true;
                document.body.classList.add("step" + a)
            } else {
                document.getElementById("stage" + a).checked = false;
                document.body.classList.remove("step" + a)
            }
        }
    });
};

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

//ES6: multiline String en template literals #{}
var partOfPoem = "as just as fair";
var roadPoem = `Then took the other, ${partOfPoem},
    And having perhaps the better claim
    Because it was grassy and wanted wear,
    Though as for that the passing there
    Had worn them really about the same,`

//ES6: promises and arrow functions(this)
var wait1000 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000)
}).then(() => {
    console.log(roadPoem)
})