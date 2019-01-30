const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 200;

class blankComponent extends D3Component {

  initialize(node, props) {
    const svg = this.svg = d3.select(node).append('svg')
                                        .attr("height",size)
                                        .attr("width",size);
    // svg.attr('viewBox', `0 0 ${size} ${size}`)
    //   .style('width', size)
    //   .style('height', size);

  }
}

module.exports = blankComponent;
