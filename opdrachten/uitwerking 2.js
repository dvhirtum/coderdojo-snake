(function () {
    var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width,
		height = canvas.height,
		snake_array,
		cellwidth = 10;
    
    function create_snake() {
		var length = 5, i;
		snake_array = [];
		for (i = length - 1; i >= 0; i--) {
			snake_array.push({x: i, y: 0});
		}
	}
    
	function draw_snake() {
        var cell, i;
		for (i = 0; i < snake_array.length; i++) {
			cell = snake_array[i];
			context.fillStyle = "blue";
			context.fillRect(cell.x * cellwidth, cell.y * cellwidth, cellwidth, cellwidth);
			context.strokeStyle = "white";
			context.strokeRect(cell.x * cellwidth, cell.y * cellwidth, cellwidth, cellwidth);
		}
	}

    function draw() {
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);
        context.strokeStyle = "black";
        context.strokeRect(0, 0, width, height);
        
        draw_snake();
    }

    create_snake();
    draw();
}());