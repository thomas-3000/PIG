const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const FloydWarshall = require('./FloydWarshall');


//const size = 6000;
var w = 400;
var h = 400;

const xOffset = 65;
const yOffset = 65;
const yDistance = 60;
const xDistance = 60;
const xMarkOffset = 25;
const yMarkOffset = 25;
const xCompOffset = xOffset-15;
const yCompOffset = yOffset-15;
const xCompDist = 30;
const yCompDist = 30;
const rectDist = 10;
const dim = 5;

var row = 2;
var col = 1;

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

class D3FinalMatrix extends D3Component {
	initialize(node,props){
    const canvas = this.canvas = d3.select(node)
                                    .append("svg")
                                    .attr("width",w)
                                    .attr("height",h);


    var Ducs = fw.getAllMatrices()[5].matrix;
  	// concatenate 2d array in one list
  	var data = MatrixToList(ducsToMatrix(Ducs));
		// Group that contains every element of the Matrix
		var matrixGroup = this.matrixGroup = canvas.append("g");

		// marks contains text to set around the matrix in order to see rows and cols
		var marks = [];
		for (var i=1;i<=dim;i++){
			marks = marks.concat("0"+i.toString());
		}
		for (var i=1;i<=dim;i++){
			marks = marks.concat("0"+i.toString());
		}
    var position = [1,2];
		var onCompPosition = [1,1];
		var singlePoint = [1];
    var leftMatrixBorder = [{x:xOffset-10,y:yOffset-15},{x:xMarkOffset+5,y:yOffset + 0.5*(dim-1)*yDistance },{x:xOffset-10,y:yOffset + (dim-1)*yDistance+15
		}]
		var rightMatrixBorder = [{x:xOffset+(dim-1)*xDistance+20,y:yOffset-15},{x:xMarkOffset+dim*xDistance+20,y:yOffset + 0.5*(dim-1)*yDistance },{x:xOffset + (dim-1)*xDistance+20,y:yOffset + (dim-1)*yDistance+15
		}]
		var ijk = ["1","1","1"];
		// line genarator
		var line = d3.line()
			.x(function(d) {return d.x})
			.y(function(d) {return d.y})
			.curve(d3.curveBasis);

  matrixGroup.append("path")
		.attr("class","border")
		.attr("d",line(leftMatrixBorder))
		.attr("fill","none")
		.attr("stroke", "black")
		.attr("stroke-width",2);

	matrixGroup.append("path")
		.attr("class","border")
		.attr("d",line(rightMatrixBorder))
		.attr("fill","none")
		.attr("stroke","black")
		.attr("stroke-width",2);

    matrixGroup.selectAll("text.elements")
			.data(data)
			.enter()
			.append("text")
			.text(function(d) {return d;})
			.attr("class", "elements")
			.attr("x",function(d,i) {return i%dim*xDistance+xOffset;})
			.attr("y", function (d,i){return Math.floor(i/dim)*yDistance+yOffset;})
			.attr("text-anchor","middle")
			.attr("dominant-baseline","middle")
			.attr("font-size",25);



  }

  update(props, oldProps){

	}
}


module.exports = D3FinalMatrix;
