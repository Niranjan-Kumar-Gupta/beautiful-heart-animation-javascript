const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
});

let butX1 = [];
let butY1 = [];
let hue = 300;
function butterData() {
    for (let a = -Math.PI/2; a <= Math.PI/2; a += 0.1) {
            butX1.push(Math.sin(a)*Math.sin(2*a));
            butY1.push(Math.cos(a)*Math.sin(2*a));    
    }
}
butterData();

ctx.fillStyle = 'white';
ctx.font = '30px verdana';
ctx.fillText("\u2665",0,50);
//ctx.globalCompositeOperation = 'xor';

class Butterfly{
    constructor(x1,y1,vel){
        this.x = x1;
        this.y = y1
        this.size = Math.random()*12+10;
        this.t = 0;
        this.height = this.size*0.7;
        this.hue = Math.random()*255;

        this.color = 'hsl('+hue+',100%,50%)';
        this.speed = Math.random()*1.1+0.3;
        this.flap = Math.random()*0.05+0.01

        this.vel = vel;
        this.gravity = -0.01;
        this.color = 'hsl(' + hue * 2 + ',100%,60%)';
        this.alpha = 6;
        this.friction = 0.99;

    }
    draw(){
       
        ctx.fillStyle = 'black'
        ctx.strokeStyle = 'gray'
        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.arc(this.x+2,this.y-this.height,1,0,Math.PI*2);
        ctx.arc(this.x-2,this.y-this.height,1,0,Math.PI*2);
        ctx.closePath();
        ctx.fill()
        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.moveTo(this.x+2,this.y-this.height);
        ctx.lineTo(this.x+2,this.y+this.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.moveTo(this.x-2,this.y-this.height);
        ctx.lineTo(this.x-2,this.y+this.height);
        ctx.stroke();  
        let rad = this.size;
        
        ctx.beginPath();
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0,0,0,0.6)';

        ctx.fillStyle = this.color;
        for (let i = 0;i<butX1.length;i++) {
            ctx.fillStyle = this.color;
            let x = this.x+rad*butX1[i]*(Math.abs(Math.sin(this.t))+0.4);
            let y = this.y+rad*butY1[i];    
            ctx.lineTo(x,y);  
        } 
        for (let i = 0;i<butX1.length;i++) {
            let x = this.x-rad*butX1[i]*(Math.abs(Math.sin(this.t))+0.4);
            let y = this.y-rad*butY1[i];    
            ctx.lineTo(x,y); 
        } 
        ctx.fill();  
        ctx.closePath();
        ctx.shadowBlur = 0;
      
    }
    update(){
        //this.y -= this.speed;
       // this.t += this.flap;
        if (this.y<-50) {
            this.x = Math.random()*(canvas.width-150)+100;
            this.y = canvas.height+50;
            this.hue = Math.random()*255;
            this.color = 'hsl('+this.hue+',100%,60%)';
            this.size = Math.random()*20+20;
            this.height = this.size*0.6;  
            this.speed = Math.random()*7.5+3;  
        }

    }
    update1(){
        this.draw()
        this.t += this.flap*2;
        this.alpha -= 0.1
        // this.vel.x *= this.friction;
        // this.vel.y *= this.friction;
        // this.vel.y += this.gravity;
        this.x += this.vel.x;
        this.y -= this.vel.y;
    }
    
    
}

const heartX = [];
const heartY = [];


function HeartData() {
    for (let i = 0; i <= Math.PI * 2; i += 0.1) {
        let m = (16 * Math.sin(i) ** 3);
        heartX.push(m);
        let n = -(13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
        heartY.push(n);
    }
}
HeartData();

let hearts = [];
function initheart() {
    let heartsNum = heartX.length;
    let speed = 0.2;
    for (let i = 0; i < heartsNum; i++) {
        hearts.push(new Butterfly( canvas.width * 0.5, canvas.height * 0.46, {
            x: heartX[i] * speed,
            y: -heartY[i] * speed
        }))
    }
}

function handelheart() {
    hearts.forEach((object, index) => {
        object.update1()
        
        if (object.alpha<0) {
            hearts.splice(index,1)
        }
    });
}

let count = 0
function handelHeartInit() {
    if (count % 8 == 0) {
        initheart()
    }
    if (count > 1000) {
        count = 0
    } else {
        count++
    }
}


let song = new Audio()
song.src = "https://mobcup.net/d/qvjtva2j/mp3"

let img = new Image()
img.src = "https://www.pngitem.com/pimgs/b/379-3794814_hand-drawn-arrows-png.png";


let width = canvas.width*1.6
let height = canvas.height*0.2
let x = canvas.width*1.5
let y = -canvas.height*0.12
let speedA = 8.8
function image() {
   
    ctx.save()
    ctx.translate(x,y);
    ctx.rotate(125.2*Math.PI/180);
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.drawImage(img,-width*0.5,-height*0.5,width,height);
    ctx.restore()
    x -= speedA;
    y += speedA;
    if (x < canvas.width*0.5) {
        x = canvas.width*0.5
        y = canvas.height*0.4
    }
}

function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
  
}
setInterval(()=>{
   clear();
   image()
   handelHeartInit()
   handelheart()
   song.play()
  
   hue++
},1000/60)