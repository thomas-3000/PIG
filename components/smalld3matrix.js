const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const FloydWarshall = require('./FloydWarshall');


//const size = 6000;
var w = 200;
var h = 200;

const xOffset = 80;
const yOffset = 80;
const yDistance = 40;
const xDistance = 40;
const xMarkOffset = 50;
const yMarkOffset = 50;
const xCompOffset = xOffset-15;
const yCompOffset = yOffset-15;
const xCompDist = 30;
const yCompDist = 30;
const rectDist = 30;
const dim = 3;

var row = 2;
var col = 1;

function MatrixToList(matrix){
	var data = [];
	for (var i=0;i<dim;i++){
		data = data.concat(matrix[i])
	}
	return data;
}


class SmallD3Matrix extends D3Component {
	initialize(node,props){
    const canvas = this.canvas = d3.select(node)
                                    .append("svg")
                                    .attr("width",w)
                                    .attr("height",h);


    var Matrix = [["0","∞","2"],["1","0","5"],["∞","-2","0"]]
		// concatenate 2d array in one list
		var data = MatrixToList(Matrix);
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


		// place row and col marks
		matrixGroup.selectAll("text.marks")
			.data(marks)
			.enter()
			.append("text")
			.text(function(d) {return d;})
			.attr("class","marks")
			.attr("x", function(d,i){
				//set half the marks above matrix, so x where x of matrix elements is
				if (i<dim){return i*xDistance+xOffset;}
				// other marks left beside matrix
				else{return xMarkOffset;}
			})
			.attr("y", function(d,i){
				//first half above
				if (i<dim){return yMarkOffset;}
				//other half where y positions of elements is
				else{return (i-dim)*yDistance+yOffset;}
			})
			.attr("fill","green")
			.attr("font-size",15)
			.attr("text-anchor","middle")
			.attr("dominant-baseline","middle")
			.attr("opacity",1)
			.style("font-family","Futura")
			.attr("font-weight", "bold");
			//.attr("stroke-width","4");

      matrixGroup.selectAll("line.vertOnComparator")
        .data(onCompPosition)
        .enter()
        .append("line")
        .attr("class","vertOnComparator")
        .attr("x1",function(d,i) {return xCompOffset+i*xCompDist;})
        .attr("y1",rectDist)
        .attr("x2",function(d,i) {return xCompOffset+i*xCompDist;})
        .attr("y2",rectDist -15 + yOffset+(row-1)*yDistance)
        .attr("stroke-width",2)
        .attr("stroke","red")

      matrixGroup.selectAll("line.horizOnComparator")
        .data(onCompPosition)
        .enter()
        .append("line")
        .attr("class","horizOnComparator")
        .attr("y1",function(d,i) {return yCompOffset+i*yCompDist+(row-1)*yDistance;})
        .attr("x1",rectDist)
        .attr("y2",function(d,i) {return yCompOffset+i*yCompDist+(row-1)*yDistance;})
        .attr("x2",rectDist -15 + xOffset)
        .attr("stroke-width",2)
        .attr("stroke","red")

      matrixGroup.selectAll("line.closeVertOnComparator")
        .data(onCompPosition)
        .enter()
        .append("line")
        .attr("class","closeVertOnComparator")
        .attr("y1", rectDist)
        .attr("y2", rectDist)
        .attr("x1", xCompOffset)
        .attr("x2", xCompOffset+xCompDist)
        .attr("stroke-width", 2)
        .attr("stroke","red")

      matrixGroup.selectAll("line.closeHorizOnComparator")
        .data(onCompPosition)
        .enter()
        .append("line")
        .attr("class","closeHorizOnComparator")
        .attr("x1", rectDist)
        .attr("x2", rectDist)
        .attr("y1", yCompOffset + (row-1)*yDistance)
        .attr("y2", yCompOffset+yCompDist + (row-1)*yDistance)
        .attr("stroke-width", 2)
        .attr("stroke","red")

  }

  update(props, oldProps){

	}
}


module.exports = SmallD3Matrix;
