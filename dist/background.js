chrome.browserAction.onClicked.addListener(function(activeTab)
{
    const newURL = chrome.extension.getURL('index.html');
    chrome.tabs.create({ url: newURL });
});