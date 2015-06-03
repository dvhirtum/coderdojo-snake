# CoderDojo Snake game - opdracht 3

In deze opdracht ga je leren hoe je de snake kan laten bewegen. Dit wordt best wel een complexe en lange opdracht, dus probeer het te volgen en als je iets niet begrijpt, vraag het dan aan je begeleider.

## De positie van de snake aanpassen

Het eerste dat we gaan doen is een functie maken die de positie van de snake kan aanpassen, deze noemen we `update`. Voeg deze functie toe na de `draw`-functie:

	function update() {
		var nx = snake_array[0].x,
            tail = snake_array.pop();
        
		tail.x = nx + 1;

		snake_array.unshift(tail);
	}

Deze functie definieert twee variabelen, `nx` en `tail`. De eerste variable is de x-coordinaat van het eerste element in `snake_array` en de tweede variable is het laatste element uit `snake_array`. Belangrijk om te weten is dat de functie die we gebruiken om het laatste element te vinden, `pop`, niet alleen het element terug geeft, maar deze ook verwijderd uit de array.

Vervolgens wordt de x-coordinaat van het laatste element aangepast zodat het 1 hoger is dan de x-coordinaat van het eerste element. Tot slot wordt het laatste element teruggezet in `snake_array` met de `unshift`-functie. Wat deze functie doet is het element dat je meegeeft vooraan de array zetten en alle andere elementen een plek op te schuiven. Begrijp je al wat dit doet?

## De game loop

Nu wordt het tijd om de game loop te bouwen. Een game loop is een standaard concept in het maken van spelletjes. Dit zorgt er voor dat er telkens nieuwe plaatjes op het scherm getekend worden die je als speler kan beinvloeden met je toetsenbord en muis of met een game-controller.

Een game loop maak je door een functie te maken die heel vaak opnieuw wordt aangeroepen. In die functie die je normaal gesproken twee dingen: de positie van je objecten in het spel bijwerken en de spelwereld opnieuw tekenen. De functies om dit te doen hebben we al, namelijk `update` en `draw`. Wat we dus nog nodig hebben is een functie om telkens aan te roepen en een manier om die functie heel vaak aan te roepen.

Om dit voor elkaar te krijgen vervang je de volgende code:

	create_snake();
	draw();

met:

    function run() {
        update();
        draw();
    }
    
    function init() {
        create_snake();
        
        window.onEachFrame(run);
    }

	init();

`run` is de functie die we telkens opnieuw gaan uitvoeren. Deze doet simpelweg wat hierboven beschreven was, namelijk `update` en `draw` aanroepen. Met de `init`-functie kunnen we het spel starten. Deze maakt onze spelobjecten (alleen de snake op dit moment) en start de game loop (door de `run`-functie aan `window.onEachFrame` mee te geven). Tot slot roepen we `init();` aan om het spel te starten.

Kijk maar eens wat er nu gebeurt als je het script opslaat en de webpagina opent. Wow, dat ging snel, de snake vliegt over het scherm! Dat komt omdat de functie `window.onEachFrame` zo vaak mogelijk aangeroepen wordt (op moderne computers is dat ongeveer 60 keer per seconden). Dat is prima voor de `draw`-functie, want dat zorgt er voor dat de animaties mooi vloeiend verlopen, maar het is minder prima voor de `update`-functie omdat de snake nu veel te snel gaat om te kunnen controleren.

## De snelheid van `update` aanpassen

Om de snelheid waarmee `update` aangeroepen wordt aan te passen in de `run`-functie hebben we eerst wat nieuwe variabelen nodig. Deze zetten we bovenaan aan het script bij de rest van de variabelen, zodat deze er zo uit zien:

	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width,
		height = canvas.height,
		snake_array,
		cellwidth = 10,
        now,
        last = window.timestamp(),
        dt = 0,
        step = 0.05;

De nieuwe variabelen gaan we als volgt gebruiken:

* `now` - Deze variable zal elke keer dat `run` wordt aangeroepen bijgewerkt worden om de huidige tijd te bepalen
* `last` - Deze variable zal de tijd bewaren van de vorige keer dat `run` werd aangeroepen. We geven deze variable om te beginnen de huidige tijd met de `window.timestamp`-functie.
* `dt` - In deze variable gaan we het verschil tussen `now` en `last` in seconden bewaren
* `step` - Deze variable bepaalt hoe vaak de `update`-functie wordt uitgevoerd. De waarde die we er aan geven, `0.05`, betekent dat `update` elke `0.05` seconden wordt aangeroepen (20 keer per seconde, i.p.v. de 60 keer per seconde die het was)

Om deze nieuwe variabelen te gebruiken passen we de `run`-functie aan:

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

Zoals hierboven uitgelegd zorgt dit ervoor dat `update` maar 20 keer per seconde wordt aangeroepen, i.p.v. 60 keer. Het mooie is dat we de snelheid van de snake nu kunnen aanpassen door de waarde van de `step`-variable aan te passen. Maken we de waarde van `step` groter, dan gaat de snake langzamer. Maken we de waarde kleiner, dan gaat de snake sneller. Experimenteer maar eens met een paar verschillende waarden en kijk wat er gebeurt.

## `window.onEachFrame` en `window.timestamp`

In deze opdracht hebben we twee functies gebruikt, namelijk `window.onEachFrame` en `window.timestamp`. Je vraagt je misschien af waar deze functies vandaan komen? Deze komen uit de hulp-scripts `onrequestframe.js` en `timestamp.js` waar we het in opdracht 1 over hadden. Als je wilt, kan je de scripts bekijken om uit te vogelen hoe ze werken.

## Vervolg

We hebben nu een bewegende snake, maar hij vliegt nog wel heel snel het scherm uit zonder dat we daar iets aan kunnen doen. In de volgende opdracht gaan we er voor zorgen dat je de snake kan besturen.