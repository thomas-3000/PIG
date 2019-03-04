const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const FloydWarshall = require('./FloydWarshall');

var w = 529;
var h = 280;
const dim = 5;
var highlightline=1;
var n = 5;
var k=1;
var i=1;
var j=1;
var ijoffset=w/6.2;
var koffset=w/6.2;
var varoffset=325;
var doffset=68;
const pseudocodeSize = "22px";

const xMarkOffset = 20;
const xOffset = 40;
const yMarkOffset = 25;
const yDistance = 33;
const xDistance = 45;
const indent = 10;

function MatrixToList(matrix){
	var data = [];
	for (var i=0;i<dim;i++){
		data = data.concat(matrix[i])
	}
	return data;
}

function ducsToMatrix(ducs){
	var dataset = [["","","","",""],
						["","","","",""],
						["","","","",""],
						["","","","",""],
						["","","","",""]];

	for (var i=0;i<dim; i++){
		for (var j=0; j<dim; j++){
			if (ducs[i][j] > 900){
				dataset[i][j] = "∞";
			}else{
				dataset[i][j] = ducs[i][j].toString();
			}
		}
	}
	return dataset;
}

function updateMatrix(oldM,newM,i,j,k){
	var tempM = [["","","","",""],
						["","","","",""],
						["","","","",""],
						["","","","",""],
						["","","","",""]];
	// update alle Spalten bereits überstrichener Zeilen...
	for (var y=0;y<(i-1);y++){
		if (y==(k-1)){
			continue;
		}
		for (var x=0;x<dim; x++){
			if (x==(k-1)){
				continue;
			}
				tempM[y][x] = newM[y][x].toString();
		}
	}
	// ... und die Einträge der aktuellen Zeile, welche überstrichen sind
	for (var x=0;x<j;x++){
		if (x==(k-1)){
			continue;
		}
		//console.log(x+1,j,"newM",newM[i-1][x], "oldM",oldM[i-1][x]);
		tempM[i-1][x] = newM[i-1][x].toString();
	}
	for (var y=0;y<dim;y++){
		for (var x=0;x<dim;x++){
			if (tempM[y][x] == ""){tempM[y][x] = oldM[y][x]}
		}
	}
	return tempM;
}

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
const fw = new FloydWarshall(weights, numVertices);

