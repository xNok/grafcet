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

adj_newVertice();
adj_newVertice();
adj_newVertice();
adj_newVertice();
adj_newVertice();

adj_newAdj(0, 1, "join" , "i0");
adj_newAdj(1, 2,  "join" , "i1");
adj_newAdj(1, 3,  "join" , "i2");
adj_newAdj(3, 4,  "join" , "i3");
adj_newAdj(1, 4,  "join" , "i1");

adj_setAction(0, "KM42");
adj_setAction(1, "KM2");
adj_setAction(2, "KM1");
adj_setAction(3, "KM2");




//----- END AdjList -----

//--------------------------------\\
//----- START SVG Management -----\\
//--------------------------------\\

/*
 * step
 * initStep
 * join
 */
function svg_get(id){
    return '<svg>'+
           '<use xlink:href="sprite.svg#'+id+'"></use>'+
           '</svg>'
}


$(document).ready(function(){

    adj_draw();
    $('#grafcet-schema').createGrid();

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
                t.append(svg_get("initStep"));
            }else{
                adj_newVertice();
                t.append(svg_get("step"));
            }

            adj_setCoordinate(step,t.attr("data-x"),t.attr("data-y"));

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

                //calculate
                var deltaX = adj_getX(adj_waiting_step)-adj_getX(data_step);
                var deltaY = adj_getY(adj_waiting_step)-adj_getY(data_step);
                if(deltaX === -2 && deltaY === 0){
                    var trans_x = Number(adj_getX(data_step))-1;
                    var trans_y = adj_getY(data_step);
                    $(".g_trans[data-x='"+trans_x+"'][data-y='"+trans_y+"']").append(svg_get("join"));
                }
                // adavance in prog
                prog_step = 0;
            }
        } 
    })
});