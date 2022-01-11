Webcam.set({
    width: 350,
    height:300,
    image_format: "png",
    png_quality: 90
    });
    
    first_prediction = "";
    second_prediction = "";
    camera = document.getElementById("taken_photo");
    
    Webcam.attach(camera);
    
    function takePhoto(){
    Webcam.snap(function(data_uri){
        document.getElementById("result_photo").innerHTML = '<img id="captured_picture" src="'+data_uri+'"/>';
    })
    };
    
    console.log("ml5 version:", ml5.version);
    
    classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/HfavG3ZI8/model.json",modelLoaded);
    
    function modelLoaded(){
        console.log("Model Loaded")
    };

    function predictGesture(){
        img=document.getElementById("captured_picture");
        classifier.classify(img, gotResult);
    }
    
    function speak(){
        var synth = window.speechSynthesis; 
        speak_information_1 = "The first prediction is " +first_prediction; 
        speak_information_2 = "The second prediction is " +second_prediction; 
        var utterThis = new SpeechSynthesisUtterance(speak_information_1 + speak_information_2);
        synth.speak(utterThis);
    }
    
    function gotResult(error, result){
        if (error){
            console.error(error);
        }
        else{
            console.log(result);
            document.getElementById("result1_gesture_name").innerHTML = result[0].label;
            document.getElementById("result2_gesture_name").innerHTML = result[1].label;
            first_prediction = result[0].label;
            second_prediction = result[1].label;
            speak();
            }
        }