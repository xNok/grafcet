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



//----- graphic functions -----



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