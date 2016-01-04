# CoderDojo Snake game - opdracht 2

In dit deel gaan we snake tekenen. Hij zal nog niet bewegen, dat gaan we doen in een volgende opdracht, maar in ieder geval hoeven we niet meer alleen naar het saaie witte scherm te staren.

## Nieuwe variabelen

Om bij te kunnen houden waar de snake is en hoe groot hij is hebben we twee nieuwe variabelen nodig. Voeg deze toe aan de lijst van variabelen aan het begin van `snake.js`:

```js
var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	width = canvas.width,
	height = canvas.height,
	snake_array,
	cellwidth = 10;
```

De eerste variable, `snake_array`, zal alle delen (we gaan de snake in blokjes tekenen) bewaren en de tweede variable, `cellwidth`, bepaalt hoe groot elk blokje van de snake zal zijn. Zie je dat we bij de variable `snake_array` geen waarde hebben ingevuld? Het is niet verplicht om bij het maken van een variable deze ook meteen een waarde te geven.

## De snake maken

De volgende stap is om de nieuwe variabelen te gebruiken om een snake te maken waarmee je het spel begint. Dit doen we weer in een functie zodat we die aan kunnen roepen wanneer we dat willen:

```js
function create_snake() {
	var length = 5, i;
	snake_array = [];
	for (i = length - 1; i >= 0; i--) {
		snake_array.push({x: i, y: 0});
	}
}
```

We noemen de functie `create_snake`. Het eerste dat we doen is twee variabelen declareren; `length` en `i`. Omdat we deze variabelen declareren binnen de functie `create_snake` zijn ze ook alleen maar binnen die functie beschikbaar. De variable `length` krijgt de waarde `5`. Dit is de beginlengte van de snake.

Ten tweede geven we de variable `snake_array` (die wel buiten de functie beschikbaar is) een waarde `[]`. Dit is een array, ofwel een lijstje van waarden. Arrays zijn heel handig, omdat je er van alles in kan stoppen.

Tot slot maken we een *for-loop* die vijf elementen aan `snake_array` toevoegd. Een *for-loop* is een stukje code die een aantal keer achter elkaar uitgevoerd wordt, zolang een bepaalde voorwaarde waar is (in dit geval `i >= 0`). Je geeft een beginwaarde op voor i (`i = length - 1`, dus i = 4) en na elke keer dat de code is uitgevoerd verander je de waarde van i (`i--`, dit betekent: maak `i` 1 kleiner).

De regel `snake_array.push({x: i, y: 0});` voegt een object met een x-coordinaat en een y-coordinaat toe aan `snake_array`. Dit stelt de positie voor van elk deel van de snake. Omdat we `i` gebruiken voor de x-coordinaat en omdat die elke keer verandert krijgen we vijf verschillende posities. Na het uitvoeren van deze code ziet `snake_array` er zo uit (dit hoef je niet in `snake.js` te zetten):

```js
snake_array = [
	{x: 4, y: 0},
	{x: 3, y: 0},
	{x: 2, y: 0},
	{x: 1, y: 0},
	{x: 0, y: 0}
];
```

Zoals je in de vorige opdracht hebt geleerd is er nu nog niks gebeurd, omdat we de functie `create_snake` nog nergens aanroepen. Zet daarom onderaan het script (boven `draw();`) de aanroep:

	create_snake();
	draw();

## De snake tekenen

Als je de webpagina nu laadt, dan zie je nog steeds alleen het witte vlak met de zwarte rand. Toch is de snake nu gemaakt en opgeslagen in `snake_array`. Alleen moeten we, om dat te kunnen zien, de snake wel nog tekenen.

Daarvoor maken we een nieuwe functie, `draw_snake`. Zet de onderstaande code boven de `draw`-functie:

```js
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
```

Deze functie gebruikt weer een *for-loop* om elk element van de snake te tekenen. Elk element wordt getekend als een blauw blok met een witte rand, d.m.v. de `fillRect` en `strokeRect` functies die je al eerder hebt gezien. De positie en grootte van het blok wordt bepaald door de x- en y-coordinaten die we in `snake_array` hebben opgeslagen en de `cellwidth` variable die we eerder hebben gemaakt.

Binnen de *for-loop* zie je ook hoe je een enkel element uit een array kan halen. De regel `cell = snake_array[i];` doet dit. Als `i` de waarde 0 heeft, dan wordt het eerste element opgehaald, is `i = 1`, dan wordt het tweede element opgehaald, enz.

Nu moeten we deze nieuwe functie alleen nog ergens aanroepen. Dat doen we in dit geval in de `draw`-functie:

```js
function draw() {
	context.fillStyle = "white";
	context.fillRect(0, 0, width, height);
	context.strokeStyle = "black";
	context.strokeRect(0, 0, width, height);

	draw_snake();
}
```

Weet je nog dat wat je als laatste tekent bovenaan staat? Daarom moeten we `draw_snake` aanroepen nadat we de achtergrond tekenen, anders zou de achtergrond boven de snake staan en zien we nog niets.

Als je nu het script opslaat en de webpagina laadt, dan zie je links bovenaan de snake. Is dat de positie die je had verwacht? Speel eens met de x- en y-waarden in `create_snake` en kijk wat er gebeurt met de snake op het scherm.

## Beweging toevoegen

Nu we een snake op het scherm hebben wordt het tijd om deze te laten bewegen. Dat is wat je in de volgende opdracht gaat doen.
