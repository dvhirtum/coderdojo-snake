# CoderDojo Snake game - opdracht 1

In deze dojo ga je een snake game maken in de browser. We gebruiken daarvoor de programmeertaal JavaScript. Je hebt geen kennis van deze taal nodig om deze dojo te kunnen volgen, alles wordt uitgelegd.

De enige applicaties die je nodig hebt is een tekstverwerker om de code te schrijven en een webbrowser om het resultaat te bekijken.

## Beginsituatie

Je begint met drie bestanden:

* **index.html** - Dit is de webpagina waarin de game zal komen.
* **onrequestframe.js** - Dit is een hulp-script dat we later in de dojo gaan gebruiken. Wat dit bestand doet is geen onderdeel van de dojo.
* **snake.js** - In dit bestand ga je de game maken. Als je hier iets in wijzigt dan kun je het resultaat daarvan bekijken in de browser door index.html te openen.

## De achtergrond tekenen

Het eerste dat we gaan doen is het tekenen van de achtergrond. Voeg daarvoor de volgende code toe aan snake.js:

    (function () {
        var canvas = document.getElementById("canvas"),
			context = canvas.getContext("2d"),
			width = canvas.width,
			height = canvas.height;

        function draw() {
            context.fillStyle = "white";
            context.fillRect(0, 0, width, height);
            context.strokeStyle = "black";
            context.strokeRect(0, 0, width, height);
        }

        draw();
    }());
    
Sla de wijzigingen op en open index.html in een webbrowser. Je ziet nu een wit vlak met een zwarte lijn.

## Hoe werkt het script?

Om te beginnen zetten we alles tussen haakjes en maken we een functie.

    (function () {
        ...
    }());
    
Dit is een javascript truckje om te zorgen dat alles wat binnen de accolades ({ en }) staat alleen bekend is binnen de haakjes. Waarom dat handig is, is voor deze dojo niet belangrijk, maar als je dat wilt weten dan kun je het aan je begeleider vragen.

Hoe een functie precies werkt wordt zodadelijk uitgelegd als we daadwerkelijk gaan tekenen.

### Variabelen

Vervolgens maken we vier "variabelen":

    var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width,
		height = canvas.height;
    
Een variable is een naampje die we aan een bepaalde waarde kunnen geven, zodat we later naar die waarde kunnen verwijzen via de naam i.p.v. dat we telkens de waarde zelf op moeten zoeken.

De eerste variable, *canvas*, verwijst naar het `canvas`-element in index.html. Dit is een speciaal Html5 element waarmee je tekeningen kan maken op de webpagina. De tweede variable die we nodig hebben is *context*. Dit is een onderdeel van het canvas en dit object bevat de methodes waarmee we daadwerkelijk gaan tekenen. Vervolgens slaan we nog de breedte (*width*) en hoogte (*height*) van het canvas-object op, zodat we die later kunnen gebruiken.

### Een functie maken

Nu we alle nodige variablen hebben, gaan we een functie definieren met de naam *draw*. 

    function draw() {
        ...
    }

Een functie in javascript maak je door eerst het woord function te gebruiken, gevolgd door de naam die je aan de functie wilt geven en twee haakjes. Waar die haakjes voor dienen zul je later nog zien. Voor nu moet je onthouden dat je ze altijd nodig hebt. Tot slot zet je alles wat onderdeel moet zijn van de functie tussen accolades.

De volgende vier regels zijn dus onderdeel van de draw-functie:

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "black";
    context.strokeRect(0, 0, width, height);

Deze code tekent twee rechthoeken op het scherm, dankzij de functies *fillRect* (dit tekent een rechthoek van punt (0,0) met de breedte en hoogte van het canvas die we eerder opgeslagen hebben en vult het met de kleur die in de variable *fillStyle* is opgeslagen) en *strokeRect* (dit tekent een rechthoek met dezelfde afmetingen, maar in plaats van het te vullen met een kleur tekent het een rand met de kleur die in *strokeStyle* is opgeslagen). 

**Belangrijk**: Wat je als laatste tekent staat op het canvas bovenaan. Kijk maar eens wat er gebeurt als je de eerste twee en laatste twee regels omdraait.

Speel ook eens met de kleuren die je aan *fillStyle* en *strokeStyle* meegeeft (de meeste engelse namen voor kleuren zouden moeten werken) en met de afmetingen van de rechthoeken. Wat gebeurt er op het scherm als je de pagina herlaadt?

### De functie aanroepen

We hebben nu een functie gemaakt genaamd *draw*. Maar als we hier stoppen dan gebeurt er nog niks. Om de functie daadwerkelijk uit te voeren moet je hem namelijk aanroepen. Dat doen we in de laatste regel:

	draw();

Een functie aanroepen doe je door de naam van de functie te typen en daarna de haakjes te typen. De `;` aan het einde van de regel is simpelweg bedoeld om tegen javascript te zeggen dat je klaar bent met deze regel.

## BORING!

Ok, we hebben nu een wit vlak met een zwarte rand getekend. Dat was spannend, NOT!. In het volgende deel wordt het interessanter, dan gaan we de snake tekenen...
