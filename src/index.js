window.onload = function() {
  canvas = document.querySelector('#canvas');
  canvas.height = innerHeight - 140;
  canvas.width = innerWidth;
  c = canvas.getContext('2d');
  c.font = '20px serif';

  canvas.addEventListener('mouseup', mouseUpEvent);
  canvas.addEventListener('mousedown', mouseDownEvent);
  canvas.addEventListener('mousemove', mouseMoveEvent);
  document.addEventListener('keydown', handleKey);
  document.querySelector('#numberNodes').addEventListener('click', numberNodes);
  document.querySelector('#showDegree').addEventListener('click', showDegree);
  document.querySelector('#colorGrid').addEventListener('change', changeNodeColor);
}

window.onresize = function() {
  canvas.height = innerHeight - 140;
  canvas.width = innerWidth;
  redraw();
}

let nodes = [];
let edges = [];
let activeColor = '#0ca647';
let c, canvas;
let activeNodeIndex = null;
let moveNodeIndex = null;
let moveNode = false;
let moved = false;
let numberNodesToggle = false;
let degreeToggle = false;

function redraw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  //renderEdges
  let nullEdgeCount = 0;
  edges.forEach((edge) => {
    if(edge !== null){edge.renderEdge(c);}
    else{nullEdgeCount++;}
  });
  //renderNodes
  let nullNodeCount = 0;
  nodes.forEach((node, i) => {
    if(node !== null){node.renderNode(c, i - nullNodeCount);}
    else{nullNodeCount++;}
  });
  //render active node
  if(activeNodeIndex !== null) {
    nodes[activeNodeIndex].renderActive(c);
  }
  //update counts
  document.querySelector('#nodeCount')
    .innerHTML = `Nodes: ${nodes.length - nullNodeCount}`;
  document.querySelector('#edgeCount')
    .innerHTML = `Edges: ${edges.length - nullEdgeCount}`;
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
    if(node !== null) {
      clickedOn.push(node.verifyClick(e.clientX,
        e.clientY - 140));
    }else {
      clickedOn.push(false);
    }
  });

  if(clickedOn.includes(true)){
    returnObject.node = true;
    returnObject.nodeIndex = clickedOn.findIndex((element) => {return element});
  }

  return returnObject;
}

function mouseDownEvent(e) {
  let clickObject = whatWasClicked(e);
  if(clickObject.node) {
    moveNode = true;
    moveNodeIndex = clickObject.nodeIndex;
  }
}

function mouseUpEvent(e) {

  activeColor = document.querySelector('input[name="colors"]:checked').value;
  moveNode = false;

  if(moved === true) {
    moved = false;
    activeNodeIndex = null;
    return;
  }

  const clickObject = whatWasClicked(e);

  if(clickObject.node){

    if(activeNodeIndex !== clickObject.nodeIndex) {
      if(activeNodeIndex !== null){
        const edge = new Edge(
          nodes[activeNodeIndex],
          nodes[clickObject.nodeIndex]
        );
        edges.push(edge);
        nodes[activeNodeIndex].edges.push(edge);
        nodes[clickObject.nodeIndex].edges.push(edge);
      }
      activeNodeIndex = clickObject.nodeIndex;
    }else {
      activeNodeIndex = null;
    }

  }else if(clickObject.edge) {

  }else {
    console.log("new node");
    const node = new Node(
      e.clientX,
      e.clientY - 140,
      activeColor
    );
    nodes.push(node);
    activeNodeIndex = null;
  }
  redraw();

}

function mouseMoveEvent(e) {
  if(moveNode === true) {
    nodes[moveNodeIndex].x = e.clientX;
    nodes[moveNodeIndex].y = e.clientY - 140;
    redraw();
    moved = true;
    activeNodeIndex = null;
  }
}

function handleKey(e) {
  if((e.keyCode === 68 || e.keyCode === 46) && activeNodeIndex !== null) {
    //delete edges
    let thisNode = nodes[activeNodeIndex];
    let edgeIndex;
    if(thisNode.edges.length - thisNode.nullEdges > 0) {
      let voidEdges = thisNode.edges;
      voidEdges.forEach((edge) => {
        if(edge !== null) {
          //remove edge from other node
          if(edge.node1 != thisNode) {
            edgeIndex = edge.node1.edges.findIndex(element => {
              if(element == edge){return true;}
            })
            edge.node1.edges[edgeIndex] = null;
            edge.node1.nullEdges++;
          }else {
            edgeIndex = edge.node2.edges.findIndex(element => {
              if(element == edge){return true;}
            })
            edge.node2.edges[edgeIndex] = null;
            edge.node2.nullEdges++;
          }
          //remove from edges
          edgeIndex = edges.findIndex(element => {
            if(element == edge){return true;}
          })
          edges[edgeIndex] = null;
        }
      });

    }
    //delete node
    nodes[activeNodeIndex] = null;
    activeNodeIndex = null;
    redraw();
  }
}

function numberNodes(e) {
  let cbtn = document.querySelector('#numberNodes');
  let dbtn = document.querySelector('#showDegree');
  if(numberNodesToggle === false) {
    numberNodesToggle = true;
    degreeToggle = false;
    cbtn.innerHTML = 'True';
    dbtn.innerHTML = 'False';
  }else {
    numberNodesToggle = false;
    cbtn.innerHTML = 'False';
  }
  redraw();
}

function showDegree(e) {
  let cbtn = document.querySelector('#numberNodes');
  let dbtn = document.querySelector('#showDegree');
  if(degreeToggle === false) {
    degreeToggle = true;
    numberNodesToggle = false;
    dbtn.innerHTML = 'True';
    cbtn.innerHTML = 'False';
  }else {
    degreeToggle = false;
    dbtn.innerHTML = 'False';
  }
  redraw();
}

function changeNodeColor(e) {
  if(activeNodeIndex !== null) {
    nodes[activeNodeIndex].color = document
      .querySelector('input[name="colors"]:checked').value;
    redraw();
  }
}
