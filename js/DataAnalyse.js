const { ipcRenderer } = require("electron");

const form = document.querySelector('form');
form.addEventListener('submit',function(e){
e.preventDefault();
const namedeAnalyse= document.getElementById('inputName1').value;
let nameA=namedeAnalyse.split('').filter(function(el){
   return el!==',';
});
const nameComplet = document.getElementById('inputName2').value;
let nameCom=nameComplet.split('').filter(function(el){
    return el!==',';
 });
const Description = document.getElementById('inputName3').value;
let descriptio=Description.split('').filter(function(el){
    return el!==',';
 });

let arr=[nameA.join(''),nameCom.join(''),descriptio.join('')];
ipcRenderer.send('send-dataAnalyse',arr);
});