class Node {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.edges = [];
    this.nullEdges = 0;
  }

  renderNode(c, index){
    c.beginPath();
    c.arc(this.x, this.y, 15, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();

    if(numberNodesToggle === true) {
      let offset = 5;
      if(index > 9){offset = 10;}
      if(this.color === '#34dbe0'){c.fillStyle = "#000000"}
      else{c.fillStyle = "#ffffff"}
      c.fillText(`${index}`, this.x - offset, this.y + 6);
    }

    if(degreeToggle === true) {
      let offset = 5;
      if(this.edges.length - this.nullEdges > 9){offset = 10;}
      if(this.color === '#34dbe0'){c.fillStyle = "#000000"}
      else{c.fillStyle = "#ffffff"}
      c.fillText(`${this.edges.length - this.nullEdges}`, this.x - offset, this.y + 6);
    }
  }

  renderActive(c){
    c.beginPath();
    c.arc(this.x, this.y, 15, 0, Math.PI * 2, false);
    c.strokeStyle = '#ffffff';
    c.lineWidth = 3;
    c.stroke();
  }

  verifyClick(x, y){
    const xDist = x - this.x;
    const yDist = y - this.y;
    if  ((xDist < 15 && xDist > -15)
      && (yDist < 15 && yDist > -15)){
        return true;
    }
    return false;
  }

  connectNode(){

  }
}
