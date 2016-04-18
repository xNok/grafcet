var play = false;
var stateVectorT = [];

$(document).ready(function(){
    /* Contrôles */
    $("#button_fbw").click(function(){
        alert();
    })

    $("#button_bw").click(function(){
        alert();
    })

    $("#button_play").click(function(){
        play =true;
        /*Reset*/
        stateVectorT = [];
        $(".activeStep").toggleClass("activeStep");
        $('#stateVector').text("");

        /*init State vector*/
        $.each(AdjList.adjList, function(i, v){
            stateVectorT.push(0);
        });
        
        /* Initialiser */
        AdjList.activatedStep = AdjList.initialSteps;

        $.each(AdjList.initialSteps, function(i, v){
            console.log(v);
            var t = selectCell(AdjList.adjList[v].data_x, AdjList.adjList[v].data_y).toggleClass("activeStep");
            stateVectorT[i] = 1;
        });

        //draw state vector
        $('#stateVector').append("<li>" + stateVectorT + "</li>");      
    })  

    $("#button_stop").click(function(){
        play = false;
        $(".activeStep").toggleClass("activeStep");
    })

    $("#button_fw").click(function(){
        var activatedStepT = [];
        var unactivate = false;

        //Executuion Loop
        $.each(AdjList.activatedStep, function(i, v){

            for(j in AdjList.adjList[parseInt(v)].adj){
                var trans_x = AdjList.adjList[v].adj[j].data_x;
                var trans_y = AdjList.adjList[v].adj[j].data_y;
                var type = AdjList.adjList[v].adj[j].type;
                var connection = AdjList.adjList[v].adj[j].connection;

                // transition valid ?
                if($(".g_trans[data-x='"+trans_x+"'][data-y='"+trans_y+"']").hasClass('activeTrans')){
                    var skip = false;

                    if(type === "merge"){
                        var s = connection.split(".");
                        var ss = parseInt(s[1].substr(1));
                        console.log(s);
                        console.log(ss);
                        console.log(AdjList.activatedStep.indexOf(ss));
                        skip = (AdjList.activatedStep.indexOf(ss) === -1 ? true :false); 
                    }

                    if(!skip){
                        var node = parseInt(j.substr(1));                  
                        //avoid duplicate
                        if(activatedStepT.indexOf(node)){
                            activatedStepT.push(node);
                            stateVectorT[node] = 1;
                        }

                        // at leat transition is valid
                        unactivate = true;
                    }
                }
            }
            // unactivite state v ?
            if(!unactivate){
                activatedStepT.push(v);
            }else{
                stateVectorT[v] = 0;
            }

            // init for next loop
            unactivate = false;
        });

        //Detect grafcet evolution
        if(activatedStepT.length != 0){
            //Down all states
            $(".activeStep").toggleClass("activeStep");

            //Update
            AdjList.activatedStep = [];
            AdjList.activatedStep = activatedStepT;

            //UP
            $.each(AdjList.activatedStep, function(i, v){
                var t = selectCell(AdjList.adjList[v].data_x, AdjList.adjList[v].data_y).toggleClass("activeStep");
            });

            //draw state vector
            $('#stateVector').append("<li>" + stateVectorT + "</li>");
            console.log(AdjList);
        }
    })

    $("#button_ffw").click(function(){
        alert();
    })

    $(".g_trans").click(function(){
        if(play){
            $(this).toggleClass("activeTrans");
        }
    })
});