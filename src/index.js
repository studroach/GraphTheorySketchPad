window.onload = function() {
  canvas = document.querySelector('#canvas');
  canvas.height = innerHeight * .84;
  canvas.width = innerWidth *.99;
  c = canvas.getContext('2d');

  canvas.addEventListener('click', (e) => {

    activeColor = document.querySelector('input[name="colors"]:checked').value;
    const clickedOn = [];
    nodes.forEach(node => {
      clickedOn.push(node.verifyClick(e.clientX,
        e.clientY - (innerHeight * .15)));
    });

    if(clickedOn.includes(true)){

      redraw();
      const nodeIndex = clickedOn.findIndex((element) => {return element});
      if(activeNodeIndex !== nodeIndex) {
        if(activeNodeIndex !== null){
          const edge = new Edge(nodes[activeNodeIndex], nodes[nodeIndex]);
          edges.push(edge);
          edge.renderEdge(c);
        }
        nodes[nodeIndex].renderActive(c);
        activeNodeIndex = nodeIndex;
      }else {
        activeNodeIndex = null;
      }

    }else {
      console.log("new node");
      const node = new Node(
        e.clientX,
        e.clientY - (innerHeight * .15),
        activeColor
      );
      nodes.push(node);
      activeNodeIndex = null;
      redraw();
    }
  });
}

window.onresize = function() {
  canvas.height = innerHeight * .84;
  canvas.width = innerWidth *.99;
  redraw();
}

let nodes = [];
let edges = [];
let activeColor = '#0ca647';
let c, canvas;
let activeNodeIndex = null;

function redraw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  //renderEdges
  edges.forEach((edge) => {
    edge.renderEdge(c);
  });
  //renderNodes
  nodes.forEach((node) => {
    node.renderNode(c);
  });

}
