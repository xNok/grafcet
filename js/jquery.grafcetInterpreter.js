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

        //Executuion Loop
        $.each(AdjList.activatedStep, function(i, v){
              
              //draw transition
              for(j in AdjList.adjList[parseInt(v)].adj){
                var trans_x = AdjList.adjList[v].adj[j].data_x;
                var trans_y = AdjList.adjList[v].adj[j].data_y;
                if($(".g_trans[data-x='"+trans_x+"'][data-y='"+trans_y+"']").hasClass('activeTrans')){
                    //TODO avoid duplicate
                    
                    var node = parseInt(j.substr(1));

                    if(activatedStepT.indexOf(node)){
                        activatedStepT.push(node);
                    }
                    //unativate on state vector
                    stateVectorT[v] = 0;
                }
            }
        });

        //Detect grafcet evolution
        if(activatedStepT.length != 0){
            //Down
            $(".activeStep").toggleClass("activeStep");

            //Update
            AdjList.activatedStep = [];
            AdjList.activatedStep = activatedStepT;

            //UP
            $.each(AdjList.activatedStep, function(i, v){
                var t = selectCell(AdjList.adjList[v].data_x, AdjList.adjList[v].data_y).toggleClass("activeStep");
                stateVectorT[v] = 1;
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