'use strict'

var pf;
var cellId = 0;
function setup(){
  pf = new PathFinder();
}

function draw(){
  pf.run();
  pf.render();
}
class PathFinder{
  constructor(){
    this.canvas = document.getElementById('canvas');
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

  }
  render(){

  }
  loadGrid(){

  }
}
