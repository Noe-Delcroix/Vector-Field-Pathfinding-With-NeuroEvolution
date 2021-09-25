class Field{
  constructor(res){
    this.res=res
    this.size=createVector(int(width/this.res),int(height/this.res))
    this.grid=[]
    
    this.createGrid()
  }
  createGrid(){
    this.grid=[]
    for (let y=0;y<this.size.y;y++){
      this.grid[y]=[]
      for (let x=0;x<this.size.x;x++){
        this.grid[y][x]=p5.Vector.random2D()
      }
    }
  }
  getVectorAt(x,y){
    return this.grid[constrain(floor(y/this.res),0,this.size.y-2)][constrain(floor(x/this.res),0,this.size.x-2)]
  }
  render(){
    stroke(220)
    for (let y=0;y<this.size.y;y++){
      for (let x=0;x<this.size.x;x++){
        push()
        translate((x+0.5)*this.res,(y+0.5)*this.res)
        rotate(this.grid[y][x].heading())
        strokeWeight(2)
        line(0,0,this.res/2.5,0)
        translate(this.res/2.5,0)
        strokeWeight(5)
        point(0,0)
        pop()
      }
    }
  }
  crossover(other){
    let newField=new Field(this.res)
    for (let y=0;y<this.size.y;y++){
      for (let x=0;x<this.size.x;x++){
        if (random(1)<0.5){
          newField.grid[y][x]=this.grid[y][x]
        }else{
          newField.grid[y][x]=other.grid[y][x]
        }
      }
    }
    return newField
  }
  
  mutate(rate){
    for (let y=0;y<this.size.y;y++){
      for (let x=0;x<this.size.x;x++){
        if (random(1)<rate){
          this.grid[y][x]=p5.Vector.random2D()
        }
      }
    }
  }
}