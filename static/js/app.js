const electron = require("electron");
const log = require("electron-log");
const ipcRenderer = electron.ipcRenderer;
const path = require("path");
const superagent = require("superagent");
const superdebug = require("superagent-debugger");
const logger = require("superagent-logger");
const request = require("request");
const qs = require("qs");
const fs = require("fs-extra");
const browserMsg = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
};
const urls = {
  loginUrl: "https://www.sd7799.com/api/login.do",
  codeUrl: "https://www.sd7799.com/api/getValidateCode.do?_=" + Math.random(),
  targetUrl: "https://www.sd7799.com/home/",
  indexUrl: "https://www.sd7799.com/",
  referer: "https://www.sd7799.com/home/cp.html",
};

new Vue({
  el: "#app",
  data: {
    visible: false,
    codeSrc: "",
    loginForm: {
      username: "zhangsanfeng",
      password: "qwe123456",
      checkcode: "",
      sitekey: "sd7799",
      validatecode: "",
    },
    cards: [
      {
        siteName: "盛大娱乐",
        url: "https://www.sd7799.com",
        balance: 0,
        redPackage: 0,
        recharge: 0,
      },
    ],
  },
  methods: {
    show: function () {
      this.visible = true;
    },
    validateCode(imageBase64) {
      let v = this;
      axios
        .post("http://139.196.138.6/api/code/parse/v1", {
          picBase64: imageBase64,
          type: "NUMBER_ONLY",
        })
        .then((response) => {
          if (response.status === 200 && response.data.code === 0) {
            v.loginForm.validatecode = response.data.data;
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    loadImageCode() {
      let v = this;
      axios
        .get("http://139.196.138.6:7001/auth/validateCode")
        .then((response) => {
          if (response.status === 200 && response.data.code === 0) {
            v.loginForm.checkcode = response.data.data.checkCode;
            v.validateCode(response.data.data.imgData);
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    doLogin() {
      let v = this;
      if (
        v.loginForm.username == "" ||
        v.loginForm.password == "" ||
        v.loginForm.validatecode == ""
      ) {
        alert("请输入");
      } else {
        console.log(v.loginForm);
        axios
          .post(
            "http://139.196.138.6:7001/auth/doLogin",
            qs.stringify(v.loginForm)
          )
          .then((response) => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
  mounted() {
    this.loadImageCode();
  },
});

function binaryParser(res, callback) {
  res.setEncoding("binary");
  res.data = "";
  res.on("data", function (chunk) {
    res.data += chunk;
  });
  res.on("end", function () {
    callback(null, new Buffer(res.data, "binary"));
  });
}
