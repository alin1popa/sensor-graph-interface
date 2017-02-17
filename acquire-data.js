
/* Detects the correct data source
 * Acquires and returns the correct data
 * Parameters:	sensorid = id string
				measurement = measurement type (const value)
				from, to = Unix time value
 * Return value: data[]
 */
 function jsDataCrossroad(sensorid, measurement, from, to){
	//TODO AJAX request from API
	
	//TODO 
	//callback function on success:
	// - set config struct
	// - data process
	// - data notify
 }
 
 /* Custom data processing
  * depending on the config struct
  * Parameters: data, configuration struct
  * Return value: true
  */
 function dataCustomProcessing(data, config){
	
	//TODO custom processing
	
	return true;
 }