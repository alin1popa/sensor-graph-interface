/* Checks if a jQuery selector finds the object
 * Call: $("selector").exists()
 * Return value: 	false if it does NOT exist
 *					reference to object if it DOES exist
*/
$.fn.exists = function(){
    return this.length > 0 ? this : false;
}

