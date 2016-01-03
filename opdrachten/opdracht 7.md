# CoderDojo Snake game - opdracht 7

In deze laatste opdracht ga je een score-teller toevoegen om de game helemaal af te maken.

## Score bijhouden

Om de score bij te houden hebben we weer een nieuwe variable nodig, laten we deze `score` noemen (dit is de laatste, ik beloof het):

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
        food,
        score;

De beginwaarde hiervan is uiteraard 0, dat zetten we in de `init`-functie:

    function init() {
        direction = "right";
        score = 0;
        create_snake();
        create_food();
        
        window.onEachFrame(run);
    }

En elke keer als we een blokje opeten, maken we de score 1 hoger:

	function update() {
        var position = get_new_position();
        
        if (check_wall_collision(position) || check_self_collision(position)) {
            init();
            return;
        }
        
        if (check_food_collision(position)) {
            score = score + 1;
            eat_food();
            create_food();
        } else {
            update_position(position);
        }
	}

## Score laten zien

Nu hoeven we alleen nog maar de score te laten zien. Hiervoor maken we een `draw_score`-functie (zet deze boven de `draw`-functie):

    function draw_score() {
        var score_text = "Score: " + score;
        context.fillStyle = "red";
        context.fillText(score_text, 5, height - 5);
    }

Als je het tot hier hebt kunnen volgen, dan snap je vast wel wat er hier gebeurt. We maken een tekst met daarin de huidige score en tekenen deze op het scherm met de `fillText`-functie. Kun je zonder te spieken inschatten waar op het scherm de tekst komt te staan?

Tot slot moeten we de `draw_score`-functie alleen nog aanroepen in de `draw`-functie:

    function draw() {
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);
		context.strokeStyle = "black";
		context.strokeRect(0, 0, width, height);

		draw_snake();
        draw_food();
        draw_score();
	}

En nu is je game helemaal af! Veel plezier!

## Helemaal af?

Is de game nu helemaal af? Nee, een game is namelijk nooit af. Je kan altijd nog dingen bij bedenken. Probeer bijvoorbeeld maar eens om de snake steeds sneller te laten gaan voor elke 10 blokjes die je op eet.