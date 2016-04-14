(function($) {

    $.fn.edg_addRow = function() {
        $(this).children('tbody').append(
            '<tr>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '</tr>'
            ); 
    }

    $.fn.adj_draw = function(){
        $(this).text(""); //clear

        var iniList = $("<spanp/>").appendTo(this);
        var cList = $("<ul/>").appendTo(this);

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

    $.fn.edg_draw = function(edgList){
        for (var i = edgList.length - 1; i >= 0; i--) {
            $(this).edg_write2lastRowCell(0, edgList[i].step1);
            $(this).edg_write2lastRowCell(1, edgList[i].step2);                
            $(this).edg_write2lastRowCell(2, edgList[i].type);
            $(this).edg_write2lastRowCell(3, edgList[i].receptivity);
            $(this).edg_addRow();
        }

    }

    $.fn.edg_write2lastRowCell = function(x, text) {
        $(this.selector + ' tr:last td:eq('+ x +')').text(text);
    }

}(jQuery));

