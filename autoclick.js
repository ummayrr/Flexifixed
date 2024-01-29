//autoclick.js

(function() {
'use strict';
var solved = false;
const recaptchaStatus = "#recaptcha-accessible-status";
var recaptchaInitialStatus = qSelector(recaptchaStatus) ? qSelector(recaptchaStatus).innerText : ""

let isRecaptchaFrame = () => {
return /https:\/\/www.google.com\/recaptcha\/api2\/anchor/.test(window.location.href);
};

function qSelector(selector)
{
return document.querySelector(selector);
}

let captchaInterval;

chrome.storage.local.get(['formFilled'], function(data)
{
var mainPageURL = window.location != window.parent.location ? document.referrer : document.location.href;

if (mainPageURL.includes("https://flexstudent.nu.edu.pk"))
{
if (data.formFilled)
{
captchaInterval = setInterval(() => {
if (isRecaptchaFrame())
document.getElementsByClassName('recaptcha-checkbox-checkmark')[0].click();

if (qSelector(recaptchaStatus) && (qSelector(recaptchaStatus).innerText != recaptchaInitialStatus))
{
solved = true;
console.log("SOLVED");
clearInterval(captchaInterval);
chrome.storage.local.set({ 'solved': solved });
solved = false;
}
}, 10);
}
} 
});
})();

chrome.storage.local.get('defaultPage', function(data)
{

if (window.location.href === "https://flexstudent.nu.edu.pk/")
{
console.log('enter into this please.......');  
let className = "";

switch (data.defaultPage)
{
case "Marks":
className = "m-menu__link-icon flaticon-edit-1";
break;
case "Transcript":
className = "m-menu__link-icon flaticon-folder-1";
break;
case "Attendance":
className = "m-menu__link-icon flaticon-list-2";
break;
}

let elements = document.getElementsByClassName(className);
if (elements.length > 0)
elements[0].click();
}
});
