// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
var classifier = ml5.imageClassifier('MobileNet');
var probid = document.getElementById('probid');
var probid2 = document.getElementById('probid2');

var str = new String;

var word1 = "cat";


var cost = 0 ; // Cat prob
var cost2 = 0 ; // dog prob

// A variable to hold the image we want to classify
let img

function loadFile(event) {
    var reader = new FileReader();
    reader.onload = function(){
        var output = document.getElementById('output');
        output.src = reader.result;
        classifier.classify(output, gotResult);
    };
reader.readAsDataURL(event.target.files[0]);
}

function setup() {}

// A function to run when we get any errors and the results
function gotResult(error, results) {
    // Display error in the console
    if (error) {
      console.error(error);
    } else {
      // The results are in an array ordered by confidence.
      console.log(results);

      cost = 0 ;
      cost2 = 0 ;

       //Cat else dog Probabilité
      str = String(results[0].label) ;
      if (str.includes(word1)) {
        probid.style.display = "block" ;
        probid2.style.display = "none" ;
        document.getElementById(`name1`).innerText = results[0].label ;
        document.getElementById(`prob1`).innerText = nf(results[0].confidence, 0, 2)*100 ;
        cost = cost + nf(results[0].confidence, 0, 2)*100 ;
      } else {
        probid.style.display = "none" ;
        probid2.style.display = "block" ;
        document.getElementById(`name4`).innerText = results[0].label ;
        document.getElementById(`prob4`).innerText = nf(results[0].confidence, 0, 2)*100 ;
        cost2 = cost2 + nf(results[0].confidence, 0, 2)*100 ;
      }
      
      str = String(results[1].label) ;
      if (str.includes(word1)) {
        document.getElementById(`name2`).innerText = results[1].label ;
        document.getElementById(`prob2`).innerText = nf(results[1].confidence, 0, 2)*100 ;
        cost = cost + nf(results[1].confidence, 0, 2)*100 ;
      } else {
        document.getElementById(`name5`).innerText = results[1].label ;
        document.getElementById(`prob5`).innerText = nf(results[1].confidence, 0, 2)*100 ;
        cost2 = cost2 + nf(results[1].confidence, 0, 2)*100 ;
      }
  
      str = String(results[2].label) ;
      if (str.includes(word1)) {
        document.getElementById(`name3`).innerText = results[2].label ;
        document.getElementById(`prob3`).innerText = nf(results[2].confidence, 0, 2)*100 ;
        cost = cost + nf(results[2].confidence, 0, 2)*100 ;
      } else {
        document.getElementById(`name6`).innerText = results[2].label ;
        document.getElementById(`prob6`).innerText = nf(results[2].confidence, 0, 2)*100 ;
        cost2 = cost2 + nf(results[2].confidence, 0, 2)*100 ;
      }
  
      document.getElementById(`cost1`).innerText = cost ;
      document.getElementById(`cost2`).innerText = cost2 ;
    }
  }
