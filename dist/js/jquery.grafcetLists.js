function edg_addRow(t){$(t+" tbody").append("<tr><td></td><td></td><td></td><td></td></tr>")}function edg_write2lastRowCell(t,a){$("#edgeList tr:last td:eq("+t+")").text(a)}function adj_draw(){var t=$("#adjList ul"),a=$("#adjList span");t.text(""),a.text("Initials:");for(var d in AdjList.initialSteps)a.append(d+",");$.each(AdjList.adjList,function(a,d){var e=$("<li/>").addClass("vertices").attr("data_step",a).text(a+" -> "+d.action+" @("+d.data_x+","+d.data_y+")").appendTo(t),i=$("<ul/>").addClass("adj").attr("data_step",a).appendTo(e);for(var a in d.adj)var n=$("<li/>").addClass("adj").text(a+" -> "+d.adj[a].type+", "+d.adj[a].connection).attr("data_step",a).appendTo(i)})}