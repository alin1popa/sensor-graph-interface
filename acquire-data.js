
/* Detects the correct data source
 * Acquires and returns the correct data
 * Parameters:	sensorid = id string
				measurement = measurement type (const value)
				from, to = Unix time value
 * Return value: data[]
 */
 function jsDataCrossroad(sensorid, measurement, fromx, tox){
	//TODO AJAX request from API	
	$.ajax({
		type: 'GET',
		url: "http://data.uradmonitor.com/api/v1/devices/" + sensorid + "/" + measurement + "/" + (Date.now() - fromx) + "/" + (Date.now() - tox),
		dataType: 'json',
		headers: { 'Content-Type' : 'text/plain',
			'X-User-id':'www',
			'X-User-hash':'global' },
		success: function(data) { 
			// apply factors: 0.01 cpm to usv/h conversion factor for the SI29BG tube
			if (measurement == "cpm")
				dataCustomProcessing(data, "cpm");
			
			document.write(data);
		},
		async: true
	});
	return data;
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
	if (config == "cpm")
		for (var i = 0; i < data.length; i++)
			data[i][config] *= 0.01;
	return true;
 }
 
 