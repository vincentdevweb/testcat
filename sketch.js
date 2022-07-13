// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;
let event;


function loadFile(event) {
    classifier = ml5.imageClassifier('MobileNet');
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('output');
        output.height = 400;
        output.width = 500;
        output.src = reader.result;
        classifier.classify(output, gotResult);
        hide()
    };
    reader.readAsDataURL(event.target.files[0]);
}


function setup() {
}

// A function to run when we get any errors and the results

function gotResult(error, results) {
    // section probability modifier
    let animal = document.getElementsByClassName("animal")
    let animal_type = "";
    let global_prob = 0;
    // probability

    // Display error in the console
    if (error) {
        console.error(error);
    } else {
        // The results are in an array ordered by confidence.
        console.log(results);
        str = String(results[0].label);
        if (str.includes("cat")) {
            animal_type = `chat`
        } else {
            animal_type = `chien ou raquette`
        }
    }
    for (let i = 0; i < 3; i++) {
        animal[i+1].innerHTML = animal_type
        document.getElementById(`breed`+i).innerText = results[i].label;
        document.getElementById(`prob`+i).innerText = nf(results[i].confidence, 0, 2) * 100;
        global_prob = global_prob + (nf(results[i].confidence, 0, 2) * 100)
    }
    hide(results)
    document.getElementById("global_prob").innerText = global_prob;
    animal[0].innerHTML = animal_type
}

function hide(results) {
    let prob = document.getElementById("probability")
    let prob50 = document.getElementById("p50")
    let prob33 = document.getElementById("p33")
    // chargement tout cacher
    prob.style.display = "none";
    prob50.style.display = "none";
    prob33.style.display = "none";
    if(getComputedStyle(prob).display == "none" && `${nf(results[0].confidence, 0, 2)*100}` >= 50 ){
        prob.style.display = "block";
    }else if(getComputedStyle(prob50).display == "none" && `${nf(results[0].confidence, 0, 2)*100}` < 50 ){
        prob.style.display = "block";
        prob50.style.display = "block";
    }else if(getComputedStyle(prob33).display == "none" && `${nf(results[0].confidence, 0, 2)*100}` < 33 ){
        prob.style.display = "block";
        prob50.style.display = "block";
        prob33.style.display = "block";
    }
}