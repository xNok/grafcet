function edg_addRow(text){
    $(text+' tbody').append(
        '<tr>'+
        '<td></td>'+
        '<td></td>'+
        '<td></td>'+
        '<td></td>'+
        '</tr>'
        ); 
}

function edg_write2lastRowCell(x, text) {
    $('#edgeList tr:last td:eq('+ x +')').text(text);
}

function adj_draw(){
    var cList = $("#adjList ul");
    var iniList = $("#adjList span")
    cList.text(""); //clear
    iniList.text("Initials:");
    for(var index in AdjList.initialSteps) {
        iniList.append(index+",");
    }

    $.each(AdjList.adjList, function(index, value){
        var li = $('<li/>')
        .addClass('vertices')
        .attr('data_step', index )
        .text(index + " -> " + value.action + " @(" + value.data_x + "," +  value.data_y +")")
        .appendTo(cList);
        var ul = $('<ul/>')
        .addClass('adj')
        .attr('data_step', index )
        .appendTo(li);  

        for(var index in value.adj) { 
            var ul_li = $('<li/>')
            .addClass('adj')
            .text(index + " -> " + value.adj[index].type + ", " + value.adj[index].connection)
            .attr('data_step', index)
            .appendTo(ul);
        }
    });
}