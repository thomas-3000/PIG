class Edge{
	constructor(start, end, weight){
		this.start = start;
		this.end = end;
		this.weight = weight;
	}// end of constructor
	displayEgde(){
		console.log('start: '+this.start+' end: '+this.end+' weight: '+this.weight);
	}
}

class KthMatrix{
	
	constructor(kRound, matrix){
		this.infinity = 1000;
		this.kRound = kRound;
		this.size = matrix.length;
		this.matrix = matrix;
		this.displayMatrix();
	}// end of constructor
		
	//function
	initMatrix(){
		var arr = [];
		for (var i = 0; i < this.size; i++){
			arr.push([]);
			arr[i].push(new Array(this.size));
			for(var j = 0; j<this.size; j++){
				arr[i][j] = 10;
			}
		}
		return arr;
	}// end of initMatrix
	
	//function
	displayMatrix(){
		console.log('Matrix: '+this.kRound);
		var arrText = '';
		for (var i = 0; i<this.size; i++){
			for(var j = 0; j<this.size; j++){
				arrText+=this.matrix[i][j]+'		';
			}
			console.log(arrText);
			arrText = '';
			console.log('');
		}
	}// end displayMatrix
	
	updateWeight(start, end, weight){
		this.matrix[start][end] = weight;
	}
	
	getWeight(start, end){
		return this.matrix[start][end];
	}
}// end of class


//--------------------------------Test--------------------------------
// var weights = [
  	// [0, 1, 3],
 	// [0, 4, -4],
 	// [0, 2, 8],
 	// [1, 4, 7],
	// [1, 3, 1],
	// [2, 1, 4],
	// [3, 2, -5],
	// [3, 0, 2],
	// [4, 3, 6]
// ];
// var oneMatrix = new KthMatrix(3,weights);
// var edge = new Edge(1,2,15);

module.exports = KthMatrix;
