var  dog,  database, foodS, foodStock;
var happyImage, dogImage;
function preload()
{
	dogImage=loadImage("images/dogimg.png");
  happyImage=loadImage("images/dogimg1.png");
}

function setup() {
	createCanvas(500, 500);
  database= firebase.database();
  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  dog = createSprite(400,300,20,20);
  dog.addImage(happyImage);
  dog.scale=0.4;
  
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(happyImage);
  }
  drawSprites();
  textSize(20);
  fill("yellow");
  stroke('red');
  text("Press up arrow to feed the dog!!",50,400);
  text("Food remaining: "+foodS,300,100);

}
function readStock(data){

  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').set({
    food:x
  })
}

