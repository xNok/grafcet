function edg_initBuffer(){edg_buffer.step1="",edg_buffer.step2="",edg_buffer.c="",edg_buffer.type=""}function edg_addLink(){ListOfEdges.push(edg_buffer)}function adj_newVertice(t){step=AdjList.nbr_vertices,AdjList.adjList[step]=new Array,AdjList.adjList[step].action="",AdjList.adjList[step].nbr_adj=0,AdjList.adjList[step].adj=new Array,AdjList.nbr_vertices++,t&&AdjList.initialSteps.push(step)}function adj_setCoordinate(t,d,i){AdjList.adjList[t].data_x=d,AdjList.adjList[t].data_y=i}function adj_getX(t){return AdjList.adjList[t].data_x}function adj_getY(t){return AdjList.adjList[t].data_y}function adj_newAdj(t,d,i,s){AdjList.adjList[t].nbr_adj++,AdjList.adjList[t].adj["X"+d]=new Array,AdjList.adjList[t].adj["X"+d].type=i,AdjList.adjList[t].adj["X"+d].connection=s}function adj_setAction(t,d){AdjList.adjList[t].action=d}function adj_setConnection(t,d,i,s){AdjList.adjList[step].adj["X"+d]=new Array,AdjList.adjList[step].adj["X"+d].type=i,AdjList.adjList[step].adj["X"+d].connection=s}var ListOfEdges=new Array,edg_buffer=new Array,AdjList=new Array,adj_waiting_step=0;AdjList.nbr_vertices=0,AdjList.adjList=new Array,AdjList.initialSteps=new Array;