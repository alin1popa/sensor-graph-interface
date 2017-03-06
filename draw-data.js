
const GRAPH = 1;


/* Draw container initialization
 * Will be called before drawing data in container
 * Parameters:	container = container id
 *				config = configuration struct
 * Return value: true
 */
function initDrawContainer(container, config){
	var result = false;
	//use config.type as control type
	
	if (!$("#"+container).exists()){
		result = false;
		return result;
	}
	
	if (config.type == GRAPH){
		//TODO init
		
		result = true;
	}
	
	return result;
}


/* Draw data in view control
 * Parameters:	container = container id
 *				config = config struct
 *				data[i] = dataset of (x-pos, y-pos)
 * Return value: true
 */
function drawDataInContainer(container, config, data){
	var result = false;
	//use config.setcount as number of datasets
	//use config.dimensions as data dimensions
	//use config.axislabels[] as label for each dimension
	//use config.colors[] as color for each dataset
	//use config.setlabels[] as label for each dataset
	
	if (!$("#"+container).exists()){
		result = false;
		return result;
	}
	
	if (config.type == GRAPH){
		//TODO draw
		
		result = true;
	}
	
	return result;
}

 /* Data notification handle
  * Should call draw functions
  * Parameters: data, configuration struct
  * Return value: true
  */
function newDataNotification(data, config){
	var cdata = new Array;
	var cdatat = new Array;
	$.each(data, function( key , elem){
		cdata[key] = parseFloat(elem.value.temperature);
		//cdatat[key] = parseFloat(elem.value.time);
	});
	//$("#testdata").html(JSON.stringify(data));
	
	/*new Chartist.Line('.ct-chart', {
		  labels: [  ],
		  series: [ cdata ]
		}, {
		  fullWidth: true,
		  chartPadding: {
			right: 40
		  }
	});*/
	//$("#container").append('<p>' + JSON.stringify(data) + '</p>');
	
	d3.csv('aster_data.csv', function(error, data) {
		//alert(data[0].label)
	});
	
	//d3.csv('aster_data.csv', function(error, data) {

		var k=0;
		
		var min = 999999;
		var max = -999999;

		var imgs = svg.selectAll("image").data([0]);
	imgs.enter()
	.append("svg:image")
	.attr("xlink:href", "therm2.jpg")
	.attr("x", -innerRadius*logofactor/2)
	.attr("y", -innerRadius*logofactor/2)
	.attr("width", innerRadius*logofactor)
	.attr("height", innerRadius*logofactor);
		
		data.forEach(function (d){
			if (d.value.temperature < min)
				min = d.value.temperature;
			if (d.value.temperature > max)
				max = d.value.temperature;
		});
	
		var val, r, g, b, h, s, v;
		var tempfactor = 2;
		//max = (max + min)*tempfactor;
		//min = min * tempfactor;
		
		var colorarr = ["#0d4a70",
						"#178ba6",
						"#69d0d4",
						"#ed8e00",
						"#f2ab6a",
						"#ffba00",
						"#0067ab",
						"#a30d00",
						"#009e97",
						"#ceb791",
						"#d44610"];
	
		//alert(hslToRgb(100, 100, 100).toString(16));
	
				  data.forEach(function(d) {  
					  
					val = Math.round(((d.value.temperature + (0-min))*tempfactor+20)*100)/100;
					  
					d.id     =  d.id;
					d.order  =  k++;
					//d.color  =  "#"+hslToRgb(160-(d.value.temperature-min)*160.0/(max-min), 200, 140).toString(16);
					d.color  =  "#"+hslToRgb(0, 200, 225-(d.value.temperature-min)*200.0/(max-min)).toString(16);
					//d.color  =  colorarr[k%11];
					d.weight =  1;
					d.score  =  (val);
					d.scorval = Math.round(d.value.temperature*100)/100;
					d.width  =  1;
					d.label  =  d.timestamp.substr(0,19).replace("T", " ");
					//d.label = hslToRgb((val-min)*(255/(max-min)), 255, 255).toString();
				  });
				  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
				  
				  var path = svg.selectAll(".solidArc")
					  .data(pie(data))
					.enter().append("path")
					  .attr("fill", function(d) { return d.data.color; })
					  .attr("class", "solidArc")
					  .attr("stroke", "gray")
					  .attr("d", arc)
					  .on('mouseover', tip.show)
					  .on('mouseout', tip.hide);
				/*
				  var outerPath = svg.selectAll(".outlineArc")
					  .data(pie(data))
					.enter().append("path")
					  .attr("fill", "none")
					  .attr("stroke", "gray")
					  .attr("class", "outlineArc")
					  .attr("d", outlineArc);  
				*/

				  // calculate the weighted mean score
				  
				  
				  var score = 
					data.reduce(function(a, b) {
					  //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
					  return a + (b.score * b.weight); 
					}, 0) / 
					data.reduce(function(a, b) { 
					  return a + b.weight; 
					}, 0);
					/*
				  svg.append("svg:text")
					.attr("class", "aster-score")
					.attr("dy", ".35em")
					.attr("text-anchor", "middle") // text-align: right
					.text(Math.round(score));*/

				//});
				
	$("#main_container").attr("style","");
}