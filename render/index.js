$(function () {
  function init() {
    bindEvent();
    loadAccountTable();
  }
  function bindEvent() {
    //$("#btn-add-account").click(function () {});
    $("#myTabs a").click(function (e) {
      e.preventDefault();
      $(this).tab("show");
    });
    $("#btn-show-batch-website").click(function () {
      $("#websiteWin").modal("show");
    });
    $("#btn-show-website").click(function () {
      alert("btn-add-website");
    });
    $("#btn-store-account").click(function () {
      saveAccount();
    });
    $("#site-box").delegate(".btn-site-add", "click", function () {
      var groupIndex = $(this).parents(".panel-default").data("index");
      var subGroupIndex = $(this).parents(".site-group").data("index");
      var subGroupName = $(this).parents(".site-group").data("group");
      var gameGroup = $(this).parents(".game-group");

      groupIndex *= 1;
      subGroupIndex *= 1;
      subGroupIndex++;
      console.log("groupIndex", groupIndex);
      console.log("subGroupIndex", subGroupIndex);
      console.log("subGroupName", subGroupName);
      addGroupSite(gameGroup, subGroupIndex, subGroupName);
    });
    switchEvent(
      "#betStatus",
      function () {
        console.log("on");
      },
      function () {
        console.log("off");
      }
    );
  }
  function loadAccountTable() {
    var accountList = getData("accountList");
    if (!accountList) {
      accountList = [];
    }
    var tableStr = "",
      selectStr = "";
    accountList.forEach(function (row, indax) {
      tableStr += "<tr>";
      tableStr += "<td>" + (indax + 1) + "</td>";
      tableStr += "<td>" + row.account + "</td>";
      tableStr += "<td>" + row.password + "</td>";
      tableStr += "<td>" + row.moneyPassword + "</td>";
      tableStr +=
        "<td><button class='btn btn-primary'>编辑</button><button class='btn btn-danger'>删除</button></td>";
      tableStr += "<tr>";
      selectStr +=
        "<option value='" + row.account + "'>" + row.account + "</option>";
    });
    $("#accountBody").html(tableStr);
    $("#websiteAccount").html(selectStr);
  }
  init();
  function saveAccount() {
    var account = $("#account").val(),
      password = $("#password").val(),
      moneyPassword = $("#moneyPassword").val(),
      params = {
        account: account,
        password: password,
        moneyPassword: moneyPassword,
      };
    console.log("params", params);
    var accountList = getData("accountList");
    if (!accountList) {
      accountList = [];
    }
    accountList.push(params);
    saveData("accountList", accountList);
  }
  function addGroupSite(gameGroup, subGroupIndex, subGroupName) {
    var site = `<div class="site-group" data-index="${subGroupIndex}" data-group="${subGroupName}">
                  <div class="form-group">
                    <button class="btn btn-link btn-danger">
                      删除
                    </button>
                    <span class="group-name">${subGroupName}${subGroupIndex}</span>
                  </div>
                  <div class="form-group">
                    <label class="require">网站</label>
                    <select class="form-control">
                      <option>网站1</option>
                      <option>网站2</option>
                      <option>网站3</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="require">线路</label>
                    <select class="form-control">
                      <option>线路1</option>
                      <option>线路2</option>
                      <option>线路3</option>
                    </select>
                    <span>10s</span>
                  </div>
                  <div class="form-group">
                    余额：0 流水：0/0
                  </div>
                  <div class="form-group">
                    余额：0 流水：0/0
                  </div>
                  <div class="form-group pull-right">
                    <button class="btn btn-primary">未登录</button>
                    <button class="btn btn-default" disabled="disabled">
                      余额/流水
                    </button>
                    <button class="btn btn-default" disabled="disabled">
                      提现
                    </button>
                    <button class="btn btn-default" disabled="disabled">
                      充值
                    </button>
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-default dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        更多 <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a href="#">客服</a></li>
                        <li class="disabled">
                          <a href="#">充值记录</a>
                        </li>
                        <li class="disabled"><a href="#">提现记录</a></li>
                        <li class="disabled"><a href="#">今日结算</a></li>
                        <li class="disabled">
                          <a href="#">今日未结算</a>
                        </li>
                        <li class="disabled"><a href="#">盈亏</a></li>
                      </ul>
                    </div>
                  </div>
                </div>`;
    $(gameGroup).append(site);
    console.log(site);
  }
  function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  function getData(key) {
    var data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }
});
