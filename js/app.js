// Enemies our player must avoid


class Enemy {
    // Variables applied to each of our instances go here,
    constructor (x,y){
      // The image/sprite for our enemies, this uses
      let speed = function(max, min) {
        return Math.floor(Math.random() * (max - min + 1));
      }
      this.sprite = "images/enemy-bug.png";
      this.x = x;
      this.y = y;
      this.speed = speed(250,60);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    //this generates random speeds for the enemies to cross the screen

    update(dt) {
      let canvasWidth = 505;
      if (this.x < canvasWidth) {
        this.x = this.x + (this.speed*dt);
    } else {
      this.x = 0;
    }
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor (x,y){
    //load borat sprite
    this.sprite = 'images/borat-sprite.png';
    this.x = x;
    this.y = y;
  }

  //Player cannot leave the screen (canvas)
  update(){
    if (this.x < 0 || this.x > 400) {
      if(this.x < 0) {
        this.x = 0;
      } else {
        this.x = 400;
      }
    }
    if (this.y < 0 || this.y > 400) {
      if(this.y < 0) {
        this.reset();
      } else {
        this.y = 400;
      }
    }
    this.collide();
  }

  //load the sprite to protype
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //control player through the canvas
  handleInput(x){
    //initiate modal
      if (x === "left" && this.x > 0) {
        this.x -= 101;
      }
      if (x === "right" && this.x < 505) {
        this.x += 101;
      }
      if (x === "down" && this.y > 50) {
        this.y += 85;
      }
      if (x === "up" && this.y > 100) {
        this.y -= 85;
      //player wins if when press "up key" and the distance from top is less than 100px
      } else if (x === "up" && this.y <= 100) {
        //this opens a pop-up window to congratulate the player
        this.openModalCong()
        //this gives fuctionality to the refrash button to close the "success" pop-up window
        this.closeModalCong()
        //player sprite moves back to the initial position
        this.reset()
      }
  }

  //open & close Congratulations Modal
  openModalCong() {
      let modal = document.querySelector(".ModalCong");
       modal.style.display = "block";
     }

  closeModalCong(){
     let modal = document.querySelector(".ModalCong");
     let closeModal = document.querySelector("#closeWinModal")
     closeModal.addEventListener("click", function() {
         modal.style.display = "none";
       })
   }
  //the reset fuction that moves playr back to the original position
  reset() {
    player.x = 200;
    player.y = 400;
  }

  //collision rules - call enemies through the array
  collide() {allEnemies.forEach (
    function (enemy) {
    // set conditions for the distance difference between the player and enemies in canvas
    if (Math.abs (enemy.x - player.x) < 80 && Math.abs(enemy.y - player.y)<80) {
      //Set initial position - I cannot use the predifined reset function here - I dont know why
      player.x = 200;
      player.y = 400;

      //functionallity to initiate a "fail" pop-up window in case of a collition
      function openModalFail() {
          let modalFail = document.querySelector(".ModalFail");
           modalFail.style.display = "block";
         }

      //functionallity to close the "fail" pop-up window by hitting the "refresh" button
      function closeModalFail(){
          let modal = document.querySelector(".ModalFail");
          let closeModal = document.querySelector("#closeFailModal")
          closeModal.addEventListener("click", function() {
              modal.style.display = "none";
            })
          }
      openModalFail()
      closeModalFail()
    }
  })
 }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
const enemy1 = new Enemy(60,60);
allEnemies.push(enemy1);
const enemy2 = new Enemy(60,140);
allEnemies.push(enemy2);
const enemy3 = new Enemy(60,220);
allEnemies.push(enemy3);

// Place the player object in a variable called player
const player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Give keybord "Enter" the fuctionality to close both "Success" and "fail" pop-up windows
let body = document.querySelector("body");
body.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      let modalWin = document.querySelector(".ModalCong");
      let modalFail = document.querySelector(".ModalFail");
      modalWin.style.display = "none";
      modalFail.style.display = "none";
    }
});
