const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const FitData = require('./FitData');
const FloydWarshall2 = require('./FloydWarshall2');
// const Steps = require('./Steps');//++

const width = 600;
const height = 455;

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

 var highlightColor = "#00cc44";//red
 var highlightColor2ndStart = "#ff5959";//green//++
 var intermediateColor = "#ff5959";//"#b39800";
 var intermediateColor_kj = "#00cc44";//"#FFD700";
 var nodeKcolor = "#FFD700";
 var egdeMultipleColor = "#000000";

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
 var positionOfText_PathStr_Title_y = 400



  var infinity = '  kein Pfad';

	//####################FUNCTIONS

function getEdgelabels(source, target, edgelabels){
 	var allLabels = edgelabels._groups[0];
 	var len = allLabels.length;
 	for(var i = 0; i < len; i++){
 		var thisEdgelabels = allLabels[i];
 		var nameSource = d3.select(thisEdgelabels).datum().source.name;
		var nameTarget = d3.select(thisEdgelabels).datum().target.name;

 		//console.log("Label source:", source,"target", target, "nameSource", nameSource, "nameTarget", nameTarget);
 		//console.log("thisEdgelabels", thisEdgelabels);
 		if(nameSource == source && nameTarget == target){
 			return thisEdgelabels;
 		}
 	}
 	return null;
 }
//console.log("Path", getPath());

