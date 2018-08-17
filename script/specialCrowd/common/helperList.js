/**
 * Created by ymy on 2018/7/2.
 */
apiready = function () {
  new Vue({
    el: "#all_con",
    data: function () {
      var typeCode = '';
      if(api.pageParam.item.name == '精神障碍人员'){
        typeCode = 7;
      }else if(api.pageParam.item.name == '法轮功人员' || api.pageParam.item.name == '邪教人员'){
        typeCode = 6;
      }else if(api.pageParam.item.name == '吸毒人员'){
        typeCode = 3;
      }else if(api.pageParam.item.name == '重点信访人员'){
        typeCode = 8;
      }
      return {
        params: "",
        config: {
          url: "/mobile/MobileSpecialHelpRecord.shtml",
          params: {
            act: "helpRecordList",
            pageIndex: 1,
            pageSize: 15,
            spId: api.pageParam.id,
            typeCode: typeCode
          }, //查询参数
          title: "帮扶信息列表",
          dataImgPath: "widget://image/me/my_info.png",
          addAuth: false,
          receiveEvent: "",
          column: [{
            label: "帮扶人员",
            name: 'helper'
          },{
            label: "",
            name: ''
          },{
            label: "走访时间",
            name: 'time',
          }, {
            label: "其它现实表现",
            name: 'content'
          }],
          toolbar: [, {
            text: "编辑",
            flag: "edit",
            authority: true,
            clickListItem: true,
            editBaseHousehold: function (obj, index) {
              api.openWin({
                name: 'helperAddEdit',
                url: './helperAddEdit.html',
                vScrollBarEnabled: false,
                pageParam: {
                  item: api.pageParam.item,
                  obj: obj
                }
              });
              api.addEventListener({
                name: 'refreshrentalSpecialCrowd'
              }, function (ret, err) {
                if (ret) {
                  CommonList.refresh = true;
                  CommonList.initListData(_self.config);
                } else {
                  alert(JSON.stringify(err));
                }
              });

            }
          }, {
              text: "删除",
              flag: "delete",
              authority: true,
              slide: true,
              slideCss: {
                width: 60,
                bgColor: "#F47020",
                titleColor: "#fff",
                titleSize: 12
              },
              confirm: {
                isConfirm: true,
                confirmMsg: "确定删除该条数据吗?"
              },
              delete: function (obj, index) {
                var userToken = $api.getStorage('userToken');
                UICore.showLoading('正在删除...', '请稍后...');
                var parameterToken = '?act=deleteHelpRecords&helpRecordId=' + obj.id + '&typeCode=' + typeCode;
                api.ajax({
                  url: UICore.serviceUrl + 'mobile/MobileSpecialHelpRecord.shtml' + parameterToken,
                  method: 'post'
                }, function (ret, err) {
                  api.hideProgress();
                  if (ret) {
                    if (ret.success) {
                      api.toast({
                        msg: '删除成功',
                        duration: 2000,
                        global: 'true',
                        location: 'bottom'
                      });
                      CommonList.deleteItem(index);
                      CommonList.refresh = true;
                      CommonList.initListData(_self.config);
                    }
                  } else {
                    alert(JSON.stringify(err));
                  }
                });
              }
            },]
        },
      }
    },
    created: function () {
      this.params = api.pageParam;
      this._init();
    },
    methods: {
      // 初始化
      _init: function () {
        // 初始化
        CommonList.loadList(this.config);
        var _self = this;
        api.addEventListener({
          name: 'refreshrentalSpec'
        }, function (ret, err) {
          if (ret) {
            CommonList.refresh = true;
            CommonList.initListData(_self.config);
          } else {
            alert(JSON.stringify(err));
          }
        });
        api.addEventListener({
          // name: 'addHousehouldList'
          name: 'refreshResultList'
        }, function (ret, err) {
          if (ret) {
            CommonList.refresh = true;
            CommonList.initListData(_self.config);
          } else {
            alert(JSON.stringify(err));
          }
        });
      },
      // 关闭页面
      closeWin: function () {
        api.closeWin();
      },
      // 新增记录
      addData: function () {
        api.openWin({
          name: 'helperAddEdit',
          url: './helperAddEdit.html',
          pageParam: {
            id:api.pageParam.id,
            item: api.pageParam.item
          }
        });
      },
    }
  });

}
