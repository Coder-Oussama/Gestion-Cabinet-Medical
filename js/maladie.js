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
    // let pa=document.createElement('div');
    // pa.style.cssText="position: relative; left: 230px; width: 15px; color: #133764;border: 2px solid #007bff; margin: 10px; padding: 10px 12px;font-size: 15px;font-weight: bold;border: 1px solid rgba(0,0,0,.125)!important;border-radius: 5px; background-color: rgba(227, 230, 230, 0.226);box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;"
    // pa.innerHTML=`${i+1}`;
    // con.appendChild(pa)
      let l=document.createElement('li');
     let li = ` (${i + 1})          ${data[i]}`;
     
      
      // num.appendChild(document.createTextNode(i+1));
      // l.appendChild(num);
       l.innerHTML=li;
       l.classList.add('maladie');
       l.style.cssText=" color: #133764;border: 2px solid #007bff; margin: 10px; padding: 10px 12px;font-size: 15px;font-weight: bold;border: 1px solid rgba(0,0,0,.125)!important;border-radius: 5px; background-color: rgba(227, 230, 230, 0.226);box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;cursor: pointer;"
       con.appendChild(l);
    };
    let child=document.querySelectorAll('ul');
   //  console.log(child);
   //  console.log(child[0].childNodes);
    child[0].childNodes.forEach(function(el){
         el.addEventListener('click',function(){
            // console.log(el.innerText.split('').slice(2).join(''));
            window.localStorage.setItem('nameDrugs', el.innerText.split('').slice(4).join(''));

            ipcRenderer.send('send-drugs',el.innerText.split('').slice(4).join(''));
         });
    });

   
});
 




