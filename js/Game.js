class Game {
  constructor(){

  }
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountref = await database.ref('playerCount').once("value");
      if(playerCountref.exists()){
        playerCount = playerCountref.val()
        player.getCount();
      }
      
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide();
    text("Game Start",120,100);
    Player.getplayerInfo();

    if(allPlayers !== undefined){
      var pos = 130;
      for(var plr in allPlayers){
        pos+=20;
        textSize(15);
        text(allPlayers[plr].name+ ": "+allPlayers[plr].distance,120,pos);
      }
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance+=20;
      player.update();
    }
  }
}
