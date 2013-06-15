//canvas control class
//el:the element which will append a canvas
var CanvasControl = function(el){
	var $canvas = $("<canvas></canvas>");

	$canvas.attr("width", $(el).width());
	$canvas.attr("height", $(el).height());
	$canvas.css("cursor", "url('img/black-pen.ico'),auto");//to do 

	
};