const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

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
        this.x += this.hradi.x *5;
        this.y += this.hradi.y *5;
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
const ovinaHradi = 5;
const ovinaStaerd = 30;
ovinaGeymsla = []

function framleidaOvinir(){
    
    let x,y;

    for(var i = 0; i< maxOvinir; i++){
        x = Math.floor(Math.random() * canvas.width);
        y = Math.floor(Math.random() * canvas.height);
        ovinaGeymsla.push(nyrOvinur(x,y))
    }
}
function nyrOvinur(){
    let ovinur = {
        x: x,
        y: y,
        xv: Math.random() * ovinaHradi / fps * (Math.random() < 0.5 ? 1 : -1),
        yv: Math.random() * ovinaHradi / fps * (Math.random() < 0.5 ? 1 : -1),
        r: ovinaStaerd,
        a: Math.random() * Math.PI*2,
    }
}
function drawOvinur(x,y){
    c.beginPath();
    c.arc(x,y,ovinaStaerd,0,Math.PI * 2,true);
    c.fillStyle = "Orange";
    c.fill();
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const skotGeymsla = []
const maxOvinir = 5;



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
// búa til update function sem keyrir allt forritið ínní 30 sinnum á sekundu
function update() {
    c.clearRect(0,0,canvas.width,canvas.height);

    let x,y,r,a;
    for(let i = 0; i < ovinaGeymsla.length; i++){
        x = ovinaGeymsla[i].x;
        y = ovinaGeymsla[i].y;
        r = ovinaGeymsla[i].r;
        a = ovinaGeymsla[i].a;
        drawOvinur(x + r * Math.cos(a) , y + r * Math.sin(a));
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