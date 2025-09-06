// 1. Game configuration
const config = {
  type: Phaser.AUTO,   // AUTO = choose best renderer (WebGL or Canvas)
  width: 600,          // Game width
  height: 400,         // Game height
  physics: {
    default: 'arcade', // Use arcade physics (simple & fast)
    arcade: {
      gravity: { y: 300 }, // Gravity pulls objects downward
      debug: false
    }
  },
  scene: {
    preload: preload,  // Load assets
    create: create,    // Add objects
    update: update     // Runs every frame (60 times/sec)
  }
};

let ball;

// 2. Start Phaser game
const game = new Phaser.Game(config);

// 3. Load assets
function preload() {
  this.load.image('ball', 'https://labs.phaser.io/assets/sprites/shinyball.png');
}

// 4. Create objects
function create() {
  ball = this.physics.add.image(300, 50, 'ball'); // Add ball at x=300, y=50
  ball.setBounce(0.8);         // Bouncy ball
  ball.setCollideWorldBounds(true); // Collide with screen edges
}

// 5. Update loop (empty for now)
function update() {
  // Runs continuously
}












