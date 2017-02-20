/* Checks if a jQuery selector finds the object
 * Call: $("selector").exists()
 * Return value: 	false if it does NOT exist
 *					reference to object if it DOES exist
*/
$.fn.exists = function(){
    return this.length > 0 ? this : false;
}

// global config variables
var uradmonitor_measurements = new Object;
var uradmonitor_sensors = new Object;
var configAPI = new Object;

// read the config files and load the variables
function loadConfigJSONs(){
	
	// general config
	$.get('config/config.json', function(data1) {
		configAPI = $.parseJSON(data1);
    }, 'text');
	
	// uradmanitor config 
	$.get('config/uradmonitor_measurements.json', function(data2) {
		uradmonitor_measurements = $.parseJSON(data2);
    }, 'text');
	$.get('config/uradmonitor_sensors.json', function(data3) {
		uradmonitor_sensors = $.parseJSON(data3);
    }, 'text');
}

// call function to load config variables 
loadConfigJSONs();
