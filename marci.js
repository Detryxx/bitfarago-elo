let piros=null

function random(a,b){
    return Math.floor(Math.random() *(b-a) +a)
}
function wait(time) {
    return new Promise((r,_)=>{setTimeout(r,time*1000)})
}


async function piros_init(){
const fps=60
let ctx
let gradient
let movetime=0.5
let cards=[]
let waiters=[]
let can_click=false
let gameover=false
let gameover_callback
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
    ctx.lineWidth=3
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
    // console.log(this.color,x,y,this.x + this.sx / 2,this.x - this.sx / 2,this.y + this.sy / 2,this.y - this.sy / 2)
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
    // console.log("placecards")
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

async function gameloop(){
    can_click=false
    place_cards()
    await wait(1)
    for (card of cards){card.flip(true)}
    await wait(1)
    let previous=[0,1,2]
    for (let i = 0; i < random(10,30); i++) {
        let num=[0,1,2]
        let order=[]
        while(num.length>0 && previous[0]!=order[0]){
            
            order.push(num.splice(random(0,num.length),1)[0])
        }
        if (previous[0]==order[0]){
            order=[previous[0],previous[2],previous[1]]
        }
        previous=order
        await place_cards(movetime,order)
        
    }
    can_click=true
}

function mouse(){
    var rect = canvas_element.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    for(e of cards){
        // e.is_hovering(x,y)
    }
}
async function click(){
    if (can_click){
        
        var rect = canvas_element.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        for(e of cards){
            if (e.is_hovering(x,y)){
                console.log(e.color)
                document.getElementById("piros_win").innerHTML= (e.color=="red") ? "nyertél" : "vesztettél"
                for (i of cards){
                    i.can_hover=false
                }
                await e.flip(false)
                gameover_callback()
                canvas_element.removeEventListener("mousemove", mouse)
                canvas_element.removeEventListener("click", click)
                break
            }
        }
    }
}


await new Promise((r,_)=>{gameover_callback=r})
gameover=true
console.log(piros)
piros=null
console.log(piros)
}

let seta=null
async function seta_init(){
    function randompos(){
        return [random(0,map_size),random(0,map_size)]
    }

    let gameover_callback
    const map_size=parseInt(document.getElementById("seta_map_size").value)
    const map=document.getElementById("seta_map")
    const wait_time=parseFloat(document.getElementById("seta_wait").value)
    const directions=[[0,1],[1,0],[0,-1],[-1,0]]
    let tiles=[]
    let bot_pos=randompos()

    function get_tile_element(x,y){
        return document.getElementById(`seta-${x}-${y}`)
    }
    function set_tile_color_text(x,y,color,text){
        // console.log(x,y,color,text)
        document.getElementById(`seta-${x}-${y}`).style.backgroundColor=color
        document.getElementById(`seta-${x}-${y}`).innerHTML=text
    }
    function get_tile(x,y){
        return tiles[y][x]
    }
    function set_tile(x,y,color){
        tiles[y][x]=val
    }
    function get_tilev(v){
        try{

            return tiles[v[1]][v[0]]
        }catch{
            return 99999
        }
    }
    function set_tilev(v,val){
        tiles[v[1]][v[0]]=val
    }
    function add(v1,v2){
        return [v1[0]+v2[0],v1[1]+v2[1]]
    }

    function genmap(){
        map.innerHTML=""
        for (let y=0;y<map_size;y++){
            let array=[]
            let html="<tr>"
            for(let x=0;x<map_size;x++){
                html+=`<td class='seta' id='seta-${x}-${y}'></td>`
                array.push(0)
            }
            html+="</tr>"
            map.innerHTML+=html
            tiles.push(array)
        }
        // console.log(tiles,map.innerHTML)
        for (let i=0;i<map_size*map_size/10;i++){
            let rand=randompos()
            while(get_tilev(rand)=="w"){
                rand=randompos()
                
            }
            set_tilev(rand,"w")

        }
        
    }
    function is_bot_here(x,y){
        return bot_pos[1]==y &&bot_pos[0]==x
    }
    genmap()
    function gameloop(){
        let possible=[]
        let min=9999
        for (e of directions){
            const val=get_tilev(add(bot_pos,e))
            if (val!="w"){
                
                if(min>val){
                    possible=[e]
                    min=val
                }
                else if (min==val){
                    possible.push(e)
                }
            }
            
        }
        bot_pos=add(bot_pos,possible[random(0,possible.length)])
        set_tilev(bot_pos,get_tilev(bot_pos)+1)
        
        for(y in tiles){
            for(x in tiles){
                if (get_tile(x,y)!="w"){
                    
                    set_tile_color_text(x,y,is_bot_here(x,y)?"blue":"red",get_tile(x,y))
                }
                else{
                    set_tile_color_text(x,y,"black","")
                }
                
            }
        }
        //*parseFloat(wait_time.value)
        
    }
    while (true){
        gameloop()
        await new Promise((r)=>{setTimeout(r,wait_time*1000)})
    }
    
}
