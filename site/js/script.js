//-- Regular js (using jquery)
//-- Make the collapsable menu collapse when the button loses focus
//--- The function given in $(); will be executed after DOM is loaded
//---   and before external images etc are loaded
//--- It's equivalent to document.addEventListener('DOMContentLoaded',...)
$( function() {
    //--- $() here serves as query selector
    //--- It's equivalent to
    //---   document.querySelector('.navbar-toggle').addEventListener('blur',...)
    //--- The function given in blur() will be executed upon the blur event
    $('.navbar-toggle').blur( function(event) {
	var screenwidth = window.innerWidth;
	if (screenwidth < 768) {
	    $('#collapsable-nav').collapse('hide');
	}
    });
});

//-- Dynamically load contents using Ajax
//--- IIFE
( function(global) {
    //--- namespace
    var mainContent = {};
    
    var homeHTML = 'snippets/ffx.html'

    //--- insert html to selector; for later use
    var insertHTML = function(selector, html) {
	var targetElem = document.querySelector(selector);
	targetElem.innerHTML = html;
    };

    //--- show a loading icon; for later use
    var showLoading = function(selector) {
	var html = '<div class="text-center">'
	    + '<img src="images/ajax-loader.gif"></div>';
	insertHTML(selector, html);
    };

    //--- The core code to be executed
    document.addEventListener('DOMContentLoaded', function(event) {
	//--- show loading icon in #main-content before sending ajax request
	showLoading('#main-content');
	//--- ajax to show dynamic content in #main-content
	$ajaxUtils.sendGetRequest(
	    //--- rechieve content from homeHTML
	    homeHTML,
	    //--- pass it to this handler function
	    function(responseText) {
		document.querySelector('#main-content')
		    .innerHTML = responseText;
	    },
	    //--- plain text, not JSON
	    false);
    });

    global.$mainContent = mainContent;
})(window);
