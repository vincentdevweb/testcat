// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
var classifier = ml5.imageClassifier('MobileNet');

var str = new String;
const word1 = "cat";

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
  
       //Cat else dog Probabilité
      str = String(results[0].label) ;
      if (str.includes(word1)) {
        createDiv(`Miaou probable : ${results[0].label}` + ` <br/> Estimation : ${nf(results[0].confidence, 0, 2)*100}%`);
        cost = cost + nf(results[0].confidence, 0, 2)*100 ;
      } else {
        createDiv(`Whouaf probable : ${results[0].label}` + ` <br/> Estimation : ${nf(results[0].confidence, 0, 2)*100}%`);
        cost2 = cost2 + nf(results[0].confidence, 0, 2)*100 ;
      }
      
      str = String(results[1].label) ;
      if (str.includes(word1)) {
        createDiv(`Miaou moins probable : ${results[1].label}` + ` <br/> Estimation : ${nf(results[1].confidence, 0, 2)*100}%`);
        cost = cost + nf(results[1].confidence, 0, 2)*100 ;
      } else {
        createDiv(`Whouaf moins probable : ${results[1].label}` + ` <br/> Estimation : ${nf(results[1].confidence, 0, 2)*100}%`);
        cost2 = cost2 + nf(results[1].confidence, 0, 2)*100 ;
      }
  
      str = String(results[2].label) ;
      if (str.includes(word1)) {
        createDiv(`Miaou trés peu probable : ${results[2].label}` + ` <br/> Estimation : ${nf(results[2].confidence, 0, 2)*100}%`);
        cost = cost + nf(results[2].confidence, 0, 2)*100 ;
      } else {
        createDiv(`Whouaf trés peu probable : ${results[2].label}` + ` <br/> Estimation : ${nf(results[2].confidence, 0, 2)*100}%`);
        cost2 = cost2 + nf(results[2].confidence, 0, 2)*100 ;
      }
  
      createDiv(`la probabilité que la photo soit un chat est de: <br/>` + cost + ` % `);
      createDiv(`la probabilité que la photo soit un chien est de: <br/>` + cost2 + ` %`);
    }
  }
