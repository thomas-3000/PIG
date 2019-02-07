const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const FloydWarshall = require('./FloydWarshall');

var w = 529;
var h = 264;
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
		//Rahmen, Background
			PseudocodeGroup.append("rect")
							.attr("class", "pscrahmen")
							.attr("x", 2)
							.attr("y", 2)
							.attr("width", w-4)
							.attr("height", h-4)
							.attr("fill", "white")
							.attr("stroke", "black")
							.attr("stroke-width", 3)
							.attr("stroke-opacity","0.9");
			//Highlightzeile
			//PseudocodeGroup.append("rect")
			//				.attr("class", "highlighter")
			//				.attr("x", 5)
			//				.attr("y", highlightline*33)
			//				.attr("width", 520)
			//				.attr("height", 27)
			//				.attr("fill", "lightblue")
			//Zeilennummern
			PseudocodeGroup.append("text")
							.attr("x",10)
							.attr("y",52)
							.attr("class", "zeilennummer.1")
							.style("font-size", "10px")
							.style("font-weight", "bolder").text("1");
			PseudocodeGroup.append("text")
							.attr("x",10)
							.attr("y",85)
							.attr("class", "zeilennummer.2")
							.style("font-size", "10px")
							.style("font-weight", "bolder")
							.text("2");
			PseudocodeGroup.append("text")
							.attr("x",10)
							.attr("y",118)
							.attr("class", "zeilennummer.3")
							.style("font-size", "10px")
							.style("font-weight", "bolder")
							.text("3");
			PseudocodeGroup.append("text")
							.attr("x",10)
							.attr("y",151)
							.attr("class", "zeilennummer.4")
							.style("font-size", "10px")
							.style("font-weight", "bolder")
							.text("4");
			PseudocodeGroup.append("text")
							.attr("x",10)
							.attr("y",184)
							.attr("class", "zeilennummer.5")
							.style("font-size", "10px")
							.style("font-weight", "bolder")
							.text("5");
			PseudocodeGroup.append("text")
							.attr("x",10)
							.attr("y",217)
							.attr("class", "zeilennummer.6")
							.style("font-size", "10px")
							.style("font-weight", "bolder")
							.text("6");
			PseudocodeGroup.append("text")
							.attr("x",10)
							.attr("y",250)
							.attr("class", "zeilennummer.7")
							.style("font-size", "10px")
							.style("font-weight", "bolder")
							.text("7");
			//Zeilen Pseudocode
			PseudocodeGroup.append("text")
					 		.attr("x",30)
					        .attr("y",28)
					        .attr("class", "textzeile")
							.style("font-size", "16px")
							.text("Floyd-Warshall(W)");
			PseudocodeGroup.append("text")
					        .attr("x",30)
					        .attr("y",55)
					        .attr("class", "textzeile")
							.style("font-size", "16px")
							.text("n=W.rows");
			PseudocodeGroup.append("text")
					        .attr("x",30)
					        .attr("y",88)
					        .attr("class", "textzeile")
							.style("font-size", "16px")
							.style("white-space", "pre")
							.text("D   =W");
			PseudocodeGroup.append("text")
							.attr("x",45)
					        .attr("y",80)
					        .attr("class", "textzeile")
							.style("font-size", "9px")
							.text("(0)");
			PseudocodeGroup.append("text")
			            	.attr("x",40)
					        .attr("y",121)
					        .attr("class", "textzeile")
							.style("font-size", "16px")
							.text("for k=1 to n");
			PseudocodeGroup.append("text")
					        .attr("x",50)
					        .attr("y",154)
					        .attr("class", "textzeile")
							.style("font-size", "16px")
							.text("for i=1 to n");
			PseudocodeGroup.append("text")
					        .attr("x",60)
					        .attr("y",187)
					        .attr("class", "textzeile")
							.style("font-size", "16px")
							.text("for j=1 to n");
			PseudocodeGroup.append("text")
					        .attr("x",doffset)
					        .attr("y",220)
					        .attr("class", "textzeile")
							.style("font-size", "16px")
							.style("white-space", "pre")
							.text("D  =min(D   ,D");
			PseudocodeGroup.append("text")
							.attr("x",doffset+140)
							.attr("y",220)
							.attr("class", "textzeile")
							.style("font-size", "16px")
							.style("white-space", "pre")
							.text("+D    )");
			PseudocodeGroup.append("text")
							.attr("x",koffset-5)
							.attr("y",212)
							.attr("class", "textzeile")
							.style("font-size", "9px")
							.style("white-space", "pre")
							.text("(k)                    (k-1)   (k-1)         (k-1)");
			PseudocodeGroup.append("text")
							.attr("x",ijoffset-2)
							.attr("y",224)
							.attr("class", "textzeile")
							.style("font-size", "9px")
							.style("white-space", "pre")
							.text("i,j                      i,j        i,k            k,j");
			PseudocodeGroup.append("text")
					        .attr("x",30)
					        .attr("y",253)
					        .attr("class", "textzeile")
							.style("font-size", "16px")
							.text("return D");
			PseudocodeGroup.append("text")
							.attr("x",koffset+15)
							.attr("y",245)
							.attr("class", "textzeile")
							.style("font-size", "9px")
							.text("(n)");
			//Variableneinblendungen
			PseudocodeGroup.append("text")
			            	.attr("x",varoffset)
					        .attr("y",121)
					        .attr("class", "vartext")
							.style("font-size", "16px")
							.style("fill","#FF1493")
							.text("k=");
			PseudocodeGroup.append("text")
					        .attr("x",varoffset)
					        .attr("y",154)
					        .attr("class", "vartext")
							.style("font-size", "16px")
							.style("fill","#FF1493")
							.text("i=");
			PseudocodeGroup.append("text")
					        .attr("x",varoffset)
					        .attr("y",187)
					        .attr("class", "vartext")
							.style("font-size", "16px")
							.style("fill","#FF1493")
							.text("j=");
			PseudocodeGroup.append("text")
			            	.attr("x",varoffset+24)
					        .attr("y",121)
					        .attr("class", "vartext_k")
							.style("font-size", "16px")
							.style("fill","#FF1493")
							.text(k);
			PseudocodeGroup.append("text")
					        .attr("x",varoffset+24)
					        .attr("y",154)
					        .attr("class", "vartext_i")
							.style("font-size", "16px")
							.style("fill","#FF1493")
							.text(i);
			PseudocodeGroup.append("text")
					        .attr("x",varoffset+24)
					        .attr("y",187)
					        .attr("class", "vartext_j")
							.style("font-size", "16px")
							.style("fill","#FF1493")
							.text(j);
			PseudocodeGroup.append("text")
							.attr("x",varoffset)
							.attr("y",220)
							.attr("class", "vartext")
							.style("font-size", "16px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("D  =min(");
			PseudocodeGroup.append("text")
							.attr("x",varoffset+90)
							.attr("y",220)
							.attr("class", "vartext")
							.style("font-size", "16px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text(",");
			PseudocodeGroup.append("text")
							.attr("x",varoffset+114)
							.attr("y",220)
							.attr("class", "vartext")
							.style("font-size", "16px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("+   )=");
			PseudocodeGroup.append("text")
							.attr("x",varoffset+12)
							.attr("y",212)
							.attr("class", "vartext")
							.style("font-size", "9px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("( )");
			PseudocodeGroup.append("text")
							.attr("x",varoffset+14)
							.attr("y",212)
							.attr("class", "vartextmink")
							.style("font-size", "9px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("k");
			PseudocodeGroup.append("text")
							.attr("x",varoffset+13)
							.attr("y",224)
							.attr("class", "vartext")
							.style("font-size", "9px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text(" , ");
			PseudocodeGroup.append("text")
							.attr("x",varoffset+12)
							.attr("y",224)
							.attr("class", "vartextmini")
							.style("font-size", "9px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("i");
			PseudocodeGroup.append("text")
							.attr("x",varoffset+19)
							.attr("y",224)
							.attr("class", "vartextminj")
							.style("font-size", "9px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("j");
			PseudocodeGroup.append("text")
							.attr("x",varoffset+82)
							.attr("y",220)
							.attr("class", "vartextmin1")
							.style("font-size", "15px")
							.style("text-anchor","middle")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text(" ");
			PseudocodeGroup.append("text")
							.attr("x",varoffset+105)
							.attr("y",220)
							.attr("class", "vartextmin2")
							.style("font-size", "15px")
							.style("text-anchor","middle")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text(" ");
			PseudocodeGroup.append("text")
							.attr("x",varoffset+135)
							.attr("y",220)
							.attr("class", "vartextmin3")
							.style("font-size", "15px")
							.style("text-anchor","middle")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text(" ");
			PseudocodeGroup.append("text")
							.attr("x",varoffset+171)
							.attr("y",220)
							.attr("class", "vartextmin4")
							.style("font-size", "15px")
							.style("text-anchor","middle")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text(" ");
	}

	update(props,oldProps) {
		var newPseudocode = props['newPseudocode'];
		var state = props['state'];
			i = props['i'];
			j = props['j'];
			k = props['k'];
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
		var min1 = oldList[(i-1)*5+j-1];
		var min2 = oldList[(i-1)*5+k-1];
		var min3 = oldList[(k-1)*5+j-1];
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

		this.PseudocodeGroup.selectAll("text.vartext_i")
							.text(i);
		this.PseudocodeGroup.selectAll("text.vartext_j")
							.text(j);
		this.PseudocodeGroup.selectAll("text.vartext_k")
							.text(k);
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
