const electron = require("electron");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");

let win;
let wind;
let windo;
let winDialog;
function creatWindow(Win) {
  win = new BrowserWindow({
    show:false,
    width: 1900,
    // minWidth:1800,
    height: 1600, //1500
    fullscreenable: true,
  //  fullscreen:true,
    icon: `${__dirname}/img/logo3.png`,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile(Win);
    win.maximize(),
      win.on("closed", function () {
        app.quit();
      });
}

function creatnewWin(w) {
  wind = new BrowserWindow({
    parent: win,
    modal: true,
    width: 500,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  wind.loadFile(w);

  wind.on("closed", (e) => {
    e.preventDefault();
  });
  wind.removeMenu();
}
function creatwind(w) {
  windo = new BrowserWindow({
    parent: win,
    modal: true,
    width: 500,
    height: 580,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  windo.loadFile(w);
  windo.on("closed", (e) => {
    e.preventDefault();
  });
  windo.removeMenu();
}
app.on("ready", function () {
  creatWindow("index.html");
});
function creatDialogWin() {
  winDialog = new BrowserWindow({
    width: 800,
    height: 600,
  });
}
let options = {};
let Options={};

// فتح نافذة إدخال معلومات  المريض
ipcMain.on("open-newWindow", function (event, arg) {
  creatnewWin('maladieData.html');
});

ipcMain.on("close-Window", function (e, item) {
  win.webContents.send("AddName-AndAge", item);
  // عند إستقبال معومات المريض والضغط على زر الادخال تغلق النافذة تلقائيا
  wind.hide();
});
ipcMain.on("openPath-page", function () {
  // فتح نافذة التخصصات
  win.loadFile("path.html");
});
// إستقبال الامراض الخاصة بكل تخصص
ipcMain.on("openmaladie-page", function (e, data, NamePath) {
  win.loadFile("maladie.html");
  win.webContents.on("did-finish-load", () => {
    win.webContents.send("data-Maladie", data, NamePath);
  });
});
ipcMain.on("retour", function () {
  win.loadFile("path.html");
});

//إرسال إسم الدواء وفتح صفحة الادوية
ipcMain.on("send-drugs", function (e, nameDrugs) {
  win.loadFile("drugs.html");
  win.webContents.on("did-finish-load", () => {
    win.webContents.send("name-drug", nameDrugs);
  });
});
//فتح نافذة إضافة معلوامات الدواء
ipcMain.on("open-Ajout", function () {
  creatwind("DataMedicoment.html");
});
//
ipcMain.on("send-dataDrug", function (e, arra) {
  win.webContents.send("data-drug", arra);

  // عند إستقبال معومات المريض والضغط على زر الادخال تغلق النافذة تلقائيا
  windo.hide();
});

ipcMain.on("data-edit", function (e, dataDrug) {
  creatwind("EditMedico.html");
  windo.webContents.on("did-finish-load", () => {
    windo.webContents.send("data-editDrug", dataDrug);
  });
});

ipcMain.on("send-dataDrugEdit", function (e, arr) {
  win.webContents.send("data-drugedit", arr);
  windo.hide();
});
//

options.type = "question";
options.buttons = ["Yes", "No"];
options.message = "Voulez-vous vraiment supprimer ce médicament ?";
options.title = "Supprimer";
options.cancelId = 1;
options.normalizeAccessKeys = true;

//options.checkboxChecked = true;

ipcMain.on("open-dialog", function (event, i) {
  dialog.showMessageBox(winDialog, options).then((res) => {
    if (res.response === 0) {
      event.sender.send("delete-drugs", i);
    } else if (res.response === 1) {
    }
  });
});
Options.type = "question";
Options.buttons = ["Yes", "cancel"];
Options.message =
  "Voulez-vous enregistrer les médicaments sélectionnés dans l'ordonnance ?";
Options.title = "Enregistrer";
Options.cancelId = 1;
Options.normalizeAccessKeys = true;
//نافذة تأكيد حفظ الادوية بعد الاختيار
ipcMain.on("save", function (event) {
  dialog.showMessageBox(winDialog, Options).then((res) => {
    if (res.response === 0) {
      event.sender.send("save-drugs");
      winDialog.close();
    } else if (res.response === 1) {
      winDialog.hide();
    }
  });
});
////////////
ipcMain.on('open-recip',function(e,file){
  var opti = {
    silent: true,
    printBackground: true,
    color: false,
    margin: {
      marginType: 'printableArea'
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: true,
    copies: 1,
  //  header: 'Header of the Page',
  // footer: 'Footer of the Page',
   
    // scaleFactor:100
  }
  let win = new BrowserWindow({
		show: false,
		webPreferences: {
			nodeIntegration: true,
      contextIsolation: false
		}
	});
	win.loadFile(file);
  
	win.webContents.on('did-finish-load', () => {
    win.webContents.send('dataRecipe');
		win.webContents.print(opti,function (success, failureReason)  {
			if (!success) console.log(failureReason);
			console.log('Print Initiated');
		});
	});
});
///////////

ipcMain.on('open-certficatepage',function(){
  console.log('open');
  win.loadFile('certificat.html');
});
////
// فتح نافذة إضافة شهادة 
ipcMain.on('open-datacertificate',function(){
  creatnewWin("dataCertifcate.html");
});
// إستقبال إسم الشهادة من نافذة الاضافة 
ipcMain.on('nameCer',function(e,name){
  //إرسال اسم الدواء الى ملف الشهادة
  win.webContents.send('nameCerti',name);
  wind.close();
});
///
let opt={};
opt.type = "info";
opt.buttons = ["ok"];
opt.message = "les informations du certificat ont ete enregistree";
opt.title = "enregistre";
opt.cancelId = 1;
opt.normalizeAccessKeys = true;
ipcMain.on('open-messageDialog',function(){
  dialog.showMessageBox(winDialog, opt).then((res) => {
  });
});
///////
ipcMain.on('dataDecertificat',function(e,data){
  let opti = {
    silent: true,
    printBackground: true,
    color: false,
    margin: {
      marginType: 'printableArea'
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: true,
    copies: 1,
  //  header: 'Header of the Page',
  // footer: 'Footer of the Page',
    // pageSize:'A5',
    // scaleFactor:100
  }
  let win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
 // creatWindow('presecption.html');
  
  
  
  win.loadFile('presecption.html');

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('dataprescripton',data);
    win.webContents.print(opti,function (success, failureReason)  {
      if (!success) console.log(failureReason);
      console.log('Print Initiated');
    });
  });
})
////
let optt={};
optt.type = "info";
optt.buttons = ["ok"];
optt.message = "Choisissez un certificat";
optt.title = "Attention";
optt.cancelId = 1;
optt.normalizeAccessKeys = true;
ipcMain.on('choseCertificat',function(){
  dialog.showMessageBox(winDialog, optt).then((res) => {
  });  
});

////////
ipcMain.on('open-analysepage',function(e,name){
  
  win.loadFile('AnalysTIp.html');
  // win.webContents.on("did-finish-load", () => {
  //   win.webContents.send("nameAnalyse",name);
  // });
});

ipcMain.on('retourToAnalysepage',()=>{
  win.loadFile('Analyse.html')
});

ipcMain.on('Data-analysepage',()=>{
  creatwind("DataAnalyse.html");
});

ipcMain.on('send-dataAnalyse',(e,dataAnalyse)=>{
  console.log(dataAnalyse);
  win.webContents.send('data-analse',dataAnalyse);
 windo.hide();
});
//
ipcMain.on("dataAnalyse-edit", function (e, datadeanalyse) {
  console.log(datadeanalyse);
  creatwind("EditDatadeAnalyse.html");
  windo.webContents.on("did-finish-load", () => {
    windo.webContents.send("data-editAnal", datadeanalyse);
  });
});
//
ipcMain.on("send-dataAnalyseEdit", function (e, arr) {
  console.log(arr);
  win.webContents.send("data-analyseEdit", arr);
  windo.hide();
});
