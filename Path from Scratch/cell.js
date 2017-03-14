class Cell{


  constructor(loc){
    this.loc = new MyVector(loc.x, loc.y);
    this.isOcuppied = false;
    this.hasParents = false;
  }
  render(){
    this.color = "cadetBlue";
    this.width = "100px";
    this.height = "100px";

  }

  addNeighbors(){
    //check in all directions
  }

}
