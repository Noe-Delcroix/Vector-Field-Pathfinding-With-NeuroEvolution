class Vehicle{
  constructor(x,y,field){
    this.pos=createVector(x,y)
    this.vel=createVector()
    this.acc=createVector()
    
    this.maxSpeed=6
    this.maxForce=0.2
    if (field){
      this.field=field
    }else{
      this.field=new Field(30)
    }
    
    this.r=5
    
    this.crashed=false
    this.score=0
  }
  update(){
    if (this.pos.x<0 || this.pos.y<0 || this.pos.x>width || this.pos.y>height){
      this.score/=2
      this.crashed=true
    }
    for (let o of obstacles){
      if (this.pos.x>o.x && this.pos.y>o.y && this.pos.x<o.x+o.w && this.pos.y<o.y+o.h){
        this.score/=2
        this.crashed=true
        break
      }
      
    }
    if (this.pos.dist(targetPos)<15){
      this.score*=2
      this.score+=map(timer,0,maxFrame,1000,0)
      this.crashed=true
    }
    
    if (!this.crashed){
      this.pos.add(this.vel)
      this.vel.limit(this.maxspeed)
      this.vel.add(this.acc)
      this.acc.mult(0)
    
      this.follow(this.field)
      
      this.score=map(this.pos.dist(targetPos),0,dist(0,0,width,height),dist(0,0,width,height),0)
    }
    
  }
  applyForce(force){
    this.acc.add(force)
  }
  
  follow(field){
    let desired=field.getVectorAt(this.pos.x,this.pos.y)
    desired.normalize()
    desired.mult(this.maxSpeed)
    let steer=p5.Vector.sub(desired,this.vel)
    steer.limit(this.maxForce)
    this.applyForce(steer)
  }
  
  render(){
    fill(0,100)
    stroke(0)
    strokeWeight(1)
    push()
    translate(this.pos.x,this.pos.y)
    // textSize(this.r*2)
    // textAlign(CENTER,CENTER)
    // text(int(this.score),0,-this.r*2)
    textSize(25)
    rotate(this.vel.heading()+PI/2)
    triangle(0,-this.r*2,-this.r,this.r*2,this.r,this.r*2)
    
    pop()
  }
  
}