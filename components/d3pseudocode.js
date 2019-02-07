const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 6000;
var w = 529;
var h = 264;
const dim = 5;
var highlightline=1;
var n = 5;
var k=1;
var i=1;
var j=1;

function MatrixToList(matrix){
	var data = [];
	for (var i=0;i<dim;i++){
		data = data.concat(matrix[i])
	}
	return data;
}

class D3Pseudocode extends D3Component {
	initialize(node,props){
    	const canvas = this.canvas = d3.select(node)
                                    .append("svg")
                                    .attr("width",w)
                                    .attr("height",h);

		//Gruppenvariable
		var PseudocodeGroup = this.PseudocodeGroup = canvas.append("g");
		//Rahmen, Background
			PseudocodeGroup.append("rect")
							.attr("class", "pscrahmen")
							.attr("x", 2)
							.attr("y", 2)
							.attr("width", 525)
							.attr("height", 260)
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
							.attr("class", "zeilennummer")
							.style("font-size", "12px")
							.text("1");
			PseudocodeGroup.append("text")
							.attr("x",10)
							.attr("y",85)
							.attr("class", "zeilennummer")
							.style("font-size", "12px")
							.text("2");
			PseudocodeGroup.append("text")
							.attr("x",10)
							.attr("y",118)
							.attr("class", "zeilennummer")
							.style("font-size", "12px")
							.text("3");
			PseudocodeGroup.append("text")
							.attr("x",10)
							.attr("y",151)
							.attr("class", "zeilennummer")
							.style("font-size", "12px")
							.text("4");
			PseudocodeGroup.append("text")
							.attr("x",10)
							.attr("y",184)
							.attr("class", "zeilennummer")
							.style("font-size", "12px")
							.text("5");
			PseudocodeGroup.append("text")
							.attr("x",10)
							.attr("y",217)
							.attr("class", "zeilennummer")
							.style("font-size", "12px")
							.text("6");
			PseudocodeGroup.append("text")
							.attr("x",10)
							.attr("y",250)
							.attr("class", "zeilennummer")
							.style("font-size", "12px")
							.text("7");
			//Zeilen Pseudocode
			PseudocodeGroup.append("text")
					 		.attr("x",30)
					        .attr("y",28)
					        .attr("class", "textzeile")
							.style("font-size", "20px")
							.text("Floyd-Warshall(W)");
			PseudocodeGroup.append("text")
					        .attr("x",30)
					        .attr("y",55)
					        .attr("class", "textzeile")
							.style("font-size", "20px")
							.text("n=W.rows");
			PseudocodeGroup.append("text")
					        .attr("x",30)
					        .attr("y",88)
					        .attr("class", "textzeile")
							.style("font-size", "20px")
							.style("white-space", "pre")
							.text("D   =W");
			PseudocodeGroup.append("text")
							.attr("x",45)
					        .attr("y",80)
					        .attr("class", "textzeile")
							.style("font-size", "12px")
							.text("(1)");
			PseudocodeGroup.append("text")
			            	.attr("x",40)
					        .attr("y",121)
					        .attr("class", "textzeile")
							.style("font-size", "20px")
							.text("for k=1 to n");
			PseudocodeGroup.append("text")
					        .attr("x",50)
					        .attr("y",154)
					        .attr("class", "textzeile")
							.style("font-size", "20px")
							.text("for i=1 to n");
			PseudocodeGroup.append("text")
					        .attr("x",60)
					        .attr("y",187)
					        .attr("class", "textzeile")
							.style("font-size", "20px")
							.text("for j=1 to n");
			PseudocodeGroup.append("text")
					        .attr("x",70)
					        .attr("y",220)
					        .attr("class", "textzeile")
							.style("font-size", "20px")
							.style("white-space", "pre")
							.text("D   = min(D    ,D");
			PseudocodeGroup.append("text")
							.attr("x",264)
							.attr("y",220)
							.attr("class", "textzeile")
							.style("font-size", "20px")
							.style("white-space", "pre")
							.text("+D    )");
			PseudocodeGroup.append("text")
							.attr("x",81)
							.attr("y",212)
							.attr("class", "textzeile")
							.style("font-size", "12px")
							.style("white-space", "pre")
							.text(" (k)                      (k-1)    (k-1)        (k-1)");
			PseudocodeGroup.append("text")
							.attr("x",90)
							.attr("y",224)
							.attr("class", "textzeile")
							.style("font-size", "12px")
							.style("white-space", "pre")
							.text("i,j                         i,j        i,k           k,j");
			PseudocodeGroup.append("text")
					        .attr("x",30)
					        .attr("y",253)
					        .attr("class", "textzeile")
							.style("font-size", "20px")
							.text("return D");
			PseudocodeGroup.append("text")
							.attr("x",117)
							.attr("y",245)
							.attr("class", "textzeile")
							.style("font-size", "12px")
							.text("(n)");
			//Variableneinblendungen
			PseudocodeGroup.append("text")
			            	.attr("x",335)
					        .attr("y",121)
					        .attr("class", "vartext")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text("k=");
			PseudocodeGroup.append("text")
					        .attr("x",335)
					        .attr("y",154)
					        .attr("class", "vartext")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text("i=");
			PseudocodeGroup.append("text")
					        .attr("x",335)
					        .attr("y",187)
					        .attr("class", "vartext")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text("j=");
			PseudocodeGroup.append("text")
			            	.attr("x",363)
					        .attr("y",121)
					        .attr("class", "vartext_k")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text(k);
			PseudocodeGroup.append("text")
					        .attr("x",363)
					        .attr("y",154)
					        .attr("class", "vartext_i")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text(i);
			PseudocodeGroup.append("text")
					        .attr("x",363)
					        .attr("y",187)
					        .attr("class", "vartext_j")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text(j);
			PseudocodeGroup.append("text")
							.attr("x",335)
							.attr("y",220)
							.attr("class", "vartext")
							.style("font-size", "20px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("D   =min(");
			PseudocodeGroup.append("text")
							.attr("x",442)
							.attr("y",220)
							.attr("class", "vartext")
							.style("font-size", "20px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text(",");
			PseudocodeGroup.append("text")
							.attr("x",458)
							.attr("y",220)
							.attr("class", "vartext")
							.style("font-size", "20px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("+ )=");
			PseudocodeGroup.append("text")
							.attr("x",350)
							.attr("y",212)
							.attr("class", "vartext")
							.style("font-size", "12px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("( )");
			PseudocodeGroup.append("text")
							.attr("x",353)
							.attr("y",212)
							.attr("class", "vartextmink")
							.style("font-size", "11px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("k");
			PseudocodeGroup.append("text")
							.attr("x",354)
							.attr("y",224)
							.attr("class", "vartext")
							.style("font-size", "12px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text(" , ");
			PseudocodeGroup.append("text")
							.attr("x",352)
							.attr("y",224)
							.attr("class", "vartextmini")
							.style("font-size", "11px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("i");
			PseudocodeGroup.append("text")
							.attr("x",362)
							.attr("y",224)
							.attr("class", "vartextminj")
							.style("font-size", "11px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("j");
			PseudocodeGroup.append("text")
							.attr("x",430)
							.attr("y",220)
							.attr("class", "vartextmin1")
							.style("font-size", "20px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("8");
			PseudocodeGroup.append("text")
							.attr("x",447)
							.attr("y",220)
							.attr("class", "vartextmin2")
							.style("font-size", "20px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("6");
			PseudocodeGroup.append("text")
							.attr("x",472)
							.attr("y",220)
							.attr("class", "vartextmin3")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text("8");
			PseudocodeGroup.append("text")
							.attr("x",505)
							.attr("y",220)
							.attr("class", "vartextmin4")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text("8");

	}

	update(props,oldProps) {
		var newPseudocode = props['newPseudocode'];
		var state = props['state'];
			i = props['i'];
			j = props['j'];
			k = props['k'];
		if (state<0) {state=0;}
		if (state>7) {state=7;}
		highlightline=state;
		//	if (highlightline==0) {
		//		this.PseudocodeGroup.selectAll("rect.highlighter")
		//			.attr("y",7);	}
		//	else {
		//		this.PseudocodeGroup.selectAll("rect.highlighter")
		//			.attr("y",(highlightline*33)); }
		this.PseudocodeGroup.selectAll("text.vartext_i")
							.text(i);
		this.PseudocodeGroup.selectAll("text.vartext_j")
							.text(j);
		this.PseudocodeGroup.selectAll("text.vartext_k")
							.text(k);
		this.PseudocodeGroup.selectAll("text.vartextmin1")
							.text(i);
		this.PseudocodeGroup.selectAll("text.vartextmin2")
							.text(i+k);
		this.PseudocodeGroup.selectAll("text.vartextmin3")
							.text(j+k);
		this.PseudocodeGroup.selectAll("text.vartextmin4")
							.text(i+j);
		this.PseudocodeGroup.selectAll("text.vartextmink")
							.text(k);
		this.PseudocodeGroup.selectAll("text.vartextmini")
							.text(i);
		this.PseudocodeGroup.selectAll("text.vartextminj")
							.text(j);
		}
	}

module.exports = D3Pseudocode;
