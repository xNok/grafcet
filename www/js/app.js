"use strict";function receptivityConvertor(t){t=t.replace("."," && "),t=t.replace("+"," || "),console.log(t),ss=t.split(" "),console.log(ss),receptivity="";for(var i=0;i<ss.length;i++)console.log(ss[i]),/(^X[1-9]+$)/.test(ss[i])?receptivity+="Etapes["+ss[i].substr(1)+"]":receptivity+=ss[i];return console.log(receptivity),receptivity}$(document).foundation();var prog_step=0,transition=0,adj_waiting_step=0,AdjList=new AdjList,ListOfEdges=new Array;AdjList.newInitialVertice(),AdjList.setCoordinate(0,0,4),AdjList.newVertice(),AdjList.setCoordinate(1,2,3),AdjList.newVertice(),AdjList.setCoordinate(2,2,5),AdjList.newVertice(),AdjList.setCoordinate(3,4,4),AdjList.newVertice(),AdjList.setCoordinate(4,6,3),AdjList.newVertice(),AdjList.setCoordinate(5,6,5),AdjList.newVertice(),AdjList.setCoordinate(6,8,3),AdjList.newVertice(),AdjList.setCoordinate(7,8,5),AdjList.newVertice(),AdjList.setCoordinate(8,10,4),AdjList.newAdj(0,1,"join","i1",1,3),AdjList.newAdj(0,2,"join","i2",1,5),AdjList.newAdj(1,3,"join","i2",3,3),AdjList.newAdj(2,3,"join","i1",3,5),AdjList.newAdj(3,4,"fork","i3",5,4),AdjList.newAdj(3,5,"fork","i3",5,4),AdjList.newAdj(4,6,"join","i4",7,3),AdjList.newAdj(5,7,"join","i1",7,5),AdjList.newAdj(6,8,"merge","i2.X7",9,4),AdjList.newAdj(7,8,"merge","i2.X6",9,4),AdjList.newAdj(8,0,"jump","i3",11,4),AdjList.setAction(0,"L_R1"),AdjList.setAction(1,"L_G1"),AdjList.setAction(2,"L_Y1"),AdjList.setAction(3,"L_R1"),AdjList.setAction(4,"L_G2"),AdjList.setAction(5,"L_Y2"),AdjList.setAction(6,"L_R2"),AdjList.setAction(7,"L_G1"),AdjList.setAction(8,"L_Y2"),console.log(AdjList);var Edges=adj2edj(AdjList);$("#edgeList").edg_draw(Edges),$(document).ready(function(){function t(t){var e="",s="";e+="inline void CalculerFEtapes() {\n";for(i in t.adjList){e+="   if(Etapes["+i+"]){\n";for(j in t.adjList[i].adj)e+="       if("+receptivityConvertor(t.adjList[i].adj[j].connection)+"){\n           FEtapes["+parseInt(j.substr(1))+"] = 1; FEtapes["+i+"] = 0;\n           digitalWrite("+t.adjList[i].action+", HIGH); \n       }\n";e+="   }\n"}e+="}\n",s+="inline void AffectationSorties() {\n";for(i in t.adjList)s+="if(Etapes["+i+"]) digitalWrite("+t.adjList[i].action+", LOW);\n";s+="}\n",$("#Steps").text(e+"\n"+s)}$("#adjList").adj_draw(),$("#grafcet-schema").createGrid(),$("#grafcet-schema").loadGrid(AdjList),t(AdjList);var e=$(".item").first();$(document).on("click",".item",function(t){e.toggleClass("active_item"),$(this).toggleClass("active_item"),e=$(this)}),$(document).on("click",".g_step",function(i){var s=$(this);if(e.hasClass("step")&&(s.drawStepOnGrid(AdjList.nbr_vertices),s.attr("data-step",AdjList.nbr_vertices),"Initial_Step"===e.attr("data-type")?(AdjList.newInitialVertice(),s.append(svg_get("initStep"))):(AdjList.newVertice(),s.append(svg_get("step"))),AdjList.setCoordinate(AdjList.nbr_vertices-1,s.attr("data-x"),s.attr("data-y")),$("#adjList").adj_draw()),e.hasClass("connection")){var d=s.attr("data-step");if("undefined"==typeof d)return;if(0===prog_step)$("#edgeList").edg_write2lastRowCell(0,d),adj_waiting_step=d,prog_step=1;else if(1===prog_step){var n=e.text();$("#edgeList").edg_write2lastRowCell(1,d),$("#edgeList").edg_write2lastRowCell(2,n),$("#edgeList").edg_addRow(),AdjList.newAdj(adj_waiting_step,d,n,""),$("#adjList").adj_draw();var a=AdjList.getX(adj_waiting_step)-AdjList.getX(d),j=AdjList.getY(adj_waiting_step)-AdjList.getY(d);if(-2===a&&0===j){var r=Number(AdjList.getX(d))-1,o=AdjList.getY(d);$(".g_trans[data-x='"+r+"'][data-y='"+o+"']").append(svg_get("join"))}prog_step=0}t(AdjList)}})});