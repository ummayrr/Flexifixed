//popup.js

document.getElementById('form').addEventListener('submit', function(event)
{
event.preventDefault();
const rollNo = document.getElementById('rollNo').value.toUpperCase();
const password = document.getElementById('password').value;
chrome.storage.local.set({'rollNo': rollNo, 'password': password}, function()
{
console.log('Saved.');
document.getElementById('status').innerText = 'Data saved successfully!';
});
chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
{
chrome.tabs.reload(tabs[0].id);
chrome.tabs.sendMessage(tabs[0].id, {rollNo: rollNo, password: password});
});
});

document.getElementById('deleteData').addEventListener('click', function()
{
chrome.storage.local.remove(['rollNo', 'password'], function()
{
document.getElementById('rollNo').value = '';
document.getElementById('password').value = '';
document.getElementById('status').innerText = 'Data deleted successfully!';
console.log('Data deleted.');
});
});


document.getElementById('rollNo').addEventListener('input', function(event)
{
let input = event.target.value;
const rollNoError = document.getElementById('rollNoError');


let correctInput = input.replace(/[^0-9A-Z-]/gi, '');


if (correctInput.length > 3 && correctInput[3] !== '-')
{
correctInput = correctInput.slice(0, 3) + '-' + correctInput.slice(3);
}

correctInput = correctInput.split('').map((char, index) =>
{
return (char === '-' && index !== 3) ? '' : char;
}).join('');

 correctInput = correctInput.toUpperCase();
 
 
 if (correctInput !== input)
 {
 event.target.value = correctInput; 
 }
 const formats = [
 /^[0-9]{0,2}$/, 
 /^[0-9]{2}[A-Z]?$/,
 /^[0-9]{2}[A-Z]-?$/, 
 /^[0-9]{2}[A-Z]-[0-9]{0,4}$/
 ];
 

 const isFormatCorrect = formats.some((format) => format.test(correctInput));
 
 rollNoError.style.display = isFormatCorrect ? 'none' : 'block';

 input = correctInput;
});

chrome.storage.local.get(['rollNo', 'password'], function(data)
{
if (data.rollNo && data.password)
{
document.getElementById('rollNo').value = data.rollNo;
document.getElementById('password').value = data.password;
}
});

document.querySelectorAll('.radio-buttons input[type="radio"]').forEach(function(radio)
{
radio.addEventListener('change', function(event)
{
chrome.storage.local.set({'defaultPage': event.target.value}, function()
{
console.log('Radio saved.');
});
});
});

document.addEventListener('DOMContentLoaded', function()
{
chrome.storage.local.get('defaultPage', function(data)
{
if (!data.defaultPage)
{
chrome.storage.local.set({'defaultPage': 'Marks'}, function()
{
console.log('default set=markssss.');
});
}
else
document.querySelector('.radio-buttons input[value="' + data.defaultPage + '"]').checked = true;
});
});
