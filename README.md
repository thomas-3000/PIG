# PIG

##TODO
- ich würde gern auf die kritik eingehen und das linking zwischen den Visualisierungen verbessern. Vor allem den aktuellen Matrixeintrag im pseudocode und der matrix gleich gestalten. 

##Pseudcode geändert
habe den Pseudocode auch nochmal leicht verändert. Gehe ich dann recht in der Annahme dass du die Anzeige der Minimumsermittlung parallel zum Durchklicken der Matrix lieber weglassen willst? weil es zu unüberischtlich und nicht hübsch genug ist? (zuviel Detail und clutter?
	Ne, hab ich nur nicht wieder eingebaut. sollten wir haben.


## Alle Vis sind jetzt drin
Ducs Netzwerk heißt jetzt Network2 und der modifizierte FW, den nur Ducs Netzwerk verwendet heißt FloydWarschall2

## Klassen aufrufen in d3 klassen
Es ist möglich Ducs Klassen aufzurufen. Nach 3 Tagen intensiver Recherche habe ich
herausgefunden, dass mein Aufruf falsch war und der nicht richtig abgefangen wurde (!).
Bei mir sieht das jetzt so aus:

const FloydWarshall = require('./FloydWarshall');
class D3Matrix extends D3Component {
	initialize(node,props){
			var weights = [
				[0, 1, 3],
				[0, 4, -4],
				[0, 2, 8],
				[1, 4, 7],
				[1, 3, 1],
				[2, 1, 4],
				[3, 2, -5],
				[3, 0, 2],
				[4, 3, 6]
			];
			var numVertices = 5;
			var fw = new FloydWarshall(weights, numVertices);

Dabei liegt die Datei FloydWarshall.js im gleichen Ordner wie meine aufrufende Datei.


Thomas:
Danke. Ich versuch das heute abend auch noch einzubauen. Bis morgen.
