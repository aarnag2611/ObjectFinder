status= "";
function preload(){

}
function setup(){
canvas= createCanvas(500,400);
canvas.center();
video= createCapture(VIDEO);
video.hide();
}
function draw(){
 image(video, 0, 0, 500, 400);
}
function start(){
    objdetector= ml5.objectDetector("cocossd", modeloaded);
    document.getElementById("status").innerHTML= "status: detecting objects";
}
function modeloaded(){
    console.log("model is loaded");
    status= true;
}