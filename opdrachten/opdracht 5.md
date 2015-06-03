# CoderDojo Snake game - opdracht 5

We kunnen nu de snake bewegen, maar hij vliegt nog wel het scherm uit als we niet oppassen. Ook kan de snake door zichzelf heen bewegen, wat niet de bedoeling is. Om dit te voorkomen moeten we een techniek toepassen die *collision detection* heet (vertaald: botsings-detectie)

## Botsing met de randen

We gaan eerst controleren of de snake de randen van het speelveld heeft geraakt. Om dat te doen gaan we de huidige inhoud van `update` splitsen in twee functies. Zet de volgende code boven de `update`-functie:

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
    
    function update_position(position) {
        var tail = snake_array.pop();
        
		tail.x = position.x;
        tail.y = position.y;

		snake_array.unshift(tail);
    }

We maken gebruik van de techniek die we in de vorige opdracht hebben geleerd om een *parameter* aan de `update_position`-functie mee te geven. Die `position` parameter krijgen we door de `get_new_position`-functie te laten eindigen met het woord `return`, gevolgd door een object met de juiste x- en y-coordinaat.

Nu hebben we nog een functie nodig die ons kan vertellen of de nieuwe positie een van de randen raakt. Zet deze code ook boven de `update`-functie:

	function check_wall_collision(position) {
        return position.x === -1
            || position.x === width / cellwidth
            || position.y === -1
            || position.y === height / cellwidth;
    }

Hier controleren we of er aan een van vier voorwaarden is voldaan. Als de x-positie -1 is OF als de x-positie gelijk is aan `width / cellwidth` OF als de y-positie -1 is OF als de y-positie gelijk is aan `height / cellwidth`. Dit zijn de voorwaarden die ons vertellen of we een van de randen geraakt hebben.\

Nu kunnen we de `update`-functie aanpassen:

	function update() {
        var position = get_new_position();
        
        if (check_wall_collision(position)) {
            init();
            return;
        }
        
        update_position(position);
	}

Eerst wordt de nieuwe positie bepaald met `get_new_position`. Vervolgens wordt gecontroleerd of we de rand hebben geraakt. Als dat zo is, dan herstarten we het spel (met `init();`). Als we de rand niet geraakt hebben, dan passen we de positie van de snake aan met `update_position`.

Probeer je nieuwe code uit en bekijk wat er gebeurt als je een van de randen raakt.

## Botsing met jezelf

Ook als de snake botst met zichzelf moet het spel opnieuw gestart worden. Hiervoor hebben we maar een extra functie nodig. Zet deze functie onder `check_wall_collision`:

    function check_self_collision(position) {
        var i;
        for (i = 0; i < snake_array.length; i++) {
            if (snake_array[i].x === position.x && snake_array[i].y === position.y) {
                return true;
            }
        }
        return false;
    }

Deze functie controleert elk element in de `snake_array` en kijkt of de *parameter* `position` dezelfde plek inneemt. Als dat zo is, dan botst de snake met zichzelf.

Nu moeten we weer de `update`-functie aanpassen:

	function update() {
        var position = get_new_position();
        
        if (check_wall_collision(position) || check_self_collision(position)) {
            init();
            return;
        }
        
        update_position(position);
	}

En nu kan de snake ook niet meer straffeloos met zichzelf botsen. Als je moeite hebt om dit te zien in de browser, pas dan de beginlengte van de snake aan in de `create_snake`-functie.

## Tijd voor wat voedsel...

We zijn nu wel lang genoeg met de snake bezig geweest. Het wordt tijd om voor voedsel te zorgen dat de slang kan opeten om groter te worden. Dat gaan we in de volgende opdracht doen.