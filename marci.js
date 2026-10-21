function piros_init(){
const fps=60
let ctx
let gradient
let movetime=0.5
let cards=[]
let waiters=[]
let can_click=false
let gameover=false
class Card {
  constructor(color,back = false, x = 100, y = 100, sx = 100, sy = 200) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.sx = sx;
    this.sy = sy;
    this.flip_multiplyer = 1;
    this.back = back;
    this.hover_pos = 0;
    this.is_hover = false;
    this.can_hover = true;
  }
  async draw() {
    ctx.beginPath()
    ctx.roundRect(this.x-this.sx*this.flip_multiplyer/2,this.y-this.sy/2-this.hover_pos,this.sx*this.flip_multiplyer,this.sy,10)
    ctx.fillStyle=this.back?gradient:this.color
    ctx.fill()
    ctx.strokeStyle="#999999"
    ctx.stroke()
  }
  async move_to(x, y, time = 1.5) {
    const start_pos = [this.x, this.y];
    const difference = [x - this.x, y - this.y];
    for (let i = 0; i < time; i += 1 / fps) {
      const progress = i / time;
      this.x =
        start_pos[0] +
        difference[0] -
        difference[0] * Math.pow(1 - progress, 3);
      this.y =
        start_pos[1] +
        difference[1] -
        difference[1] * Math.pow(1 - progress, 2);
      await wait_frame();
    }
  }
  async hover(time = 0.3) {
    console.log("starthover")
    const start = this.hover_pos;
    const difference = this.is_hover * 10 - start;
    for (let i = 0; i < time; i += 1 / fps) {
      const progress = i / time;
      this.hover_pos =
        start + difference - difference * Math.pow(1 - progress, 3);
      await wait_frame();
    }
  }
  async flip(is_back = null, time = 0.3) {
    if (this.back != is_back) {
      const size = this.sx;
      for (let i = 0; i < time / 2; i += 1 / fps) {
        this.flip_multiplyer = Math.pow(1 - i / (time / 2), 2);
        await wait_frame();
      }
      if (is_back == null) {
        this.back = !this.back;
      } else {
        this.back = is_back;
      }
      for (let i = 0; i < time / 2; i += 1 / fps) {
        this.flip_multiplyer = Math.pow(i / (time / 2), 2);
        await wait_frame();
      }
      this.flip_multiplyer = 1;
    }
  }
  is_hovering(x, y) {
    const res =
      this.can_hover &&
      x < this.x + this.sx / 2 &&
      x > this.x - this.sx / 2 &&
      (y < this.y + this.sy / 2, y > this.y - this.sy / 2);
    if (this.is_hover != res) {
      this.is_hover = res;
      this.hover();
    }
    return res;
  }
}

    canvas_element = document.getElementById("piros");
    ctx = canvas_element.getContext("2d");
    gradient=ctx.createLinearGradient(0, 0, 0, 170);
    gradient.addColorStop(0,"black")
    gradient.addColorStop(1,"#666666")
    cards=[new Card("red"),new Card("blue"),new Card("cyan")]
    canvas_element.addEventListener("mousemove",mouse)
    canvas_element.addEventListener("click",click)
    movetime=parseFloat(document.getElementById("piros_speed").value)
    render()
    place_cards()
    gameloop()
    


async function place_cards(time=1,x_positions=[0,1,2]){
    console.log("placecards")
    for(i in cards){
        const card=cards[i]
        card.move_to(50+105*x_positions[i],150,time)
    }
    await wait(time)
}

function render(){
    ctx.clearRect(0,0,500,500)
    for (e of cards){
        e.draw()
    }
    const waiter=waiters.slice()
    for (e of waiter){
        e()
    }
    waiters=[]
    if (!gameover){setTimeout(render,1000/fps)}
}

function wait_frame() {
    return new Promise((r,_)=>{waiters.push(r)})
}
function wait(time) {
    return new Promise((r,_)=>{setTimeout(r,time*1000)})
}
function random(a,b){
    return Math.floor(Math.random() *(b-a) +a)
}

async function gameloop(){
    can_click=false
    place_cards()
    await wait(1)
    for (card of cards){card.flip(true)}
    await wait(1)
    for (let i = 0; i < random(5,15); i++) {
        let num=[0,1,2]
        let order=[]
        while(num.length>0){

            order.push(num.splice(random(0,num.length),1)[0])
        }
        await place_cards(movetime,order)
        
    }
    can_click=true
}

function mouse(){
    var rect = canvas_element.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    for(e of cards){
        e.is_hovering(x,y)
    }
}
async function click(){
    if (can_click){

        var rect = canvas_element.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        for(e of cards){
            if (e.is_hovering(x,y)){
                await e.flip(false)
                document.getElementById("piros_win").innerHTML=e.color=="red"?"nyertél":"vesztettél"
                gameover=true
                break
            }
        }
    }
}
}