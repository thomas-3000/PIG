class NetWork{
	constructor(links, nodes, width, height){
		this.links = links;
		this.nodes = nodes;
		this.width = width;
		this.height = height;
		
		this.svg = this.generateSVG();
		this.force = this.generateForce();
		this.link = this.generateLink();
		this.node = this.generateNodes();
		this.nodelabels = this.generatNodeLabels();
		this.edgePaths = this.generateEdgePath();
		this.edgeLabels = this.generateEdgeLabels();
	}
	
	generateSVG(){
		var svg =  d3.select('body').append('svg')
				.attr('width', this.width)
				.attr('height', this.height);
		return svg;
	}
	
	
	generateForce(){
		var force = d3.layout.force()
        			.size([this.width, this.height])
        			.nodes(d3.values(this.nodes))
        			.links(this.links)
        			.on("tick", tick)
        			.linkDistance(300)
        			.start();
        return force;
	}
	
	generateLink(){
		var link = this.svg.append('g').selectAll('link')
        			.data(this.links)
        			.enter().append('svg:line')
        			.attr('class', 'link')
        			.attr("id",function(d,i) {return 'edge'+i})
        			.attr('marker-end','url(#arrow)');
        			
        	link.append("title")
            	.text(function (d) {return d.type;});
        return link;		       
	}
	
	generateNodes(){
		var node = this.svg.selectAll('circle.node')
	        			.data(this.force.nodes())
	        			.enter().append('circle')
	        			.attr('class', 'node')
	        			.attr('r', this.width*0.025);
	     return node;
	}
	
	generatNodeLabels(){
		 var nodelabels = this.svg.selectAll(".nodelabel") 
			       .data(this.force.nodes())
			       .enter()
			       .append("text")
			       .attr({"x":function(d){return d.x;},
			              "y":function(d){return d.y;},
			              "class":"nodelabel",
			              'font-size':30,
			              "stroke":"black"})
			       .text(function(d){return d.name;});
		return nodelabels;
		
	}
	
	generateEdgePath(){
		var edgepaths = this.svg.selectAll(".edgepath")
			        .data(this.links)
			        .enter()
			        .append('path')
			        .attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
			               'class':'edgepath',
			               'fill-opacity':0,
			               'stroke-opacity':0,
			               'fill':'blue',
			               'stroke':'red',
			               'id':function(d,i) {return 'edgepath'+i}})
			        .style("pointer-events", "none");
		return edgepaths;
	}
	
	generateEdgeLabels(){
	    var edgelabels = this.svg.selectAll(".edgelabel")
		        .data(this.links)
		        .enter()
		        .append('text')
		        .style("pointer-events", "none")
		        .attr({'class':'edgelabel',
		               'id':function(d,i){return 'edgelabel'+i},
		               'dx':100,
		               'dy':17,
		               'font-size':20,
		               'fill':'#aaa'});
		
			    edgelabels.append('textPath')
			        .attr('xlink:href',function(d,i) {return '#edgepath'+i})
			        .style("pointer-events", "none")
			        .text(function(d){return d.typ});
		return edgelabels;
	}
	
	perform(){
        			this.node.attr('cx', function(d){return d.x;})
        				.attr('cy', function(d){return d.y;})
        				.call(this.force.drag);
        				
        			this.nodelabels.attr("x", function(d) { return d.x-6.75; }) 
                  	.attr("y", function(d) { return d.y+6; });
        				
        			this.link.attr('x1', function(d){ return d.source.x;})
	        			.attr('y1', function(d){ return d.source.y;})
	        			.attr('x2', function(d){ return d.target.x;})
	        			.attr('y2', function(d){ return d.target.y;});
	        		
	        		this.edgePaths.attr('d', function(d) { var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
                                           //console.log(d)
                               return path});       

		        this.edgeLabels.attr('transform',function(d,i){
		            if (d.target.x<d.source.x){
		                var bbox = this.getBBox();
		                var rx = bbox.x+bbox.width/2;
		                var ry = bbox.y+bbox.height/2;
		                return 'rotate(180 '+rx+' '+ry+')';
		                }
		            else {
		                return 'rotate(0)';
		                }
		        });
        		}
}