class Game{
 constructor(){
 }
 getState(){
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data){
        gameState = data.val()
  })  
 }
update(state){
database.ref('/').update({
    gameState:state
})
}
start(){
    if(gameState === 0){
        player = new Player()
        player.getCount()
        form = new Form()
        form.display()
    }
    car1 = createSprite(100,200);
    car1.addImage("car1img",car1img)
    car2 = createSprite(300,200);
    car2.addImage("car2",car2img)
    car3 = createSprite(500,200);
    car3.addImage("car3",car3img)
    car4 = createSprite(700,200);
    car4.addImage("car4",car4img)
    cars = [car1,car2,car3,car4]
}
    play(){
        form.hide()
        Player.getPlayerInfo()
        player.getCarsAtEnd()
        image(trackimg,0,-displayHeight * 9, displayWidth, displayHeight * 10)
        if(allPlayers !== undefined){
            var index = 0;
            var x = 150;
            var y;
            for(var plr in allPlayers){
                index = index+1;
                x = x+200;
                y = displayHeight- allPlayers[plr].distance
                cars[index-1].x = x;
                cars[index-1].y = y;
                if(index === player.index){
                    fill("red");
                    ellipse(x,y,80,80)
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
            }

        }
        if(keyIsDown(UP_ARROW)&& player.index !== null){
            player.distance += 50;
            player.update()
            console.log(player.distance);
        }

        if(player.distance > 6900){
            gameState = 2;
            player.rank+=1;
            Player.updateCarsAtEnd(player.rank)
        }
        drawSprites();
    }

     end() {
        console.log("Game HAS been EnDeD");
        console.log(player.rank)
    }
}