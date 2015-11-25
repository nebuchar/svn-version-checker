function getSvnInfo(url, callback, errorCallback) {
    var searchUrl = 'http:' + url + 'svnversion';

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
        callback(response);
    };
    x.onerror = function() {
        errorCallback('Network error.');
    };
    x.send();
}
window.onload = function() {
    console.log("onload" + Date())
    chrome.storage.sync.get(null, function(items) {
        var validUrls = items.validUrls.split("\n");
        var length = validUrls.length;
        var found = false;
        var url = '';
        for (var i = 0; i < length; i++) {
            if (tab.url.search(validUrls[i]) != -1) {
                found = true;
                url = tab.url.match(validUrls[i]);
            }
        }
        if(found) {
            getSvnInfo(url[0], function(response){
                //Test response
                var response = new Object();
                response.svntag = 'test tag';
            }, function(errorMessage){
                console.error(errorMessage);
            });
        }
    })
};