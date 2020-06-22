const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { ipcMain } = require("electron");
const request = require("request");
require("request-debug")(request);

const path = require("path");
const url = require("url");
// 爬虫
const superagent = require("superagent");

let mainWindow;
// 验证码的cookie
let checkCode = "";

//
// 头信息
const browserMsg = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36",
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: { nodeIntegration: true },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "login.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  // 打开调试控制台
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}
app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
/*
const ipcMain = electron.ipcMain;
ipcMain.on("notice", (e, msg) => {
  switch (msg) {
    case "getcodeCookie":
      mainWindow.webContents.send("codeCookie", checkCode);
      break;
    default:
      break;
  }
});
*/
const urls = {
  loginUrl: "https://www.sd7799.com/api/login.do",
  codeUrl: "https://www.sd7799.com/api/getValidateCode.do?_=" + Math.random(),
  targetUrl: "https://www.sd7799.com/home/",
  indexUrl: "https://www.sd7799.com/",
  referer: "https://www.sd7799.com/home/cp.html",
};
function dologin(name, pass, input_code, checkCode) {
  console.log(checkCode);
  request.post(
    {
      url: urls.loginUrl,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Cookie: checkCode,
      },
      form: {
        account: name,
        password: pass,
        loginSrc: 0,
        valiCode: input_code,
      },
    },
    function (err, httpResponse, body) {
      // console.log(err)
      console.log(httpResponse.headers);
      console.log(body);
    }
  );
}
ipcMain.on("api", (e, msg) => {
  console.log(msg);
  switch (msg.type) {
    case "getcodeCookie":
      mainWindow.webContents.send("codeCookie", checkCode);
      break;
    case "login":
      dologin(
        msg.payload.name,
        msg.payload.pass,
        msg.payload.input_code,
        msg.payload.checkCode
      );
      break;
    default:
      break;
  }
});
