/**
 * Created by kevin on 2017/8/18.
 */
apiready = function () {
  var vue = new Vue({
    el: "#all_con",
    data: {
      name: '',
      items: [],
      isshow: false,
      isSlideInDown: false,
      isSlideInUp: false,
      resultjson: {},
      // postjson:{},
      params: "",
      totalpage: 1,
      pageSize: 15,
      pageNow: 1,
      accountId: "",
      houseNumber: "",
      buiName: "", //建筑名称
      baseUrl: ''
    },
    created: function () {
      this.params = api.pageParam;
      // console.log("ssss");
      var postjson = {};
      postjson.key = null;
      postjson.name = null;
      postjson.type = null;
      postjson.pageSize = this.pageSize;
      postjson.pageIndex = this.pageNow;
      this.accountId = $api.getStorage('userinf').accountId;
      postjson.accountId = this.accountId;
      postjson.ids = $api.getStorage('userinf').dataAreaCode;
      this.resultjson = postjson;
      UICore.showLoading("列表加载中...", "请稍候");
      var that = this;
      console.log(UICore.serviceUrl + '/mobile/mobileInterfaceForRentalHousing.shtml?act=query&accountId=' + this.accountId + '&data=' + JSON.stringify(this.resultjson));
      if(this.params.item.name == '精神障碍人员'){
        this.baseUrl = 'mobile/MobileSpecialJsza.shtml?act=listForJsza';
      }else if(this.params.item.name == '吸毒人员'){
        this.baseUrl = 'mobile/MobileSpecialXdry.shtml?act=list_for_xdry';
      }
      api.ajax({
        url: UICore.serviceUrl + that.baseUrl + '&accountId=' + this.accountId + '&data=' + JSON.stringify(this.resultjson),
        method: 'post',
      }, function (ret, err) {
        api.hideProgress();
        if (ret) {
          if (ret.success) {
            if (ret.list == "") {
              alert("没有更多数据了")
            } else {
              that.totalpage = ret.pageInfo.totalCount;
              ret.list.forEach(function (value) {
                that.items.push(value);
              });
            }
          } else {
            alert(ret.errorinfo)
          }
        } else {
          alert(JSON.stringify(err))
        }
      });
      var container = $api.dom(".wrapper");
      $api.css(container, 'display:block');
      api.addEventListener({
        name: 'refreshList'
      }, function (ret, err) {
        if (ret) {
          var postjson = {};
          postjson.pageSize = that.pageSize;
          postjson.pageIndex = 1;
          postjson.accountId = that.accountId;
          postjson.ids = $api.getStorage('userinf').dataAreaCode;
          that.resultjson = postjson;
          that.loadList();
        } else {
          alert(JSON.stringify(err));
        }
      });


    },
    mounted: function () {
      var that = this;
      api.addEventListener({
        name: 'searchHouse'
      }, function (ret, err) {
        if (ret) {
          if (ret.value.key1 == true) {
            that.isshow = true;
            that.isSlideInDown = true;
          } else {
            that.isshow = false;
            that.isSlideInDown = false;
          }

        } else {
          alert(JSON.stringify(err));
        }
      });
      this.refreshHeader();
      that.loadBottom();
    },
    methods: {
      cover_close: function () {
        this.isshow = false;
      },
      choose: function (id) {
        api.openWin({
          name: 'people',
          url: './peopleList.html',
          vScrollBarEnabled: false,
          pageParam: {
            title: "people",
            id: id
          }
        });
      },
      refreshHeader: function () {
        var that = this;
        api.setRefreshHeaderInfo({
          visible: true,
          loadingImg: 'widget://image/loading_more.gif',
          bgColor: '#ccc',
          textColor: '#fff',
          textUp: '松开刷新...',
          showTime: true
        }, function (ret, err) {
          // 这里写重新渲染页面的方法
          var postjson = {};
          postjson.key = null;
          postjson.name = null;
          postjson.type = null;
          postjson.pageSize = that.pageSize;
          postjson.pageIndex = 1;
          postjson.accountId = that.accountId;
          postjson.ids = $api.getStorage('userinf').dataAreaCode;
          that.resultjson = postjson;
          that.loadList();
        });
      },
      loadList: function () {
        var that = this;
        console.log("下拉刷新: " + UICore.serviceUrl + '/mobile/mobileInterfaceForRentalHousing.shtml?act=query&accountId=' + this.accountId + '&data=' + JSON.stringify(this.resultjson));
        UICore.showLoading("列表加载中...", "请稍候");
        api.ajax({
          url: UICore.serviceUrl + that.baseUrl + '&accountId=' + that.accountId + '&data=' + JSON.stringify(this.resultjson),
          method: 'post',
        }, function (ret, err) {
          api.hideProgress();
          api.refreshHeaderLoadDone();
          if (ret) {
            if (ret.success) {
              that.totalpage = ret.pageInfo.totalCount;
              console.log(that.totalpage);
              if (ret.list == "") {
                alert("没有更多数据了")
              } else {
                // 清空原有数据
                that.items.splice(0, that.items.length);
                ret.list.forEach(function (value) {
                  that.items.push(value);
                });
              }
            } else {
              alert(ret.errorinfo);
            }
          } else {
            alert(JSON.stringify(err));
          }

        });
      },
      loadBottom: function () { //上拉加载
        var that = this;
        api.addEventListener({
          name: 'scrolltobottom',
          extra: {
            threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
          }
        }, function (ret, err) {
          console.log(that.resultjson.pageIndex);
          console.log(that.totalpage);
          that.resultjson.pageIndex++;
          if (that.resultjson.pageIndex > that.totalpage) {
            that.resultjson.pageIndex--;
            return;
          }
          UICore.showLoading('加载中...', '稍等...');
          console.log(UICore.serviceUrl + '/mobile/mobileInterfaceForRentalHousing.shtml?act=query&accountId=' + this.accountId + '&data=' + JSON.stringify(that.resultjson));
          api.ajax({
            url: UICore.serviceUrl +  that.baseUrl + '&accountId=' + that.accountId + '&data=' + JSON.stringify(that.resultjson),
            method: 'post',
          }, function (ret, err) {
            api.hideProgress();
            if (ret.success) {
              that.totalpage = ret.pageInfo.totalCount;
              var arrlength = 0;
              if (ret.list == "") {
                alert("没有更多数据了")
              } else {
                ret.list.forEach(function (value) {
                  that.items.push(value);
                });
              }
            } else {
              alert(JSON.stringify(ret.errorinfo))
            }
          });
        });
      },
      query: function () {
        var postjson = {};
        postjson.pageSize = this.pageSize;
        postjson.pageIndex = 1;
        postjson.type = null;
        postjson.ids = $api.getStorage('userinf').dataAreaCode;
        postjson.accountId = this.accountId;
        postjson.name = this.name;
        postjson.key = 'name;id_num;dia_style';

        // if (this.unit)
        //     postjson.UNIT = this.unit;
        //
        // if (this.roomNum)
        //     postjson.HOUSE_NUM = this.roomNum;

        this.resultjson = postjson;
        console.log(JSON.stringify(postjson));
        var that = this;
        UICore.showLoading("列表查询中...", "请稍候");
        console.log(UICore.serviceUrl + '/mobile/mobileInterfaceForRentalHousing.shtml?act=query&accountId=' + this.accountId + '&data=' + JSON.stringify(this.resultjson));

        api.ajax({
          url: UICore.serviceUrl +  that.baseUrl + '&accountId=' + this.accountId + '&data=' + JSON.stringify(this.resultjson),
          method: 'post',
        }, function (ret, err) {
          api.hideProgress();
          that.isshow = false;
          // < !--清空搜索数据-->
          // that.houseNumber = ""; //建筑名称
          // that.accountId = ""; //楼号
          // that.unit = ""; //单元(梯/区)
          // that.roomNum = ""; //房号
          // < !--清空搜索数据-->
          if (ret.success) {
            that.totalpage = ret.pageInfo.totalCount;
            that.items.splice(0, that.items.length);
            if (ret.list == "") {
              alert("没有更多数据了")
            } else {
              ret.list.forEach(function (value) {
                that.items.push(value);
              });
            }
          } else {
            alert(JSON.stringify(ret.errorinfo))
          }
        });
      },
    } // methods end.

  });

}
