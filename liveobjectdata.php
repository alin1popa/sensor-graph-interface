<?php
	if( $_GET["sensorid"] && $_GET["fromx"] && $_GET["tox"] ) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://liveobjects.orange-business.com/api/v0/data/search/hits");
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Accept: application/json', 'X-API-KEY: 7181573bce384c33be9e5234d04a5302'));   
		curl_setopt($ch, CURLOPT_POSTFIELDS, '{"size" : 10000,"query":{"bool":{ "must": [ {"bool": { "should": [ {"term": {"streamId": "uradmonitor:'.$_GET["sensorid"].'"}}, {"term": {"streamId": "urn:lo:nsid:uradmonitor:'.urldecode($_GET["sensorid"]).'"}} ] }}, {"range" : { "timestamp" : { "gte" : "'.urldecode($_GET["fromx"]).'", "lt" : "'.urldecode($_GET["tox"]).'", "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd HH:mm:ss" } }} ] } } }');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
		$result = curl_exec($ch);
		echo $result;
	}else{
		echo "Error code 2634: invalid get parameters";
	}
?>
