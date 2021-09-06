 class Game{
   constructor(){
        this.resetButton = createButton("Reset");
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
    form.hide();
    this.handleResetButton();
    Player.getPlayerInfo();
    player.getPlayersAtEnd();
 

    image(back_img, 0, 0, 1000, 800);
    var x =100;
    var y=200;
    var index =0;
    drawSprites();

    this.resetButton.position(width / 2 + 230, 400);  
   

    for(var plr in allPlayers){    
    index = index+1;
    x = 500-allPlayers[plr].distance;
    y=500;                     
    players[index -1].x = x;
    players[index - 1].y = y;                       
    if(index === player.index){
    fill("black");
    textSize(25);
    text(allPlayers[plr].name ,x-25,y+25);
    }              
    textSize(25);
    fill("black");
    text("Player 1 :" +allPlayers.player1.score,50,50);
    text("Player 2 :" + allPlayers.player2.score, 50, 100);
    }
                
                
                 

    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
    player.distance -= 10
    player.update();
    }
    if (keyIsDown(LEFT_ARROW) && player.index !== null) {
    player.distance += 10
    player.update();
    }


            
    if (frameCount % 20 === 0) {
    fruits = createSprite(random(100, 1000), 0, 100, 100);
    fruits.velocityY = 6;
    var rand = Math.round(random(1,5));
    switch(rand){
    case 1: fruits.addImage("fruit1",fruit1_img);
    break;
    case 2: fruits.addImage("fruit1", fruit2_img);
    break;
    case 3: fruits.addImage("fruit1", fruit3_img);
    break;
    case 4: fruits.addImage("fruit1", fruit4_img);
    break;
    case 5: fruits.addImage("fruit1", fruit5_img);
    break;}
    fruitGroup.add(fruits);}
                 
    if (player.index !== null) {
    for (var i = 0; i < fruitGroup.length; i++) {
    if (fruitGroup.get(i).isTouching(players)) {
    fruitGroup.get(i).destroy();  
    player.score +=1;
    player.update();
    }}

  if(frameCount % 40 === 0){
      this.spawnObstacle();
    }
    
if(obstacleGroup.collide(players)){
  
  gameState = 2;
  this.update(2);
  this.end();
}
push ();
fill(256)
text("Mam The collision between mushroom and basket is not changing gameState",100,200)
pop();
    }
      if(player.score === 10){
        gameState = 2;
        player.rank +=1;
        Player.updatePlayersAtEnd(player.rank)
        player.update();
      
     this.showRank();
      }

     

    }
    
                
showRank() {
    alert("Awesome !! You finished the game! You rank is :" +player.rank) }
    
  end(){
    console.log("Game Ended");
    textSize(20);
    text("Game Over", 200,200  )  }


  handleResetButton() {
    this.resetButton.mousePressed(() => {
    database.ref("/").set({
    playerCount: 0,
    gameState: 0,
    players: {}, });
    window.location.reload()})}


    spawnObstacle(){
 var x = random(0,width -100);
 var y = 0;
  obstacle = createSprite(x,y,20,20);
  obstacle.velocityY = 4
  obstacle.addImage("veggie", mushroom )
  obstacle.scale = 0.1
  obstacleGroup.add(obstacle);

}}
