class Node {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.edges = [];
  }

  renderNode(c){
    c.beginPath();
    c.arc(this.x, this.y, 15, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
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
