
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    var re = /.*github\.com\/(.*)\/(.*)\/commits.*/,
        m = re.exec(changeInfo.url);

    if (m === null) return;

    chrome.tabs.executeScript({
        code: 'setDomChangeTimeout(attachDateButton, "commit-group-title", 2000);'
    });
});
