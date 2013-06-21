//canvas control class
//el:the element which will append a canvas
var CanvasControl = function(el) {
	this.$canvas = $("<canvas></canvas>");

	this.$canvas.attr("width", $(el).width());
	this.$canvas.attr("height", $(el).height());
	this.$canvas.css("cursor", "url('img/black-pen.ico'),auto"); //to do 

	this.context = this.$canvas[0];
	this.cxt = this.context.getContext("2d");

	//线条  
	this.cxt.lineWidth = 5;
	//路径结合点  
	this.cxt.lineJoin = 'round';
	//线条颜色  
	this.cxt.strokeStyle = 'black';

	var startPoint = {};
	var endPoint = {};
	var drawHis = [];
	var self = this;

	var draw = function(e) {
		endPoint.X = e.offsetX;
		endPoint.Y = e.offsetY;

		self.cxt.beginPath();
		self.cxt.moveTo(startPoint.X, startPoint.Y);
		self.cxt.lineTo(endPoint.X, endPoint.Y);
		self.cxt.closePath();
		self.cxt.stroke();

		startPoint.X = e.offsetX;
		startPoint.Y = e.offsetY;
	};

	this.$canvas.mousedown(function(e) {
		var value = e.button;
		if (value != 2 && value != 3) {
			startPoint.X = e.offsetX;
			startPoint.Y = e.offsetY;

			$(document).bind("mousemove", function(e) {
				draw(e);
			});

			$(this).bind("mouseenter", function(e) {
				$(document).bind("mousemove", function(e) {
					draw(e);
				});
			});

		}
	});

	this.$canvas.mouseout(function(e) {
		$(document).unbind("mousemove");
	});

	$(document).mouseup(function(e) {
		var value = e.button;
		if (value != 2 && value != 3) {
			$(document).unbind("mousemove");
			self.$canvas.unbind("mouseenter");
			drawHis.push(this.context.toDataURL());
		}
	});

	$(el).append(this.$canvas);


	var initToolBar = function() {
		initLineWidthControl();
		
		initStrokeStyleControl();
		

		$("#eraser-control").append("<span class=\"eraser-element\">10</span>");
		$("#eraser-control").append("<span class=\"eraser-element\">30</span>");

		$("#reset-control").append("<span class=\"reset-element\" style=\"\">reset</span>");

		$("#strokeStyle-control span").each(function() {
			$(this).css('backgroundColor', $(this).html());
		});
		$("#strokeStyle-control span").last().ColorPicker({
			onChange: function(hsb, hex, rgb, el) {
				$("#strokeStyle-control span").last().css('backgroundColor', '#' + hex);
				$("#strokeStyle-control span").last().html("#" + hex);
			},
			onSubmit: function(hsb, hex, rgb, el) {
				$(el).html("#" + hex);
				$(el).ColorPickerHide();
			},
			onHide: function(colpkr) {
				cxt.strokeStyle = $("#strokeStyle-control span").last().html();
				$(colpkr).fadeOut(500);
				return false;
			}
		});

		$(".eraser-element").click(function() {
			cxt.strokeStyle = "white";
			cxt.lineWidth = $(this).html();
		});

		$(".reset-element").click(function() {
			cxt.clearRect(0, 0, $canvas.width(), $canvas.height());
		});
	};

	var initLineWidthControl = function(){
		this.$lineWidthControl = $("<div></div>");
		this.$lineWidthControl.append("<span class=\"lineWidth-element\">5</span>");
		this.$lineWidthControl.append("<span class=\"lineWidth-element\">10</span>");
		this.$lineWidthControl.append("<span class=\"lineWidth-element\">30</span>");

		this.$lineWidthControl.children(".lineWidth-element").click(function() {
			self.lineWidth = $(this).html();
		});
	};

	var initStrokeStyleControl = function() {
		this.$strokeStyleControl = $("<div></div>");
		this.$strokeStyleControl.append("<span class=\"strokeStyle-element\">black</span>");
		this.$strokeStyleControl.append("<span class=\"strokeStyle-element\">red</span>");
		this.$strokeStyleControl.append("<span class=\"strokeStyle-element\">orange</span>");
		this.$strokeStyleControl.append("<span class=\"strokeStyle-element\">yellow</span>");
		this.$strokeStyleControl.append("<span class=\"strokeStyle-element\">green</span>");
		this.$strokeStyleControl.append("<span class=\"strokeStyle-element\">cyan</span>");
		this.$strokeStyleControl.append("<span class=\"strokeStyle-element\">blue</span>");
		this.$strokeStyleControl.append("<span class=\"strokeStyle-element\">purple</span>");
		this.$strokeStyleControl.append("<span class=\"strokeStyle-element\">free</span>");

		this.$lineWidthControl.children("..strokeStyle-element").click(function() {
			self.strokeStyle = $(this).html();
		});
	};

	initToolBar();
};