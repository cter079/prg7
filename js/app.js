// const imageInput = document.querySelector('#image-input');
// const labelOneBtn = document.querySelector("#labelOne");
// const labelTwoBtn = document.querySelector("#labelTwo");
// const labelThreeBtn = document.querySelector("#labelThree");
// const trainBtn = document.querySelector("#train");
// const label = document.querySelector("#label");

// // Initialize the classifier
// let classifier = ml5.featureExtractor('MobileNet', () => {
//   classifier = classifier.classification(imageInput, () => {
//     label.innerText = "Ready when you are!";
//   });
// });

// // Add an event listener to each label button
// labelOneBtn.addEventListener("click", () => {
//     // Get the image data from the image input element
//     let imageData = imageInput.files[0];
//     if (imageData) {
//       let image = new Image();
//       image.src = URL.createObjectURL(imageData);
//       image.onload = () => {
//         // Add the image to the classifier with the "hamster" label
//         classifier.addImage(image, "hamster");
//         //show the image in the browser with the label
        


//       }
//     }
//   });

//   labelTwoBtn.addEventListener("click", () => {
//     // Get the image data from the image input element
//     let imageData = imageInput.files[0];
//     if (imageData) {
//       let image = new Image();
//       image.src = URL.createObjectURL(imageData);
//       image.onload = () => {
//         // Add the image to the classifier with the "dog" label
//         classifier.addImage(image, "dog");
//       }
//     }
//   });

//   labelThreeBtn.addEventListener("click", () => {
//     // Get the image data from the image input element
//     let imageData = imageInput.files[0];
//     if (imageData) {
//       let image = new Image();
//       image.src = URL.createObjectURL(imageData);
//       image.onload = () => {
//         // Add the image to the classifier with the "cat" label
//         classifier.addImage(image, "cat");
//       }
//     }
//   });
// // Add an event listener to the train button
// trainBtn.addEventListener("click", () => {
//  //train the classifier with their images and label and save the model
//     classifier.train((lossValue) => {
//         if (lossValue) {
//             loss = lossValue;
//             console.log('Loss: ', loss);
//         } else {
//             console.log('Done Training! Final Loss: ', loss);
//             classifier.save();

//         }
//         }
//     );

// });


const classifier = ml5.imageClassifier('./model/model.json', modelLoaded);


function modelLoaded() {
  console.log('Model Loaded!');
}

const imageUpload = document.getElementById("imageUpload");
imageUpload.addEventListener("change", handleImageUpload);

function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      classifyImage(img);
    };
    img.src = event.target.result;
  };
}

function classifyImage(img) {
   
    classifier.classify(img, (error, results) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(results);
      if (results[0].label === "hamster") {
        const msg = new SpeechSynthesisUtterance("Hamster detected!");
        const label = document.querySelector("#result");
        label.innerText = "Hamster detected!";

        window.speechSynthesis.speak(msg);
      } else {
        const msg = new SpeechSynthesisUtterance("That's not a hamster! Try again!");
        const label = document.querySelector("#result");
        label.innerText = "That's not a hamster! Try again!";
        window.speechSynthesis.speak(msg);
      }
    });
  }

  
  
  
  




