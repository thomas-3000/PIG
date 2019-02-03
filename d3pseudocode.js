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
			PseudocodeGroup.append("rect")
							.attr("class", "highlighter")
							.attr("x", 5)
							.attr("y", highlightline*33)
							.attr("width", 520)
							.attr("height", 27)
							.attr("fill", "lightblue")
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
							.text("(0)");
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
							.text("D   = min(D    ,D    + D    )");
			PseudocodeGroup.append("text")
							.attr("x",84)
							.attr("y",212)
							.attr("class", "textzeile")
							.style("font-size", "12px")
							.style("white-space", "pre")
							.text("(k)                         (k-1)      (k-1)           (k-1)");
			PseudocodeGroup.append("text")
							.attr("x",92)
							.attr("y",224)
							.attr("class", "textzeile")
							.style("font-size", "12px")
							.style("white-space", "pre")
							.text("i,j                             i,j          i,k               k,j");
			PseudocodeGroup.append("text")
					        .attr("x",30)
					        .attr("y",253)
					        .attr("class", "textzeile")
							.style("font-size", "20px")
							.text("return D");
			PseudocodeGroup.append("text")
							.attr("x",105)
							.attr("y",245)
							.attr("class", "textzeile")
							.style("font-size", "12px")
							.text("(n)");
			//Variableneinblendungen
			PseudocodeGroup.append("text")
			            	.attr("x",325)
					        .attr("y",121)
					        .attr("class", "vartext")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text("k=");
			PseudocodeGroup.append("text")
					        .attr("x",325)
					        .attr("y",154)
					        .attr("class", "vartext")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text("i=");
			PseudocodeGroup.append("text")
					        .attr("x",325)
					        .attr("y",187)
					        .attr("class", "vartext")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text("j=");
			PseudocodeGroup.append("text")
			            	.attr("x",345)
					        .attr("y",121)
					        .attr("class", "vartext")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text(i);
			PseudocodeGroup.append("text")
					        .attr("x",345)
					        .attr("y",154)
					        .attr("class", "vartext")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text(j);
			PseudocodeGroup.append("text")
					        .attr("x",345)
					        .attr("y",187)
					        .attr("class", "vartext")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text(k);
			PseudocodeGroup.append("text")
							.attr("x",325)
							.attr("y",220)
							.attr("class", "vartext")
							.style("font-size", "20px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("D   =min(  ,  +  )=");
			PseudocodeGroup.append("text")
							.attr("x",340)
							.attr("y",212)
							.attr("class", "vartext")
							.style("font-size", "12px")
							.style("fill","#FF1493")
							.text("(k)");
			PseudocodeGroup.append("text")
							.attr("x",350)
							.attr("y",224)
							.attr("class", "vartext")
							.style("font-size", "12px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("i,j");
			PseudocodeGroup.append("text")
							.attr("x",407)
							.attr("y",220)
							.attr("class", "vartext")
							.style("font-size", "20px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("8");
			PseudocodeGroup.append("text")
							.attr("x",426)
							.attr("y",220)
							.attr("class", "vartext")
							.style("font-size", "20px")
							.style("white-space", "pre")
							.style("fill","#FF1493")
							.text("6");
			PseudocodeGroup.append("text")
							.attr("x",450)
							.attr("y",220)
							.attr("class", "vartext")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text("1");
			PseudocodeGroup.append("text")
							.attr("x",483)
							.attr("y",220)
							.attr("class", "vartext")
							.style("font-size", "20px")
							.style("fill","#FF1493")
							.text("7");

	}

	update(props,oldProps) {
		var newPseudocode = props['newPseudocode'];
		var state = props['state'];
		if (state<0) {
			state=0;
		}
		if (state>7) {
			state=7;
		}
		highlightline=state;
		if (newPseudocode!=0){
			if (highlightline==0) {
				this.PseudocodeGroup.selectAll("rect.highlighter")
					.attr("y",7);
			}
			else {
				this.PseudocodeGroup.selectAll("rect.highlighter")
					.attr("y",(highlightline*33));

			}
		}
	}
}

module.exports = D3Pseudocode;
