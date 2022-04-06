prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {

    Webcam.snap(function (data_uri) {

        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log("ml5 version", ml5.version)
Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nsiLfpIse/model.json', modelloaded);


function modelloaded() {
    console.log("modelloaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = " The first prediction is " + prediction_1;
    speak_data_2 = " and the second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);

}

function check(){
    img = document.getElementById('captured_image');
    Classifier.classify(img, gotresult);

}

function gotresult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById('result_emotion_name').innerHTML = results[0].label;
        document.getElementById('result_emotion_name2').innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "THUMBS UP") {

            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        if (results[0].label == "OK") {

            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
    }

    if (results[0].label == "VICTORY") {

        document.getElementById("update_emoji").innerHTML = "&#9996;";
    }
}

if (results[1].label == "THUMBS UP") {

    document.getElementById("update_emoji2").innerHTML = "&#128077";
}

if (results[1].label == "OK") {

    document.getElementById("update_emoji2").innerHTML = "&#128076;";
}

if (results[1].label == "VICTORY") {

    document.getElementById("update_emoji2").innerHTML = "&#9996;";
}
