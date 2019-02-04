const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const D3Matrix = require('./d3matrix')

var w = 400;
var h = 400;

class metaComponent extends D3Component {
	initialize(node,props){
    const canvas = this.canvas = d3.select(node)
                                    .append("svg")
                                    .attr("width",w)
                                    .attr("height",h);

    var step = props['step'];
    var k = props['k'];
    var i = props['i'];
    var j = props['j'];
    var ignite = props['ignite'];

    var d3m = new D3Matrix(ignite,i,j,k);
  }
}
module.exports = metaComponent;
