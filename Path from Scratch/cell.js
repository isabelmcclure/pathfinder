class Cell{


  constructor(loc){
    this.loc = new MyVector(loc.x, loc.y);
    this.isOcuppied = false;
    this.hasParent = false;
    this.isEmpty = true;
  }
  render(){
    this.color = "cadetBlue";
    this.width = "100px";
    this.height = "100px";

  }

  addNeighbors(pf, grid){


    //check in all directions
  }

}
