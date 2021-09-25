const populationSize = 600
const maxFrame = 400

let startPos
let targetPos
let population = []
let obstacles=[]
let timer = 0
let generation=0

function setup() {
  createCanvas(windowWidth, windowHeight - 40)
  speed = createSlider(1, 50, 1, 1)
  startPos=createVector(100, height / 2)
  for (let i = 0; i < populationSize; i++) {
    population.push(new Vehicle(startPos.x, startPos.y))
  }
  targetPos = createVector(width - 100, height / 2)
}

function newGeneration() {
  generation++
  timer = 0
  let sum = 0
  for (let p of population) {
    sum += pow(p.score, 4)
  }

  for (let p of population) {
    p.fitness = pow(p.score, 4) / sum
  }
  let newPopulation = []

  for (let i = 0; i < populationSize; i++) {
    let v1 = pickOne()
    let v2 = pickOne()
    let newv = new Vehicle(startPos.x, startPos.y,v1.field.crossover(v2.field))
    newv.field.mutate(0.01)
    newPopulation.push(newv)
  }

  population = newPopulation.slice()
}

function pickOne() {
  var index = 0
  var r = random(1)

  while (r > 0) {
    r = r - population[index].fitness
    index++
  }
  index--
  return population[index]
}

function stillAlive() {
  let total = 0
  for (let p of population) {
    if (!p.crashed) {
      total++
    }
  }
  return total
}

function getBest(){
  let best=population[0]
  for (let p of population){
    if (p.score>best.score){
      best=p
    }
  }
  return best
}

function draw() {


  for (let n = 0; n < speed.value(); n++) {
    for (let v of population) {
      v.update()
    }
    timer+=1
    if (timer > maxFrame || stillAlive() == 0) {
      newGeneration()
    }
  }
  background(51)
  let best=getBest()
  if (keyIsDown(32)){
    best.render()
    best.field.render()
  }else{
  for (let v of population) {
    v.render()
  }
  }
  for (let o of obstacles){
    o.update()
  }
  
  stroke(255,0,0,100)
  strokeWeight(3)
  line(targetPos.x, targetPos.y,best.pos.x,best.pos.y)
  
  stroke(0, 255, 0)
  strokeWeight(30)
  point(targetPos.x, targetPos.y)
  
  stroke(255, 128, 0)
  strokeWeight(10)
  point(startPos.x, startPos.y)
  
  fill(255)
  noStroke()
  textSize(16)
  textAlign(LEFT, TOP)
  text('Elapsed time : ' + (timer / 60).toFixed(1) + 's/' + (maxFrame / 60).toFixed(1) + 's', 0, 0)
  text('Population : ' + stillAlive() + '/' + populationSize, 0, 20)
  text('Generation : '+generation,0,40)
}

function mousePressed(){
  if (mouseX>0 && mouseY>0 && mouseX<width && mouseY<height){
    obstacles.push(new Rectangle(mouseX,mouseY))
  }
}

function mouseReleased(){
  for (let o of obstacles){
    o.edit=false
  }
}

function keyPressed(){
  if (key=='s'){
    startPos=createVector(mouseX,mouseY)
  }else if (key=='t'){
    targetPos=createVector(mouseX,mouseY)
  }
}