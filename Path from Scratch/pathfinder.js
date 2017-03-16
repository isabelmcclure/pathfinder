'use strict'

window.addEventListener('load', setup, false);
var pf;
var cellId = 0;
const FRAME_RATE = 10;
function setup(){
  pf = new PathFinder();
  window.setTimeout(draw, 100);
}

function draw(){
  pf.run();
  pf.render();
  window.setTimeout(draw, 1000/FRAME_RATE);
}
class PathFinder{
  constructor(){
    this.canvas = document.getElementById('canvas');
    if(!this.canvas || !this.canvas.getContext)
    throw "No valid canvas found";
    this.context = this.canvas.getContext("2d");
    if(!this.context)
    throw "No valid context found"
    //number of columns and rows
    this.cols = Math.floor(this.canvas.width / this.w);
    this.rows = Math.floor(this.canvas.height / this.w);

    this.isRunning = true;
    this.mouseX = 0;
    this.mouseY = 0;
    this.w = 100; //width and height of each cell
    this.done = false;
    this.grid = []; //array of all the cells on the canvas
    this.queue = []; //array of the cells that are up next in the path
    this.empty = [];
    this.root = null;
    this.empty.push(this.root);
    this.current;
    this.init();
  }
  init(){
    this.loadGrid();
    this.canvas.addEventListener('mouseDown', function(evt) {
      pf.mouseX = evt.offsetX;
      pf.mouseY = evt.offsetY;
      let col = Math.floor(pf.mouseX/pf.w);
      let row = Math.floor(pf.mouseY/pf.w);

      //if the mouse is clicked, change color and make it occupied
      if(pf.grid[col][row].color === "cadetBlue"){
        pf.grid[col][row].color = "darkSlateGray";
        pf.grid[col][row].isOccupied = true;
      } else{
        pf.grid[col][row].color = "cadetBlue";
        pf.grid[col][row].isOccupied = false;
      }

    }, false);

    this.canvas.addEventListener('mousemove', function(evt){
      pf.mouseX = evt.offsetX;
      pf.mouseY = evt.offsetY;
    } , false);

  }
  run(){
    //starting point
    this.start = this.grid[0,0];

  }
  render(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(var i = 0; i < this.cols; i++){
      for(var j = 0; j < this.rows; j++){
        this.grid[i][j].render();
      }
    }

  }
  loadGrid(){
    for(var i = 0; i < this.cols; i++){
      this.grid[i] = [];
      for(var j = 0; j < this.rows; j++){
        this.grid[i][j] = new Cell(new MyVector((i*this.w), (j*this.w)));
        //makes 15% of the cells occupied randomly
        if(Math.floor(Math.random()*100) < 15) this.grid[i][j].occupied = true;
        this.grid[i][j].id = ++cellId;
      }
    }
    for(var i = 0; i < this.cols; i++){
      for(var j = 0; j < this.rows; j++){
        this.grid[i][j].addNeighbors(this, this.grid);
      }
    }
    //the current cell is now the parent of root
    this.root = this.grid[this.cols - 1][this.rows - 1];
    this.root.dist = 0;
    this.root.hasParent = true;
    this.root.isEmpty = false;
    this.queue.push(this.root);
    this.current = this.root;
    this.current.color = red;

  }
  removeElement(arr, elt){
    for(let i = arr.length - 1; i >= 0; i--){
      if(arr[i] === elt){
        arr.splice(i, 1);
      }
    }
  }
}
