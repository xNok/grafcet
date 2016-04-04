var step=0;


/**
 * 0 - step require
 * 1 - transition required
 */
var prog_step=0;

/*
 * Grafcet desciption
 */
var ListOfEdges  = new Array();
var AdjList  = new Array();

AdjList['nbr_vertices'] = 0;
AdjList['adjList'] = new Array(); 

function adj_newVertice(){
    step = AdjList['nbr_vertices'];
    AdjList['adjList'][step] = new Array();
    AdjList['adjList'][step]["action"] = "";
    AdjList['adjList'][step]["nbr_adj"] = 0;
    AdjList['adjList'][step]["adj"] = new Array();
    AdjList['nbr_vertices']++; 
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
    AdjList['adjList'][step]["adj"][adj] = {type,connection};
}

function adj_draw(){
    $.each(AdjList.adjList, function(index, value ){
        var cList = $("#adjList");
        var li = $('<li/>')
            .addClass('vertices')
            .attr('data_step', index )
            .text(index + " -> " + value.action)
            .appendTo(cList);
        var ul = $('<ul/>')
            .addClass('adj')
            .attr('data_step', index )
            .appendTo(li);  

        console.log(value);

        for(var index in value.adj) { 
            console.log(index);
            var ul_li = $('<li/>')
            .addClass('adj')
            .text(index + " -> " + value.adj[index].type + ", " + value.adj[index].connection)
            .attr('data_step', index)
            .appendTo(ul);
        }

        $.each(value.adj, function(index_adj, value_adj){

        });

    });
}

// Test AdjList
adj_newVertice();
adj_setAction(0, "KM1");
adj_newAdj(0, 2, "merge", "a");
adj_newAdj(0, 3, "merge", "d");
adj_newVertice();
adj_setAction(1, "KM2");
adj_newAdj(1, 2, "merge", "b");
adj_newVertice();
adj_setAction(2, "KM1");
adj_newAdj(2, 0, "merge", "c");
adj_newVertice();
adj_setAction(3, "KM4");

adj_draw();

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
            adj_newVertice(step);
            $("#adjList");
            //preparation next step
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
                write2lastRowCell(0, data_step);
                activate_Adj(data_step);
                // adavance in prog
                prog_step = 1;
            }else if(prog_step === 1){
                // List of edges
                write2lastRowCell(1, data_step);                
                write2lastRowCell(2, active_item.text());
                // add row
                addRow('#edgeList');
                // adavance in prog
                prog_step = 0;
            }
        } 
    })


    // ----- Manage table -----
    function addRow(text){
        $(text+ ' tbody').append(
        '<tr>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
        '</tr>'
        ); 
    }

    
    // ----- Manage list of edges -----
     
    function write2lastRowCell(x, text) {
        $('#edgeList tr:last td:eq('+ x +')').text(text);
    }


    // ----- Manage Adj List -----

    function addStep(x){
        $('#adjList tr:last td:eq(0)').text(x);
        addRow('#adjList');
    }

    function activate_Adj(data_step){
        data_step = parseInt(data_step,10)+1;
        $('#adjList tr:eq('+ data_step +') td:eq(0)').toggleClass("active_Adj");
    }

    function add_Adj(data_step){
        activate_Adj(data_step);
        data_step = parseInt(data_step,10)+1;
        $('#adjList tr:eq('+ data_step +') td:eq(0)').text(data_step)
    }

    // ----- Manage Grid  -----


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