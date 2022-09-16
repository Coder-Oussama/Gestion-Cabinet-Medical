const { ipcRenderer } = require("electron");



let id;
ipcRenderer.on('data-editDrug',function(e,dataDrug){
    console.log(dataDrug);
     id = dataDrug[4];
    let nameCommercial=document.getElementById('inputName1');
    let nameSienti=document.getElementById('inputName2');
    let Form=document.getElementById('inputName3');
    let des=document.getElementById('inputName4');
    nameCommercial.value=dataDrug[0];
    nameSienti.value=dataDrug[1];
    Form.value=dataDrug[2];
    des.value=dataDrug[3];


});
const form = document.querySelector('form');
form.addEventListener('submit',function(e){
e.preventDefault();
const namecomercial= document.getElementById('inputName1').value;
const nameSein = document.getElementById('inputName2').value;
const formdrug = document.getElementById('inputName3').value;
const Descri = document.getElementById('inputName4').value;

let arr=[namecomercial,nameSein,formdrug,Descri,id];
ipcRenderer.send('send-dataDrugEdit',arr);

});