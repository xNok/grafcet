var step=0;

/**
 * 0 - step require
 * 1 - transition required
 */
var prog_step=0;

$(document).ready(function(){

    //element selection
    var active_item = $('.item').first();

    $(document).on('click', '.item', function(e) {
        console.log(active_item);
        active_item.toggleClass("active_item");
        $(this).toggleClass("active_item");
        active_item = $(this);
    })

    $(document).on('click', '.g_item', function(e) {
        var t = $(this);

        //type d'élément
        if(active_item.hasClass('step')){
            //list of edge
            if (prog_step === 0) {
                t.children('div.content').text(active_item.text()+step);
                $("#edges table tr:last td:eq(0)").text(step);
                prog_step = 1;
            }else if(prog_step === 1){
                t.children('div.content').text(active_item.text()+step);
                $("#edges table tr:last td:eq(1)").text(step);
                prog_step = 2;
            }else{
                alert("connexion required");
            }
            //preparation next step
            step++;
        }

        if(active_item.hasClass('connection') && prog_step === 2){
            t.children('div.content').text(active_item.text());
            $("#edges table tr:last td:eq(2)").text(active_item.text());
            prog_step = 0;
        }
        
    })

    //création de la grille
    for (var i = 0; i <= 9; i++) {
        for (var j = 0; j <= 9; j++) {
            $("#grafcet-schema").append('<div class="g_item"><div class="content"></div></div>');
        }
    }
});