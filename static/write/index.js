// So far this will connect to the default etherpad server.
// This is just a test for the editor embedding
function connectToOwnpad() {
  var userName, padId;
  var sessionObj = JSON.parse(localStorage.getItem('sessionObj'));
  document.getElementsByTagName('h1')[0].innerHTML =
    '<span id="docTitle" onclick="changeDocTitle();">'+getCurrDocName()+'</span><small>'+(sessionObj.userAddress?' '+sessionObj.userAddress:'')
    +'<input type="submit" value="Logout" onclick="localStorage.clear();location=\'/\';">'
    +'</small>';
  if(sessionObj.userAddress != null) {
    userName = sessionObj.userAddress;
    } else {
    userName = 'Address Not Set Yet'
  }
  if(getCurrDocName() != null) {
    padId = docNameToPadId(getCurrDocName());
    } else {
    padId = 'still-hosted-no-name'
  }
  $('#editorPad').pad({
    'padId':padId,
    'host':'http://ownpad.nodejitsu.com',
    'storageAddress':'https://'+sessionObj.subdomain+'.iriscouch.com/documents/',
    'bearerToken':sessionObj.bearerToken,
    'storageApi':sessionObj.storageApi,
    'userName':userName,
    'showControls':true,
    'showLineNumbers':false,
  });
}
function changeDocTitle() {
  document.getElementById('docTitle').innerHTML = '<input id="docTitleInput" onblur="saveDocTitle();" type="text" value="'+getCurrDocName()+'" />'; 
}
function saveDocTitle() {
  location.hash = '#!/'+getCurrDocOwner()+'/'+document.getElementById('docTitleInput').value;
  document.getElementById('docTitle').innerHTML = document.getElementById('docTitleInput').value;
}
function getCurrDocOwner() {
  return location.hash.split('/')[1];
}
function getCurrDocName() {
  return location.hash.split('/')[2];
}
function docNameToPadId(docName) {
  return docName;
}

document.getElementsByTagName('body')[0].setAttribute('onload', 'connectToOwnpad();');
document.getElementById('loading').style.display='none';
