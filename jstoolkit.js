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
	
	//alert(JSON.stringify(configAPI));
	
	// uradmanitor config 
	$.get('config/uradmonitor_measurements.json', function(data2) {
		uradmonitor_measurements = $.parseJSON(data2);
    }, 'text');
	$.get('config/uradmonitor_sensors.json', function(data3) {
		uradmonitor_sensors = $.parseJSON(data3);
    }, 'text');
}

function hslToRgb(h, s, l){
	h /= 255.0;
	s /= 255.0;
	l /= 255.0;
	
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return Math.round(r * 255)*0x10000 + Math.round(g * 255)*0x100  + Math.round(b * 255);
}

// call function to load config variables 
//loadConfigJSONs();
