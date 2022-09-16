const { ipcRenderer } = require("electron");
const Path = require("path"); // نستورد هذه المكتبة لغرض إنشاء المسار الصحيح لملف قاعدة البيانات
const dbPath = Path.join(
  // ننشيء المسار الجديد ونضعه في ثابت
  Path.dirname("c://"), //  مسار القرص الصلب الذي قمنا بإختياره
  "/databases/drugsDB.db" // هنا تضع هذا المسار الذي يشير الى ملف قاعدة البيانات
);

window.localStorage.removeItem("Drugs");
let aj = document.getElementById("ajouter");
aj.addEventListener("click", function (e) {
  ipcRenderer.send("open-newWindow", "open Window");
  e.preventDefault();
});
///
const sqlite3 = require("sqlite3");
var db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log("could not open db");
  } else {
    console.log("Connected to db");
  }
});
db.run(
  `CREATE TABLE IF NOT EXISTS drug (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  commercialName text,
  scientificName text,
  form text,
  description text,
  disease text

)`,
  (err) => {
    if (err) return console.log(err);
    console.log("ok");
  }
);

let n = document.createElement("h4");
let A = document.createElement("h4");
ipcRenderer.on("AddName-AndAge", function (e, item) {
  let Age = item[1];
  let name = item[0];
  window.localStorage.setItem("name", name);
  window.localStorage.setItem("Age", Age);
  let nameMaladie = `Nom de Maladie :${name}`;
  let AgeMaladie = `Age de Maladie :${Age}`;
  let spa = document.querySelector("#sp");
  spa.style.cssText =
    "position: relative;top: 11px; left: 30px; background-color: #e2e7f58a;border: 0.5px solid #e2e7f58a;   padding: 10px;";
  let maladieName = document.querySelector("#name-Maldie");
  let maladieAge = document.querySelector("#age-Maladie");
  n.innerHTML = nameMaladie;
  A.innerHTML = AgeMaladie;
  maladieName.appendChild(n);
  maladieAge.appendChild(A);
});
let path = document.getElementById("path");
path.addEventListener("click", function () {
  ipcRenderer.send("openPath-page", "open");
});

let name = window.localStorage.getItem("name");
let Age = window.localStorage.getItem("Age");
if (name && Age) {
  let nameMaladie = `Nom de patient :  ${name}  /  `;
  let AgeMaladie = `/  Age de patient : ${Age}`;
  let spa = document.querySelector("#sp");
  spa.style.cssText =
    "position: relative;top: 11px; left: 30px; background-color: #e2e7f58a;border: 0.5px solid #e2e7f58a;   padding: 10px;";
  let maladieName = document.querySelector("#name-Maldie");
  let maladieAge = document.querySelector("#age-Maladie");
  n.innerHTML = nameMaladie;
  A.innerHTML = AgeMaladie;
  maladieName.appendChild(n);
  maladieAge.appendChild(A);
}
