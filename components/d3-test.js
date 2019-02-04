const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 6000;
var w = 500;
var h = 500

class D3Test extends D3Component {
	initialize(node, props){
		const svg = this.svg = d3.select(node)
															.append('svg')
															.attr("width",w)
															.attr("height",h);
		const data = [1,2,3,4,5,6,7,8,9,10];


		//const circle = this.circle = svg
			//.append('circle');

			/*circle
			//.attr('r',props.radius)
			.attr('r',20)
			.attr('cx',100)
			.attr('cy',40)
			*/
		// datenpunkte bekommen !alle! rad 10
		svg
			.append('g')
			.selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.attr('r',10)
			.attr('cy',(d) => {
				return 30*d;
			})
			.attr('cx', (d) => {
				return 30*d;
			});

		svg
			.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('x', function(d,i){
				return i*100
			})
			.attr('y', function(d,i){
				return i*100
			})
			.attr('width', 10)
			.attr('height', 10)
			.attr('fill',  "red");

	}

	update(props, oldProps){
		this.svg.selectAll('circle')
			.transition()
			.duration(4000)
			.attr('cx', (d) =>{
				return Math.random()*300+20;
			})
			.attr('cy', (da) =>{
				return Math.random()*300+20;
			})
			.attr('r', props['test']);

	}
}

module.exports = D3Test;
