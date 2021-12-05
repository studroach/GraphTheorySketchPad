window.onload = function() {
  canvas = document.querySelector('#canvas');
  canvas.height = innerHeight * .84;
  canvas.width = innerWidth *.99;
  c = canvas.getContext('2d');

  canvas.addEventListener('mouseup', (e) => {

    activeColor = document.querySelector('input[name="colors"]:checked').value;

    const clickObject = whatWasClicked(e);

    if(clickObject.node){

      redraw();
      if(activeNodeIndex !== clickObject.nodeIndex) {
        if(activeNodeIndex !== null){
          const edge = new Edge(
            nodes[activeNodeIndex],
            nodes[clickObject.nodeIndex
          ]);
          edges.push(edge);
          edge.renderEdge(c);
        }
        nodes[clickObject.nodeIndex].renderActive(c);
        activeNodeIndex = clickObject.nodeIndex;
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

function whatWasClicked(e) {

  let returnObject = {
    node: false,
    edge: false,
    nodeIndex: -1,
    edgeIndex: -1
  }

  const clickedOn = [];
  nodes.forEach(node => {
    clickedOn.push(node.verifyClick(e.clientX,
      e.clientY - (innerHeight * .15)));
  });

  if(clickedOn.includes(true)){
    returnObject.node = true;
    returnObject.nodeIndex = clickedOn.findIndex((element) => {return element});
  }

  return returnObject;
}
