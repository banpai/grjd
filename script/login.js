apiready = function () {
  var user = new Vue({
    el: '#dcontent',
    data: {
      checked: false,
      content: {
        username: '',
        password: '',
        accountId: '',
        checkpwd: true,
        checkuser: true
      }
    },
    created: function () {
      this.content.username = $api.getStorage('username');
      this.content.password = $api.getStorage('password');
      if (this.content.password) {
        this.checked = true;
      }
    },
    methods: {
      login: function (e) {
        var that = this;
        if (this.content.checkpwd && this.content.checkuser) {
          var user = this.content.username;
          var pwd = this.content.password;
          UICore.showLoading('正在登录...', '请稍后...');
          console.log(UICore.serviceUrl + "mobile/mobileInterface.shtml?act=loginFace&passWord=" + pwd + "&userName=" + user);
          api.ajax({
            url: UICore.serviceUrl + "mobile/mobileInterface.shtml?act=loginFace&passWord=" + pwd + "&userName=" + user,
            method: 'get',
            timeout: 6,
          }, function (reta, erra) {
            //api.hideProgress();
            if (reta) {
              if (reta.success == "true") {
                if (that.checked) {
                  $api.setStorage('username', user);
                  $api.setStorage('password', pwd);
                } else {
                  $api.rmStorage('username');
                  $api.rmStorage('password');
                }
                reta.accu[0].isParty = reta.Data[0].isParty;
                that.accountId = reta.accu[0].accountId;
                $api.setStorage('userinf', reta.accu[0]);
                $api.setStorage('userinfData', reta.Data[0]);
                that.getLocationNew();
                //判断是否有配置文件
                var isHasConfig = api.getPrefs({
                  sync: true,
                  key: 'isHasConfig'
                });
                //如果没有则下载配置文件
                if (!isHasConfig) {
                  UICore.showLoading('正在下载配置文件...', '请稍后...');
                  api.ajax({
                    url: UICore.serviceUrl + "/mobile/mobileDynaTable.shtml?act=selectConfigureTableNew",
                    method: 'get'
                  }, function (reta, err) {
                    api.hideProgress();
                    if (reta.success) {
                      //$api.clearStorage ();
                      $api.setStorage('settingdata', JSON.stringify(reta));
                      api.setPrefs({
                        key: 'isHasConfig',
                        value: true
                      });
                      //打开新界面
                      api.openWin({
                        name: 'home',
                        url: '../index.html',
                        pageParam: {
                          name: 'home'
                        }
                      })
                      //如果配置文件下载失败
                    } else {

                      alert(JSON.stringify(reta));
                      alert(reta.ErrorInfo)
                    }
                  }); //ajax方法结尾
                  //如果已经有配置文件则直接进入
                } else {
                  api.hideProgress();
                  api.openWin({
                    name: 'home',
                    url: '../index.html',
                    pageParam: {
                      name: 'home'
                    }
                  });
                }
                //登录失败提醒
              } else {
                that.content.password = "";
                api.hideProgress();
                alert(reta.ErrorInfo)
              }
            } else {
              api.hideProgress();
              alert(JSON.stringify(erra))
            }

          });
        }

      },
      getLocationNew: function () {
        var baidsss = api.require('gridtrail');
        var param = { url: UICore.serviceUrl + "mobile/mobileInterface.shtml", accountId: this.accountId };

        baidsss.getGPS(param);
      },
      checkpwd: function () {
        var reg = /^\s*(\S+)\s*$/;
        if (this.content.password == '') {
          alert("密码为空")
        } else {
          this.content.checkpwd = true;
        }
      },
      checkuser: function () {
        var reg = /^\s*(\S+)\s*$/;
        if (this.content.username == '') {
          alert("用户名为空");
        } else {
          this.content.checkuser = true;
        }
      }
    }
  });
}
