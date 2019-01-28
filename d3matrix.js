const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const FloydWarshall = require('./FloydWarshall');
//import * as FloydWarshall from "./FloydWarshall";  // funktioniert auch nicht
const Kth = require('./KthMatrix');
const NetW = require('./NetWork');
const St = require('./Steps');
const FitData = require('./FitData');

const size = 6000;
var w = 400;
var h = 400;

const xOffset = 60;
const yOffset = 60;
const yDistance = 60;
const xDistance = 60;
const xMarkOffset = 20;
const yMarkOffset = 20;
const xCompOffset = xOffset-15;
const yCompOffset = yOffset-15;
const xCompDist = 30;
const yCompDist = 30;
const rectDist = 10;
const dim = 5;


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
			if (ducs[i][j] == 1000){
				dataset[i][j] = "∞";
			}else{
				dataset[i][j] = ducs[i][j].toString();
			}
		}
	}
	return dataset;
}

function updateMatrix(oldM,newM,i,j,k){
	// update alle Spalten bereits überstrichener Zeilen...
	for (var y=0;y<(i-1);y++){
		if (y==(k-1)){
			continue;
		}
		for (var x=0;x<dim; x++){
			if (x==(k-1)){
				continue;
			}
				console.log(x+1,y+1,"newM",newM[y][x],"oldM",oldM[y][x]);
				oldM[y][x] = newM[y][x].toString();
		}
	}
	// ... und die Einträge der aktuellen Zeile, welche überstrichen sind
	for (var x=0;x<j;x++){
		if (x==(k-1)){
			continue;
		}
		//console.log(x+1,j,"newM",newM[i-1][x], "oldM",oldM[i-1][x]);
		oldM[i-1][x] = newM[i-1][x].toString();
	}
	return oldM;
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
//console.log(fw.getAllMatrices())

class D3Matrix extends D3Component {

	//var selectedPath = fw.getSinglePath(0,1);
	initialize(node,props){
    const canvas = this.canvas = d3.select(node)
                                    .append("svg")
                                    .attr("width",w)
                                    .attr("height",h);


		var Ducs = fw.getAllMatrices()[0].matrix;
		// concatenate 2d array in one list
		var data = MatrixToList(ducsToMatrix(Ducs));
		// Group that contains every element of the Matrix
		var matrixGroup = this.matrixGroup = canvas.append("g");

		// marks contains text to set around the matrix in order to see rows and cols
		var marks = [];
		for (var i=1;i<=dim;i++){
			marks = marks.concat(i);
		}
		for (var i=1;i<=dim;i++){
			marks = marks.concat(i);
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


		matrixGroup.selectAll("rect.horizontalHighlight")
			.data(position)
			.enter()
			.append("rect")
			.attr("class","horizontalHighlight")
			.attr("x", rectDist)
			// text is middled at yOffset, so rect must be too, thus half - half of height
			.attr("y",yOffset-15)
			//gives a rectangle with curved edges
			.attr("rx",20)
			.attr("width",dim*xDistance+yOffset/2)
			.attr("height",30)
			.attr("fill","yellow")
			.attr("opacity",0);

		matrixGroup.selectAll("rect.verticalHighlight")
			.data(position)
			.enter()
			.append("rect")
			.attr("class","verticalHighlight")
			// text is middled at xOffset, so rect must be too, thus half - half of height
			.attr("x", xOffset-15)
			.attr("y",rectDist)
			//gives a rectangle with curved edges
			.attr("rx",20)
			.attr("width",30)
			.attr("height",dim*xDistance+xOffset/2)
			.attr("fill","yellow")
			.attr("opacity",0);

		matrixGroup.selectAll("line.vertOnComparator")
			.data(onCompPosition)
			.enter()
			.append("line")
			.attr("class","vertOnComparator")
			.attr("x1",function(d,i) {return xCompOffset+i*xCompDist;})
			.attr("y1",rectDist)
			.attr("x2",function(d,i) {return xCompOffset+i*xCompDist;})
			.attr("y2",rectDist +5 + yOffset)
			.attr("stroke-width",2)
			.attr("stroke","red")
			.attr("opacity",0);

		matrixGroup.selectAll("line.horizOnComparator")
			.data(onCompPosition)
			.enter()
			.append("line")
			.attr("class","horizOnComparator")
			.attr("y1",function(d,i) {return yCompOffset+i*yCompDist;})
			.attr("x1",rectDist)
			.attr("y2",function(d,i) {return yCompOffset+i*yCompDist;})
			.attr("x2",rectDist +5 + xOffset)
			.attr("stroke-width",2)
			.attr("stroke","red")
			.attr("opacity",0);

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
			.attr("opacity",0);

		matrixGroup.selectAll("line.closeHorizOnComparator")
			.data(onCompPosition)
			.enter()
			.append("line")
			.attr("class","closeHorizOnComparator")
			.attr("x1", rectDist)
			.attr("x2", rectDist)
			.attr("y1", yCompOffset)
			.attr("y2", yCompOffset+yCompDist)
			.attr("stroke-width", 2)
			.attr("stroke","red")
			.attr("opacity",0);


		matrixGroup.selectAll("circle.onComparator")
			.data(singlePoint)
			.enter()
			.append("circle")
			.attr("class","onComparator")
			.attr("cx",xCompOffset+0.5*xCompDist)
			.attr("cy",yCompOffset+0.5*yCompDist)
			.attr("r",15)
			.attr("fill","green")
			.attr("opacity",0);

		// place matrix elements
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

		matrixGroup.selectAll("text.ijk")
			.data(ijk)
			.enter()
			.append("text")
			.text(function(d) {return d;})
			.attr("class", "ijk")
			.attr("x",function(d,i) {return i%dim*xDistance+xOffset;})
			.attr("y", function (d,i){return dim*yDistance+yOffset+20;})
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
			.attr("opacity",0)
			.attr("font-weight", "bold");
			//.attr("stroke-width","4");
  }







  update(props, oldProps){
		var i = props['i'];
		var j = props['j'];
		var k = props['k'];
		// keine ks unter null. in idyll schwer abzufangen
		if (k<1){
			k=1; i=1; j=1;
		}
		var initMatrix = ducsToMatrix(fw.startMatrix.matrix);
		console.log("startmatrix", initMatrix);
		var oldMatrix = ducsToMatrix(fw.getAllMatrices()[k-1].matrix);
		var newMatrix = ducsToMatrix(fw.getAllMatrices()[k].matrix);
		console.log(fw.getAllMatrices());
		// currentMatrix hält den Teil der neuen Matrix, der bei i,j schon verändert ist
		// und sonst Einträge der alten Matrix
		var currentMatrix = updateMatrix(oldMatrix, newMatrix, i,j,k);
		var currentList = MatrixToList(currentMatrix);

		var step = props['step'];


		var newIJK = [k,j,i];
		var rowLight = k-1;
		var colLight = k-1;
		var rowComp = i-1;
		var colComp = j-1;
		var showAll = props['ignite'];
		var showMarks = 0;
		var showHighlighter = 0;
		var showMatrixBorders = 0;
		var showComparator = 0;
		this.matrixGroup.selectAll("text.ijk")
			.data(newIJK)
			.text(function (d) {return d;});

		if (showAll == 1){
			showMarks =1; showHighlighter=1; showMatrixBorders=0;showComparator=1;
		}else{
			showMarks =0; showHighlighter=0; showMatrixBorders=1;showComparator=0;
		}
		// show Marks
		if (showMarks == 1){
			this.matrixGroup.selectAll("text.marks")
				.transition()
				.duration(200)
				.attr("x", function(d,i){
					if (i<dim){return i*xDistance+xOffset;}
					else{return xMarkOffset;}
				})
				.attr("y", function(d,i){
					if (i<dim){return yMarkOffset;}
					else{return (i-dim)*yDistance+yOffset;}
				})
				.attr("opacity",1);
		}else{
			this.matrixGroup.selectAll("text.marks")
				.transition()
				.duration(200)
				.attr("x", function(d){return -10;})
				.attr("y", function(d){return -10;})
		}
		// show Matrix borders
		if (showMatrixBorders == 1){
			this.matrixGroup.selectAll("path.border")
				.attr("opacity",1);
		}else{
			this.matrixGroup.selectAll("path.border")
				.attr("opacity",0);
		}
		// show highlighter
		if (showHighlighter == 1){
			this.matrixGroup.selectAll("rect.horizontalHighlight")
				.attr("opacity",0.2);
			this.matrixGroup.selectAll("rect.verticalHighlight")
				.attr("opacity",0.2);
		}else{
			this.matrixGroup.selectAll("rect.horizontalHighlight")
				.attr("opacity",0);
			this.matrixGroup.selectAll("rect.verticalHighlight")
				.attr("opacity",0);
		}
		// show comparator
		if (showComparator == 1){
			this.matrixGroup.selectAll("circle.onComparator")
				.attr("opacity",0.4);
			this.matrixGroup.selectAll("line.horizOnComparator")
				.attr("opacity",1);
			this.matrixGroup.selectAll("line.closeHorizOnComparator")
				.attr("opacity",1);
			this.matrixGroup.selectAll("line.vertOnComparator")
				.attr("opacity",1);
			this.matrixGroup.selectAll("line.closeVertOnComparator")
				.attr("opacity",1)
		}else{
			this.matrixGroup.selectAll("circle.onComparator")
				.attr("opacity",0);
			this.matrixGroup.selectAll("line.horizOnComparator")
				.attr("opacity",0);
			this.matrixGroup.selectAll("line.closeHorizOnComparator")
				.attr("opacity",0);
			this.matrixGroup.selectAll("line.vertOnComparator")
				.attr("opacity",0);
			this.matrixGroup.selectAll("line.closeVertOnComparator")
				.attr("opacity",0)
		}
		// move Comparator
		this.matrixGroup.selectAll("line.horizOnComparator")
			.transition()
			.duration(300)
			.attr("x1",rectDist)
			.attr("x2",rectDist +5 + xOffset +colComp*yDistance)
			.attr("y1",function(d,i) {return yCompOffset+i*yCompDist + rowComp*yDistance;})
			.attr("y2",function(d,i) {return yCompOffset+i*yCompDist + rowComp*yDistance;})
		this.matrixGroup.selectAll("line.closeHorizOnComparator")
			.transition()
			.duration(300)
			.attr("x1",rectDist)
			.attr("x2",rectDist)
			.attr("y1", yCompOffset+rowComp*yDistance)
			.attr("y2", yCompOffset+yCompDist+rowComp*yDistance);

		this.matrixGroup.selectAll("line.vertOnComparator")
			.transition()
			.duration(300)
			.attr("y1",rectDist)
			.attr("y2",rectDist +5 + yOffset +rowComp*yDistance)
			.attr("x1",function(d,i) {return xCompOffset+i*xCompDist + colComp*xDistance;})
			.attr("x2",function(d,i) {return xCompOffset+i*xCompDist + colComp*xDistance;})
		this.matrixGroup.selectAll("line.closeVertOnComparator")
			.transition()
			.duration(300)
			.attr("y1",rectDist)
			.attr("y2",rectDist)
			.attr("x1", xCompOffset+colComp*xDistance)
			.attr("x2", xCompOffset+xCompDist+colComp*xDistance);

		this.matrixGroup.selectAll("circle.onComparator")
			.transition()
			.duration(300)
			.attr("cx",xCompOffset+0.5*xCompDist+colComp*xDistance)
			.attr("cy",yCompOffset+0.5*yCompDist+rowComp*yDistance)
		// move highlighter
		this.matrixGroup.selectAll("rect.verticalHighlight")
			//.data()
			//.enter()
			.transition()
			.duration(200)
			.attr("x", function(i){
				if (rowLight<0){
					rowLight=0;
				}
				rowLight = rowLight%(dim);
				return xOffset-15+rowLight*xDistance;
			});
		this.matrixGroup.selectAll("rect.horizontalHighlight")
			//.data()
			//.enter()
			.transition()
			.duration(200)
			.attr("y", function(i){
				if (colLight<0){
					colLight=0;
				}
				colLight = colLight%dim;
				return yOffset-15+colLight*yDistance;
			});

			//change Matrix
		this.matrixGroup.selectAll("text.elements")
			.data(currentList)
			.text( function(d) {return d;});
	}
}

module.exports = D3Matrix;


// FALLS wir doch nochmal i,j,k updaten wollen:
// var k = Math.floor(step/((dim-1)*(dim-1)))%(dim)+1;
// var i = step%(dim-1) +1;
// if (i>=k){
// 	i++;
// }
// var j = Math.floor(step/(dim-1))%(dim-1)+1;
// if (j>=k){
// 	j++;
// }
