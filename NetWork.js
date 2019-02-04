const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const FitData = require('./FitData');

const w = 600;
const h = 600;

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

const fitData = new FitData(weights, h, numVertices);
var links = fitData.getlinkData();
var nodes = fitData.getNodesData();


class Network extends D3Component {
	initialize(node,props){
    const canvas = this.canvas = d3.select(node)
                                    .append("svg")
                                    .attr("width",w)
                                    .attr("height",h);

		var radius = 10;


		var force = d3.forceSimulation(d3.values(nodes))
		    .force("charge", d3.forceManyBody())
		    .force("link", d3.forceLink(links))
				// CHANGED force center
		    .force('center', d3.forceCenter(w / 2, h / 2));

		// var force = d3.forceSimulation();
    //     			//.size([w, h])
		//
		// force.nodes(d3.values(nodes))
  	// 		//.links(links)
  	// 		//.on("tick", tick)
  	// 		//.linkDistance(400)
  	// 		//.start();
		console.log("NETWORK: nodes",nodes);
		console.log("NETWORK: fnodes",force.nodes());

		canvas.selectAll('circle.node')
			.attr("class","node")
			.data(force.nodes())
			.enter().append('circle')
			.attr('class', 'node')
			.attr('r', w*0.025)
			.attr('cx', function(d,i) {return d.x; })
			.attr('cy', function(d,i) {return d.y; });

		canvas.append('g').selectAll('link')
			.data(links)
			.enter().append('svg:line')
			.attr('class', 'link')
			.attr("id",function(d,i) {return 'edge'+i})
			// der url arrow muss glaube in der css definiert werden
			.attr('marker-end','url(#arrow)')
			.append("title")
	      	.text(function (d) {return d.type;});

		canvas.selectAll(".nodelabel")
     .data(force.nodes())
     .enter()
     .append('text')
		 .text(function(d){return d.name;})
		 // CHANGED to correct x,y coordinates
     .attr('x',function(d){return d.x+15;})
		 .attr("y",function(d){return d.y-20;})
		 .attr("class","nodelabel")
		 .attr('font-size',30)
		 .attr("stroke","black");

		console.log("NETW links:",links);
		canvas.selectAll(".edgepath")
			 .data(links)
			 .enter()
			 .append('path')
			 .attr('d', function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y})
				.attr('class','edgepath')
				// CHANGED Opacity
				.attr('fill-opacity',1)
				.attr('stroke-opacity',1)
				.attr('fill','blue')
				.attr('stroke','red')
				.attr('id',function(d,i) {return 'edgepath'+i})
			 .style("pointer-events", "none");

		//
		canvas.selectAll(".edgelabel")
		        .data(links)
		        .enter()
		        .append('text')
						.text(function(d){return d.typ})
		        .style("pointer-events", "none")
		        .attr('class','edgelabel')
						.attr('id',function(d,i){return 'edgelabel'+i})
						// CHANGED
		        .attr('dx',function(d){ return (d.source.x+d.target.x) /2})
						.attr('dy',function(d){ return (d.source.y+d.target.y) /2})

						.attr('font-size',20)
						.attr('fill','#aaa')
						.append('textPath')
			      .attr('xlink:href',function(d,i) {return '#edgepath'+i})
			      .style("pointer-events", "none");
	}
	update(props, oldProps){

	}
}

module.exports = Network;

