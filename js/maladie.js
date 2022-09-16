const {ipcRenderer} =require('electron');

let h=document.createElement('h2');
let con=document.querySelector('#Diseases');

let head=document.getElementById('head');
ipcRenderer.on('data-Maladie',function(e,data,NamePath){
   let text=`(${NamePath})`;
    h.innerHTML=text;
    console.log(text)
    head.appendChild(h);
    con.innerHTML = "";
  for(let i=0; i<data.length;i++){
      let l=document.createElement('li');
       let li=`  ${data[i]}`;
       l.innerHTML=li;
       l.classList.add('maladie');
       l.style.cssText="color: #133764;border: 2px solid #007bff; margin: 10px; padding: 10px 12px;font-size: 15px;font-weight: bold;border: 1px solid rgba(0,0,0,.125)!important;border-radius: 5px; background-color: rgba(227, 230, 230, 0.226);box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;cursor: pointer;"
       con.appendChild(l);
    };
    let child=document.querySelectorAll('ul');
   //  console.log(child);
   //  console.log(child[0].childNodes);
    child[0].childNodes.forEach(function(el){
         el.addEventListener('click',function(){
            // console.log(el.innerText);
            window.localStorage.setItem('nameDrugs', el.innerText);

            ipcRenderer.send('send-drugs',el.innerText);
         });
    });

   
});
 




