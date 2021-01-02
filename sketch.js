//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;


function preload()
{
  //load images here
  dogImg = loadImage("happydog.png");
  happyDogImg = loadImage("Dog.png")
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(200, 400, 30, 30);
  dog.addImage(dogImg);
  dog.scale=0.2;
  database=firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    //foodS=foodS-1;
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  //add styles here
  textSize(18);
  fill("white");
  stroke("brown");
  text("PRESS UP ARROW TO FEED YOUR PET!", 100, 100);
  text("Food remaining - " + foodS, 150, 230);
console.log(foodS);
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1;
  }
    database.ref('/').update({
      food:x
    })
}
