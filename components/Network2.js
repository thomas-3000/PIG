const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const FitData = require('./FitData');
const FloydWarshall2 = require('./FloydWarshall2');

const width = 600;
const height = 600;

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

const fitData = new FitData(weights, height, numVertices);
var links = fitData.getlinkData();
var nodes = fitData.getNodesData();

const fw = new FloydWarshall2(weights, numVertices);

 var offSetColor = "#D3D3D3";// grey

 var offSetColorNode = "#1E90FF";//blue
 var smallNodeSize = 10;
 var bigNodeSize = 20;
 var highlightColor = "#DC143C";//red

 var smallWidthEdge = 2;
 var bigWidthEdge = 3;

 var letterColor = "#000000";
 var initDist = 300;
 var counter = 0;
 var currentColouredEdges = [];
 var currentColouredLabel = [];
 var currentColouredNode = [];
 var current1rstNode = null;
 var current2ndNode = null;
 var initFontSizeEdgeLabel = "10px";
 var higlightedSizeEdgeLabel = "25px" ;
 var positionOfText_PathStr_Title_x = -50;
 var positionOfText_PathStr_Title_y = 400;


class Network2 extends D3Component {
	initialize(node,props){
    const canvas = this.canvas = d3.select(node)
                                    .append("svg")
                                    .attr("width",width)
                                    .attr("height",height);

		var radius = 10;





		var force = d3.forceSimulation(d3.values(nodes))
		    .force("charge", d3.forceManyBody())
		    .force("link", d3.forceLink().links(links).distance(250))
				// CHANGED force center
		    .force('center', d3.forceCenter(width / 2, height / 2));

		// var force = d3.forceSimulation();
    //     			//.size([w, h])
		//simulation.force('link', d3.forceLink().links(links))
		// force.nodes(d3.values(nodes))
  	// 		//.links(links)
  	// 		//.on("tick", tick)
  	// 		//.linkDistance(400)
  	// 		//.start();
		console.log("NETWORK: nodes",nodes);
		console.log("NETWORK: fnodes",force.nodes());

//1.####################title
var title = canvas.append("text")
   .attr("transform", "translate(100,0)")
   .attr("x", positionOfText_PathStr_Title_x)
   .attr("y", positionOfText_PathStr_Title_y)
   .style("font-size", "20px")
   .attr("class", "title");

//2.####################pathStr
var pathStr = canvas.append("text")
   .attr("transform", "translate(100,0)")
   .attr("x", positionOfText_PathStr_Title_x)
   .attr("y", positionOfText_PathStr_Title_y + 50)
   .style("font-size", "20px")
   .attr("class", "title");

title.text("distance =  ");
pathStr.text("path = ");


//3.####################marker
 var marker = canvas.selectAll("marker")
    .append("svg:defs")
    .data(["end-arrow"])
    .enter()
    .append("svg:marker")
    .attr("id", String)
    .attr("viewBox", "0 -3 6 6")
    .attr("refX", 11.3)

    .attr("refY", -0.2)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
    .append("svg:path")

    .attr("d", "M0,-3L6,0L0,3");

//4.####################link

const path = canvas.append("svg:g").selectAll("line.link")
    .data(links)
  	.enter()
  	.append("svg:path")
    .attr("class", function(d) { return "link" + d.type; })
    .attr("id",function(d,i) { return "linkId_" + i; })
    .style("stroke-width", 2)
    .style("stroke", offSetColor)
    .style("fill", offSetColor)
    .attr("marker-end", "url(#end-arrow)");

 	path.append("title")
            	.text(function (d) {return d.typ;});

function getPath(){
	return path;
}
//5.####################link_label_shadow
var link_label_shadow = canvas.selectAll(".link_label_shadow")
    .data(links)
    .enter()
    .append("circle")
    .attr("r", 10)
    .style("fill", "white");


//6.####################edgelabel

var edgelabels = canvas.selectAll(".link-label")
    .data(links)
    .enter()
    .append('svg:text')
    .style("text-anchor", "middle")
    .style("dominant-baseline", "central")
    .attr("class", "shadow")
    .style("fontSize","15px")
    .text(function(d){return d.typ;});

//7.####################NODES

var node = canvas.selectAll("circle.node")
    .data(force.nodes())
  	.enter().append("svg:g")
    .attr("class", "node");

// add the nodes
node.append("svg:circle")
    .attr("r", smallNodeSize)
    .style("fill", offSetColorNode);

// add the text
node.append("text")
    .attr("x", -3.5)
    .attr("dy", ".15em")
    .text(function(d) { return d.name; });
node.on("click", click);

  //####################FUNCTIONS

function getEdgelabels(source, target, edgelabels){
 	var allLabels = edgelabels._groups[0];
 	var len = allLabels.length;
 	for(var i = 0; i < len; i++){
 		var thisEdgelabels = allLabels[i];
 		var nameSource = d3.select(thisEdgelabels).datum().source.name;
		var nameTarget = d3.select(thisEdgelabels).datum().target.name;

 		console.log("Label source:", source,"target", target, "nameSource", nameSource, "nameTarget", nameTarget);
 		console.log("thisEdgelabels", thisEdgelabels);
 		if(nameSource == source && nameTarget == target){
 			return thisEdgelabels;
 		}
 	}
 	return null;
 }
console.log("Path", getPath());

function getEdge(source, target){
 	console.log("Path2",  getPath());
	var listOfAllPaths = path._groups[0];
	console.log('listOfAllPaths', listOfAllPaths, path._groups[0]);
	var len = listOfAllPaths.length;
	for (var i = 0; i<len; i++){
		var thisPath = listOfAllPaths[i];
		console.log('thisPath', thisPath);
		var nameSource = d3.select(thisPath).datum().source.name;
		var nameTarget = d3.select(thisPath).datum().target.name;

		console.log('nameTarget', nameTarget);
		if(nameSource == source && nameTarget == target){
			return thisPath;
		}
	}
	return null;
}

function coloringSingleNode(thisNode, color){
	console.log("reqPath", thisNode);
	d3.select(thisNode).select("circle").transition()
	        .style("fill", color);
}

function resizeSingleNode(thisNode, size){
	console.log("reqPath", thisNode);
	d3.select(thisNode).select("circle").transition()
			.duration(750)
	        .attr("r", size);
}

function highlightSingleNode(thisNode){
	 d3.select(thisNode).select("text").transition()
        .duration(750)
        .attr("x", -3.5)
        .style("stroke", "#87CEFA")
        .style("stroke-width", ".5px")
        .style("font", "20px sans-serif");

    	d3.select(thisNode).select("circle").transition()
        .duration(750)
        .attr("r", bigNodeSize)
        .style("fill", highlightColor);

}

function resetNodes(coloredNodes){
 	for (var i = 0; i<coloredNodes.length ;i++){
 		thisNode = coloredNodes[i];
 		coloringSingleNode(thisNode, offSetColorNode);
 	}
 	return [];
 }

function resetSingleNode(thisNode){
	console.log("resetSingleNode", thisNode);
	d3.select(thisNode).select("circle").transition()
			.duration(750)
	        .attr("r", smallNodeSize)
	        .style("fill", offSetColorNode);

	d3.select(thisNode).select("text").transition()
	        .duration(750)
	        .attr("x", -3.5)
	        .style("stroke", "none")
	        .style("fill", letterColor)
	        .style("stroke", "none")
	        .style("font", "10px sans-serif");
	thisNode = null;
}


function resetColouredEdges(colouredEdges){
	for (var i = 0; i < colouredEdges.length; i++){
		var thisEdge = colouredEdges[i];
		thisEdge.style.stroke = offSetColor;
		thisEdge.style.strokeWidth = smallWidthEdge;
	}
	return [];
}

function resetColouredEdgeLabel(colouredLabels){
	for(var i = 0; i<colouredLabels.length; i++){
		var thisEdgeLabel = colouredLabels[i];
		thisEdgeLabel.style.fill = offSetColor;
		thisEdgeLabel.style.fontSize = initFontSizeEdgeLabel;

	}
	return [];
}

function updateDisplayWeight(weight, pathWay){
	title.text("distance =	"+weight);
	pathStr.text("path =	"+pathWay.toString());
}

function resetDisplayWeight(){
	title.text("distance =	");
	pathStr.text("path =	");
}

function highlightShortestPath(shortestPathArr){
 	var allEgdes = [];
 	if(shortestPathArr.length<2){
 		return allEgdes;
 	}


 	for(var i = 0; i< shortestPathArr.length-1; i++){
 		var node1rst = shortestPathArr[i];
 		var node2nd = shortestPathArr[i+1];
 		var thisEdge = getEdge(node1rst, node2nd);
 		thisEdge.style.stroke = highlightColor;
 		thisEdge.style.strokeWidth = bigWidthEdge;
 		allEgdes.push(thisEdge);
 	}
 	return allEgdes;
 }

function highlightLabels(shortestPathArr){
 	var allEgdesLabels = [];
 	if(shortestPathArr.length<2){
 		return allEgdesLabels;
 	}


 	for(var i = 0; i< shortestPathArr.length-1; i++){
 		var node1rst = shortestPathArr[i];
 		var node2nd = shortestPathArr[i+1];
 		var thisEdgelabels = getEdgelabels(node1rst, node2nd, edgelabels);
 		thisEdgelabels.style.fill = highlightColor;
		thisEdgelabels.style.fontSize = higlightedSizeEdgeLabel;
 		allEgdesLabels.push(thisEdgelabels);
 	}
 	return allEgdesLabels;
 }

 function getVertexName(vertex){
console.log("Ducvertex", vertex);
var name = d3.select(vertex).datum().name;
console.log("Ducvertex", name);
	return name;
}


//node.on("click", function() {
function click(path){
	if (current1rstNode == null){
		current1rstNode = this;
		console.log('current1rstNode ', this);
	}else if( current2ndNode == null){
		current2ndNode = this;
		console.log('current2ndNode ', this);
	}else if(this == current1rstNode && current2ndNode != null){// if click on the start vertex, it returns to old size, and the second vertex becomes the first
		resetSingleNode(this);

	    current1rstNode = current2ndNode;
	    current2ndNode = null;

	    currentColouredEdges = resetColouredEdges(currentColouredEdges);
	    currentColouredLabel = resetColouredEdgeLabel(currentColouredLabel);
	    currentColouredNode = resetNodes(currentColouredNode);
	    return;

	}else if(this == current2ndNode && current1rstNode != null){
		resetSingleNode(this);

	    currentColouredEdges = resetColouredEdges(currentColouredEdges);
		currentColouredLabel = resetColouredEdgeLabel(currentColouredLabel);
		currentColouredNode = resetNodes(currentColouredNode);
	    return;
	}
	// swap the 2nd vertex by click
	if(current2ndNode != null && current1rstNode != this){
		resetSingleNode(current2ndNode);
		current2ndNode = this;
		currentColouredEdges = resetColouredEdges(currentColouredEdges);
		currentColouredLabel = resetColouredEdgeLabel(currentColouredLabel);
		currentColouredNode = resetNodes(currentColouredNode);
	}


	if(current1rstNode != null && current2ndNode != null){
	console.log("here current1rstNode", current1rstNode, current2ndNode)
		var node1rst = getVertexName(current1rstNode);
		var node2nd = getVertexName(current2ndNode);

		var shortestPath = fw.getSinglePath(parseInt(node1rst), parseInt(node2nd));
		var distance = fw.getWeightPath(parseInt(node1rst), parseInt(node2nd));

		currentColouredEdges = highlightShortestPath(shortestPath, path);
		currentColouredLabel = highlightLabels(shortestPath);

		updateDisplayWeight(distance,shortestPath);

	}

   highlightSingleNode(this);

   console.log(this);
   }
//});


force.on("tick", function(){
    	 path.attr("d", function(d) {
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = 0;
        return "M" +
            d.source.x + "," +
            d.source.y + "A" +
            dr + "," + dr + " 0 0,1 " +
            d.target.x + "," +
            d.target.y;
    });



      edgelabels.attr("x", function(d, i) {
        // diese Zeile macht beim change vis ärger
        // weil d3.select(...) null wird.
        try{
          var pathLength = d3.select("#linkId_" + i).node().getTotalLength();
        }
        catch(TypeError){
        }
        try{
          d.point = d3.select("#linkId_" + i).node().getPointAtLength(pathLength / (5/3));
        }
        catch(TypeError){
        }
        return d.point.x;
      })
      .attr("y", function(d) {
        return d.point.y;
      });
    node.attr("transform", function(d) {
      return ("translate(" + d.x + "," + d.y + ")");
    });

     link_label_shadow.attr("cx", function(d, i) {
        try{
        var pathLength = d3.select("#linkId_" + i).node().getTotalLength();
        d.point = d3.select("#linkId_" + i).node().getPointAtLength(pathLength / (5/3));
        return d.point.x;
        }
        catch(TypeError){
        }
      })
      .attr("cy", function(d) {
        return d.point.y;
      });
    });

canvas.on("dblclick", function() {
	if(current2ndNode == null && current1rstNode == null){
		return;
	}
    currentColouredEdges = resetColouredEdges(currentColouredEdges);
    currentColouredLabel = resetColouredEdgeLabel(currentColouredLabel);
    currentColouredNode = resetNodes(currentColouredNode);
  	resetSingleNode(current2ndNode);
    resetSingleNode(current1rstNode);
    current1rstNode = null;
    current2ndNode = null;
    resetDisplayWeight();
});

//####################FUNCTIONS END
}
}

module.exports = Network2;
