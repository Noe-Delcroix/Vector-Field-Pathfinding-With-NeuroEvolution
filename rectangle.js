class Rectangle{
  constructor(x,y){
    this.x=x
    this.y=y
    this.w=0
    this.h=0
    
    this.edit=true
  }
  update(){
    if (this.edit){
      this.w=mouseX-this.x
      this.h=mouseY-this.y
    }
    
    this.render()
  }
  render(){
    fill(150)
    stroke(255)
    strokeWeight(2)
    rectMode(CORNER)
    rect(this.x,this.y,this.w,this.h)
  }
}