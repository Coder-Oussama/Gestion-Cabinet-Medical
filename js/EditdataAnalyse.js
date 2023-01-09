const { ipcRenderer } = require("electron");
let id;
ipcRenderer.on('data-editAnal',function(e,datadAnalyse){
   
    id = datadAnalyse[3];
    let inbutName=document.getElementById('inputName1');
    let inbutNameComplet=document.getElementById('inputName2');
    let des=document.getElementById('inputName3');
    inbutName.value=datadAnalyse[0];
    inbutNameComplet.value=datadAnalyse[1];
    des.value=datadAnalyse[2];

});
const form = document.querySelector('form');
form.addEventListener('submit',function(e){
e.preventDefault();
const namedeAnalyse= document.getElementById('inputName1').value;
const nameCompler = document.getElementById('inputName2').value;
const Descri = document.getElementById('inputName3').value;

let arr=[namedeAnalyse,nameCompler, Descri,id];
ipcRenderer.send('send-dataAnalyseEdit',arr);
});