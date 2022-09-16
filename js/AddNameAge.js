const { ipcRenderer } = require("electron");
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameMaladie = document.getElementById("inputName1").value;
  const AgeMaladie = document.getElementById("inputAge").value;
  let arr = [nameMaladie, AgeMaladie];
  ipcRenderer.send("close-Window", arr);
});
