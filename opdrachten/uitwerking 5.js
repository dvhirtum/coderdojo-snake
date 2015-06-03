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
    
    function get_new_position() {
		var nx = snake_array[0].x,
            ny = snake_array[0].y;
        
        if (direction === "right") {
            nx = nx + 1;
        } else if (direction === "left") {
            nx = nx - 1;
        } else if (direction === "up") {
            ny = ny - 1;
        } else if (direction === "down") {
            ny = ny + 1;
        }
        
        return {x: nx, y: ny};
    }
    
	function check_wall_collision(position) {
        return position.x === -1
            || position.x === width / cellwidth
            || position.y === -1
            || position.y === height / cellwidth;
    }
    
    function check_self_collision(position) {
        var i;
        for (i = 0; i < snake_array.length; i++) {
            if (snake_array[i].x === position.x && snake_array[i].y === position.y) {
                return true;
            }
        }
        return false;
    }
    
    function update_position(position) {
        var tail = snake_array.pop();
        
		tail.x = position.x;
        tail.y = position.y;

		snake_array.unshift(tail);
    }
        
	function update() {
        var position = get_new_position();
        
        if (check_wall_collision(position) || check_self_collision(position)) {
            init();
            return;
        }
        
        update_position(position);
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