const { ipcRenderer } = require("electron");
const Path = require("path"); // نستورد هذه المكتبة لغرض إنشاء المسار الصحيح لملف قاعدة البيانات
const dbPath = Path.join(
  // ننشيء المسار الجديد ونضعه في ثابت
  Path.dirname("c://"), //  مسار القرص الصلب الذي قمنا بإختياره
  "databases/drugsDB.db" // هنا تضع هذا المسار الذي يشير الى ملف قاعدة البيانات
);
const sqlite3 = require("sqlite3");
var db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log("could not open db");
  } else {
    console.log("Connected to db");
  }
});

//window.localStorage.removeItem('Drugs');

let head = document.getElementById("head");
console.log(head);
let h = document.createElement("h4");
// ipcRenderer.on('name-drug',function(e,nameDrugs){
let text = `${localStorage.getItem("nameDrugs")}`;
h.innerHTML = text;
head.appendChild(h);
let j = 1;
// استقبال الادوية الخاصة بالمرض من قاعدة البيانات
let tbody = document.getElementById("TableData1");
tbody.innerHTML = "";
db.each(
  "SELECT * FROM drug WHERE disease = ?",
  [localStorage.getItem("nameDrugs")],
  (err, row) => {
    if (err) return console.log("theres error");
    console.log(row);
    let tbody = document.getElementById("TableData1");
    // creat tr elem
    let trr = document.createElement("tr");
    trr.setAttribute("idDb", row.id);
    trr.setAttribute("id", `ele${j}`);
    trr.classList.add("border-bottom");
    /// creat th elem
    let th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.appendChild(document.createTextNode(j));
    trr.appendChild(th);
    ////creat td
    let td = document.createElement("td");
    td.classList.add("col-2");
    td.appendChild(document.createTextNode(row.commercialName));
    trr.appendChild(td);
    ///
    let td1 = document.createElement("td");
    td1.classList.add("col-2");
    td1.appendChild(document.createTextNode(row.scientificName));
    trr.appendChild(td1);
    ///// creat td2
    let td2 = document.createElement("td");
    td2.classList.add("col-2");
    td2.appendChild(document.createTextNode(row.form));
    trr.appendChild(td2);
    /// creat td3
    let td3 = document.createElement("td");
    td3.classList.add("col-2");
    td3.appendChild(document.createTextNode(row.description));
    trr.appendChild(td3);
    //creat td4
    let td4 = document.createElement("td");
    td4.classList.add("col-1");
    // creat delet button
    let but1 = document.createElement("button");
    but1.setAttribute("id", `edit${j}`);
    but1.setAttribute("type", `button`);
    but1.className = "btn btn-warning btn-link ml-1";
    but1.classList.add("text-center");
    let i1 = document.createElement("i");
    i1.className = "bi bi-pencil-square";
    but1.appendChild(i1);
    td4.appendChild(but1);
    /// creat edit button
    let but2 = document.createElement("button");
    but2.setAttribute("id", `delet${j}`);
    but2.setAttribute("type", `button`);
    but2.className = "btn text-center btn-danger";
    let i2 = document.createElement("i");
    i2.className = "bi bi-trash-fill";
    but2.appendChild(i2);
    td4.appendChild(but2);
    trr.appendChild(td4);
    /////
    let td5 = document.createElement("td");
    td5.classList.add("col-1");
    let inb = document.createElement("input");
    inb.setAttribute("id", "checbox");
    inb.setAttribute("type", "checkbox");
    inb.classList.add("p-3");
    td5.appendChild(inb);
    trr.appendChild(td5);

    console.log(trr);
    tbody.append(trr);

    let dele = document.getElementById(`delet${j}`);
    console.log(dele);
    let tr = document.getElementById(`ele${j}`);
    //حدث الضغط على زر الحذف
    dele.addEventListener("click", function () {
      console.log(dele);
      let id = tr.children[0].innerText;
      ipcRenderer.send("open-dialog", id);
    });
    //دالة الحذف
    ipcRenderer.on("delete-drugs", function (e, id) {
      let tr = document.getElementById(`ele${id}`);
      // حذف العنصر بعد تأكيد المستخدم
      tbody.removeChild(tr);
      let drugID = tr.getAttribute("idDb"); //hada hwa id nta3 dwa li baghi t7azfo
      db.run(`DELETE FROM drug WHERE id = ?`, [Number(drugID)], (err) => {
        if (err) return console.log(err.message);
      });
    });
    ///////////
    let edit = document.getElementById(`edit${j}`);
    let el = document.getElementById(`ele${j}`);
    //دالة التعديل
    edit.addEventListener("click", function () {
      console.log(el.children);
      let v1 = el.children[1].innerText;
      let v2 = el.children[2].innerText;
      let v3 = el.children[3].innerText;
      let v4 = el.children[4].innerText;
      let id = el.children[0].innerText;
      let datadrugs = [v1, v2, v3, v4, id];
      // إرسال العلومات إلى نافذة التعديل
      ipcRenderer.send("data-edit", datadrugs);
      ipcRenderer.on("data-drugedit", function (e, dataDrugedit) {
        // إستقبال البيانات المعدلة من نافذةالتعديل
        let elem = document.getElementById(`ele${dataDrugedit[4]}`);
        console.log(elem);
        // البيانات المعدلة dataDrugeedit[]
        elem.children[1].innerText = dataDrugedit[0];
        elem.children[2].innerText = dataDrugedit[1];
        elem.children[3].innerText = dataDrugedit[2];
        elem.children[4].innerText = dataDrugedit[3];
        let sql = `UPDATE drug
SET commercialName = ?,
scientificName = ?,
form = ?,
description = ?
WHERE id = ?
`;
        let id = Number(elem.getAttribute("idDb"));
        db.run(
          sql,
          [
            dataDrugedit[0],
            dataDrugedit[1],
            dataDrugedit[2],
            dataDrugedit[3],
            id,
          ],
          (err) => {
            if (err) return console.log(err);
            console.log(this);
          }
        );
      });
    });
    /////////
    j++;
    //حدث  تحديد الأدوية checkbox
    let chec = document.querySelectorAll("input");
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
    ////
  }
);

