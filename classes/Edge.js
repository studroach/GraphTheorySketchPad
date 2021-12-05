class Edge {
  constructor(node1, node2) {
    this.node1 = node1;
    this.node2 = node2;
  }

  renderEdge(c) {
    c.beginPath();
    c.moveTo(this.node1.x, this.node1.y);
    c.lineTo(this.node2.x, this.node2.y);
    c.strokeStyle = '#8c8c8c';
    c.stroke();
  }
}
