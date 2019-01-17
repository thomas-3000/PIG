class Network{
	constructor(links, nodes, width, height){
		this.links = links;
		this.nodes = nodes;
		this.width = width;
		this.height = height;
		
		this.svg = this.generateSVG();
		this.force = this.generateForce();
		this.link = this.generateLink();
		this.nodeObgject = this.generateNodes();
		
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
        			.links(links)
        			.on("tick", tick)
        			.linkDistance(300)
        			.start();
        return force;
	}
	
	generateLink(){
		var link = svg.append('g').selectAll('link')
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
		var node = svg.selectAll('circle.node')
	        			.data(force.nodes())
	        			.enter().append('circle')
	        			.attr('class', 'node')
	        			.attr('r', this.width*0.025);
	     return node;
	}
	
	generatNodeLabels{
		 var nodelabels = svg.selectAll(".nodelabel") 
			       .data(force.nodes())
			       .enter()
			       .append("text")
			       .attr({"x":function(d){return d.x;},
			              "y":function(d){return d.y;},
			              "class":"nodelabel",
			              'font-size':30,
			              "stroke":"black"})
			       .text(function(d){return d.name;});
		
	}
}