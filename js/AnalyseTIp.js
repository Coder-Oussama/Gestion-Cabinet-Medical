const { Cipher } = require("crypto");
const { ipcRenderer } = require("electron");
const Path = require("path"); // نستورد هذه المكتبة لغرض إنشاء المسار الصحيح لملف قاعدة البيانات
// const dbPath = "/home/yaakoub/drugsDB.db" ;
const dbPath = Path.join(
  // ننشيء المسار الجديد ونضعه في ثابت
  Path.dirname("c://"), //  مسار القرص الصلب الذي قمنا بإختياره
  "/databases/drugsDB.db" // هنا تضع هذا المسار الذي يشير الى ملف قاعدة البيانات
);
const sqlite3 = require("sqlite3");
var db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log("could not open db");
  } else {
    console.log("Connected to db");
  }
});
db.run(
  `CREATE TABLE IF NOT EXISTS analyses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  analyse text,
  name text,
  fullName text,
  description text
)`,
  (err) => {
    if (err) return console.log(err);
    console.log("ok");
  }
);
let analyseName = localStorage.getItem('analyseName')
let AnalyseTiltle=document.getElementById('AnalyseTitle');
AnalyseTiltle.innerHTML=analyseName;
let tbody = document.getElementById("TableData2");


// hna tafichi lanalyses li f db
var counter = 1
db.each(
  "SELECT * FROM analyses WHERE analyse = ?",
  [analyseName],
  (err, row) => {
    if(err) throw(err)
    // console.log(row)
    Main(row)
    counter++
  }
)

let AjouteBtn= document.getElementById('Ajo');
AjouteBtn.addEventListener('click',()=>{
  ipcRenderer.send('Data-analysepage')
});

// delete function
ipcRenderer.on("delete-drugs", function (e, id) {
  let tr = document.getElementById(id);
  // حذف العنصر بعد تأكيد المستخدم
  let drugID = tr.getAttribute("analyseID"); //hada hwa id nta3 dwa li baghi t7azfo
  db.run(`DELETE FROM analyses WHERE id = ?`, [Number(drugID)], (err) => {
    if (err) return console.log(err.message);
    tbody.removeChild(tr);
  });
});

// edit function
ipcRenderer.on("data-analyseEdit", function (e, dataAnqlyseEdit) {
  // إستقبال البيانات المعدلة من نافذةالتعديل
  let elem = document.getElementById(dataAnqlyseEdit[3]);
  elem.children[2].innerText = dataAnqlyseEdit[0];
  elem.children[3].innerText = dataAnqlyseEdit[1];
  elem.children[4].innerText = dataAnqlyseEdit[2];
  let sql = `UPDATE analyses
    SET name = ?,
    fullName = ?,
    description = ?
    WHERE id = ?
    `;
  let id = Number(elem.getAttribute("analyseID"));
  db.run(
    sql,
    [
      dataAnqlyseEdit[0],
      dataAnqlyseEdit[1],
      dataAnqlyseEdit[2],
      id,
    ],
    (err) => {
      if (err) return console.log(err);
    }
  );
});

   // إستقبال معلومات التحليل 
ipcRenderer.on('data-analse',function(e,dataAnalyse){
  let name=dataAnalyse[0];
  let fullName=dataAnalyse[1];
  let description=dataAnalyse[2];
  db.run(`INSERT INTO analyses (analyse, name, fullName, description) values(?,?,?,?)`,
  [analyseName, name, fullName, description],
  function (err) {
    if(err) return console.log(err)
    // location.reload()
    row = {id : this.lastID,name,fullName,description}
    console.log(row)
    Main(row)
  })    
});
   
// حدث زر الرجوع الى صفحة التحاليل
let retourBtn =document.getElementById('retour');
retourBtn.addEventListener('click',()=>{
    ipcRenderer.send('retourToAnalysepage');
})

