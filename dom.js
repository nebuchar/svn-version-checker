chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    var response = request.response;
    var header = document.getElementById('divHead');

    var div = document.createElement('div');
    div.className = 'svninfo';
    div.innerHTML = '<span>Svn tag: '+ response.svntag +'</span>';

    header.insertBefore(div, header.firstChild);

});