
/* Detects the correct data source
 * Acquires and returns the correct data
 * Parameters:	sensorid = id string
				measurement = measurement type (const value)
				from, to = Unix time value
 */
 function jsDataCrossroad(sensorid, measurement, fromx, tox, mode){
	
	// uradmonitorAPI
	if(mode.uradmonitorAPI == true){
		uradmonitorAPI(sensorid, measurement, fromx, tox);
	}
	
	// liveobjectAPI
	if(mode.liveobjectAPI == true){
		if (mode.securephp == true){
			liveobjectAPIphp(sensorid, measurement, fromx, tox);
		}else{
			liveobjectAPIjs(sensorid, measurement, fromx, tox);
		}
	}
	
 }
 
 // API for uradmonitor
 function uradmonitorAPI(sensorid, measurement, fromx, tox){
	//AJAX request from API
	
	// transform date in unix time
	var fromi = Math.floor(Date.now()/ 1000) - parseInt((new Date(fromx).getTime() / 1000).toFixed(0));
	var toi = Math.floor(Date.now()/ 1000) - parseInt((new Date(tox).getTime() / 1000).toFixed(0));
	
	$.ajax({
		type: 'GET',
		url: configAPI.uradmonitor.url + sensorid + "/" + measurement + "/" +  fromi + "/" + toi,
		dataType: 'json',
		headers: { 'Content-Type' : 'text/plain',
			'X-User-id' : 'www',
			'X-User-hash' : 'global' },
			
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
 
 // API for liveobject js
 function liveobjectAPIjs(sensorid, measurement, fromx, tox){
	//AJAX request from API	
	$.ajax({
		type: 'POST',
		//url: configAPI.liveobject.url,
		url: "https://liveobjects.orange-business.com/api/v0/data/search/hits",
		data: '{ \
				"size" : 10000, \
				"sort" : [ \
						{ "timestamp" : {"order" : "asc"}}, \
						"_score" \
					], \
				"query": { \
					"bool": { \
						"must": [ \
							{"bool": { \
								"should": [ \
									{"term": {"streamId": "uradmonitor:' + sensorid + '"}}, \
									{"term": {"streamId": "urn:lo:nsid:uradmonitor:' + sensorid + '"}} \
								] \
							}}, \
							{"range" : { \
								"timestamp" : { \
									"gte" : "' + fromx + '", \
									"lt" : "' + tox + '", \
									"format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd HH:mm:ss" \
								} \
							}}, \
							{"script" : { \
								   "script" : { \
									"inline": "(doc[\'timestamp\']/1000) % (60*110) < 61", \
									"lang": "expression" \
												} \
								}} \
						] \
					} \
				} \
			}',
		dataType: 'json',
		headers: { 'Content-Type' : 'application/json',
			'Accept' : 'application/json',
			'X-API-KEY' : '7181573bce384c33be9e5234d04a5302' },
			
		//callback function on success:
		success: function(data) {
			
			// - set config struct
			var config = new Object;
			config.type = measurement;
			
			// - data process
			//dataCustomProcessing(data,config);
			
			// - data notify
			newDataNotification(data,config);
		},
		async: true
	});
 }
 
 // API for liveobject php
 function liveobjectAPIphp(sensorid, measurement, fromx, tox){
	//AJAX request from API	
	$.ajax({
		type: 'GET',
		url: 'liveobjectdata.php',
		data: 'sensorid=' + encodeURIComponent(sensorid) + '&fromx=' + encodeURIComponent(fromx) + '&tox=' + encodeURIComponent(tox),
		dataType: 'json',
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
 
 