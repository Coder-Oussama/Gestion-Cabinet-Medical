const { ipcRenderer } = require("electron");

ipcRenderer.on("dataprescripton", function (e, data) {
  let TitleCrtificate = data[0];
  let TextCertificate = data[1];
  let title = document.getElementById("title");
  let text = document.getElementById("text");
  title.innerText = TitleCrtificate;
  
  let app = document.createElement('div')
  app.innerHTML = TextCertificate.trim();
  // console.log(typeof app);
  // console.log( app);
  text.append(app);

  ///////////////
  let Name = document.getElementById("name");
  let Age = document.getElementById("age");
  localStorage;
  let textname = document.createTextNode(window.localStorage.getItem("name"));
  let textage = document.createTextNode(window.localStorage.getItem("Age"));
  Name.appendChild(textname);
  Age.appendChild(textage);

  ////////////////
  let date = document.getElementById("date");
  let dateNow = new Date();
  let day = dateNow.getDate();
  let month = dateNow.getMonth();
  let year = dateNow.getFullYear();

  let childate = document.createTextNode(`${day}-${month + 1}-${year}`);
  date.appendChild(childate);
});