function getEdge(source, target,path){
 	//console.log("Path2",  getPath());
	var listOfAllPaths = path._groups[0];
	//console.log('listOfAllPaths', listOfAllPaths, path._groups[0]);
	var len = listOfAllPaths.length;
	for (var i = 0; i<len; i++){
		var thisPath = listOfAllPaths[i];
		//console.log('thisPath', thisPath);
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
	        .style("font", "10px sans-serif")
          .text(function(d) {
          return d.name;
    });
	thisNode = null;
}


function resetColouredEdges(colouredEdges,colorEdgeMatrix){
	for (var i = 0; i < colouredEdges.length; i++){
		var thisEdge = colouredEdges[i];
		thisEdge.style.stroke = offSetColor;
		thisEdge.style.strokeWidth = smallWidthEdge;
    var start = getEdgeStartName(thisEdge);
    var dest = getEdgeDestName(thisEdge);
    resetColorEdge(start, dest,colorEdgeMatrix);
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

function updateDisplayWeight(weight, pathWay,title,pathStr){
	title.text("distance =	"+weight);
	pathStr.text("path =	"+pathWay.toString());
}

function updateDisplay_ikj(iNode, kNode, jNode, ikWeight, kjWeight,title,pathStr,sum) {
    if(kjWeight != null){
      title.text("D(" + kNode + "," + jNode  + ") = " + kjWeight);
    }else{
      title.text("D(" + kNode + "," + jNode  + ") = " + infinity);
    }
    if(ikWeight != null){
      pathStr.text("D(" + iNode + "," + kNode + ") = " + ikWeight);
    }else{
      pathStr.text("D(" + iNode + "," + kNode + ") = " + infinity);
    }
    if(ikWeight!= null && kjWeight != null){
      sum.text("Sum("+iNode+","+kNode+","+jNode+") = "+ (kjWeight+ikWeight));
    }else{
      sum.text("Sum("+iNode+","+kNode+","+jNode+") ="+ infinity);
    }
  }

function resetDisplayWeight(){
	title.text("distance =	");
	pathStr.text("path =	");
}

function resetDisplayText(){
    title.text("D(k,j) =  ");
    pathStr.text("D(i,k) = ");
}

function highlightLabels(shortestPathArr, edgelabels){
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

function getSelectedNode(integerNum,node) {
  var listAllNodes = node._groups[0];
  var len = listAllNodes.length;
  for (var i = 0; i < len; i++) {
    var thisNode = listAllNodes[i];
    var nodeName = d3.select(thisNode).datum().name;
    if (nodeName == String(integerNum)) {
      return thisNode;
    }
  }
}

function highlightSingleNode(thisNode, color, label){
	 d3.select(thisNode).select("text").transition()
        .duration(750)
        .attr("x", -3.5)
        .style("stroke", "#87CEFA")
        .style("stroke-width", ".5px")
        .style("font", "20px sans-serif")
        .text(function(d) {
          var modifiedName = d.name +"   "+label;
          return modifiedName;
          });

    	d3.select(thisNode).select("circle").transition()
        .duration(750)
        .attr("r", bigNodeSize)
        .style("fill", color);

}

function highlightShortestPath(shortestPathArr, color,path,colorEdgeMatrix){
 	var allEgdes = [];
 	if(shortestPathArr.length<2){
 		return allEgdes;
 	}


 	for(var i = 0; i< shortestPathArr.length-1; i++){
 		var node1rst = shortestPathArr[i];
 		var node2nd = shortestPathArr[i+1];
 		var thisEdge = getEdge(node1rst, node2nd,path);

 		if(checkIsColoredEdge(node1rst, node2nd,colorEdgeMatrix)==true){
        thisEdge.style.stroke = egdeMultipleColor;
      }else{
        thisEdge.style.stroke = color;
      }
      setColorEdge(node1rst, node2nd,colorEdgeMatrix);


 		thisEdge.style.strokeWidth = bigWidthEdge;
 		allEgdes.push(thisEdge);
 	}
 	return allEgdes;
 }
 function getEdgesOfPaht(pathWay) {
   var allEdges = [];
   for (var i = 0; i < pathWay.length - 1; i++) {
     var start = pathWay[i];
     var dest = pathWay[i + 1];
     var edge = getEdge(start, dest, this.path);
     allEdges.push(edge);
   }
   return allEdges;
 }

 function checkIsColoredEdge(start,dest,colorEdgeMatrix){
   if(colorEdgeMatrix[start][dest] == 1){
     return true;
   }
   return false;
 }

 function setColorEdge(start, dest,colorEdgeMatrix){
   colorEdgeMatrix[start][dest] = 1;
 }

 function resetColorEdge(start, dest,colorEdgeMatrix){
   colorEdgeMatrix[start][dest] = 0;
 }

 function initMatrix(size, nullValue){
   var arr = [];
   for (var i = 0; i < size; i++){
     arr.push([]);
     arr[i].push(new Array(size));
     for(var j = 0; j<size; j++){
       if(i!=j){
         arr[i][j] = nullValue;
       }else{
       arr[i][j] = 0;
       }
     }
   }
   console.log('DONE MATRIX');
   return arr;
 }// end of initMatrix

 function getEdgeStartName(edge){
   return d3.select(edge).datum().source.name;

 }

 function getEdgeDestName(edge){
   return d3.select(edge).datum().target.name;
 }










class NetworkSteps extends D3Component {
	initialize(node,props){
    const canvas = this.canvas = d3.select(node)
                                    .append("svg")
                                    .attr("width",width)
                                    .attr("height",height);

		var radius = 10;

      //New Code
  var stepCounter = 0;
  var ikj_startNode = null;
  var ikj_destNode = null;
  var k_destNode = this.k_destNode = null;
  var currentColouredEdges_ikj = this.currentColouredEdges_ikj = null;
  var currentColouredLabel_ikj = this.currentColouredLabel_ikj = null;
  var currentColouredEdges_ikj_ik = this.currentColouredEdges_ikj_ik = null;
  var currentColouredLabel_ikj_ik = this.currentColouredLabel_ikj_ik = null;
  var currentColouredEdges_ikj_kj = this.currentColouredEdges_ikj_kj = null;
  var currentColouredLabel_ikj_kj = this.currentColouredLabel_ikj_kj = null;
  var currentKNode = this.currentKNode = null;
  var colorEdgeMatrix = this.colorEdgeMatrix = initMatrix(numVertices, 0);





	var force = d3.forceSimulation(d3.values(nodes))
	    .force("charge", d3.forceManyBody())
	    .force("link", d3.forceLink().links(links).distance(250))
			// CHANGED force center
	    .force('center', d3.forceCenter(width / 2, height / 2));

		//console.log("NETWORK: nodes",nodes);
		//console.log("NETWORK: fnodes",force.nodes());

//1.####################title
var title = this.title = canvas.append("text")
   .attr("transform", "translate(100,0)")
   .attr("x", positionOfText_PathStr_Title_x)
   .attr("y", positionOfText_PathStr_Title_y-50)
   .style("font-size", "20px")
   .style("fill", highlightColor)
   .attr("class", "title");

//2.####################pathStr
var pathStr = this.pathStr = canvas.append("text")
   .attr("transform", "translate(100,0)")
   .attr("x", positionOfText_PathStr_Title_x)
   .attr("y", positionOfText_PathStr_Title_y)
   .style("font-size", "20px")
   .style("fill", highlightColor2ndStart)
   .attr("class", "title");

var sum = this.sum = canvas.append("text")
   .attr("transform", "translate(100,0)")
   .attr("x", positionOfText_PathStr_Title_x)
   .attr("y", positionOfText_PathStr_Title_y + 50)
   .style("font-size", "20px")
   .attr("class", "title");

title.text("D(k,j) =  ");
pathStr.text("D(i,k) = ");
sum.text("Sum(i,k,j) = ");


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

const path = this.path = canvas.append("svg:g").selectAll("line.link")
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

var edgelabels = this.edgelabels = canvas.selectAll(".link-label")
    .data(links)
    .enter()
    .append('svg:text')
    .style("text-anchor", "middle")
    .style("dominant-baseline", "central")
    .attr("class", "shadow")
    .style("fontSize","15px")
    .text(function(d){return d.typ;});

//7.####################NODES

var node = this.node = canvas.selectAll("circle.node")
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
//node.on("click", click);


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

}








		update(props,oldProps){
			var thisStep = [counter, props['k']-1,props['i']-1,props['j']-1 ]
	    var ikWeight = null;
	    var kjWeight = null;
	    var k = thisStep[1];
	    var i = thisStep[2];
	    var j = thisStep[3];
			console.log("CURRENT K NODE", this.currentKNode)
	    if (k != this.currentKNode) {
	        if (this.k_destNode != null) {
	          resetSingleNode(this.k_destNode);
	          this.currentKNode=k;
	          this.k_destNode = getSelectedNode(k,this.node);
	        }
	      }

	    if (this.ikj_startNode != null) {
	      resetSingleNode(this.ikj_startNode);
	    }

	    if (this.ikj_destNode != null) {
	      resetSingleNode(this.ikj_destNode);
	    }

	    if (this.currentColouredEdges_ikj != null) {
	      this.currentColouredEdges_ikj = resetColouredEdges(this.currentColouredEdges_ikj, this.colorEdgeMatrix);
	    }

	    if (this.currentColouredLabel_ikj != null) {
	      this.currentColouredLabel_ikj = resetColouredEdgeLabel(this.currentColouredLabel_ikj);
	    }

	    if (this.currentColouredEdges_ikj_ik != null) {
	      this.currentColouredEdges_ikj_ik = resetColouredEdges(this.currentColouredEdges_ikj_ik, this. colorEdgeMatrix);
	    }

	    if (this.currentColouredLabel_ikj_ik != null) {
	      this.currentColouredLabel_ikj_ik = resetColouredEdgeLabel(this.currentColouredLabel_ikj_ik);
	    }

	    if (this.currentColouredEdges_ikj_kj != null) {
	      this.currentColouredEdges_ikj_kj = resetColouredEdges(this.currentColouredEdges_ikj_kj, this.colorEdgeMatrix);
	    }

	    if (this.currentColouredLabel_ikj_kj != null) {
	      this.currentColouredLabel_ikj_kj = resetColouredEdgeLabel(this.currentColouredLabel_ikj_kj);
	    }

	    console.log(thisStep);
	    if (k != j && k != i && i!=j) {

	      var ikjPath = fw.findPathsOverVertexK(thisStep);
	      if (ikjPath.get_resultPath() != null) {
	        console.log("i: ", i, "| j: ", j);
	        this.ikj_startNode = getSelectedNode(i,this.node);
	        this.ikj_destNode = getSelectedNode(j,this.node);

	        if (k != i) {
	          console.log("I START", i," ",k);
	          console.log("ikj_startNode", this.ikj_startNode);
	          highlightSingleNode(this.ikj_startNode, highlightColor2ndStart,"Start");
	        }
	        if (k != j) {
	          highlightSingleNode(this.ikj_destNode, highlightColor,"Ziel");
	        }

	        if (ikjPath.get_ikPathWay() != null) {
	          var ikPath = ikjPath.get_ikPathWay();

	          this.currentColouredEdges_ikj_ik = highlightShortestPath(ikPath, intermediateColor,this.path, this.colorEdgeMatrix);
	          // currentColouredLabel_ikj_ik = highlightLabels(ikPath, intermediateColor, this.edgelabels);
						this.currentColouredLabel_ikj_ik = highlightLabels(ikPath, this.edgelabels);
	        }

	        if (ikjPath.get_ikPathWeight() != null) {
	          ikWeight = ikjPath.get_ikPathWeight();
	          // ikWeight = ikWeight.fontcolor(highlightColor);
	        } else {
	          ikWeight = null;
	        }

	        if (ikjPath.get_kjPathWay() != null) {
	          var kjPath = ikjPath.get_kjPathWay();
	          this.currentColouredEdges_ikj_kj = highlightShortestPath(kjPath, intermediateColor_kj,this.path, this.colorEdgeMatrix);
						console.log("aufruf labels", this.edgelabels);
	          // currentColouredLabel_ikj_kj = highlightLabels(kjPath, intermediateColor_kj, this.edgelabels);
						this.currentColouredLabel_ikj_kj = highlightLabels(kjPath, this.edgelabels);
	        }

	        if (ikjPath.get_kjPathWeight() != null) {
	          kjWeight = ikjPath.get_kjPathWeight();

	        } else {
	          kjWeight = null;
	        }

	        updateDisplay_ikj(i, k, j, ikWeight, kjWeight,this.title, this.pathStr, this.sum);

	        // if (ikjPath.get_previousPathWay() != null) {
	        // var previousPath = ikjPath.get_previousPathWay();
	        // currentColouredEdges_ikj = highlightShortestPath_BOLT(previousPath, bigWidthEdge*1.5);
	        // //currentColouredLabel_ikj = highlightLabels(previousPath, highlightColor);
	        // }

	      }
	      if (k != this.currentKNode) {
	        if (this.k_destNode != null) {
	          resetSingleNode(this.k_destNode);
	        }
	        this.currentKNode = k;
	        this.k_destNode = getSelectedNode(k,this.node);
	        highlightSingleNode(this.k_destNode, nodeKcolor,"Station");
	      } else {
	        highlightSingleNode(this.k_destNode, nodeKcolor,"Station");
	      }

	    }

	    // stepCounter = stepCounter + 1;
		}
}

module.exports = NetworkSteps;
