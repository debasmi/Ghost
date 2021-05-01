var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockG;

var gameState="play";

var spookySound;

function preload()
{
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  
  spookySound=loadSound("spooky.wav");
   
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockG=new Group();
}

function setup()
{
  createCanvas(600,600);
  
  spookySound.loop();
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("running",ghostImg);
  ghost.scale=0.3;
  
  
}

function draw()
{
 background(0);
  
 if(tower.y>400)
   {
     tower.y=300;
   }

if(gameState==="play")
  {
  if(keyDown("left"))
    {
      ghost.x=ghost.x-3;
    }
  if(keyDown("right"))
    {
      ghost.x=ghost.x+3;
    }
  if(keyDown("space"))
    {
      ghost.velocityY=-5;
    }
  ghost.velocityY=ghost.velocityY+0.8;
    
    
  
  if(climberGroup.isTouching(ghost))
    {
      ghost.velocityY=0;
    }
  
  if(invisibleBlockG.isTouching(ghost)|| ghost.y>600)
    {
      ghost.destroy();
      gameState="end";
    }
  
  spawnDoors();
  
  drawSprites();
}

if(gameState==="end"){
  stroke("yellow")
  fill("yellow");
  textSize(30);
  text("Game over",230,250);
}
}
function spawnDoors()
{
  if(frameCount%240===0)
    {
      door=createSprite(200,-50);
      door.addImage("door",doorImg);
      door.x=Math.round(random(120,400));
      door.velocityY=1;
      door.lifetime=800;
      doorGroup.add(door);
      ghost.depth=door.depth;
      ghost.depth+=1;
      
      climber=createSprite(200,10);
      climber.addImage("climber",climberImg);
      climber.x=door.x;
      climber.velocityY=1;
      climber.lifetime=800;
      climberGroup.add(climber);
      
      invisibleBlock=createSprite(200,15);
      invisibleBlock.width=climber.width;
      invisibleBlock.height=2;
      invisibleBlock.x=door.x;
      invisibleBlock.velocityY=1;
      invisibleBlock.debug=true;
      invisibleBlockG.add(invisibleBlock);
      
      
    }
}