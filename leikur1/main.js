const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
class skotfæri{
    constructor(x,y,radius,litur,hradi){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.litur = litur;
        this.hradi = hradi;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        c.fillStyle = this.litur;
        c.fill();
    }
    skjota(){
        this.x += this.hradi.x *20;
        this.y += this.hradi.y *20;
    }
}
const skipHradi = 5;
let xHradi = 0;
let yHradi = 0;

let skip = {
    staerd: 40,
    x: canvas.width * 0.5,
    y: canvas.width * 0.5,
    a: 90/180 * Math.PI, // 90 gráður í radíana því að gráður virkar ekki
    d: 0,
    hradi: {
        x:0,
        y:0,
    },
    afram: false,

}
Balls = []

class Ball {

    constructor(x, y, velX, velY, color, size) {
       this.x = x;
       this.y = y;
       this.velX = velX;
       this.velY = velY;
       this.color = color;
       this.size = size;
    }
    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        c.fill();
      }
    update() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }
    
    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }
    
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }
    
    this.x += this.velX;
    this.y += this.velY;
    }
    collisionDetect() {
        for (const ball of Balls) {
           if (!(this === ball)) {
              const dx = this.x - ball.x;
              const dy = this.y - ball.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
     
              
           }
        }
     }
    
 }
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const skotGeymsla = []
const maxBalls = 5;



const fps = 30;
setInterval(update, 1000 / fps);// talan er í millisekúndur þannig þetta er 1 sek deilt með fps(frames per second)
const turnSpeed = 360;

//byssu skot á click
addEventListener('click', (event) =>{
    const angle = Math.atan2(event.clientY - skip.y,event.clientX - skip.x);
    const att = {
        x: Math.cos(angle),
        y: Math.sin(angle),
    }
    skotGeymsla.push(new skotfæri(skip.x,skip.y,5,"Red", att))
    console.log("click")
})


document.addEventListener("keydown", function(event) {
    if (event.code === "Enter") {
      toggleFullScreen();
    }
    if (event.defaultPrevented) {
      return;
    }
    if (event.code === "ArrowDown"){
        yHradi = skipHradi;
        //skip.afram = true;
        console.log("down");
    } else if (event.code === "ArrowUp"){
        yHradi = -skipHradi;
        //skip.afram = true;
        console.log("up");
    } else if (event.code === "ArrowLeft"){
        xHradi = -skipHradi;
        //skip.d = turnSpeed / 180 *Math.PI / fps;
        // Handle "left"
        console.log("left");
    } else if (event.code === "ArrowRight"){
        //skip.d = -turnSpeed / 180 *Math.PI / fps;
        xHradi = skipHradi;
        // Handle "right"
        console.log("right");
    }
    event.preventDefault();
  }, true);
  
document.addEventListener("keyup", function(event) {
    if (event.code === "Enter") {
      toggleFullScreen();
    }
    if (event.defaultPrevented) {
      return;
    }
    if (event.code === "ArrowDown"){
        yHradi = 0;
        //skip.afram = false;
        console.log("down");
    } else if (event.code === "ArrowUp"){
        //skip.afram = false;
        yHradi = 0;
        console.log("up");
    } else if (event.code === "ArrowLeft"){
        //skip.d = 0;
        xHradi = 0;
        // Handle "left"
        console.log("left");
    } else if (event.code === "ArrowRight"){
        xHradi = 0;
        //skip.d = 0;
        // Handle "right"
        console.log("right");
    }
    event.preventDefault();
  }, true);

while (Balls.length < 6) {
const size = random(30,50);
const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    "Orange",
    size
);

Balls.push(ball);
};

    for (const ball of Balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(); 
    }

// búa til update function sem keyrir allt forritið ínní 30 sinnum á sekundu
function update() {
    c.clearRect(0,0,canvas.width,canvas.height);

    
    for (const ball of Balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect(); 
      }
    skotGeymsla.forEach((skot) =>{
        skot.draw();
        skot.skjota();
    })
   

    c.beginPath();
    c.arc(skip.x,skip.y,skip.staerd,0,Math.PI * 2,true);
    c.fillStyle = "blue";
    c.fill();
    /*
    if(skip.afram){
        skip.hradi.x += skipHradi * Math.cos(skip.a) / fps;
        skip.hradi.y -= skipHradi * Math.sin(skip.a) / fps;
    }*/
    
skip.x += xHradi;
skip.y += yHradi;
//console.log("y",yHradi);
    /*
    skip.x += skip.hradi.x;
    skip.y += skip.hradi.y;
    skip.a += skip.d;
    */
    
}