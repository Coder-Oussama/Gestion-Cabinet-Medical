const { ipcRenderer } = require("electron");

const AnalyseData = [
    "BIOCHIMIE",
    "HÉMATOLOGIE",
    "BIOCHIMIE DE L.C.R",
    "BILAN THYROÏDIEN",
    "FERTILITÉ GROSSESSE ",
    "MARQUEURS CARDIOLOGIQUES ",
    "MARQUEURS TUMORAUX ",
    "ALLERGIES",
    "MALADIE INFECTIEUSE ",
    "MÉDICAMENTS",
    "MALADIES MÉTABOLIQUES",
    "AUTO-IMMUNITÉ IMMUNOLOGIE",
    "BACTÉRIOLOGIE PARASITOLOGIE",
];
const ul =document.querySelectorAll('ul');
console.log(ul);
ul.forEach(function(el){

    el.addEventListener('click',function(){
       let nameanalyse=el.innerText;
       let nameaAnlyse= nameanalyse.replace(/[0-9,-]/g,'');
       ipcRenderer.send('open-analysepage',nameaAnlyse);
       
       localStorage.setItem('analyseName', nameaAnlyse)//new
    });
});
