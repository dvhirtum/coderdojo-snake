# CoderDojo Snake game - opdracht 4

In deze opdracht ga je leren hoe je de snake kan besturen met de pijltjestoetsen.

## Richting bepalen

Om te beginnen hebben we een manier nodig om te bepalen in welke richting de snake beweegt. Daarvoor voegen we een nieuwe variable, `direction`, toe aan de lijst met variabelen aan het begin van het script:

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

Deze variable geven we in de `init`-functie de beginwaarde *right*:

    function init() {
        direction = "right";
        create_snake();
        
        window.onEachFrame(run);
    }

Dit zorgt er voor dat de snake naar rechts zal bewegen als het spel begint.

## Van richting veranderen

Vervolgens moeten we de `update`-functie aanpassen om de richting van de snake te veranderen op basis van de waarde van `direction`:

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

Naast de x-positie van het eerste element, `nx`, bewaren we nu ook de y-positie in de variable `ny`. Daarna kijken we wat de waarde van `direction` is. Is dit *right* of *left*, dan passen we `nx` aan. Is het *up* of *down*, dan passen we `ny` aan. Tot slot geven we deze x- en y-positie door aan `tail` en voegen deze weer toe aan `snake_array`.

## Toetsenbord input

Tot slot willen we de waarde van de variable `direction` kunnen aanpassen met het toetsenbord. Daarvoor moeten we een functie maken die wordt aangeroepen als de gebruiker een toets indrukt. Voeg de volgende code toe, onder de `init`-functie, maar boven de `init();` aanroep:

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

Het indrukken van een toets wordt een *event* genoemd. Er zijn allerlei soorten events, niet alleen voor het indrukken van toetsen, maar ook voor het laden van de pagina, het bewegen van de muis en het klikken op links of buttons in de webpagina. Om iets zinnigs te doen met zo'n event moet je een functie maken en die koppelen aan dat event. Dat doen we door de functie aan `document.onkeydown` te geven.

De functie heeft geen naam. Dat hoeft ook niet omdat we de functie niet zelf willen aanroepen, maar alleen als het `keydown`-event plaats vindt. Wel heeft de functie een variable `e` tussen de haakjes staan. Dit noemen we een *parameter*. Op deze manier kan de aanroeper van de functie een waarde meegeven die we vervolgens in de functie kunnen gebruiken. In dit geval zorgt Javascript er voor dat de waarde `e` gevuld wordt met informatie over het event. Zo kunnen we met `e.which` achterhalen welke toets ingedrukt is.

Vervolgens bepalen we wat de nieuwe waarde van `direction` moet worden. We zijn geinteresseerd in vier waardes van `e.which`:

* 37 - Dit is de *pijltje naar links* toets
* 38 - Dit is de *pijltje omhoog* toets
* 39 - Dit is de *pijltje naar rechts* toets
* 40 - Dits is de *pijltje omlaag* toets

Voordat we de `direction` aanpassen controleren we ook nog of we niet op dit moment in de tegenovergestelde richting gaan. Het is namelijk niet toegestaan om direct om te draaien. Dus `if (key === 37 && direction !== "right")` betekend: Als we *pijltje naar links* hebben ingetoest EN we gaan niet naar rechts. Als beide waar zijn, dan wordt `direction` verandert in de waarde *left*.

Als je nu de webpagina laad, dan kan je de snake besturen met de pijltjes-toetsen.

## Botsingen!

De volgende stap is om te voorkomen dat de snake uit het speelveld kan raken, of door zichzelf heen kan gaan. Dat gaan we oplossen in de volgende opdracht.