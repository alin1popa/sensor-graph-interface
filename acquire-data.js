
/* Detects the correct data source
 * Acquires and returns the correct data
 * Parameters:	sensorid = id string
				measurement = measurement type (const value)
				from, to = Unix time value
 */
 function jsDataCrossroad(sensorid, measurement, fromx, tox){
	//AJAX request from API	
	$.ajax({
		type: 'GET',
		url: "http://data.uradmonitor.com/api/v1/devices/" + sensorid + "/" + measurement + "/" + (Date.now() - fromx) + "/" + (Date.now() - tox),
		dataType: 'json',
		headers: { 'Content-Type' : 'text/plain',
			'X-User-id':'www',
			'X-User-hash':'global' },
			
		//callback function on success:
		success: function(data) {
			// - set config struct
			var config = new Object;
			config.type = measurement;
			
			// - data process
			dataCustomProcessing(data,config);
			
			// - data notify
			newDataNotification(data,config);
		},
		async: true
	});
 }
 
 /* Custom data processing
  * depending on the config struct
  * Parameters: data, configuration struct
  * Return value: true
  */
 function dataCustomProcessing(data, config){
	// custom processing
	
	// apply factors: 0.01 cpm to usv/h conversion factor for the SI29BG tube
	if (config.type == "cpm")
		for (var i = 0; i < data.length; i++)
			data[i]["cpm"] *= 0.01;
		
	return true;
 }
 
 