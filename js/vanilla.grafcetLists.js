//-----------------------------\\
//----- START ListOfEdges -----\\
//-----------------------------\\

var ListOfEdges  = new Array();
var edg_buffer = new Array();

function edg_initBuffer(){
    edg_buffer['step1'] = "";
    edg_buffer['step2'] = "";
    edg_buffer['c'] = "";
    edg_buffer['type'] = "";
}

function edg_addLink(){
    ListOfEdges.push(edg_buffer)
}

//----- END ListOfEdges -----

//-------------------------\\
//----- START AdjList -----\\
//-------------------------\\

var AdjList  = new Array();
var adj_waiting_step = 0;

AdjList['nbr_vertices'] = 0;
AdjList['adjList'] = new Array(); 
AdjList['initialSteps'] = new Array();

function adj_newVertice(isInitial){
    step = AdjList['nbr_vertices'];
    AdjList['adjList'][step] = new Array();
    AdjList['adjList'][step]["action"] = "";
    AdjList['adjList'][step]["nbr_adj"] = 0;
    AdjList['adjList'][step]["adj"] = new Array();

    AdjList['nbr_vertices']++;

    if(isInitial){
        AdjList['initialSteps'].push(step);
    }
}

/*
 * Add grafic infos
 */
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