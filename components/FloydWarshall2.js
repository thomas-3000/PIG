const KthMatrix = require('./KthMatrix');

class Path{
	constructor(start, end, way, totalWeight){
		this.start = start;
		this.end = end;
		this.way = way;
		this.totalWeight = totalWeight;
	}
	getWay(){
		return this.way;
	}
	
	getWeight(){
		return this.totalWeight;
	}
}
class ikjPath{
	constructor(i,j,k,ikPath, kjPath, previousPath, resultPath){
		this.i = i;
		this.k = j;
		this.j = j;
		this.ikPath = ikPath;
		this.kjPath = kjPath;
		this.previousPath = previousPath;
		if(ikPath != null && kjPath !=null){
			this.ikj_weight = ikPath.getWeight() + kjPath.getWeight();
		}else if(ikPath != null && kjPath ==null){
			this.ikj_weight = ikPath.getWeight();
		}else if (ikPath == null && kjPath !=null){
			this.ikj_weight = kjPath.getWeight();
		}else{
			this.ikj_weight = null;
		}
		if(previousPath != null){
			this.previousPath_weight = previousPath.getWeight();
		}
		this.resultPath  = resultPath;
		this.disp();
	}
	disp(){
		console.log("i,k,j:	", this.i, this.k, this.j);
		var ik = this.ikPath == null ? null : this.ikPath.getWay();
		console.log("ikPath:	", ik);
		
		var kj = this.kjPath == null ? null : this.kjPath.getWay();
		console.log("kjPath:	", kj);
		
		var previous = this.previousPath == null ? null : this.previousPath.getWay();
		console.log("previousPath:	", previous);
		
		var result = this.resultPath == null ? null : this.resultPath.getWay();
		console.log("resultPath", result);
		
	}
	get_i(){
		return this.i;
	}
	get_j(){
		return this.j;
	}
	get_k(){
		return this.k;
	}
	
	get_ikPathWay(){
		if(this.ikPath == null){
			return null;
		}else{
			return this.ikPath.getWay();
		}
	}
	get_kjPathWay(){
		if(this.kjPath == null){
			return null;
		}else{
			return this.kjPath.getWay();
		}
	}
	
	
	get_ikPathWeight(){
		if(this.ikPath == null){
			return null;
		}else{
			return this.ikPath.getWeight();
		}
	}
	get_kjPathWeight(){
		if(this.kjPath == null){
			return null;
		}else{
			return this.kjPath.getWeight();
		}
	}
	
	get_previousPathWay(){
		if(this.previousPath == null){
			return null;
		}else{
			return this.previousPath.getWay();
		}
	}
	

	
	get_resultPathWay(){
		return this.resultPath.getWay();
	}
	
	get_resultPath(){
		if(this.resultPath == null){
			return null;
		}else{
			return this.resultPath;
		}
	}
	
	
	get_ikj_weight(){
		return this.ikj_weight();
	}
	
	get_previousPath_weight(){
		return this.previousPath_weight();
	}
	
	
}

