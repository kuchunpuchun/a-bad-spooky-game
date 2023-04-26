var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var todasBarras
var todosCuadrados
var score = 0
var highscore = 0

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;


  player = createSprite(300,200);
  player.addImage("ghost",ghostImg)
  player.scale = 0.3
  player.setCollider("circle",-25,32 ,125)
  player.debug = true

  todasBarras = new Group()
  todosCuadrados = new Group()
  //spookySound.loop()
}

function draw() {

 
  

  if (gameState == "play"){
  background(200);
  


  if(tower.y > 400){
      tower.y = 300
    }


  drawSprites()

  textSize(20)
  text("score:"+score,20,30)
  textSize(20)
  text("highscore:"+highscore,20,60)
  
  score = score+1

if (score > highscore){
  highscore = score
}
  player.velocityY = player.velocityY + 0.8
         
  if(keyDown("space") && player.y > 80) {
    player.velocityY = -10 ;
  }

  if(keyDown("d") && player.y > 80) {
    player.velocityX = 4
  }

  if(keyDown("a") && player.y > 80 ) {
    player.velocityX = -4 ;
  }

  player.collide(todasBarras)
  spawnBarras()


  if (player.collide(todosCuadrados)){
     gameState = "over"
  }
  }
if (gameState == "over"){
background("black")

barra.lifetime = 0
cuadrado.lifetime = 0
ventana.lifetime = 0

score = 0
player.y = 300
player.x = 300

textSize(40)
fill("white")
text("'YOU DED'",300,300)
textSize(20)
fill("white")
text("Press 'R' to restart!",300,250)
if (keyDown("r")){
  gameState = "play"
}
}
}




function spawnBarras(){
    // anti lag
    if(frameCount%200==0){
  
     barra = createSprite(Math.round(random(100,500)),-50)
    
     cuadrado = createSprite(barra.x,barra.y+10,100,20)
     cuadrado.visible = false
     ventana = createSprite(barra.x,barra.y-62)
     barra.velocityY = +4
     cuadrado.velocityY = +4
     ventana.velocityY = +4
     barra.addImage("nose",climberImg)
     ventana.addImage("nose",doorImg)
     barra.scale = 1;
     barra.lifetime = (windowWidth/barra.velocityX)+10;
     cuadrado.lifetime = (windowWidth/barra.velocityX)+10;
     ventana.lifetime = (windowWidth/barra.velocityX)+10;
     ventana.depth = barra.depth - 1;
     barra.depth = barra.depth + 1;
     player.depth = barra.depth + 1;
     todasBarras.add(barra)
     todosCuadrados.add(cuadrado)
    }  
  }