class D3Pseudocode extends D3Component {
	initialize(node,props){
    const canvas = this.canvas = d3.select(node)
                                    .append("svg")
                                    .attr("width",w)
                                    .attr("height",h);

		var Ducs = fw.getAllMatrices()[0].matrix;
		// concatenate 2d array in one list
		var data = MatrixToList(ducsToMatrix(Ducs));
		//Gruppenvariable
		var PseudocodeGroup = this.PseudocodeGroup = canvas.append("g");
		var rectPos = [0,0];

		PseudocodeGroup.selectAll("rectangle.pseudocodeBox")
			.data(rectPos)
			.enter()
			.append("rect")
			.attr("class", "pseudocodeBox")
			.attr("width", w)
			.attr("height", h)
			.attr("rx",10)
			.attr("x",0)
			.attr("y",0)
			.attr("fill","blue");

		var marks = [];
		for (var i=1;i<=7;i++){
			marks = marks.concat("0"+i.toString());
		}
		PseudocodeGroup.selectAll("text.marks")
			.data(marks)
			.enter()
			.append("text")
			.text(function(d) {return d;})
			.attr("class","marks")
			.attr("x",xMarkOffset)
			.attr("y", function(d,i){
				return (yMarkOffset + i*yDistance+38)
			})
			.attr("fill","blue")
			.style("font-family","Futura")
			.style("font-size", "13px")
			.attr("font-weight","bold");
			//Highlightzeile

			//Zeilen Pseudocode
			// PseudocodeGroup.append("text")
			// 		 		.attr("x",xDistance)
			// 		        .attr("y",28)
			// 		        .attr("class", "textzeile")
			// 				.style("font-size", "pseudocodeSize")
			// 				.text("Floyd-Warshall(W)");

			// Kreis unter aktuellem Eintrag
			PseudocodeGroup.selectAll("circle")
									.data([0])
									.enter().append("circle")
									.attr("class","belowCurrent")
									.attr("cx",312)
									.attr("cy",225)
									.attr("r",12);

			PseudocodeGroup.append("foreignObject")
					        .attr("x",xDistance)
					        .attr("y",yMarkOffset-18)
									.attr("width",450)
									.attr("height",40)
            .append("xhtml:div")
						.style("font-size", pseudocodeSize)
						.attr("opacity",1)
							.html("<b> <font color=\"black\"> Floyd-Warshall-Algorithmus</font></b>");
							//.html("and this is <b> <font color=\"red\"> bold text</font></b> mit <sub>subscript</sub>");
								//<font color="red">dim = Anzahl Knoten</font>);

			PseudocodeGroup.append("foreignObject")
					        .attr("x",xDistance)
					        .attr("y",yMarkOffset + yDistance-18)
									.attr("width",450)
									.attr("height",30)
					        .attr("class", "textzeile")
									.append("xhtml:div")
							.style("font-size", pseudocodeSize)
							.html("D = initiale Matrix");

			PseudocodeGroup.append("foreignObject")
			            .attr("x",xDistance)
					        .attr("y",yMarkOffset + 2*yDistance-18)
									.attr("width",450)
									.attr("height",30)
					        .attr("class", "k")
									.append("xhtml:div")
							.style("font-size", pseudocodeSize)
							.html("<b><font color=\"green\">for</font></b> (Vergleich <b><font color=\"blue\">k</font></b> in 0 to N-1)&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp; <font color=\"red\">k = 0</font>");

			PseudocodeGroup.append("foreignObject")
					        .attr("x",xDistance+indent)
					        .attr("y",yMarkOffset + 3*yDistance-18)
									.attr("width",450)
									.attr("height",30)
					        .attr("class", "i")
									.append("xhtml:div")
							.style("font-size", pseudocodeSize)
							.html("<b><font color=\"green\">for</font></b> (Spalte <b> <font color=\"blue\">i</font></b> in 0 to N-1)&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp; <font color=\"red\">i = 1</font>");

			PseudocodeGroup.append("foreignObject")
					        .attr("x",xDistance+2*indent)
					        .attr("y",yMarkOffset + 4*yDistance-18)
									.attr("width",450)
									.attr("height",30)
					        .attr("class", "j")
									.append("xhtml:div")
							.style("font-size", pseudocodeSize)
							.html("<b><font color=\"green\">for</font></b> (Zeile <b> <font color=\"blue\">j</font></b> in 0 to N-1)&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp; <font color=\"red\">j = 1</font>");

			PseudocodeGroup.append("foreignObject")
					        .attr("x",xDistance+3*indent)
					        .attr("y", yMarkOffset + 5*yDistance-18)
									.attr("width",450)
									.attr("height",30)
					        .attr("class", "textzeile")
									.append("xhtml:div")
							.style("font-size", pseudocodeSize)
							.style("white-space", "pre")
							.html("neues D(<b><font color=\"blue\">i</font></b>,<b><font color=\"blue\">j</font></b>) = min( altes D(<b><font color=\"blue\">i</font></b>,<b><font color=\"blue\">j</font></b>) , D(<b><font color=\"blue\">i</font></b>,<b><font color=\"blue\">k</font></b>)+D(<b><font color=\"blue\">k</font></b>,<b><font color=\"blue\">j</font></b>) )");

			PseudocodeGroup.append("foreignObject")
					        .attr("x",xDistance+3*indent)
					        .attr("y", yMarkOffset + 6*yDistance-18)
									.attr("width",450)
									.attr("height",30)
					        .attr("class", "eintragsVergleich")
									.append("xhtml:div")
							.style("font-size", pseudocodeSize)
							.style("white-space", "pre")
							.html("neues D(<b><font color=\"blue\">i</font></b>,<b><font color=\"blue\">j</font></b>) = min(&emsp;&emsp; <font color=\"white\">0</font> &emsp;&emsp;,&nbsp;&nbsp;&nbsp; ∞ &nbsp;&nbsp;&nbsp;+ &nbsp;&nbsp;&nbsp;3 &nbsp;&nbsp;&nbsp;)");

			PseudocodeGroup.append("foreignObject")
					        .attr("x",xDistance+0*indent)
					        .attr("y", yMarkOffset + 7*yDistance-18)
									.attr("width",450)
									.attr("height",30)
					        .attr("class", "textzeile")
									.append("xhtml:div")
							.style("font-size", pseudocodeSize)
							.style("white-space", "pre")
							.html("return D");
							//.html("D(<b><font color=\"blue\">i</font></b>,<b><font color=\"blue\">k</font></b>)+D(<b><font color=\"blue\">k</font></b>,<b><font color=\"blue\">j</font></b>) )");
			// PseudocodeGroup.append("text")
			// 				.attr("x",doffset+140)
			// 				.attr("y",yMarkOffset + 5*yDistance)
			// 				.attr("class", "textzeile")
			// 				.style("font-size", "16px")
			// 				.style("white-space", "pre")
			// 				.text("+D    )");
			// PseudocodeGroup.append("text")
			// 				.attr("x",koffset-5)
			// 				.attr("y",212)
			// 				.attr("class", "textzeile")
			// 				.style("font-size", "9px")
			// 				.style("white-space", "pre")
			// 				.text("(k)                    (k-1)   (k-1)         (k-1)");
			// PseudocodeGroup.append("text")
			// 				.attr("x",ijoffset-2)
			// 				.attr("y",224)
			// 				.attr("class", "textzeile")
			// 				.style("font-size", "9px")
			// 				.style("white-space", "pre")
			// 				.text("i,j                      i,j        i,k            k,j");
			// PseudocodeGroup.append("text")
			// 		        .attr("x",30)
			// 		        .attr("y",yMarkOffset + 6*yDistance)
			// 		        .attr("class", "textzeile")
			// 				.style("font-size", "16px")
			// 				.text("return D");
			// PseudocodeGroup.append("text")
			// 				.attr("x",koffset+15)
			// 				.attr("y",245)
			// 				.attr("class", "textzeile")
			// 				.style("font-size", "9px")
			// 				.text("(n)");
			// //Variableneinblendungen
			// PseudocodeGroup.append("text")
			//             	.attr("x",varoffset)
			// 		        .attr("y",121)
			// 		        .attr("class", "vartext")
			// 				.style("font-size", "16px")
			// 				.style("fill","#FF1493")
			// 				.text("k=");
			// PseudocodeGroup.append("text")
			// 		        .attr("x",varoffset)
			// 		        .attr("y",154)
			// 		        .attr("class", "vartext")
			// 				.style("font-size", "16px")
			// 				.style("fill","#FF1493")
			// 				.text("i=");
			// PseudocodeGroup.append("text")
			// 		        .attr("x",varoffset)
			// 		        .attr("y",187)
			// 		        .attr("class", "vartext")
			// 				.style("font-size", "16px")
			// 				.style("fill","#FF1493")
			// 				.text("j=");
			// PseudocodeGroup.append("text")
			//             	.attr("x",varoffset+24)
			// 		        .attr("y",121)
			// 		        .attr("class", "vartext_k")
			// 				.style("font-size", "16px")
			// 				.style("fill","#FF1493")
			// 				.text(k);
			// PseudocodeGroup.append("text")
			// 		        .attr("x",varoffset+24)
			// 		        .attr("y",154)
			// 		        .attr("class", "vartext_i")
			// 				.style("font-size", "16px")
			// 				.style("fill","#FF1493")
			// 				.text(i);
			// PseudocodeGroup.append("text")
			// 		        .attr("x",varoffset+24)
			// 		        .attr("y",187)
			// 		        .attr("class", "vartext_j")
			// 				.style("font-size", "16px")
			// 				.style("fill","#FF1493")
			// 				.text(j);
			// PseudocodeGroup.append("text")
			// 				.attr("x",varoffset)
			// 				.attr("y",220)
			// 				.attr("class", "vartext")
			// 				.style("font-size", "16px")
			// 				.style("white-space", "pre")
			// 				.style("fill","#FF1493")
			// 				.text("D  =min(");
			// PseudocodeGroup.append("text")
			// 				.attr("x",varoffset+90)
			// 				.attr("y",220)
			// 				.attr("class", "vartext")
			// 				.style("font-size", "16px")
			// 				.style("white-space", "pre")
			// 				.style("fill","#FF1493")
			// 				.text(",");
			// PseudocodeGroup.append("text")
			// 				.attr("x",varoffset+114)
			// 				.attr("y",220)
			// 				.attr("class", "vartext")
			// 				.style("font-size", "16px")
			// 				.style("white-space", "pre")
			// 				.style("fill","#FF1493")
			// 				.text("+   )=");
			// PseudocodeGroup.append("text")
			// 				.attr("x",varoffset+12)
			// 				.attr("y",212)
			// 				.attr("class", "vartext")
			// 				.style("font-size", "9px")
			// 				.style("white-space", "pre")
			// 				.style("fill","#FF1493")
			// 				.text("( )");
			// PseudocodeGroup.append("text")
			// 				.attr("x",varoffset+14)
			// 				.attr("y",212)
			// 				.attr("class", "vartextmink")
			// 				.style("font-size", "9px")
			// 				.style("white-space", "pre")
			// 				.style("fill","#FF1493")
			// 				.text("k");
			// PseudocodeGroup.append("text")
			// 				.attr("x",varoffset+13)
			// 				.attr("y",224)
			// 				.attr("class", "vartext")
			// 				.style("font-size", "9px")
			// 				.style("white-space", "pre")
			// 				.style("fill","#FF1493")
			// 				.text(" , ");
			// PseudocodeGroup.append("text")
			// 				.attr("x",varoffset+12)
			// 				.attr("y",224)
			// 				.attr("class", "vartextmini")
			// 				.style("font-size", "9px")
			// 				.style("white-space", "pre")
			// 				.style("fill","#FF1493")
			// 				.text("i");
			// PseudocodeGroup.append("text")
			// 				.attr("x",varoffset+19)
			// 				.attr("y",224)
			// 				.attr("class", "vartextminj")
			// 				.style("font-size", "9px")
			// 				.style("white-space", "pre")
			// 				.style("fill","#FF1493")
			// 				.text("j");
			// PseudocodeGroup.append("text")
			// 				.attr("x",varoffset+82)
			// 				.attr("y",220)
			// 				.attr("class", "vartextmin1")
			// 				.style("font-size", "15px")
			// 				.style("text-anchor","middle")
			// 				.style("white-space", "pre")
			// 				.style("fill","#FF1493")
			// 				.text(" ");
			// PseudocodeGroup.append("text")
			// 				.attr("x",varoffset+105)
			// 				.attr("y",220)
			// 				.attr("class", "vartextmin2")
			// 				.style("font-size", "15px")
			// 				.style("text-anchor","middle")
			// 				.style("white-space", "pre")
			// 				.style("fill","#FF1493")
			// 				.text(" ");
			// PseudocodeGroup.append("text")
			// 				.attr("x",varoffset+135)
			// 				.attr("y",220)
			// 				.attr("class", "vartextmin3")
			// 				.style("font-size", "15px")
			// 				.style("text-anchor","middle")
			// 				.style("white-space", "pre")
			// 				.style("fill","#FF1493")
			// 				.text(" ");
			// PseudocodeGroup.append("text")
			// 				.attr("x",varoffset+171)
			// 				.attr("y",220)
			// 				.attr("class", "vartextmin4")
			// 				.style("font-size", "15px")
			// 				.style("text-anchor","middle")
			// 				.style("white-space", "pre")
			// 				.style("fill","#FF1493")
			// 				.text(" ");
	}

