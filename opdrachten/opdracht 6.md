# CoderDojo Snake game - opdracht 6

Tot nu toe hebben we ons alleen maar met de snake zelf bezig gehouden. Het wordt tijd om de snake ook een doel te geven in de vorm van wat heerlijk voedsel.

## Voedsel maken

Eerst moeten we voedsel maken voordat de snake het op kan eten. Stap één om dat voor elkaar te krijgen is, zoals zo vaak, een nieuwe `food`-variable maken:

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
        direction,
        food;

Verder gaat het maken van een `food` element hetzelfde als het maken van de snake. Eerst maken we een functie `create_food`, vervolgens maken we een functie `draw_food` en tot slot moeten we zorgen dat deze functies op de juiste plekken aangeroepen worden. Hier is de `create_food`-functie, zet deze onder `create_snake`:

    function create_food() {
        food = {
            x: Math.round(Math.random() * (width - cellwidth) / cellwidth),
            y: Math.round(Math.random() * (height - cellwidth) / cellwidth)
        };
    }
    
Dit ziet er erg ingewikkeld uit, maar het idee is heel simpel: We maken een object op een willekeurige positie ergens in het speelveld. Deze nieuwe functie roepen we vervolgens aan in de `init`-functie:

    function init() {
        direction = "right";
        create_snake();
        create_food();
        
        window.onEachFrame(run);
    }

Vervolgens maken we de `draw_food`-functie. Vervang de `draw_snake`-functie door de volgende code:

    function draw_cell(cell) {
        context.fillStyle = "blue";
        context.fillRect(cell.x * cellwidth, cell.y * cellwidth, cellwidth, cellwidth);
        context.strokeStyle = "white";
        context.strokeRect(cell.x * cellwidth, cell.y * cellwidth, cellwidth, cellwidth);
    }
    
	function draw_snake() {
        var i;
		for (i = 0; i < snake_array.length; i++) {
			draw_cell(snake_array[i]);
		}
	}
    
    function draw_food() {
        draw_cell(food);
    }

Zie je wat we hier hebben gedaan? In plaats van nogmaals in `draw_food` de `fillRect` en `strokeRect` functies aan te roepen hebben we een nieuwe functie `draw_cell` gemaakt die een enkel blokje tekent. In de `draw_snake`-functie roepen we deze functie nu aan voor elk element van snake en in `draw_food` roepen we dezelfde functie aan voor het `food`-element.

Als laatste moeten we niet vergeten de `draw_food`-functie aan te roepen in de `draw`-functie:

    function draw() {
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);
        context.strokeStyle = "black";
        context.strokeRect(0, 0, width, height);
        
        draw_snake();
        draw_food();
    }

## Voedsel eten

Om het voedsel op te eten moeten we drie dingen doen:

* We moeten controleren of we ons op de plek van een voedsel-blokje bevinden
* Als dat zo is, dan moet de snake een blokje langer worden
* En er moet een nieuw voedsel-blokje gemaakt worden

Laten we beginnen met controleren of we ons op de plek van een voedsel-blokje bevinden. Zet de volgende functie onder `check_self_collision`:

    function check_food_collision(position) {
        return position.x === food.x && position.y === food.y;
    }

Deze functie is vrij simpel, hij controleert of de x- en y-coordinaat van de parameter `position` overeen komt met de coordinaten van `food`.

Vervolgens passen we de `update`-functie aan:

	function update() {
        var position = get_new_position();
        
        if (check_wall_collision(position) || check_self_collision(position)) {
            init();
            return;
        }
        
        if (check_food_collision(position)) {
            eat_food();
            create_food();
        } else {
            update_position(position);
        }
	}

In plaats van simpelweg altijd `update_position` aan te roepen, doen we dat nu alleen als we niet op de plek van een voedsel-blokje zijn terecht gekomen. Als dat wel zo is, dan roepen we `eat_food` aan (die we nog moeten maken) om de snake langer te maken en daarna `create_food` (die we al hebben) om een nieuw voedsel-blokje te maken.

Nu hoeven we alleen nog maar `eat_food` te maken. Vervang de `update_position`-functie met de volgende code:

    function eat_food() {
        snake_array.unshift(food);
    }
    
    function update_position(position) {
        snake_array.pop();

		snake_array.unshift(position);
    }

We voegen simpelweg het `food`-element toe aan de voorkant van de `snake_array`. We hebben ook `update_position` aangepast door de `tail`-variable weg te gooien. Het bleek dat we die helemaal niet nodig hadden.

Probeer het spel nu maar eens te spelen. Elke keer als je over een voedsel-blokje gaat wordt de snake langer. Hoe lang houd jij het vol?

## Score bijhouden

In de laatste opdracht gaan we nog een ding toevoegen, namelijk een score. Elke keer als je een voedsel-blokje oppakt krijg je een punt. Op die manier hoef je niet alle blokjes van de snake te tellen om te weten hoe goed je bent en kun je makkelijker opscheppen tegen je vriendjes!