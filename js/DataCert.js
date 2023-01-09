const {ipcRenderer}= require('electron');

const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
 let nameCertificate=document.getElementById('nomCert').value;
 ipcRenderer.send('nameCer',nameCertificate);
 
});