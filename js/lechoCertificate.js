const { ipcRenderer } = require("electron");
const Path = require("path"); // نستورد هذه المكتبة لغرض إنشاء المسار الصحيح لملف قاعدة البيانات
const dbPath = Path.join(
  // ننشيء المسار الجديد ونضعه في ثابت
  Path.dirname("C://"), //  مسار القرص الصلب الذي قمنا بإختياره
  "/databases/drugsDB.db" // هنا تضع هذا المسار الذي يشير الى ملف قاعدة البيانات
);
/* const dbPath = Path.join(
  // ننشيء المسار الجديد ونضعه في ثابت
  Path.dirname("~yaakoub/"), 
  "drugsDB.db"
  //  مسار القرص الصلب الذي قمنا بإختياره
   // هنا تضع هذا المسار الذي يشير الى ملف قاعدة البيانات
); */

const sqlite3 = require("sqlite3");
var db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log("could not open db");
  } else {
    console.log("Connected to db");
  }
});
// إضافة سرتفيكة
let AjouterCert = document.getElementById("ajouter");
AjouterCert.addEventListener("click", function () {
  ipcRenderer.send("open-datacertificate");
});
// السرتفيكات المحفوظة
db.all(`SELECT * FROM lecho`, (err, rows) => {
  if (err) return console.log(err);
  rows.forEach((row) => {
    // console.log(row);
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    li.setAttribute("id", row.id);
    let ul = document.querySelector("ul");
    li.innerText = row.title;
    ul.append(li);
  });
  let lis = document.querySelectorAll("li");
  let id = 1;
  lis.forEach(function (el) {
    // el.classList.remove("cliked");
    el.addEventListener("click", function (e) {
      let inbutexe = document.getElementById("inbutText");
      inbutexe.removeAttribute("readOnly");
      let textArea = document.getElementById("textArea");
      textArea.removeAttribute("readOnly");
      lis.forEach((li) => li.classList.remove("cliked"));
      e.currentTarget.classList.add("cliked");
      id = e.currentTarget.id;
      // console.log(id);
      db.get(`SELECT * FROM lecho WHERE id = ?`, [id], (err, row) => {
        if (err) return console.log(err);
        // console.log(row);
        let TextCertificate = document.getElementById("textArea");
        let TitleCrtificate = document.getElementById("inbutText");
        TextCertificate.innerHTML = row.certaficat;
        TitleCrtificate.value = row.title;
      });

      //  هادا كود الحذف
      // db.run(`DELETE FROM lecho WHERE id = ?`, [id], (err) => {
      //   if (err) return console.log(err.message);
      // });
    });
  });
  /*let save= document.getElementById('inreg');
    save.addEventListener('click',function(){
    
      // console.log(data);
      let sql = `UPDATE lecho SET certaficat = ? WHERE id = ?`
      db.run(sql, [data, id])
    });*/
});
////////////
ipcRenderer.on("nameCerti", function (e, name) {
  // حفظ عنوان السرتفيكة
  db.run(
    `INSERT INTO lecho (title, certaficat) values(?,?)`,
    [name, "  "],
    function (err) {
      if (err) return console.log(err);
      // console.log(this.lastID)
      let li = document.createElement("li");
      let ul = document.querySelector("ul");
      li.classList.add("list-group-item");
      //li.className="list-group-item";
      console.log(this.lastID);
      li.setAttribute("id", this.lastID);
      // li.classList.add('cliked');
      li.innerText = name;
      ul.append(li);
      ////////////////
      let lis = document.querySelectorAll("li");
      lis.forEach(function (el) {
        el.addEventListener("click", function (e) {
          let inbutexe = document.getElementById("inbutText");
          inbutexe.removeAttribute("readOnly");
          let textArea = document.getElementById("textArea");
          textArea.removeAttribute("readOnly");
          lis.forEach((li) => li.classList.remove("cliked"));
          e.currentTarget.classList.add("cliked");
        });
      });
    }
  );
});
////////////////////////////
//حدث النقر على زر الحفظ

let save = document.getElementById("save");
save.addEventListener("click", function (e) {
  e.preventDefault();
  let TextCertificate = document.getElementById("textArea");
  let TitleCrtificate = document.getElementById("inbutText");

  if (TitleCrtificate.value === "" && TextCertificate.innerHTML === "") {
    ipcRenderer.send("choseCertificat");
  } else {
    let cliked = document.querySelector(".cliked");
    let id = cliked.getAttribute("id");
    let sql = `UPDATE lecho SET certaficat = ? , title = ? WHERE id = ?`;
    db.run(sql, [TextCertificate.innerHTML, TitleCrtificate.value, id]);
    ipcRenderer.send("open-messageDialog");
  }
});

// حدث الضغط على زر الطباعة
let impr = document.getElementById("print");
impr.addEventListener("click", function (e) {
  e.preventDefault();
  let TitleCrtificate = document.getElementById("inbutText");
  let TextCertificate = document.getElementById("textArea");

  if (TitleCrtificate.value === "" && TextCertificate.innerHTML === "") {
    ipcRenderer.send("choseCertificat");
  } else {
    let data = [TitleCrtificate.value, TextCertificate.innerHTML];
    ipcRenderer.send("dataDecertificat", data);
  }
});

// كود المحرر
const elements = document.querySelectorAll(".editBtn");

elements.forEach(element => {
  element.addEventListener('click', () => {
    let command = element.dataset['element'];

    document.execCommand(command, false, null);
  })
})
