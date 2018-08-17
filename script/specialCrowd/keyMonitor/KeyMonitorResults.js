/**
 * Created by kevin on 2017/8/18.
 */
apiready = function() {
    var vue = new Vue({
        el: "#all_con",
        data: {
            items: [],
            isshow: false,
            isSlideInDown: false,
            isSlideInUp: false,
            resultjson: {},
            params: "",
            accountId: "",
            name: "", //姓名
        },
        created: function() {
            this.params = api.pageParam.params;
            console.log(JSON.stringify(this.params));
            var postjson = {};
            postjson.pageSize = 10;
            postjson.pageIndex = 1;
            postjson.name = '';
            postjson.areaCode = $api.getStorage('userinf').villageOrCommunityCode;
            this.resultjson = postjson;
            this.accountId = $api.getStorage('userinf').accountId;
            UICore.showLoading("列表加载中...", "请稍候");
            var that = this;
            console.log(UICore.serviceUrl + 'mobile/mobileKeyPetition.shtml?accountId=' + this.accountId + '&act=list_for_key_petition&data=' + JSON.stringify(this.resultjson));
            api.ajax({
                url: UICore.serviceUrl + 'mobile/mobileKeyPetition.shtml?accountId=' + this.accountId + '&act=list_for_key_petition&data=' + JSON.stringify(this.resultjson),
                method: 'post',
            }, function(ret, err) {
                api.hideProgress();
                if (ret.success) {
                    if (ret.list == "") {
                        alert("没有更多数据了")
                    } else {
                        ret.data.forEach(function(value) {
                            that.items.push(value);
                        });
                    }
                } else {
                    alert(JSON.stringify(ret.errorinfo))
                }
            });
            var container = $api.dom(".wrapper");
            $api.css(container, 'display:block');
            var _self = this;
            api.addEventListener({
                name: 'refreshKeyMonitorList'
            }, function(ret, err) {
                if (ret) {
                    var myJson = ret.value.myJson;
                    for (var num in _self.items) {
                        if (_self.items[num].id == myJson.id) {
                            _self.items[num] = myJson;
                        }
                        break;
                    }
                } else {
                    alert(JSON.stringify(err));
                }
            });
        },
        mounted: function() {
            var that = this;
            api.addEventListener({
                name: 'searchHouse'
            }, function(ret, err) {
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
            cover_close: function() {
                this.isshow = false;
            },
            choose: function(id) {
                api.openWin({
                    name: 'NewKeyMonitor',
                    url: './NewKeyMonitor.html',
                    vScrollBarEnabled: false,
                    pageParam: {
                        params: this.params,
                        id: id
                    }
                });
            },
            chooseHelpRecord: function(id) {
              api.openWin({
                name: 'helperList',
                url: '../common/helperList.html',
                vScrollBarEnabled: false,
                pageParam: {
                  id: id,
                  item: this.params.item
                }
              });
            },
            refreshHeader: function() {
                var that = this;
                api.setRefreshHeaderInfo({
                    visible: true,
                    loadingImg: 'widget://image/loading_more.gif',
                    bgColor: '#ccc',
                    textColor: '#fff',
                    textUp: '松开刷新...',
                    showTime: true
                }, function(ret, err) {
                    // 这里写重新渲染页面的方法
                    that.loadList();
                });
            },
            loadList: function() {
                var that = this;
                this.resultjson.pageIndex = 1;
                console.log("下拉刷新: " + UICore.serviceUrl + 'mobile/mobileKeyPetition.shtml?accountId=' + this.accountId + '&act=list_for_key_petition&data=' + JSON.stringify(this.resultjson));
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/mobileKeyPetition.shtml?accountId=' + this.accountId + '&act=list_for_key_petition&data=' + JSON.stringify(this.resultjson),
                    method: 'post',
                }, function(ret, err) {
                    api.refreshHeaderLoadDone();
                    if (ret.success) {
                        if (ret.data == "") {
                            alert("没有更多数据了")
                        } else {
                            // 清空原有数据
                            that.items.splice(0, that.items.length);
                            ret.data.forEach(function(value) {
                                that.items.push(value);
                            });
                        }
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            loadBottom: function() { //上拉加载
                var that = this;
                api.addEventListener({
                    name: 'scrolltobottom',
                    extra: {
                        threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
                    }
                }, function(ret, err) {
                    UICore.showLoading('加载中...', '稍等...');
                    that.resultjson.pageIndex++;
                    console.log(UICore.serviceUrl + 'mobile/mobileKeyPetition.shtml?accountId=' + that.accountId + '&act=list_for_key_petition&data=' + JSON.stringify(that.resultjson));
                    api.ajax({
                        url: UICore.serviceUrl + 'mobile/mobileKeyPetition.shtml?accountId=' + that.accountId + '&act=list_for_key_petition&data=' + JSON.stringify(that.resultjson),
                        method: 'post',
                    }, function(ret, err) {
                        api.hideProgress();
                        if (ret.success) {
                            if (ret.data == "") {
                                alert("没有更多数据了")
                            } else {
                                ret.data.forEach(function(value) {
                                    that.items.push(value);
                                });
                            }
                        } else {
                            alert(JSON.stringify(ret.errorinfo))
                        }
                    });
                });
            },
            query: function() {
                var postjson = {};
                var resultjson = {};
                postjson.pageSize = 10;
                postjson.pageIndex = 1;
                postjson.areaCode = $api.getStorage('userinf').villageOrCommunityCode;
                if (this.name) { //姓名
                    postjson.name = this.name;
                };
                resultjson = postjson;
                console.log(JSON.stringify(resultjson));
                var that = this;
                UICore.showLoading("列表查询中...", "请稍候");
                console.log(UICore.serviceUrl + 'mobile/mobileKeyPetition.shtml.shtml?accountId=' + this.accountId + '&act=list_for_key_petition&data=' + JSON.stringify(resultjson));
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/mobileKeyPetition.shtml.shtml?accountId=' + this.accountId + '&act=list_for_key_petition&data=' + JSON.stringify(resultjson),
                    method: 'post',
                }, function(ret, err) {
                    api.hideProgress();
                    that.isshow = false;
                    if (ret.success) {
                        that.items.splice(0, that.items.length);
                        if (ret.data == "") {
                            alert("没有更多数据了")
                        } else {
                            ret.data.forEach(function(value) {
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
