//-----------------------------\\
//----- START ListOfEdges -----\\
//-----------------------------\\

function Edge(step1, step2, receptivity, type){
    this.step1 = step1;
    this.step2 = step2;
    this.receptivity = receptivity;
    this.type = type;
}

//----- END ListOfEdges -----

//-------------------------\\
//----- START AdjList -----\\
//-------------------------\\
//
// Schema definition
// .
// +--_ nbr_vertices int
// +--_ initialSteps int[]
// +--_ adjList
// |  +--_ step
// |  |  +--_ action
// |  |  +--_ coordinate
// |  |  |  +-- data_x
// |  |  |  +-- data_y
// |  |  +--_ nbr_vertices int
// |  |  +--_ adj
// |  |  |  +--_ step
// |  |  |  |  +-- type
// |  |  |  |  +-- connection

function AdjList() {
  this.nbr_vertices = 0;
  this.adjList = new Array();
  this.initialSteps = new Array();

  this.newVertice = adj_newVertice;
  this.newInitialVertice = adj_newInitialVertice;
  this.setCoordinate = adj_setCoordinate;
  this.getX = adj_getX;
  this.getY = adj_getY;
  this.newAdj = adj_newAdj;
  this.setAction = adj_setAction
  this.setConnection = adj_setConnection;
}

function adj_newVertice(){
    step = AdjList['nbr_vertices'];
    AdjList['adjList'][step] = new Array();
    AdjList['adjList'][step]["action"] = "";
    AdjList['adjList'][step]["nbr_adj"] = 0;
    AdjList['adjList'][step]["adj"] = new Array();
    AdjList['nbr_vertices']++;
}

function adj_newInitialVertice(){
    AdjList['initialSteps'].push(step);
    adj_newVertice();
}

function adj_setCoordinate(step, data_x, data_y){
    AdjList['adjList'][step]["data_x"] = data_x;
    AdjList['adjList'][step]["data_y"] = data_y;
}

function adj_getX(step){
    return AdjList.adjList[step].data_x;
}

function adj_getY(step){
    return AdjList.adjList[step].data_y;
}

function adj_newAdj(step, adj, type, connection){
    AdjList['adjList'][step]["nbr_adj"]++;
    AdjList['adjList'][step]["adj"]["X"+adj] = new Array();
    AdjList['adjList'][step]["adj"]["X"+adj]["type"] = type;
    AdjList['adjList'][step]["adj"]["X"+adj]["connection"] = connection;
}

function adj_setAction(step, action){
    AdjList['adjList'][step]["action"] = action;
}

function adj_setConnection(step1, step2, type ,connection){
    AdjList['adjList'][step]["adj"]["X"+step2] = new Array();
    AdjList['adjList'][step]["adj"]["X"+step2]["type"] = type;
    AdjList['adjList'][step]["adj"]["X"+step2]["connection"] = connection;
}

//--------------------------------\\
//----- START Transformation -----\\
//--------------------------------\\

function adj2edj(adjList){
  var Edges = new Array();

  for (i in adjList.adjList) {
    for (j in adjList.adjList[i].adj) {
      Edges.push(new Edge(i, j.slice( 1 ), adjList.adjList[i].adj[j].connection, adjList.adjList[i].adj[j].type));
    }
  }

  return Edges;
}