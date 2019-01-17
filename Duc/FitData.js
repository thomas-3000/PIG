class FitData{
	constructor(dataSet){
		this.dataSet = dataSet;
		this.links = [];
		
		this.fitData();
		this.nodes = this.extractNodes();
	}
	
	fitData(){
		for(var i = 0; i<this.dataSet.length;i++){
			var step = this.dataSet[i];
			var start = step[0].toString();
			var end = step[1].toString();
			var weight = step[2].toString();
			var edge = {source: start, target: end, typ: weight};
			this.links.push(edge);
		}
		console.log(this.links);
	}
	
	extractNodes(){
		var nodes = {};
		this.links.forEach(function(link){
        			link.source = nodes[link.source] ||
        			(nodes[link.source]={name: link.source});
        			link.target = nodes[link.target]||
        			(nodes[link.target]={name: link.target});
 		});
 		return nodes;
	}
	
	getlinkData(){
		return this.links;
	}
	
	getNodesData(){
		return this.nodes;
	}
}
