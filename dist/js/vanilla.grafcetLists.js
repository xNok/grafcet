function Edge(t,i,d,e){this.step1=t,this.step2=i,this.receptivity=d,this.type=e}function AdjList(){this.nbr_vertices=0,this.adjList=new Array,this.initialSteps=new Array,this.newVertice=adj_newVertice,this.newInitialVertice=adj_newInitialVertice,this.setCoordinate=adj_setCoordinate,this.getX=adj_getX,this.getY=adj_getY,this.newAdj=adj_newAdj,this.setAction=adj_setAction,this.setConnection=adj_setConnection}function adj_newVertice(){AdjList.adjList[AdjList.nbr_vertices]=new Array,AdjList.adjList[AdjList.nbr_vertices].action="",AdjList.adjList[AdjList.nbr_vertices].nbr_adj=0,AdjList.adjList[AdjList.nbr_vertices].adj=new Array,AdjList.nbr_vertices++}function adj_newInitialVertice(){AdjList.initialSteps.push(AdjList.nbr_vertices),adj_newVertice()}function adj_setCoordinate(t,i,d){AdjList.adjList[t].data_x=i,AdjList.adjList[t].data_y=d}function adj_getX(t){return AdjList.adjList[t].data_x}function adj_getY(t){return AdjList.adjList[t].data_y}function adj_newAdj(t,i,d,e,s,j){AdjList.adjList[t].nbr_adj++,AdjList.adjList[t].adj["X"+i]=new Array,AdjList.adjList[t].adj["X"+i].type=d,AdjList.adjList[t].adj["X"+i].connection=e,AdjList.adjList[t].adj["X"+i].data_x=s,AdjList.adjList[t].adj["X"+i].data_y=j}function adj_setAction(t,i){AdjList.adjList[t].action=i}function adj_setConnection(t,i,d,e){AdjList.adjList[step].adj["X"+i]=new Array,AdjList.adjList[step].adj["X"+i].type=d,AdjList.adjList[step].adj["X"+i].connection=e}function adj2edj(t){var d=new Array;for(i in t.adjList)for(j in t.adjList[i].adj)d.push(new Edge(i,j.slice(1),t.adjList[i].adj[j].connection,t.adjList[i].adj[j].type));return d}