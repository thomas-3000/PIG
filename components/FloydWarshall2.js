const KthMatrix = require('./KthMatrix');


class Path{
	constructor(start, end, way, totalWeight){
		this.start = start;
		this.end = end;
		this.way = way;
		this.totalWeight = totalWeight;
	}
}

class FloydWarshall2{
	constructor(weights, numVertices){
		this.infinity = 1000;
		this.nullVal = null;

		this.allKMatrices = [];

		this.weights = weights;
		this.numVertices = numVertices;
		this.distances = this.initMatrix(this.infinity);
		this.pi = this.initPiMatrix(this.nullVal);
		this.path = this.initPiMatrix(this.nullVal);

		this.transfer();
		this.startMatrix = new KthMatrix(-1,this.copyMatrix(this.distances));
		this.allKMatrices.push(this.startMatrix);
		this.floydWarshallModified();
		this.getAllPaths();
		// this.displayMatrix(this.distances);
		console.log('-----------VorgÃ¤nger Matrix---------------');
		this.displayMatrix(this.pi);
	}// end of constructor


	initMatrix(value){
		var arr = [];
		for (var i = 0; i < this.numVertices; i++){
			arr.push([]);
			arr[i].push(new Array(this.numVertices));
			for(var j = 0; j<this.numVertices; j++){
				if(i!=j){
					arr[i][j] = value;
				}else{
				arr[i][j] = 0;
				}
			}
		}
		console.log('DONE MATRIX');
		return arr;
	}// end of initMatrix

	initPiMatrix(value){
		var arr = [];
		for (var i = 0; i < this.numVertices; i++){
			arr.push([]);
			arr[i].push(new Array(this.numVertices));
			for(var j = 0; j<this.numVertices; j++){
					arr[i][j] = value;
			}
		}
		console.log('DONE MATRIX');
		return arr;
	}// end of initMatrix

	transfer(){
		for(var i = 0; i<this.weights.length; i++){
			var start = this.weights[i][0];
			var end = this.weights[i][1];
			var weight = this.weights[i][2];
			this.distances[start][end] = weight;
			this.pi[start][end] = start;
		}
		console.log('DONE transfer');
	}//end transfer

	copyMatrix(oldMatrix){
		var newMatrix = this.initMatrix(this.infinity);
		for(var i = 0; i < this.numVertices; i++){
			for(var j = 0; j < this.numVertices; j++){
				newMatrix[i][j] = oldMatrix[i][j];
			}
		}
		return newMatrix;
	}

	displayMatrix(matrix){
		console.log('Matrix');
		var arrText = '';
		for (var i = 0; i<matrix.length; i++){
			for(var j = 0; j<matrix.length; j++){
				arrText+=matrix[i][j]+'	';
			}
			console.log(arrText);
			arrText = '';
			console.log('');
		}
	}// end displayMatrix

	floydWarshallModified(){
		for(var k = 0; k<this.numVertices; k++){
			for(var i = 0; i<this.numVertices; i++){
				for(var j = 0; j<this.numVertices;j++){
					if(i==j){
						continue;
					}
					if(this.distances[i][k] + this.distances[k][j]<this.distances[i][j]){
						this.distances[i][j] = this.distances[i][k] + this.distances[k][j];
						this.pi[i][j]=this.pi[k][j];
					}
				}// end of j-loop
			}// end of i-loop
			console.log('--------------');
			var newDistances = this.copyMatrix(this.distances);
			var kMatrix = new KthMatrix(k,newDistances);
			this.allKMatrices.push(kMatrix);
		} // end of k-loop
	}// end of floydWarshallModified

	getAllPaths(){
		for(var i = 0; i < this.pi.length;i++){
			for(var j = 0; j < this.pi.length;j++){
				if(i!=j){
					var weight = this.distances[i][j];
					var path = [];
					var u = i;
					var v = j;
					path.push(v);
					while(u!=v){
						v = this.pi[u][v];
						path.push(v);
					}// end of while loop
					if(path.length>1){
						path.reverse();
						var pathObject = new Path(i,j, path, weight);
						this.path[i][j] = pathObject;
					}
				}// end of if-else
			}// end of j-loop
		}//end of i-loop
	}// end getAllPaths

	getSinglePath(start, end){
		var path = this.path[start][end];
		if(path == null){
			console.log('no path');
		}
		var way = path.way;
		var dist = path.totalWeight;
		console.log('pair	dist		path');
		console.log(start+'->'+end+'	'+dist+'		'+way);
		return way;
	}

	getWeightPath(start, end){
		var path = this.path[start][end];
		if(path == null){
			console.log('no path');
		}
		var way = path.way;
		var dist = path.totalWeight;
		console.log('pair	dist		path');
		console.log(start+'->'+end+'	'+dist+'		'+way);
		return dist;
	}

	getWeight_k(k, i, j){
		if(k>this.allKMatrices.length){
			console.log('k is out of range');
			return;
		}
		if(k>-1){
			var kMatrix = this.allKMatrices[k];
			return kMatrix.getWeight(i,j);
		}else{
			return this.startMatrix[i][j];
		}

	}
	getAllMatrices(){
		return this.allKMatrices;
	}
}

//--------------------------------Test--------------------------------
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

var fw = new FloydWarshall2(weights, numVertices);

var allMatrices = fw.getAllMatrices();

console.log('-----------ALL STEPS-----------')
console.log(allMatrices)

module.exports = FloydWarshall2;
