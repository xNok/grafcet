$(document).foundation();

/**
 * 0 - step require
 * 1 - transition required
 */
 var prog_step=0;
 var step=0;

/*
 * Grafcet desciption
 */

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

function edg_addRow(text){
    $(text+ ' tbody').append(
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
    AdjList['adjList'][step]["adj"]["X"+adj] = new Array();
    AdjList['adjList'][step]["adj"]["X"+adj]["type"] = type;
    AdjList['adjList'][step]["adj"]["X"+adj]["connection"] = connection;
}

//----- graphic functions -----

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
        .text(index + " -> " + value.action)
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
//----- END AdjList -----

$(document).ready(function(){

    //element selection
    var active_item = $('.item').first();

    /*
     * Choisir l'item actif
     */
     $(document).on('click', '.item', function(e) {
        active_item.toggleClass("active_item");
        $(this).toggleClass("active_item");
        active_item = $(this);
    })

    /*
     * Intération avec la grille
     */
     $(document).on('click', '.g_step', function(e) {
        var t = $(this);

        /*
         * Active item as type : step
         */
         if(active_item.hasClass('step')){
            //Grid
            t.children('div.content').text(active_item.text()+step);
            t.attr('data-step',step);
            //adj List
            if(active_item.attr("data-type") === "Initial_Step"){
                adj_newVertice(true);
                t.append(
                    '<svg>'+
                    '<use xlink:href="sprite.svg#initStep"></use>'+
                    '</svg>'
                );
                
            }else{
                adj_newVertice();
                t.append(
                    '<svg>'+
                    '<use xlink:href="sprite.svg#step"></use>'+
                    '</svg>'
                );
            }
            
            //preparation next step
            adj_draw();
            step++;
        }

        /*
         * Active item as type : connection
         */
         if(active_item.hasClass('connection')){
            var data_step = t.attr('data-step');

            if (typeof data_step === "undefined"){
                return;
            }
            if (prog_step === 0) {
                edg_write2lastRowCell(0, data_step);
                //AdjList
                adj_waiting_step = data_step;
                // adavance in prog
                prog_step = 1;
            }else if(prog_step === 1){
                var type = active_item.text()
                // List of edges
                edg_write2lastRowCell(1, data_step);                
                edg_write2lastRowCell(2, type);
                edg_addRow('#edgeList');
                //AdjList
                adj_newAdj(adj_waiting_step, data_step, type, "");
                adj_draw();
                // adavance in prog
                prog_step = 0;
            }
        } 
    })

    //création de la grille
    for (var i = 0; i <= 19; i++) {
        for (var j = 0; j <= 9; j++) {

            var data_string = ' data-x="'+i+'" data-y="'+j+'" ';

            if( i % 2){ // steps cell
             $("#grafcet-schema").append('<div class="g_item g_trans"'+ data_string +'><div class="content"></div></div>');
            }else{ // transition cell
             $("#grafcet-schema").append('<div class="g_item g_step"'+ data_string +'><div class="content"></div></div>');
         }
     }
 }
});