const { ipcRenderer } = require("electron");
ipcRenderer.on("dataRecipe", function () {
  let Name = document.getElementById("name");
  let Age = document.getElementById("age");
  localStorage;
  let textname = document.createTextNode(window.localStorage.getItem("name"));
  let textage = document.createTextNode(window.localStorage.getItem("Age"));
  console.log(textage);
  console.log(textname);
  Name.appendChild(textname);
  Age.appendChild(textage);

  //let DrugsLoc=window.localStorage.getItem('Drugs').split(',');
  let dr = [...new Set(window.localStorage.getItem("Drugs").split(","))];
  console.log(dr.slice(1));
  let Drugs = dr.slice(1);
  let i = 0;
  let nameD;
  let nameS;
  let form;
  let des;
  let drugLength = Drugs.length
  while (i < drugLength) {
    console.log(Drugs[i]);
    nameD = Drugs[i++];
    nameS = Drugs[i++];
    form = Drugs[i++];
    des = Drugs[i++];
    let ul = document.querySelector("ul");
    let li = document.createElement("li");
    li.innerHTML = nameD + "  " + nameS + "  " + form + "<div>" + des;
    ("</div>");
    ul.append(li);
  }

  ///////////
  let date = document.getElementById("date");
  let dateNow = new Date();
  let day = dateNow.getDate();
  let mounth = dateNow.getMonth();
  let year = dateNow.getFullYear();

  let childate = document.createTextNode(`${day}-${mounth + 1}-${year}`);
  date.appendChild(childate);
});