let save = document.getElementById("save")
save.addEventListener('click',() => {
  let checkedAnalyses = document.querySelectorAll(".cheked")  
  let analyse = window.localStorage.analyse
  if(!analyse) analyse = []
  else analyse = JSON.parse(analyse)
  checkedAnalyses.forEach(el => {
    let name = el.childNodes[2].innerText
    fullName = el.childNodes[3].innerText
    description = el.childNodes[4].innerText
    analyse.push([name,fullName,description])
    console.log(analyse)
  })
  analyse = analyse.map(el => el = JSON.stringify(el))
  analyse = Array.from(new Set(analyse))
  analyse = analyse.map(el => JSON.parse(el))
  localStorage.setItem('analyse',JSON.stringify(analyse))
  a = localStorage.analyse
  a = JSON.parse(a)
})

let print = document.getElementById("print")
print.addEventListener('click', () => {
  if(localStorage.analyse)
    ipcRenderer.send("open-recip",'recipeAnalyse.html');
  else throw("no analyses to print")
})

function Main(row){
  let trr = document.createElement("tr");
    trr.setAttribute("id", "ele_"+counter);
    trr.setAttribute("analyseID", row.id)
    // console.log(trr)
    trr.classList.add("border-bottom");

    trr.classList.add("border-bottom");
    let tdNum = document.createElement("td")
    let tdSelect = document.createElement("td")
    let tdName = document.createElement("td")
    let tdFullName = document.createElement("td")
    let tdDescription = document.createElement("td")
    let tdEdit = document.createElement("td")
    let inb = document.createElement("input");
    inb.setAttribute("id", "checbox");
    inb.setAttribute("type", "checkbox");
    inb.classList.add("p-3");

    tdNum.append(counter)
    tdSelect.classList.add("col-1");
    tdSelect.appendChild(inb);
    tdName.append(row.name)
    tdName.classList.add("col-2");
    tdFullName.append(row.fullName)
    tdFullName.classList.add("col-2");
    tdDescription.append(row.description)
    tdDescription.classList.add("col-2");
    tdEdit.classList.add("col-1");

    trr.appendChild(tdNum)
    trr.appendChild(tdSelect)
    trr.appendChild(tdName)
    trr.appendChild(tdFullName)
    trr.appendChild(tdDescription)

    // Edit button
    let btnDel = document.createElement("button");
    btnDel.setAttribute("id", "edit_"+counter);
    btnDel.setAttribute("type", `button`);
    btnDel.className = "btn btn-warning btn-link";
    btnDel.classList.add("text-center");
    let i1 = document.createElement("i");
    i1.className = "bi bi-pencil-square";
    btnDel.appendChild(i1);
    tdEdit.appendChild(btnDel);
    console.log(btnDel)

    //delete button
    let btnEdit = document.createElement("button");
    btnEdit.setAttribute("id", "delete_"+counter);
    btnEdit.setAttribute("type", `button`);
    btnEdit.className = "btn text-center btn-danger";
    let i2 = document.createElement("i");
    i2.className = "bi bi-trash-fill";
    btnEdit.appendChild(i2);
    tdEdit.appendChild(btnEdit);
    trr.append(tdEdit)

    tbody.appendChild(trr)

    let tr = document.getElementById("ele_"+counter)

    // send delete request
    let dele = document.getElementById("delete_"+counter)
    dele.addEventListener('click',function(){
      ipcRenderer.send("open-dialog", tr.attributes.id.value);
    })

    // send edit request
    let edit = document.getElementById("edit_"+counter)
    edit.addEventListener('click',function(){
      let v2 = tr.children[2].innerText;
      let v3 = tr.children[3].innerText;
      let v4 = tr.children[4].innerText;
      let id = tr.attributes.id.value;
      ipcRenderer.send("dataAnalyse-edit", [v2,v3,v4,id]);

    })

    //حدث  تحديد الأدوية checkbox
    let chec = document.querySelectorAll("input");
    // console.log(chec);
    chec.forEach(function (el) {
      el.addEventListener("change", (event) => {
        let paren = el.parentNode.parentNode;
        if (event.target.checked) {
          paren = el.parentNode.parentNode;
          paren.classList.add("cheked");
        } else {
          paren.classList.remove("cheked");
        }
      });
    });
}