const electron = require("electron");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");

// // this should be placed at top of main.js to handle setup events quickly
// if (handleSquirrelEvent(app)) {
//     // squirrel event handled and app will exit in 1000ms, so don't do anything else
//     return;
// }

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

function creatnewWin() {
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
  wind.loadFile("maladieData.html");

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
let Options = {};

// فتح نافذة إدخال معلومات  المريض
ipcMain.on("open-newWindow", function (event, arg) {
  creatnewWin();
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

ipcMain.on('open-recip',function(e){
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
   header: 'Header of the Page',
  footer: 'Footer of the Page',
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
	win.loadFile('recipe.html');
  
	win.webContents.on('did-finish-load', () => {
 
    win.webContents.send('dataRecipe');
		win.webContents.print(opti,function (success, failureReason)  {
			if (!success) console.log(failureReason);
			console.log('Print Initiated');
      
		});
	});
  /* win.loadFile('recipe.html');
  win.webContents.on('did-finish-load', ()=>{
    
    console.log(data);
  });*/
});
//////////////// print

// Importing BrowserWindow from Main

//var print = document.getElementById('print');


// function handleSquirrelEvent(application) {
//     if (process.argv.length === 1) {
//         return false;
//     }

//     const ChildProcess = require('child_process');
//     const path = require('path');

//     const appFolder = path.resolve(process.execPath, '..');
//     const rootAtomFolder = path.resolve(appFolder, '..');
//     const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
//     const exeName = path.basename(process.execPath);

//     const spawn = function(command, args) {
//         let spawnedProcess, error;

//         try {
//             spawnedProcess = ChildProcess.spawn(command, args, {
//                 detached: true
//             });
//         } catch (error) {}

//         return spawnedProcess;
//     };

//     const spawnUpdate = function(args) {
//         return spawn(updateDotExe, args);
//     };

//     const squirrelEvent = process.argv[1];
//     switch (squirrelEvent) {
//         case '--squirrel-install':
//         case '--squirrel-updated':
//             // Optionally do things such as:
//             // - Add your .exe to the PATH
//             // - Write to the registry for things like file associations and
//             //   explorer context menus

//             // Install desktop and start menu shortcuts
//             spawnUpdate(['--createShortcut', exeName]);

//             setTimeout(application.quit, 1000);
//             return true;

//         case '--squirrel-uninstall':
//             // Undo anything you did in the --squirrel-install and
//             // --squirrel-updated handlers

//             // Remove desktop and start menu shortcuts
//             spawnUpdate(['--removeShortcut', exeName]);

//             setTimeout(application.quit, 1000);
//             return true;

//         case '--squirrel-obsolete':
//             // This is called on the outgoing version of your app before
//             // we update to the new version - it's the opposite of
//             // --squirrel-updated

//             application.quit();
//             return true;
//     }
// };