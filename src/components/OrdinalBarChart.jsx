import React from "react";
import d3_scale from "d3-scale";

/*
 * A bar chart with an ordinal x-axis and a linear y-axis
 */
export default React.createClass({
  getDefaultProps: function() {
    return {
      width: 200,
      height: 100,
      margin: {
        top: 15,
        right: 15,
        bottom: 25,
        left: 25
      }  
    };
  },
  render: function() {
    let { width, height, margin, data, getX, getY } = this.props;
    width = Math.max(width, data.length*60);
    // need the maximum y value
    let maxY = data.reduce((max, curr) => {
      let y = getY(curr);
      return y > max ? y : max;
    }, 0);

    let yScale = d3_scale.linear()
      .domain([0, maxY])
      .range([height, 0]);
    let xScale = d3_scale.band()
      .domain(data.map(d => getX(d)))
      .range([0, width])
      .padding(0.1);

    let bars = data.map((d, i) => {
      let x = xScale(getX(d));
      let y = yScale(getY(d));
      let barWidth = xScale.bandwidth();
      return (
        <Bar key={i}
             x={x}
             y={y}
             width={barWidth}
             height={height-y}
             fill="#8BC34A" />
      );
    });

    return (
      <svg width={margin.left + width + margin.right}
           height={margin.top + height + margin.bottom }>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <XAxis values={data.map(d => getX(d))}
                 scale={xScale}
                 height={height}
                 width={width} />
          <YAxis scale={yScale}
                 height={height} />
          {bars}
        </g>
      </svg>
    );
  }
});

let Bar = React.createClass({
  render: function() {
    let { x, y, width, height, fill } = this.props;
    return (
      <rect x={x} y={y} width={width} height={height} fill={fill} />
    );
  }
});

let XAxis = React.createClass({
  render: function() {
    let { values, scale, height, width } = this.props;
    let midbar = scale.bandwidth() / 2;
    let ticks = values.map((t,i) => {
      return (
        <g key={i}
           className="tick"
           transform={`translate(${scale(t) + midbar},0)`}>
          <line y2="6" x2="0"></line>
          <text dy="0.715em" y="9" x="0">
            {t}
          </text>
        </g>
      );
    });
    return (
      <g className="axis x"
         transform={`translate(0,${height})`}>
        <line x1="0" x2={width}></line>
        <g className="ticks">
          {ticks}
        </g>
      </g>
    );
  }
});

let YAxis = React.createClass({
  render: function() {
    let { scale, height } = this.props;
    let ticks = scale.ticks(5).map((t,i) => {
      return (
        <g key={i}
           className="tick"
           transform={`translate(0,${scale(t)})`}>
          <line x2="-6" y2="0"></line>
          <text dx="0.715em" y="5" x="-20">
            {t}
          </text>
        </g>
      );
    });
    return (
      <g className="axis y">
        <line y1="0" y2={height}></line>
        <g className="ticks">
          {ticks}
        </g>
      </g>
    );
  }
})