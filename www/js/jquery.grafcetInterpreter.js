"use strict";var play=!1,stateVectorT=[];$(document).ready(function(){$("#button_fbw").click(function(){alert()}),$("#button_bw").click(function(){alert()}),$("#button_play").click(function(){play=!0,stateVectorT=[],$(".activeStep").toggleClass("activeStep"),$("#stateVector").text(""),$.each(AdjList.adjList,function(t,a){stateVectorT.push(0)}),AdjList.activatedStep=AdjList.initialSteps,$.each(AdjList.initialSteps,function(t,a){console.log(a);selectCell(AdjList.adjList[a].data_x,AdjList.adjList[a].data_y).toggleClass("activeStep");stateVectorT[t]=1}),$("#stateVector").append("<li>"+stateVectorT+"</li>")}),$("#button_stop").click(function(){play=!1,$(".activeStep").toggleClass("activeStep")}),$("#button_fw").click(function(){var t=[],a=!1;$.each(AdjList.activatedStep,function(e,i){for(j in AdjList.adjList[parseInt(i)].adj){var s=AdjList.adjList[i].adj[j].data_x,c=AdjList.adjList[i].adj[j].data_y,d=AdjList.adjList[i].adj[j].type,n=AdjList.adjList[i].adj[j].connection;if($(".g_trans[data-x='"+s+"'][data-y='"+c+"']").hasClass("activeTrans")){var o=!1;if("merge"===d){var l=n.split("."),p=parseInt(l[1].substr(1));console.log(l),console.log(p),console.log(AdjList.activatedStep.indexOf(p)),o=-1===AdjList.activatedStep.indexOf(p)}if(!o){var r=parseInt(j.substr(1));t.indexOf(r)&&(t.push(r),stateVectorT[r]=1),a=!0}}}a?stateVectorT[i]=0:t.push(i),a=!1}),0!=t.length&&($(".activeStep").toggleClass("activeStep"),AdjList.activatedStep=[],AdjList.activatedStep=t,$.each(AdjList.activatedStep,function(t,a){selectCell(AdjList.adjList[a].data_x,AdjList.adjList[a].data_y).toggleClass("activeStep")}),$("#stateVector").append("<li>"+stateVectorT+"</li>"),console.log(AdjList))}),$("#button_ffw").click(function(){alert()}),$(".g_trans").click(function(){play&&$(this).toggleClass("activeTrans")})});