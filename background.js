//background.js

chrome.extension.getBackgroundPage().console.log('hello');


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
{
if (changeInfo.status == 'complete' && tab.url.includes('https://flexstudent.nu.edu.pk/Login'))
{
chrome.storage.local.get(['rollNo', 'password'], function(data)
{
if (data.rollNo && data.password)
{
chrome.tabs.sendMessage(tabId, { rollNo: data.rollNo, password : data.password });
}
});
}
});

