var dimfactor = 1.0*4/5;
var logofactor = 1.8;

var width = Math.min(Math.min($(window).width(), $(window).height()), 900)*dimfactor,
    height = Math.min(Math.min($(window).width(), $(window).height()), 900)*dimfactor,
    radius = Math.min(width, height) / 2,
    innerRadius = 0.3 * radius;

//$("#draw_container").attr("style","width:"+width+";height:"+height);	
	
var projection = d3.geo.equirectangular().scale(185).translate([width/2, height/2]);
	
var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.width; });

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, 0])
  .html(function(d) {
    return d.data.label + ": <span style='color:orangered'>" + d.data.scorval + " °C</span>";
  });

var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(function (d) { 
    return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; 
  });

var outlineArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius);

var svg = d3.select("#draw_container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

svg.call(tip);


