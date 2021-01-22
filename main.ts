let speed = 40
let timeInterval = 1000

let ship = sprites.create(img`
    ........feebbbef........
    ........f24bdb2e........
    .......ce2222222e.......
    ......cbc22bb22e6cf.....
    ......b962e99e2b6dc.....
    ......c6b2e69e2e6bf.....
    ...cccee222ab222eeeccc..
    .fbbbddddb4eeebbbbbbbbcf
    febbddbcdddbbdddbcbbbbbf
    fe2bddcbdddcbddddccbb42f
    .f24bddddddbbdddbbbb42f.
    ..ff24bddddddddbbbb22f..
    ....fee244bbbb4444ee....
    .....fbbe2222e22ebbf....
    ......ffffbbbbfffff.....
    ..........fffff.........
`, SpriteKind.Player)

controller.moveSprite(ship,0, 100)
ship.setFlag(SpriteFlag.StayInScreen, true)
ship.setPosition(15, 60)

// Creating rocks cause hehe
game.onUpdateInterval(timeInterval, function() {
    let asteriod = sprites.create(img`
        . . . . . . . . . c c 8 . . . .
        . . . . . . 8 c c c f 8 c c . .
        . . . c c 8 8 f c a f f f c c .
        . . c c c f f f c a a f f c c c
        8 c c c f f f f c c a a c 8 c c
        c c c b f f f 8 a c c a a a c c
        c a a b b 8 a b c c c c c c c c
        a f c a a b b a c c c c c f f c
        a 8 f c a a c c a c a c f f f c
        c a 8 a a c c c c a a f f f 8 a
        . a c a a c f f a a b 8 f f c a
        . . c c b a f f f a b b c c 6 c
        . . . c b b a f f 6 6 a b 6 c .
        . . . c c b b b 6 6 a c c c c .
        . . . . c c a b b c c c . . . .
        . . . . . c c c c c c . . . . .
    `, SpriteKind.Enemy)
asteriod.setPosition(150, randint(0, 120))
asteriod.setVelocity(-speed, 0)
asteriod.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onDestroyed(SpriteKind.Enemy, function(sprite: Sprite) {
    info.changeScoreBy(1)
})

game.onUpdate(function() {
    if(info.score() >= 11){
        speed = 60
    } else if(info.score() >= 21){
        speed = 80
    } else if(info.score() >= 31){
        speed = 100
    } else if(info.score() >= 41){
        speed = 120
    } else if(info.score() >= 50){
        speed = 140
    }
    
})

game.onUpdate(function() {
    if(info.score() >= 11){
        timeInterval = 800
        controller.moveSprite(ship,0,150)
    } else if(info.score() >= 21){
        controller.moveSprite(ship,0,200)
            timeInterval = 300
    } else if(info.score() >= 31){
        controller.moveSprite(ship,0,250)
            timeInterval = 200
    } else if(info.score() >= 41){
        controller.moveSprite(ship,0,300)
            timeInterval = 100
    } else if(info.score() >= 50){
        controller.moveSprite(ship,0,350)
            timeInterval = 50
    }

 
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(spaceship: Sprite, asteriod: Sprite) {
    asteriod.destroy()
    info.changeLifeBy(-1)
})
info.setLife(3)
