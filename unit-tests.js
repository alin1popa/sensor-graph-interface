QUnit.test( "QUnit Test", function( assert ) {
  var value = "hello";
  assert.equal( value, "hello", "Testing module is up and running" );
});

QUnit.module( "Data draw" );
QUnit.test( "Init and Draw", function( assert ) {
  var retval;
  
  var initconfig = new Object;
  initconfig.type = GRAPH; 
  retval = initDrawContainer("container", initconfig);  
  assert.equal( retval, true, "Init successful" );
  
  var drawconfig = new Object;
  drawconfig.type = GRAPH; 
  retval = drawDataInContainer("container", drawconfig);  
  assert.equal( retval, true, "Draw successful" );
});

QUnit.test( "Init error handling", function( assert ) {
  var retval;
  
  var initconfig = new Object;
  initconfig.type = 1234567; 
  retval = initDrawContainer("container", initconfig);  
  assert.equal( retval, false, "Type check OK" );
  
  initconfig.type = GRAPH; 
  retval = initDrawContainer("asdsdfghfhfhfg2342", initconfig);  
  assert.equal( retval, false, "Container check OK" );
});

QUnit.test( "Draw error handling", function( assert ) {
  var retval;
  
  var drawconfig = new Object;
  drawconfig.type = 1234567; 
  retval = drawDataInContainer("container", drawconfig);  
  assert.equal( retval, false, "Type check OK" );
  
  drawconfig.type = GRAPH; 
  retval = drawDataInContainer("asdsdfghfhfhfg2342", drawconfig);  
  assert.equal( retval, false, "Container check OK" );
});