//
// class NetWork{
// 	constructor(links, nodes, width, height){
// 		this.radius = 10;
// 		this.links = links;
// 		this.nodes = nodes;
// 		this.width = width;
// 		this.height = height;
//
//
// 		this.svg = this.generateSVG();
// 		this.force = this.generateForce();
// 		this.link = this.generateLink();
// 		this.node = this.generateNodes();
// 		this.nodelabels = this.generatNodeLabels();
// 		this.edgePaths = this.generateEdgePath();
// 		this.edgeLabels = this.generateEdgeLabels();
// 	}
//
//
// 	generateSVG(){
// 		var svg =  d3.select('body').append('svg')
// 				.attr('width', this.width)
// 				.attr('height', this.height);
// 		return svg;
// 	}
//
//
// 	generateForce(){
// 		var force = d3.layout.force()
//         			.size([this.width, this.height])
//         			.nodes(d3.values(this.nodes))
//         			.links(this.links)
//         			.on("tick", tick)
//         			.linkDistance(400)
//         			.start();
//         return force;
// 	}
//
// 	generateLink(){
// 		var link = this.svg.append('g').selectAll('link')
//         			.data(this.links)
//         			.enter().append('svg:line')
//         			.attr('class', 'link')
//         			.attr("id",function(d,i) {return 'edge'+i})
//         			.attr('marker-end','url(#arrow)');
//
//         	link.append("title")
//             	.text(function (d) {return d.type;});
//         return link;
// 	}
//
// 	generateNodes(){
// 		var node = this.svg.selectAll('circle.node')
// 	        			.data(this.force.nodes())
// 	        			.enter().append('circle')
// 	        			.attr('class', 'node')
// 	        			.attr('r', this.width*0.025)
// 	        			.attr('cx', function(d) { console.log(d.x); return d.x; })
// 	        			.attr('cy', function(d) { console.log(d.y); return d.y; });
// 	     return node;
// 	}
//
// 	generatNodeLabels(){
// 		 var nodelabels = this.svg.selectAll(".nodelabel")
// 			       .data(this.force.nodes())
// 			       .enter()
// 			       .append("text")
// 			       .attr({"x":function(d){return d.x;},
// 			              "y":function(d){return d.y;},
// 			              "class":"nodelabel",
// 			              'font-size':30,
// 			              "stroke":"black"})
// 			       .text(function(d){return d.name;});
// 		return nodelabels;
//
// 	}
//
// 	generateEdgePath(){
// 		var edgepaths = this.svg.selectAll(".edgepath")
// 			        .data(this.links)
// 			        .enter()
// 			        .append('path')
// 			        .attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
// 			               'class':'edgepath',
// 			               'fill-opacity':0,
// 			               'stroke-opacity':0,
// 			               'fill':'blue',
// 			               'stroke':'red',
// 			               'id':function(d,i) {return 'edgepath'+i}})
// 			        .style("pointer-events", "none");
// 		return edgepaths;
// 	}
//
// 	generateEdgeLabels(){
// 	    var edgelabels = this.svg.selectAll(".edgelabel")
// 		        .data(this.links)
// 		        .enter()
// 		        .append('text')
// 		        .style("pointer-events", "none")
// 		        .attr({'class':'edgelabel',
// 		               'id':function(d,i){return 'edgelabel'+i},
// 		               'dx':100,
// 		               'dy':17,
// 		               'font-size':20,
// 		               'fill':'#aaa'});
//
// 			    edgelabels.append('textPath')
// 			        .attr('xlink:href',function(d,i) {return '#edgepath'+i})
// 			        .style("pointer-events", "none")
// 			        .text(function(d){return d.typ});
// 		return edgelabels;
// 	}
//
// 	perform(){
//         			this.node.attr('cx', function(d){return d.x;})
//         				.attr('cy', function(d){return d.y;})
//         				//.call(this.force.drag);
//
//         			this.nodelabels.attr("x", function(d) { return d.x-6.75; })
//                   	.attr("y", function(d) { return d.y+6; });
//
//         			this.link.attr('x1', function(d){ return d.source.x;})
// 	        			.attr('y1', function(d){ return d.source.y;})
// 	        			.attr('x2', function(d){ return d.target.x;})
// 	        			.attr('y2', function(d){ return d.target.y;});
//
// 	        		this.edgePaths.attr('d', function(d) { var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
//                                            //console.log(d)
//                                return path});
//
// 		        this.edgeLabels.attr('transform',function(d,i){
// 		            if (d.target.x<d.source.x){
// 		                var bbox = this.getBBox();
// 		                var rx = bbox.x+bbox.width/2;
// 		                var ry = bbox.y+bbox.height/2;
// 		                return 'rotate(180 '+rx+' '+ry+')';
// 		                }
// 		            else {
// 		                return 'rotate(0)';
// 		                }
// 		        });
//         		}
// }
