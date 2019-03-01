
class Steps{
	constructor(floydWarshall){
		this.infinity = 1000;
		this.fWarshall = floydWarshall;
		this.numVertices = floydWarshall.numVertices;
		this.allSteps = [];
		this.calcAllSteps();
	}
	
	calcAllSteps(){
		var counter = 0;
		for(var k = 0; k<this.numVertices; k++){
			for(var i = 0; i<this.numVertices;i++){
				for(var j = 0; j<this.numVertices;j++){
					var weight = this.fWarshall.getWeight_k(k,i,j);
					if(weight<this.infinity){
						counter++;
						var singleStep=[counter, k, i, j, weight];
						this.allSteps.push(singleStep);
					}
				}
			}
		}
	}// end of calcAllSteps
	
	dispAllSteps(){
		console.log('counter	k	i	j	weight')
		for( var i = 0; i<this.allSteps.length; i++){
			var thisStep = this.allSteps[i];
			console.log(thisStep[0]+'	'+thisStep[1]+'	'+thisStep[2]+'	'+thisStep[3]+'	'+thisStep[4])
		}
	}
	
	getAllSteps(){
		return this.allSteps;
	}
	
	getIthStep(i){
		return this.allSteps[i-1];
	}
}

module.exports = Steps;