class FloydWarshall2{
	constructor(weights, numVertices){
		this.infinity = 1000;
		this.nullVal = null;
		
		this.allKMatrices = [];
		this.predecessorMatrices = [];//
		
		this.weights = weights;
		this.numVertices = numVertices;
		this.distances = this.initMatrix(this.infinity);
		this.startdistanceMatrix = this.initMatrix(this.infinity);
		this.pi = this.initPiMatrix(this.nullVal);
		this.startPredecessorMatrix  = this.initPiMatrix(this.nullVal);
		this.path = this.initPiMatrix(this.nullVal);
		
		this.allKPathMatrix = [];
		
		
		this.transfer();
		this.startMatrix = new KthMatrix(-1,this.startdistanceMatrix);
		
		
		this.floydWarshallModified();
		this.getAllPaths();
		this.iterateAllPathsMatrices();
		this.startPathMatrix = this.initPathMatrix();
		// this.displayMatrix(this.distances);
		console.log('-----------Vorgänger Matrix---------------');
		console.log(this.startPathMatrix);
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
			this.startdistanceMatrix[start][end] = weight;
			this.pi[start][end] = start;
			this.startPredecessorMatrix[start][end] = start;
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
			var newPath = this.copyMatrix(this.pi);
			
			var kPathMatrix = new KthMatrix(k,newPath);
			console.log("PATH");
			this.displayMatrix(kPathMatrix);
			this.predecessorMatrices.push(kPathMatrix);
			
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
	
	selectPathOverK(start, dest, k){
		currentDistance = k>0? this.getDistMatixAtK(k-1) : this.getDistMatixAtK(0);
		newDistance = this.getDistMatixAtK(k);
	}
	
	iterateAllPathsMatrices(){
		for (var i = 0; i<this.predecessorMatrices.length; i++){
			
			var predecessorMatrix = this.getPredecessorMatrixAtK(i);
			var distances = this.getDistMatixAtK(i);
			var kPaths = this.getAllPaths_K(i, predecessorMatrix, distances);
			this.allKPathMatrix.push(kPaths);
			console.log("kPaths");
			console.log(kPaths);
		}
	}
	
	initPathMatrix(){
		var distances = this.startMatrix.getMatrix();
		return this.getAllPaths_K(-1, this.startPredecessorMatrix, distances);
	}
	
	getPathStartDestAtK(start, dest, k){
		thisPathMatrix = this.getPathMatrixAtK(k);
		pathObject = thisPathMatrix[start][dest];
		return pathObject.getWay();
	}
	
	getPathWeightStartDestAtK(start, dest, k){
		//(Path[][]) thisPathMatrix -> pathObject.getWeight -> Double: Weight of start-dest-Path
		thisPathMatrix = this.getPathMatrixAtK(k);
		pathObject = thisPathMatrix[start][dest];
		return pathObject.getWeight();
	}
	
	// to get the current Distance between start and dest
	getDistStartDestAtK(start, dest, k){
		var thisDistMatrix = this.getDistMatixAtK(k);
		return thisDistMatrix[start][dest];
	}
	
	
	getPredecessorMatrixAtK(selectK){
		// list<KthMatrix> predecessorMatrices -> (KthMatrix) kthMatrixPredecessor.getMatrix -> matrix[][] -> Integer (Predecesso)
		var kthMatrixPredecessor = this.predecessorMatrices[selectK];
		return kthMatrixPredecessor.getMatrix();
	}
	
	getPathMatrixAtK(){
		// list<KthMatrix> allKPathMatrix -> (KthMatrix) kthMatrixPath.getMatrix -> matrix[][] -> Object (new Path)
		var kthMatrixPath = this.allKPathMatrix[selectK];
		return kthMatrixPath.getMatrix();
	}
	
	getDistMatixAtK(selectK){
		// list<KthMatrix> allKMatrices ->  (KthMatrix) kthMatrixDist.getMatrix() -> matrix[][] -> Integer (Distance)
		var kthMatrixDist = this.allKMatrices[selectK];
		return kthMatrixDist.getMatrix();
	}
	
	getAllPaths_K(selectK, predecessorMatrix, distances){	
		// var predecessorMatrix = this.getPredecessorMatrixAtK(selectK);
		// var distances = this.getDistMatixAtK(selectK);
	
		var kPaths = this.initPiMatrix(this.nullVal);
		for(var i = 0; i<predecessorMatrix.length;i++){
			for(var j = 0; j<predecessorMatrix.length; j++){
				if(i!=j){
					var weight = distances[i][j];
					var path = [];
					var u = i;
					var v = j;
					path.push(v);
					while(u!=v){
						v = predecessorMatrix[u][v];
						if(v == this.nullVal){
							break;
						}
						path.push(v);
					}
					if(path.length>1){
						path.reverse();
						var pathObject = new Path(i,j, path, weight);
						kPaths[i][j] = pathObject;
					}
				}// end of if-else
			}//2nd loop
		}//first loop
		
		return kPaths;
	}
	
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
	
	getPathKthPath(k, start, end){
		kPathMatrix = this.predecessorMatrices
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
	
	getPathMatricex(){
		return this.predecessorMatrices;
	}
	
	// new Code
	findPathsOverVertexK(step){
		var counter  = step[0];
		var k  = step[1];
		var iStart  = step[2];
		var jDest  = step[3];
		var w  = step[4];
		
		var previouseMatrix = [];
		var resultMatrixOfK = this.allKMatrices[k].getMatrix();
		var previousPathMatrix = [];//+++++++
		var resultPathMatrixOfK = this.allKPathMatrix[k];
		
		if(k == 0){
			previouseMatrix = this.startMatrix.getMatrix();
			previousPathMatrix = this.startPathMatrix;
		}
		if(k>0){
			previouseMatrix = this.allKMatrices[k-1].getMatrix();
			previousPathMatrix = this.allKPathMatrix[k-1];
		}
		console.log("=============K-PATH STE==========: ",k);
		
		console.log("previouseMatrix");
		this.displayMatrix(previouseMatrix);
		
		var currentWeight = previouseMatrix[iStart][jDest];
		var resultWeight  = resultMatrixOfK[iStart][jDest];
		var ikWeight = previouseMatrix[iStart][k];
		var kjWeight = previouseMatrix[k][jDest];
		// console.log("currentWeight", currentWeight);
		// console.log("resultWeight", resultWeight);
		// console.log("ikWeight", ikWeight);
		// console.log("kjWeight", kjWeight);
		var currentPath = previousPathMatrix[iStart][jDest];
		var resultPath = resultPathMatrixOfK[iStart][jDest];
		var ikPath = previousPathMatrix[iStart][k];
		var kjPath = previousPathMatrix[k][jDest];
		
		console.log("currentPath", currentPath);
		console.log("resultPath", resultPath);
		// console.log("ikPath", ikPath);
		// console.log("kjPath", kjPath);
		
		return new ikjPath(iStart,jDest,k, ikPath, kjPath, currentPath,resultPath);
	}
}
module.exports = FloydWarshall2;