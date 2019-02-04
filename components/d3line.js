const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 6000;
var w = 500;
var h = 500

class D3Line extends D3Component {
	initialize(node,props){
		const canvas = this.canvas = d3.select(node)
															.append('svg')
															.attr("width",w)
															.attr("height",h);

		const data = [1,2,3]

		canvas.append('circle')
			.attr('r', 20)
			.attr('cx',20)
			.attr('cy',20);

		canvas.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("width", 30)
			.attr("height", 40)
			.attr("x", (d,i) => {
				return i * (w/data.length);
			})
			.attr("y", 100);

		canvas.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.text(function(d) {
				return d;
			})
			.attr("x",function (d,i) {
				return i * (w/data.length) +10;
			})
			.attr("y", 150);
	}
	update(props, oldProps){

		this.canvas.selectAll('circle')
			.transition()
			.duration(2009)
			.attr('r', props['newRadius']);

		this.canvas.selectAll('rect')
			.transition()
			.duration(1000)
			.attr("x", (d,i) => {
				return 50 + 100*(d);
			})
	}
}

module.exports = D3Line;
