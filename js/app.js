$(document).foundation();

/**
* 0 - step require
* 1 - transition required
*/
var prog_step=0;
var transition=0;
var adj_waiting_step = 0;

var AdjList  = new AdjList();
var ListOfEdges  = new Array();

//------------------------------\\
//----- START Demo Grafcet -----\\
//------------------------------\\

AdjList.newInitialVertice();
AdjList.setCoordinate(0,0,4);
AdjList.newVertice();
AdjList.setCoordinate(1,2,3);
AdjList.newVertice();
AdjList.setCoordinate(2,2,5);
AdjList.newVertice();
AdjList.setCoordinate(3,4,4);
AdjList.newVertice();
AdjList.setCoordinate(4,6,3);
AdjList.newVertice();
AdjList.setCoordinate(5,6,5);
AdjList.newVertice();
AdjList.setCoordinate(6,8,3);
AdjList.newVertice();
AdjList.setCoordinate(7,8,5);
AdjList.newVertice();
AdjList.setCoordinate(8,10,4);

AdjList.newAdj(0, 1, "join" , "i1",1,3);
AdjList.newAdj(0, 2, "join" , "i2",1,5);
AdjList.newAdj(1, 3, "join" , "i2",3,3);
AdjList.newAdj(2, 3, "join" , "i1",3,5);
AdjList.newAdj(3, 4, "fork" , "i3",5,4);
AdjList.newAdj(3, 5, "fork" , "i3",5,4);
AdjList.newAdj(4, 6, "join" , "i4",7,3);
AdjList.newAdj(5, 7, "join" , "i3",7,5);
AdjList.newAdj(6, 8, "merge" , "i2.X7",9,4);
AdjList.newAdj(7, 8, "merge" , "i2.X6",9,4);
AdjList.newAdj(8, 0, "jump" , "i3",11,4);

AdjList.setAction(0, "L_R1");
AdjList.setAction(1, "L_G1");
AdjList.setAction(2, "L_Y1");
AdjList.setAction(3, "L_R1");
AdjList.setAction(4, "L_G2");
AdjList.setAction(5, "L_Y2");
AdjList.setAction(6, "L_R2");
AdjList.setAction(7, "L_Y2");
AdjList.setAction(8, "L_R2");

console.log(AdjList);

var Edges = adj2edj(AdjList);
$("#edgeList").edg_draw(Edges);

$(document).ready(function(){

    $('#adjList').adj_draw();
    $('#grafcet-schema').createGrid();
    $('#grafcet-schema').loadGrid(AdjList);
    generate(AdjList);

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
            t.drawStepOnGrid(AdjList.nbr_vertices);
            t.attr('data-step',AdjList.nbr_vertices);
            //adj List
            if(active_item.attr("data-type") === "Initial_Step"){
                AdjList.newInitialVertice();
                t.append(svg_get("initStep"));
            }else{
                AdjList.newVertice();
                t.append(svg_get("step"));
            }

            AdjList.setCoordinate(AdjList.nbr_vertices-1,t.attr("data-x"),t.attr("data-y"));

            //preparation next step
            $('#adjList').adj_draw();
        }

        /*
        * Active item as type : connection
        */
        if(active_item.hasClass('connection')){
            var data_step = t.attr('data-step');

            if (typeof data_step === "undefined") return;

            if (prog_step === 0){
                $("#edgeList").edg_write2lastRowCell(0, data_step);
                //AdjList
                adj_waiting_step = data_step;
                // adavance in prog
                prog_step = 1;
            }else if(prog_step === 1){
                var type = active_item.text()
                // List of edges
                $("#edgeList").edg_write2lastRowCell(1, data_step);                
                $("#edgeList").edg_write2lastRowCell(2, type);
                $("#edgeList").edg_addRow();
                //AdjList
                AdjList.newAdj(adj_waiting_step, data_step, type, "");
                $('#adjList').adj_draw();;

                //calculate
                var deltaX = AdjList.getX(adj_waiting_step)-AdjList.getX(data_step);
                var deltaY = AdjList.getY(adj_waiting_step)-AdjList.getY(data_step);

                if(deltaX === -2 && deltaY === 0){
                    var trans_x = Number(AdjList.getX(data_step))-1;
                    var trans_y = AdjList.getY(data_step);
                    $(".g_trans[data-x='"+trans_x+"'][data-y='"+trans_y+"']").append(svg_get("join"));
                }

                // adavance in prog
                prog_step = 0;
            }

            generate(AdjList);
        }
    })

    /*
     *
     */
    function generate(adjList){
        var code = "";
        var code_action = "";

        // Version 1 - non conforme
        // for (i in adjList.adjList) {
        //     code += 
        //     "if(Etapes["+ i +"]){ \n"+
        //     "    //UP \n";
            
        //     for (j in adjList.adjList[i].adj) {
        //         code += 
        //         "    if("+ adjList.adjList[i].adj[j].connection +"){ \n"+
        //         "        Etapes["+ j.substr(1) +"] = unactivate = true; \n"+
        //         "        digitalWrite("+ adjList.adjList[ parseInt(j.substr(1)) ].action +", HIGH); \n"+
        //         "    } \n";
        //     }
        //     code += 
        //     "    //Down \n"+
        //     "    if(unactivate){ \n"+
        //     "        Etapes["+ i +"] = unactivate = false; \n"+
        //     "        digitalWrite("+ adjList.adjList[ i ].action +", LOW); \n"+
        //     "    } \n"+
        //     "}";
        // }

        // $('#Steps').text(code);
        // 

        /***** CalculerFEtapes() *****/
        code += 
        "inline void CalculerFEtapes() {\n";
        for (i in adjList.adjList) {
            code += 
            "   if(Etapes["+ i +"]){\n";

            for (j in adjList.adjList[i].adj) {
                code += 
                "       if("+ receptivityConvertor(adjList.adjList[i].adj[j].connection) +"){;\n"+
                "           FEtapes["+ parseInt(j.substr(1)) +"] = 1;\n"+
                "           FEtapes["+ i +"] = 0;\n"+
                "       }\n";
            }
            "   }\n";
        }
        code += 
        "}\n";

        /***** AffectationSorties() *****/
        code_action +=
        "inline void AffectationSorties() {\n";
        for (i in adjList.adjList) {
            code_action +=
            "(Etapes["+ i +"]) ? digitalWrite("+ adjList.adjList[ i ].action +", HIGH) : digitalWrite("+ adjList.adjList[ i ].action +", LOW);\n";
        }
        code_action +=
        "}\n";

        /****** Write *****/
        $('#Steps').text(code + "\n" + code_action);
    }
});

function receptivityConvertor(str){
    str = str.replace(".", " && ");
    str = str.replace("+", " || ");
    console.log(str);
    ss = str.split(" ");
    console.log(ss);
    receptivity = "";

    for(var i =0; i < ss.length ; i++){
        console.log(ss[i]);
        if(/(^X[1-9]+$)/.test(ss[i])){
            receptivity += "Etapes["+ ss[i].substr(1) +"]"
        }else{
            receptivity += ss[i];
        }
    }

    console.log(receptivity);
    return receptivity;
}