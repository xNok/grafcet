(function($) {


    $.fn.createGrid = function() {

        console.log($('this'));


        for (var i = 0; i <= 19; i++) {
            for (var j = 0; j <= 9; j++) {
                var data_string = ' data-x="'+i+'" data-y="'+j+'" ';

                if( i % 2){ // steps cell
                   $(this).append('<div class="g_item g_trans"'+ data_string +'><div class="content"></div></div>');
                }else{ // transition cell
                   $(this).append('<div class="g_item g_step"'+ data_string +'><div class="content"></div></div>');
               }
           }
       }
    }

}(jQuery));