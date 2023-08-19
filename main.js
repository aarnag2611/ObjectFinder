status= "";
object= [];
function preload(){

}
function setup(){
canvas= createCanvas(500,400);
canvas.center();
video= createCapture(VIDEO);
video.hide();
}
function start(){
    objdetector= ml5.objectDetector("cocossd", modeloaded);
    document.getElementById("status").innerHTML= "status: detecting objects";
    object_name= document.getElementById("objinput").value;
}
function modeloaded(){
    console.log("model is loaded");
    status= true;
}
function gotresults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object=results;
    }
}
function draw(){
    image(video, 0, 0, 500, 400);
    if(status!= ""){
        objdetector.detect(video, gotresults);
        for (i=0; i<object.length; i++){
            fill("red");
            stroke("blue");
            percent= floor(object[i].confidence*100);
            text(object[i].label+ " "+percent+"%",object[i].x,object[i].y);
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if(object[i].label==object_name){
                video.stop();
                objdetector.detect(gotresults);
                document.getElementById("status").innerHTML= "status: "+object_name+" found";
                synth= window.speechSynthesis;
                utterthis= new SpeechSynthesisUtterance(object_name+"found");
                synth.speak(utterthis);
            }
            else{
                document.getElementById("status").innerHTML= "status: "+object_name+"not found";
            }
        }
    }
   }