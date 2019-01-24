class FitData{
	constructor(dataSet, height, numOfNodes){
		this.dataSet = dataSet;
		this.numOfNodes = numOfNodes;
		this.xy = [];
		this.links = [];
		this.radius = (height/2)-50;
		
		this.calculate();
		this.fitData();
		this.nodes = this.extractNodes();
		this.fuseData();
		
	}
	
	calculate(){
		var factor = 1;
		var circle = 2*Math.PI;
		var partition = circle/this.numOfNodes;
		for(var i = 0; i<this.numOfNodes; i++){
			var partitionAncle = partition + partition * i;
			var xVal = this.radius*Math.cos(partitionAncle)*factor;
			if(partitionAncle > 0 && partitionAncle < Math.PI){
				var yVal = this.radius*Math.sqrt(1-Math.pow(Math.cos(partitionAncle),2))*factor;
			}else{
				var yVal = -(this.radius*Math.sqrt(1-Math.pow(Math.cos(partitionAncle),2)))*factor;
			}
			var coordinates = [xVal, yVal];
			this.xy.push(coordinates);
		}
		console.log("this.xy");
		console.log(this.xy);
	}
	
	fuseData(){
		console.log("xyValue");
		for (var i = 0 ; i< this.numOfNodes; i++){
			var xyValue = this.xy[i];
			var x = xyValue[0];
			var y = xyValue[1];
			
			console.log(xyValue);
			this.nodes[i].x = x;
			this.nodes[i].y = y;
			console.log(this.nodes[i]);
		}
		console.log("this.nodes");
		console.log(this.nodes);
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
 		console.log("nodes");
 		console.log(nodes);
 		console.log("nodes");
 		return nodes;
	}
	
	getlinkData(){
		return this.links;
	}
	
	getNodesData(){
		return this.nodes;
	}
}
