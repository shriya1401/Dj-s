song=""
leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0

leftWristScore=0;

function preload(){
 song=loadSound("music.mp3")
}


function setup(){
    canvas=createCanvas(600,600);
    canvas.center();

    video=createCapture(VIDEO)
    video.hide();

 poseNet=ml5.poseNet(video, modelloaded);
poseNet.on("pose",gotPoses);



}

function draw(){
    image(video,0,0,600,600);
    fill('pink');
if (leftWristScore>0.2) {
    circle(leftWristX,leftWristY,20);
    console.log(volume);
    volume=leftWristY/500;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML="Volume: "+volume;
    
}
fill(255,0,0);
circle(rightWristX,rightWristY,20);

if (rightWristY>0 && rightWristY<=100) {
    document.getElementById("speed").innerHTML="Speed : 0.5x";
    song.rate(0.5)
}
if (rightWristY>100 && rightWristY<=200){
    document.getElementById("speed").innerHTML="Speed : 1x";
    song.rate(1)
}
if (rightWristY>200 && rightWristY<=300) {
    document.getElementById("speed").innerHTML="Speed : 1.5x";
    song.rate(1.5)
    
}
  if(rightWristY>300 && rightWristY<=400) {
      document.getElementById("speed").innerHTML="Speed :2x";
      song.rate(2)
  }
  if(rightWristY>400 && rightWristY<=5) {
      document.getElementById("speed").innerHTML="Speed :2.5x"
      song.rate(2.5)
  }
}


function play(){
    song.play()
    song.setVolume(1);
    song.rate(1.5);
    

}

function stop(){
    song.stop()
}


function modelloaded(){
    console.log("Model has been loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
       leftWristX= floor(results[0].pose.leftWrist.x);
       leftWristY=floor(results[0].pose.leftWrist.y);
       rightWristX=floor(results[0].pose.rightWrist.x);
       rightWristY=floor(results[0].pose.rightWrist.y);
       console.log("leftWristX= " + leftWristX);
       console.log("leftWristY=" + leftWristY);
       console.log("rightWristX=" + rightWristX);
       console.log("rightWristY=" + rightWristY);
       leftWristScore=results[0].pose.keypoints[9].score;
    }
}



