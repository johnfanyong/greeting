const electron = require("electron");
const log = require("electron-log");
const ipcRenderer = electron.ipcRenderer;
const path = require("path");
const superagent = require("superagent");
const superdebug = require("superagent-debugger");
const logger = require("superagent-logger");
const request = require("request");
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
    checkCode: "",
    loginForm: {
      name: "zhangsanfeng",
      pass: "qwe123456",
      code: "",
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
    validateCode() {
      axios
        .post("http://139.196.138.6/api/code/parse/v1", {
          picBase64:
            "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUADwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2ANdzOUtbKR8EjzJj5UYI+vzEehCkHPXrjPstQ0TULtLebVLq4llcxxSRRTW9s7DOVjkGFc8dN7dDjHSt3VrKfUvDN9Y2swguLmzkhilP8DMhAb8Cc1yOsX+r3I8O6KPD7aYj6ja7zJcRMNsLCUiEIxJGI+rBcDtk4qIwikJI66+vdO0W2i+0iQg/JGkcLzyvgdlUM7e5wfejSNT0vXbEXumyRzwE7SfLKlTwcMrAFTgg4IHUUutT3FvYhrbUbCwlLgCW+iMkZ4PGBInP49jxXHeE/E/maRNPb2VzqOp3dzI91NGNkDyofKyGIG1fLjQqME4KgknJqrJDOmXxJob3yWgdw0knlRytaSLC79AqylfLJPYBuam1nWtH0C387UpUhXaz4WJpGKryzbVBOB3OOK4bVNY8VT6/pttqWl2smmzXfmQ2sEgjl3xAyoXcswZVKA8BOdvrg3/FHiHU5dKis7rQJIoru6ghcxXCysU8wM4Cgckor0rxA73yYv8Anmn/AHyKPJi/55p/3yKybHxRpd7OtsZXtrs/8u90hjcHOAOeCTkEAEnmtmnZAQGGO5sTBMgeKSLY6noykYIry7WruTw54mni0stG8KhFnnle5l2sqsVDTM5Vc9lwPXOBRRQtgNSHwfpGsrHq2ppc3V7doksrtdSIGyo42oQpA7Ag8cV0E2mWU+mf2c9ugs9qoIk+QKBjGMYxjAxjpiiiuWbdyWQafoOn6bObiCOZ5yuzzrm4knkC5ztDSMxAyBwDjgVBqPhfTdUvVu7ptQMyMHTytSuIlRtpXKqjhVOCRkAdT6miipuxF59NtJLBLKaIzQIoUec7SN0xncxLE475z71TGglBti1fVoYhwkcd0QqDsBx0FFFXBsaP/9k=",
          type: "NUMBER_ONLY",
        })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    loadImageCode() {
      let v = this;
      superagent
        .get(urls.indexUrl)
        .set(browserMsg)
        .end((err1, res1) => {
          console.log("Login index");
          if (err1) {
            console.log("err1", err1);
          } else {
            superagent
              .get(urls.codeUrl)
              .set(browserMsg)
              .set("Referer", urls.referer)
              .buffer()
              .parse(binaryParser)
              .end(function (err, req) {
                if (err) {
                  console.log("code error", err);
                  return;
                }
                codeCookie = req.header["set-cookie"];
                if (codeCookie) {
                  checkCode = codeCookie[4];
                  console.log("codeCookie", codeCookie);
                }
                v.checkCode = checkCode;
                console.log("checkCode", v.checkCode);
                fs.writeFile(
                  path.join(__dirname) + "/codes/01/code.jpg",
                  req.body,
                  function (err2) {
                    console.log(1);
                    if (err2) return console.error(err2);
                    v.codeSrc = "./codes/01/code.jpg?v" + Math.random();
                    console.log(v.codeSrc);
                  }
                );
              });
          }
        });
    },
    doLogin() {
      let v = this;
      if (
        v.loginForm.name == "" ||
        v.loginForm.pass == "" ||
        v.loginForm.code == ""
      ) {
        alert("请输入");
      } else {
        console.log("pass", hex_md5(v.loginForm.pass));
        console.log(" v.checkCode", v.checkCode);
        ipcRenderer.send("api", {
          type: "login",
          payload: {
            name: v.loginForm.name,
            pass: hex_md5(v.loginForm.pass),
            input_code: v.loginForm.code,
            checkCode: v.checkCode,
          },
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