	update(props,oldProps) {
		var newPseudocode = props['newPseudocode'];
		var state = props['state'];
			var i = props['i'];
			var j = props['j'];
			var k = props['k'];
			var iWritten = i-1;
			var jWritten = j-1;
			var kWritten = k-1;
		if (state<0) {state=0;} if (state>7) {state=7;}
		if (k<1) {k=1;} if (k>5) {k=5;}
		if (i<1) {i=1;} if (i>5) {i=5;}
		if (j<1) {j=1;} if (j>5) {j=5;}

		highlightline=state;
		//	if (highlightline==0) {
		//		this.PseudocodeGroup.selectAll("rect.highlighter")
		//			.attr("y",7);	}
		//	else {
		//		this.PseudocodeGroup.selectAll("rect.highlighter")
		//			.attr("y",(highlightline*33)); }
		var oldMatrix = ducsToMatrix(fw.getAllMatrices()[k-1].matrix);
		var oldList = MatrixToList(oldMatrix);
		var currentEntry = oldList[(i-1)*5+j-1];
		var min1 = currentEntry;
		var min2 = oldList[(i-1)*5+k-1];
		var compareIK = min2
		var min3 = oldList[(k-1)*5+j-1];
		var compareKJ = min3
		//this.PseudocodeGroup.selectAll("text.vartextminl")
		//					.text(oldList);
		var min4;
		var temp;
		var changed=0;
		if (min2=="∞" || min3=="∞" ) {
			if (min1=="∞") {
				min4=min1;
			} else {
				min4=min1;
			}
		} else {
			if (min1*1 <= min2*1+min3*1) {
				min4=min1;
			} else {
				temp=min2*1+min3*1;
				min4=temp.toString();
				changed=1;
			}
		}

		this.PseudocodeGroup.selectAll("foreignObject.k")
					.style("font-size", pseudocodeSize)
					.html("<b><font color=\"green\">for</font></b> (Vergleich <b><font color=\"blue\">k</font></b> in 0 to N-1)&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp; <font color=\"red\">k = "+kWritten+"</font>")

		this.PseudocodeGroup.selectAll("foreignObject.i")
					.html("<b><font color=\"green\">for</font></b> (Spalte <b> <font color=\"blue\">i</font></b> in 0 to N-1)&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp; <font color=\"red\">i = "+iWritten+"</font>")
					.style("font-size", pseudocodeSize)

		this.PseudocodeGroup.selectAll("foreignObject.j")
					.html("<b><font color=\"green\">for</font></b> (Zeile <b> <font color=\"blue\">j</font></b> in 0 to N-1)&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp; <font color=\"red\">j = "+jWritten+"</fonts>")
					.style("font-size", pseudocodeSize)


		this.PseudocodeGroup.selectAll("foreignObject.eintragsVergleich")
					// .html("neues D(<b><font color=\"blue\">i</font></b>,<b><font color=\"blue\">j</font></b>) = min( "+currentEntry+" , "+compareIK+"+"+compareKJ+")")
					.html("neues D(<b><font color=\"blue\">i</font></b>,<b><font color=\"blue\">j</font></b>) = min(&emsp;&emsp; <font color=\"white\">"+currentEntry+"</font> &emsp;&emsp;,&nbsp;&nbsp;&nbsp; "+compareIK+" &nbsp;&nbsp;&nbsp;+ &nbsp;&nbsp;&nbsp;"+compareKJ+"&nbsp;&nbsp;&nbsp;)")
					.style("font-size", pseudocodeSize);

			console.log("HERE",currentEntry)


		this.PseudocodeGroup.selectAll("text.vartextmin1")
							.text(min1);
		this.PseudocodeGroup.selectAll("text.vartextmin2")
							.text(min2);
		this.PseudocodeGroup.selectAll("text.vartextmin3")
							.text(min3);
		//highlighten der veraenderung
		if (changed==1) {
			this.PseudocodeGroup.selectAll("text.vartextmin4")
								.attr("x",varoffset+180)
								.style("font-size","40px")
								.style("font-weight","bolder")
								.text(min4);
			this.PseudocodeGroup.selectAll("text.vartextmin4")
								.transition()
								.duration(800)
								.attr("x",varoffset+171)
								.style("font-size","15px")
								.style("font-weight","normal")
								.text(min4);
			changed=0;

		} else {
			this.PseudocodeGroup.selectAll("text.vartextmin4")
								.text(min4);
		}
		this.PseudocodeGroup.selectAll("text.vartextmink")
							.text(k);
		this.PseudocodeGroup.selectAll("text.vartextmini")
							.text(i);
		this.PseudocodeGroup.selectAll("text.vartextminj")
							.text(j);
		}
	}

module.exports = D3Pseudocode;