let Drugs = [window.localStorage.getItem("Drugs")];

let enreges = document.getElementById("enreg");
enreges.addEventListener("click", function () {
  let AllCheked = document.querySelectorAll(".cheked");

  AllCheked.forEach(function (elem) {
    let child = elem.children;
    console.log(
      child[1].innerText,
      child[2].innerText,
      child[3].innerText,
      child[4].innerText
    );
    Drugs.push(
      child[1].innerText,
      child[2].innerText,
      child[3].innerText,
      child[4].innerText
    );
    console.log(Drugs);
  });
  ipcRenderer.send("save");
});
console.log(Drugs);
// });
//حدث الضغط على زر إضافة معلومات الدواء
let aj = document.getElementById("Ajo");
aj.addEventListener("click", function (e) {
  ipcRenderer.send("open-Ajout");
  e.preventDefault();
});
// إستقبال معلومات الدواء
ipcRenderer.on("data-drug", function (e, DataDrug) {
  let bod = document.querySelector("#TableData1");

  let ind = bod.children.length;
  let i;
  if (ind === 0) {
    i = 0;
  } else {
    let lastElem = bod.children[ind - 1];

    i = Number(lastElem.children[0].innerText);
  }

  let nameCommercial = DataDrug[0];
  let nameSienti = DataDrug[1];
  let form = DataDrug[2];
  let Descript = DataDrug[3];
  //  حفظ دواء في قاعدة البيانات
  db.run(
    `INSERT INTO drug(scientificName, commercialName, form, description, disease) values(?,?,?,?,?)`,
    [
      nameSienti,
      nameCommercial,
      form,
      Descript,
      localStorage.getItem("nameDrugs"),
    ],
    function (err) {
      if (err) return console.log(err);
      //err.message
      //
      let tbody = document.getElementById("TableData1");
      let trr = document.createElement("tr");
      trr.setAttribute("idDb", this.lastID);
      trr.setAttribute("id", `ele${i}`);
      trr.classList.add("border-bottom");
      /// creat th elem
      let th = document.createElement("th");
      th.setAttribute("scope", "row");
      th.appendChild(document.createTextNode(i));
      trr.appendChild(th);
      ////creat td
      let td = document.createElement("td");
      td.classList.add("col-2");
      td.appendChild(document.createTextNode(nameCommercial));
      trr.appendChild(td);
      ///
      let td1 = document.createElement("td");
      td1.classList.add("col-2");
      td1.appendChild(document.createTextNode(nameSienti));
      trr.appendChild(td1);
      ///// creat td2
      let td2 = document.createElement("td");
      td2.classList.add("col-2");
      td2.appendChild(document.createTextNode(form));
      trr.appendChild(td2);
      /// creat td3
      let td3 = document.createElement("td");
      td3.classList.add("col-2");
      td3.appendChild(document.createTextNode(Descript));
      trr.appendChild(td3);
      //creat td4
      let td4 = document.createElement("td");
      td4.classList.add("col-1");
      // create delet button
      let but1 = document.createElement("button");
      but1.setAttribute("id", `edit${i}`);
      but1.setAttribute("type", `button`);
      but1.className = "btn btn-warning btn-link";
      but1.className = "text-center";
      let i1 = document.createElement("i");
      i1.className = "bi bi-pencil-square";
      but1.appendChild(i1);
      td4.appendChild(but1);
      /// create edit button
      let but2 = document.createElement("button");
      but2.setAttribute("id", `delet${i}`);
      but2.setAttribute("type", `button`);
      but2.className = "btn text-center btn-danger";
      let i2 = document.createElement("i");
      i2.className = "bi bi-trash-fill";
      but2.appendChild(i2);
      td4.appendChild(but2);
      trr.appendChild(td4);
      /////
      let td5 = document.createElement("td");
      td5.classList.add("col-1");
      let inb = document.createElement("input");
      inb.setAttribute("id", "checbox");
      inb.setAttribute("type", "checkbox");
      inb.classList.add("p-3");
      td5.appendChild(inb);
      trr.appendChild(td5);

      console.log(trr);
      tbody.append(trr);

      //حدث  تحديد الأدوية checkbox
      let chec = document.querySelectorAll("input");
      console.log(chec);
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
      /////
      let tr = document.getElementById(`ele${i}`);
      let dele = document.getElementById(`delet${i}`);
      //حدث الضغط على زر الحذف
      dele.addEventListener("click", function () {
        let id = tr.children[0].innerText;
        ipcRenderer.send("open-dialog", id);
      });
      //دالة الحذف
      ipcRenderer.on("delete-drugs", function (e, id) {
        let tr = document.getElementById(`ele${id}`);
        // حذف العنصر بعد تأكيد المستخدم
        tbody.removeChild(tr);

        let drugID = tr.getAttribute("idDb"); //hada hwa id nta3 dwa li baghi t7azfo
        db.run(`DELETE FROM drug WHERE id = ?`, [Number(drugID)], (err) => {
          if (err) return console.log(err.message);
        });
      });

      let edit = document.getElementById(`edit${i}`);
      let el = document.getElementById(`ele${i}`);
      //دالة التعديل
      edit.addEventListener("click", function () {
        // console.log(el.children);
        let v1 = el.children[1].innerText;
        let v2 = el.children[2].innerText;
        let v3 = el.children[3].innerText;
        let v4 = el.children[4].innerText;
        let id = el.children[0].innerText;
        let datadrugs = [v1, v2, v3, v4, id];
        // إرسال العلومات إلى نافذة التعديل
        ipcRenderer.send("data-edit", datadrugs);
        ipcRenderer.on("data-drugedit", function (e, dataDrugedit) {
          // إستقبال البيانات المعدلة من نافذةالتعديل
          let elem = document.getElementById(`ele${dataDrugedit[4]}`);

          // البيانات المعدلة dataDrugeedit[]
          elem.children[1].innerText = dataDrugedit[0];
          elem.children[2].innerText = dataDrugedit[1];
          elem.children[3].innerText = dataDrugedit[2];
          elem.children[4].innerText = dataDrugedit[3];
          let sql = `UPDATE drug
      SET commercialName = ?,
      scientificName = ?,
      form = ?,
      description = ?
      WHERE id = ?
      `;
          let id = Number(elem.getAttribute("idDb"));
          db.run(
            sql,
            [
              dataDrugedit[0],
              dataDrugedit[1],
              dataDrugedit[2],
              dataDrugedit[3],
              id,
            ],
            (err) => {
              if (err) return console.log(err);
            }
          );
        });
      });
    }
  );
  i++;
});

let imp = document.getElementById("print");
imp.addEventListener("click", function () {
  ipcRenderer.send("open-recip");
});
//
ipcRenderer.on("save-drugs", function (e) {
  console.log(Drugs.join(",").split(","));

  window.localStorage.setItem("Drugs", Drugs.join(",").split(","));
  console.log(window.localStorage.getItem("Drugs").split(","));
  console.log(
    [...new Set(window.localStorage.getItem("Drugs").split(","))].slice(1)
  );
});
