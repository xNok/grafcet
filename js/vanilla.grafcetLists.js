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
// +--_  int[]
// +--_ adjList []
// |  +--_ step
// |  |  +--_ action
// |  |  +--_ coordinate
// |  |  |  +-- data_x
// |  |  |  +-- data_y
// |  |  +--_ nbr_vertices int
// |  |  +--_ adj []
// |  |  |  +--_ step
// |  |  |  |  +-- type
// |  |  |  |  +-- connection
// |  |  |  |  +-- data_x
// |  |  |  |  +-- data_y

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

/*------ DATA constructors -----*/

function adj_newInitialVertice(){
    this.initialSteps.push(this.nbr_vertices);
    this.newVertice();
}

function adj_newVertice(){
    this.adjList[this.nbr_vertices] = new Array();
    this.adjList[this.nbr_vertices]["action"] = "";
    this.adjList[this.nbr_vertices]["nbr_adj"] = 0;
    this.adjList[this.nbr_vertices]["adj"] = new Array();
    AdjList.nbr_vertices++;
}

function adj_newAdj(step, adj, type, connection, data_x, data_y){
    this.adjList[step]["nbr_adj"]++;
    this.adjList[step]["adj"]["X"+adj] = new Array();
    this.adjList[step]["adj"]["X"+adj]["type"] = type;
    this.adjList[step]["adj"]["X"+adj]["connection"] = connection;
    this.adjList[step]["adj"]["X"+adj]["data_x"] = data_x;
    this.adjList[step]["adj"]["X"+adj]["data_y"] = data_y;
}

/*----- GETTERS & SETTERS -----*/

function adj_setCoordinate(step, data_x, data_y){
    console.log(this);
    this.adjList[step]["data_x"] = data_x;
    this.adjList[step]["data_y"] = data_y;
}

function adj_setAction(step, action){
    this.adjList[step]["action"] = action;
}

function adj_setConnection(step1, step2, type ,connection){
    this.adjList[step]["adj"]["X"+step2] = new Array();
    this.adjList[step]["adj"]["X"+step2]["type"] = type;
    this.adjList[step]["adj"]["X"+step2]["connection"] = connection;
}

function adj_getX(step){
    return this.adjList[step].data_x;
}

function adj_getY(step){
    return this.adjList[step].data_y;
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