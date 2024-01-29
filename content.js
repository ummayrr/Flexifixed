//content.js

function fillForm(rollNo, password)
{
const rollNoInput=document.getElementById('m_inputmask_4');
const passwordInput=document.getElementById('pass');
const rememberMeCheckbox=document.getElementById('remember');

if (rollNoInput && passwordInput && rememberMeCheckbox)
{
rollNoInput.value=rollNo;
passwordInput.value=password;
rememberMeCheckbox.checked=true;

console.log('Assalamualikum. started');

rollNoInput.dispatchEvent(new Event('input', { bubbles: true }));
passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
rememberMeCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
chrome.storage.local.set({formFilled: true});
}
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
fillForm(request.rollNo, request.password);
});


chrome.storage.local.get(['rollNo', 'password'], function(data)
{
if (data.rollNo && data.password)
fillForm(data.rollNo, data.password);
});


//function runScript()
//{
//after loaded to call :O
//}



if (document.readyState === "loading")
{
document.addEventListener('DOMContentLoaded', initializeContentScript);
} 
//else
//{
//runScript();                     
//}

setInterval(function()
{
chrome.storage.local.get(['solved'], function(data)
{
console.log('Entered into this thang');
if (data.hasOwnProperty('solved') && data.solved)
{
clickSignIn();
console.log('Finally?');
chrome.storage.local.remove('solved');
}

});
}, 10);



function clickSignIn()
{
const signInButton=document.getElementById('m_login_signin_submit');
if (signInButton)
{
signInButton.click();
//chrome.storage.local.set({ 'signedIn': true });
console.log('submit clicked');
}
else
console.log('idhar hi toh hai');
}

