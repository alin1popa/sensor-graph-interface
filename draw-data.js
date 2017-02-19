
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
	$("#container").append('<p>' + JSON.stringify(data) + '</p>');
}