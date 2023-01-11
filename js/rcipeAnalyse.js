const { ipcRenderer } = require("electron");
ipcRenderer.on("dataRecipe", function () {
  let Name = document.getElementById("name");
  let Age = document.getElementById("age");
  localStorage;
  let textname = document.createTextNode(window.localStorage.getItem("name"));
  let textage = document.createTextNode(window.localStorage.getItem("Age"));
  Name.appendChild(textname);
  Age.appendChild(textage);
  document.querySelector("u").innerText = window.localStorage.analyseName
  let analyses = JSON.parse(localStorage.analyse)
  let name, fulName, description
  analyses.forEach(el => {
    name = el[0]
    fulName = el[1]
    description = el[2]
    let ul = document.querySelector("ul");
    let li = document.createElement("li");
    li.innerText = `${name}   ( ${fulName} ) `
    
    ul.append(li);
  });

  let date = document.getElementById("date");
  let dateNow = new Date();
  let day = dateNow.getDate();
  let mounth = dateNow.getMonth();
  let year = dateNow.getFullYear();

  let childate = document.createTextNode(`${day}-${mounth + 1}-${year}`);
  date.appendChild(childate);
  // window.localStorage.removeItem('analyse')
})