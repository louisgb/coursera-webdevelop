(function (global) {

// Set up a namespace for our utility
var ajaxUtils = {};


// Returns an HTTP request object
function getRequestObject() {
  if (window.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } 
  else if (window.ActiveXObject) {
    // For very old IE browsers (optional)
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } 
  else {
    global.alert("Ajax is not supported!");
    return(null); 
  }
}


// Makes an Ajax GET request to 'requestUrl'
ajaxUtils.sendGetRequest = 
  function(requestUrl, responseHandler, isJSON) {
    var request = getRequestObject();
    request.onreadystatechange = 
      function() { 
        handleResponse(request, responseHandler, isJSON); 
      };
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
  };


// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request,
                        responseHandler, isJSON) {
  if ((request.readyState == 4) &&
      (request.status == 200)) {
      // default isJSON = true
      if (isJSON === undefined) {
	  isJSON = true;
      }
      if (isJSON) {
	  responseHandler(JSON.parse(request.responseText));
      }
      else {
	  responseHandler(request.responseText);
      }
  }
}


// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;


})(window);
