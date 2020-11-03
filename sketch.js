var Monkey,MonkeyImage; 
var Banana,BananaImage; 
var Obstacle,ObstacleImage,ObstaclesGroup;
var Ground,GroundImage;
var gameState="play";
var survival_time;
var invisibleGround;
var bananaGroup;
var Monkey_Running
var Monkey_Jumping;
var forest,forestImage;
var gameOver,gameOverImage,restart,restartImage;
var checkPointSound;
function preload(){
forestImage=loadImage("jungle.jpg")  
MonkeyImage=loadAnimation("sprite_2.png");
BananaImage=loadImage("banana.png");
ObstacleImage=loadImage("obstacle.png");  
Monkey_Running=loadAnimation("sprite_2.png","sprite_0.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
Monkey_Jumping=loadAnimation("sprite_0.png");
GroundImage=loadImage("ground2.png");
gameOverImage=loadImage("gameOver.png");
restartImage=loadImage("restart.png")
// checkPointSound=loadSound("checkpointSound")
}

function setup() {
 createCanvas(windowWidth,windowHeight);
 forest=createSprite(200,200,20,20);
 forest.addImage(forestImage); 
  Monkey=createSprite(45,390,20,20);
Monkey.addAnimation("running",Monkey_Running);
Monkey.addAnimation("collided",MonkeyImage);
Monkey.addAnimation("jumping",Monkey_Jumping);
  Monkey.scale=0.1; 
ObstaclesGroup=createGroup();
bananaGroup=new Group();
Ground=createSprite(220,390,600,10);
Ground.addImage("ground",GroundImage);
invisibleGround=createSprite(230,235,1000,10);
survival_time=0;
bananaGroup.debug=true;   
  gameOver=createSprite(230,200,20,20);
   gameOver.addImage(gameOverImage);
   restart=createSprite(200,245,20,20);
   restart.addImage(restartImage);
   restart.scale=0.5;

}
function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
function draw() {
background("white");
Ground.visible=false;
  if (gameState==="play"){
  gameOver.visible=false;
    restart.visible=false;
    Monkey.changeAnimation("running",Monkey_Running)
  if(keyDown("space")&& Monkey.y >= 270) {
    Monkey.velocityY=-10;  
  Monkey.changeAnimation(Monkey_Jumping);
  }
   //if(survival_time>0 && survival_time%100 === 0){
      // checkpointsound.play() 
    //}
    forest.velocityX=-3;
 if (forest.x<200){
   forest.x=forest.width/2;
 }   
    survival_time = survival_time + Math.round(getFrameRate()/60);
    
  Monkey.velocityY = Monkey.velocityY + 0.7
 Ground.velocityX=-3;
  if (Ground.x<0){
    Ground.x=Ground.width/2;
  }
 if (bananaGroup.isTouching(Monkey)){
bananaGroup.destroyEach();
//survival_time=survival_time+2;
Monkey.scale=Monkey.scale+0.01;
}
 
  spawnObstacles();
spawnBananas();
 if (Monkey.isTouching(ObstaclesGroup)){
  Monkey.changeAnimation("collided",MonkeyImage);
   ObstaclesGroup.destroyEach();
 forest.velocityX=0;
   gameState="end";
Monkey.scale=0.1;
 }

}

  
 if (gameState==="end"){
   Ground.velocityX=0;
   Banana.visible=false;
  gameOver.visible=true;
  restart.visible=true; 
   //stroke("red");
   //fill("red");
    //textSize(30);
   // text("GAME OVER!",200,200)
 //stroke("blue");
  //fill("blue");
 // text("PRESS 'R' TO RESTART",140,260) 
 }
  
if (mousePressedOver(restart)){
 reset(); 
}
  Monkey.collide(Ground);
invisibleGround.visible=false;
// if (Monkey.scale===1){
 //gameState="end";
 //text("YOU WIN",200,200);
//}
  drawSprites();
fill("black");
 stroke("black");
 textSize(12); 
  text("Survival Time:"+survival_time,200,50)

}
function reset(){
 gameState="play"; 
survival_time  =0;
}
function spawnBananas (){
if (frameCount%80===0){
Banana=createSprite(300,250,20,20);
Banana.addImage(BananaImage);
Banana.scale=0.1;  
Banana.x=Math.round(random(500,600));
Banana.velocityX=-3;
Banana.lifetime=500;  
bananaGroup.add(Banana); 
}
}

function spawnObstacles(){
 if(frameCount%120===0){
  Obstacle=createSprite(200,376,20,20);
  Obstacle.addImage(ObstacleImage);
  Obstacle.scale=0.1;
  Obstacle.x=Math.round(random(350,600));
  Obstacle.velocityX=-3;
  Obstacle.lifetime=500; 
 ObstaclesGroup.collide(invisibleGround);
Obstacle.setCollider("rectangle",0,0,0,0);
   Obstacle.debug=false;
ObstaclesGroup.add(Obstacle);
 } 
}


