const config = {
    type: Phaser.AUTO,   // AUTO = choose best renderer (WebGL or Canvas)
    width: window.innerWidth,   // set width to browser window width
    height: window.innerHeight, // set height to browser window height
    physics:{
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE, // resizes if window changes
        autoCenter: Phaser.Scale.CENTER_BOTH // centers game
    },
    backgroundColor: '#e66c0f',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let gems;
let player;
let cursors;
new Phaser.Game(config);

function preload() {
    this.load.image("player1", "asset/players.jpeg");
    this.load.image("gem", "asset/food.jpg");
}

function createPlayer(scene,x, y, imageKey, width, height) {
  let player = scene.physics.add.image(x, y, imageKey);

  let scaleX = width / player.width;
  let scaleY = height / player.height;
  let scale = Math.min(scaleX, scaleY); // keeps aspect ratio
  
    player.setScale(scale);
    player.body.setSize(player.width, player.height);

    return player;
}

function createGems(scene){
  let group = scene.physics.add.group();
  scene.input.on("pointerdown", (pointer) => {
    group.create(pointer.x, pointer.y, "gem").setScale(0.1).setImmovable(true);
    });
    return group;
}

function Overlap(scene, player, gems){
  scene.physics.add.overlap(player, gems, (_player, gems) => {
    gems.disableBody(true, true);
    console.log("Gem collected");
  });
}

function create() {

    player = createPlayer(this, 200, 200, "player1", 300, 300);
    cursors = this.input.keyboard.createCursorKeys();

    player.setCollideWorldBounds(true);

    gems = createGems(this);
    Overlap(this, player, gems);
}

function update() {
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
    }
}
