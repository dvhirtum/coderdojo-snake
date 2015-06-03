(function () {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width,
		height = canvas.height,
		snake_array,
		cellwidth = 10,
        now,
        dt = 0,
        last = window.timestamp(),
        step = 0.05,
        direction;
    
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
    
	function update() {
		var nx = snake_array[0].x,
            ny = snake_array[0].y,
            tail = snake_array.pop();
        
        if (direction === "right") {
            nx = nx + 1;
        } else if (direction === "left") {
            nx = nx - 1;
        } else if (direction === "up") {
            ny = ny - 1;
        } else if (direction === "down") {
            ny = ny + 1;
        }
        
		tail.x = nx;
        tail.y = ny;

		snake_array.unshift(tail);
	}

    function run() {
        now = window.timestamp();
        dt = dt + Math.min(1, (now - last) / 1000);
        
        while (dt > step) {
            dt = dt - step;
            update();
        }
        
        last = now;
        
        draw();
    }
    
    function init() {
        direction = "right";
        create_snake();
        
        window.onEachFrame(run);
    }
    
    document.onkeydown = function (e) {
        var key = e.which;
        
        if (key === 37 && direction !== "right") {
            direction = "left";
        } else if (key === 38 && direction !== "down") {
            direction = "up";
        } else if (key === 39 && direction !== "left") {
            direction = "right";
        } else if (key === 40 && direction !== "up") {
            direction = "down";
        }
    };

	init();
}());