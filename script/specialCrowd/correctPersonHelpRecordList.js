/**
 * Created by ymy on 2018/7/2.
 */
apiready = function() {
    new Vue({
        el: "#all_con",
        data: {
            params: "",
            config: {},
        },
        created: function() {
            this.params = api.pageParam;
            this.config = {
                url: "/mobile/MobileSpecialHelpRecord.shtml",
                params: {
                    act: "helpRecordList",
                    pageIndex: 1,
                    pageSize: 15,
                    spId: this.params.id,
                    typeCode:2
                }, //查询参数
                title: "帮扶信息列表",
                dataImgPath: "widget://image/me/my_info.png",
                addAuth: false,
                receiveEvent: "",
                column: [{
                    label: "帮扶人员",
                    name: 'helper'
                }, {

                    label: "",
                    name: ''
                }, {
                    label: "矫正走访月份",
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
                    editBaseHousehold: function(obj, index) {
                        api.openWin({
                            name: 'correctPersonHelpRecordEdit',
                            url: './correctPersonHelpRecordEdit.html',
                            vScrollBarEnabled: false,
                            pageParam: {
                                title: "editHelper",
                                obj: obj,
                                people: api.pageParam
                            }
                        });
                        api.addEventListener({
                            name: 'refreshrentalSpecialCrowd'
                        }, function(ret, err) {
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
                    delete: function(obj, index) {
                        var userToken = $api.getStorage('userToken');
                        UICore.showLoading('正在删除...', '请稍后...');
                        var parameterToken = '?act=delete&helpRecordId=' +obj.id;
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
                }, ]
            }
            CommonList.loadList(this.config);
            var _self = this;
            api.addEventListener({
                name: 'refreshrentalSpec'
            }, function(ret, err) {
                if (ret) {
                    CommonList.refresh = true;
                    CommonList.initListData(_self.config);
                } else {
                    alert(JSON.stringify(err));
                }
            });
            api.addEventListener({
                name: 'addHousehouldList'
            }, function(ret, err) {
                if (ret) {
                    CommonList.refresh = true;
                    CommonList.initListData(_self.config);
                } else {
                    alert(JSON.stringify(err));
                }
            });

        },
        methods: {
            closeWin: function() {
                api.closeWin();
            },
            addData: function() {
                api.openWin({
                    name: 'correctPersonHelpRecordAdd',
                    url: './correctPersonHelpRecordAdd.html',
                    pageParam: {
                        people: this.params
                    }
                });
            },
        }
    });

}
