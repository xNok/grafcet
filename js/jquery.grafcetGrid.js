(function($) {

  /*
   * Draw a grid -> alternate square row (step) and rectangle raw (transition)
   */
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

  /*
   * draw corresponding svg into the grid
   */
  $.fn.drawStepOnGrid = function(step) {
    $(this).children('div.content').text(step);
  }

  /*
   * draw the grafcet on the grid
   */
  $.fn.loadGrid = function(adjList) {
    //add steps
    for (i in adjList.adjList) {
      selectCell(adjList.getX(i), adjList.getY(i))
      .append(svg_get("step"))
      .attr('data-step',i)
      .drawStepOnGrid(i);

      //draw transition
      for(j in adjList.adjList[i].adj){
        var trans_x = adjList.adjList[i].adj[j].data_x;
        var trans_y = adjList.adjList[i].adj[j].data_y;
        $(".g_trans[data-x='"+trans_x+"'][data-y='"+trans_y+"']")
        .append(svg_get("join"))
        .drawStepOnGrid(adjList.adjList[i].adj[j].connection);
      }
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

function selectCell(data_x, data_y){
  return $(".g_step[data-x='"+ data_x +"'][data-y='"+ data_y +"']");
}