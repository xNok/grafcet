(function($) {

  $.fn.createGrid = function() {
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

  $.fn.drawStepOnGrid = function(step) {
    $(this).children('div.content').text(step);
  }

  $.fn.loadGrid = function(adjList) {
    
    //add steps
    for (i in adjList.adjList) {
      var t = $(".g_step[data-x='"+ adjList.adjList[i].data_x +"'][data-y='"+ adjList.adjList[i].data_y +"']")
      t.append(svg_get("step"));
      t.attr('data-step',i);
      t.drawStepOnGrid(i);
    }

    step = parseInt(i)+1;

    //overide initSteps
    for (i in adjList.initialSteps) {
      $(".g_step[data-x='"+ adjList.adjList[adjList.initialSteps[i]].data_x +"'][data-y='"+ adjList.adjList[i].data_y +"']").append(svg_get("initStep"));;
    }
  }

}(jQuery));

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