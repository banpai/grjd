/**
 * Created by kevin on 2017/7/17.
 */
apiready = function () {
  var vue = new Vue({
    el: "#list",
    data: {
      list: []
    },
    created: function () {
      // 获取特殊人群的列表
      // UICore.showLoading("列表加载中...", "请稍候");
      var that = this;
      var userinf = $api.getStorage('userinf');
      var parameterToken = '?act=getMenuList_category&accountId=' + userinf.accountId;
      api.ajax({
        url: UICore.serviceUrl + 'mobile/mobileSpeical.shtml' + parameterToken,
        method: 'post',
        data: {
          values: {

          }
        }
      }, function (ret, err) {
        api.hideProgress();
        that.list = ret.list;
      });
    },
    methods: {
      create: function (item) {
        api.openWin({
          name: 'rentalSpecialCrowdCreate',
          url: './rentalSpecialCrowd.html',
          vScrollBarEnabled: false,
          pageParam: {
            infos: item.menuName,
            title: "",
            item: item
          }
        });
      },
      query: function (item) {
        api.openWin({
          name: 'correctPersonModule',
          url: './correctPersonModule.html',
          vScrollBarEnabled: false,
          pageParam: {
            infos: item.menuName,
            item: item,
            title: item.name
          }  });
      },
      scanCode: function () {
        var FNScanner = api.require('FNScanner');
        api.addEventListener({
          name: 'pause'
        }, function (ret, err) {
          FNScanner.onPause();
        });
        api.addEventListener({
          name: 'resume'
        }, function (ret, err) {
          FNScanner.onResume();
        });
        FNScanner.openScanner({
          autorotation: true
        }, function (ret, err) {
          if (ret) {
            if (ret.eventType == "success") {
              api.openWin({
                name: 'rentalHouseaa',
                url: './rentalHouse.html',
                vScrollBarEnabled: false,
                pageParam: {
                  title: "rentalHouseResults",
                  id: ret.content
                }
              });
            }
          } else {
            alert(JSON.stringify(err));
          }
        });
      },
      closeWin: function () {
        api.closeWin();
      }
    } // methods end.
  });

}
