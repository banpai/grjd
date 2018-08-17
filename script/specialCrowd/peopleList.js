/**
 * Created by kevin on 2017/8/18.
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
                    act: "list",
                    pageIndex: 1,
                    pageSize: 15,
                    spId: this.params.id
                }, //查询参数
                title: "帮扶信息列表",
                dataImgPath: "widget://image/me/my_info.png",
                addAuth: false,
                receiveEvent: "",
                column: [{
                    label: "帮扶团队",
                    name: 'teamName'
                }, {

                    label: "帮扶人员",
                    name: 'helper'
                }, {
                    label: "帮扶时间",
                    name: 'time',
                }, {
                    label: "帮扶内容",
                    name: 'content'
                }],
                toolbar: [, {
                    text: "编辑",
                    flag: "edit",
                    authority: true,
                    clickListItem: true,
                    editBaseHousehold: function(obj, index) {
                        api.openWin({
                            name: 'rentalSpecialCrowd',
                            url: './rentalSpecialCrowd.html',
                            vScrollBarEnabled: false,
                            pageParam: {
                                title: "editHelper",
                                item: obj,
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
                    name: 'rentalSpecialCrowd',
                    url: './rentalSpecialCrowd.html',
                    pageParam: {
                        people: this.params
                    }
                });
            },
        }
    });

}
