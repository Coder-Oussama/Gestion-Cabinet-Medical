const {ipcRenderer} =require('electron');


const form = document.querySelector('form');
form.addEventListener('submit',function(e){
e.preventDefault();
const namecomercial= document.getElementById('inputName1').value;
let namec=namecomercial.split('').filter(function(el){
   return el!==',';
});
const nameSein = document.getElementById('inputName2').value;
let names=nameSein.split('').filter(function(el){
    return el!==',';
 });
const form = document.getElementById('inputName3').value;
let Form=form.split('').filter(function(el){
    return el!==',';
 });
const Descri = document.getElementById('inputName4').value;
let des=Descri.split('').filter(function(el){
    return el!==',';
 });
let arr=[namec.join(''),names.join(''),Form.join(''),des.join('')];
ipcRenderer.send('send-dataDrug',arr);
});