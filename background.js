function getSvnInfo(url, callback, errorCallback) {
    var searchUrl = 'http:' + url + 'svninfo';

    console.log(searchUrl);
    var x = new XMLHttpRequest();
    x.open('GET', searchUrl);
    x.responseType = 'json';
    x.onload = function() {
        // Parse and process the response from Google Image Search.
        var response = x.response;
        if (!response) {
            errorCallback('No response!');
            //return;
        }
        /*
        var firstResult = response.responseData.results[0];
        var imageUrl = firstResult.tbUrl;
        var width = parseInt(firstResult.tbWidth);
        var height = parseInt(firstResult.tbHeight);
        console.assert(
            typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
            'Unexpected respose from the Google Image Search API!');
        */
        callback(response);
    };
    x.onerror = function() {
        errorCallback('Network error.');
    };
    x.send();
}

// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
    // If the tabs url starts with "http://specificsite.com"...
    if (tab.url.search('/*(es|br|it|mex).privalia.com*/') != -1) {
        // ... show the page action.
        chrome.pageAction.show(tabId);
        // Send a request to the content script.

        var url = tab.url.match('/*(es|br|it|mex).privalia.com*/');
        getSvnInfo(url[0], function(response){
            //Test response
            var response = new Object();
            response.svntag = 'test tag';
            chrome.tabs.sendMessage(tabId, {response: response} );
        }, function(errorMessage){
            console.error(errorMessage);
        });
    }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);