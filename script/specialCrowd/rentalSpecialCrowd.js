/**
 * Created by kevin on 2017/7/13.
 */
apiready = function () {

    new Vue({
        el: "#list",
        mixins: [upload],
        data: {
            f: {
                id: null,
                // 帮扶内容
                content: '',
                // 帮扶地点
                place: '',
                // 帮扶时间
                time: '',
                // 特殊人群id
                spId: '',
                // 基础人口id
                bsId: null,
                // 帮扶对象ID
                teamId: '',
                // 服务团队名称
                teamName: '',
                // 帮扶人员ID
                helperId: '',
                // 随行人员
                followers: '',
                // 特殊人群类型
                type: null,
                // 帮扶人员
                helper: '',
                // 获取所有附件用ID
                recordId: null,
                // 附件路径
                attachUrl: null,
                // 附件id
                attachId: null
            },
            title: "",
            isNew: true, //是否是新增
            helpTeam_arr: [], //帮扶团队列表
            helpPerson_arr: [] //帮扶人员列表
        },
        created: function () {
            var param = api.pageParam.people;
            this.f.spId = param.id;
            if (api.pageParam.title == "editHelper") {
                var info = api.pageParam.item;
                this.isNew = false;
                this.getEditInfo(info);
                this.title = "编辑帮扶记录"
            } else {
                this.title = "新增帮扶记录"
            }

            this.getList()
        },
        methods: {
            getEditInfo: function (info) {
                this.f.id = info.id;
                this.f.content = info.content;// 帮扶内容
                this.f.place = info.place;  // 帮扶地点
                this.f.time = info.time;// 帮扶时间
                this.f.spId = info.spId;  // 特殊人群id
                this.f.bsId = info.bsId;  // 基础人口id
                this.f.teamId = info.teamId;  // 帮扶对象ID
                this.f.teamName = info.teamName;  // 服务团队名称
                this.f.helperId = info.helperId;  // 帮扶人员ID
                this.f.followers = info.followers;  // 随行人员
                this.f.type = info.type;  // 特殊人群类型
                this.f.helper = info.helper;// 帮扶人员
                this.f.recordId = info.recordId;  // 获取所有附件用ID
                this.f.attachUrl = info.attachUrl;  // 附件路径
                this.f.attachId = info.attachId;//附件id
            },
            // 获取帮扶对象列表
            getList: function () {
                var this_ = this;
                var userinf = $api.getStorage('userinf');
                var parameterToken = '?act=getList&dataAreaCode=' + $api.getStorage('userinf').dataAreaCode;
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/MobileSpecialHelpRecord.shtml' + parameterToken,
                    method: 'post'
                }, function (ret, err) {
                    if (null != ret.list && ret.list != []) {
                        ret.list.forEach(function (item) {
                            this_.helpTeam_arr.push({
                                text: item.teamName,
                                status: 'normal',
                                key: item.id
                            });
                        })
                    }
                });
            },
            // 获取帮扶对象的帮扶人员的列表
            relaAllList: function () {
                // 查询帮扶人员
                var this_ = this;
                var userinf = $api.getStorage('userinf');
                var parameterToken = '?act=relaAllList&parentId=' + this.f.teamId;
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/MobileSpecialHelpRecord.shtml' + parameterToken,
                    method: 'post'
                }, function (ret, err) {
                    if (null != ret.list && ret.list != []) {

                        ret.list.forEach(function (item) {
                            this_.helpPerson_arr.push({
                                text: item.name,
                                status: 'normal',
                                key: item.id
                            });
                        })
                    }
                });
            },
            // 帮扶记录新增
            save: function () {
                // 帮扶记录新增
                // var dataSave = {
                //     id: null,
                //     // 帮扶内容
                //     content: '测试帮扶内容',
                //     // 帮扶地点
                //     place: '测试帮扶地点',
                //     // 帮扶时间
                //     time: '2018-6-13 16:22:02',
                //     // 特殊人群id
                //     spId: param.people.params.id,
                //     // 基础人口id
                //     bsId: null,
                //     // 帮扶对象ID
                //     teamId: 'dc277d8ae2d94207a97b78d0aac11d77',
                //     // 服务团队名称
                //     teamName: '杨庙帮扶',
                //     // 帮扶人员ID
                //     helperId: '594c687f5b45420d8ee9854877416b15',
                //     // 随行人员
                //     followers: '随行人员A,随行人员B',
                //     // 特殊人群类型
                //     type: null,
                //     // 帮扶人员
                //     helper: '张东翔',
                //     // 获取所有附件用ID
                //     recordId: null,
                //     // 附件路径
                //     attachUrl: null,
                //     // 附件id
                //     attachId: null
                // };
                // var parameterToken = '?act=save&data=' + JSON.stringify(dataSave);
                var _this = this;
                this.uploadAttach(function (r) {
                    _this.f.attachUrl = r.Object;
                    _this.f.attachId = r.data;
                    api.ajax({
                        url: UICore.serviceUrl + 'mobile/MobileSpecialHelpRecord.shtml' + parameterToken,
                        method: 'post'
                    }, function (ret, err) {
                        api.toast({
                            msg: ret.message,
                            duration: 1500,
                            location: 'bottom'
                        });
                        if (ret.success) {
                            if (this_.isNew) {
                                UICore.sendEvent("refreshrentalSpecialCrowd")
                            } else {
                                UICore.sendEvent("refreshrentalSpec")
                            }
                            api.closeWin();
                        }
                    });
                })
            },
            // 帮扶记录删除
            delete: function (item) {
                // 帮扶记录删除
                if (this.f.id == null) {
                    return;
                }
                var parameterToken = '?act=delete&helpRecordId=' + this.f.id;
                // api.ajax({
                //     url: UICore.serviceUrl + 'mobile/MobileSpecialHelpRecord.shtml' + parameterToken,
                //     method: 'post'
                // }, function (ret, err) {
                //     // api.hideProgress();
                //     // 帮扶列表
                //     var list = ret.list;
                // });
            },
            closeWin: function () {
                api.closeWin();
            },
            selectItem: function (type) {
                var this_ = this;
                if ("helpTeam" == type) { //帮扶团队

                    var defaultVal = this.f.teamName; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.helpTeam_arr.forEach(function (value, index, arr) {
                            if (value.text == this_.f.teamName) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.helpTeam_arr, this.helpTeam, "helpTeam");
                    api.addEventListener({
                        name: 'helpTeam'
                    }, function (ret, err) {
                        if (ret) {
                            this_.f.teamName = ret.value.key1;
                            this_.f.teamId = ret.value.key2;

                            this_.helpPerson_arr = [];
                            this_.f.helper = null;
                            this_.f.helperId = null;
                            this_.relaAllList()
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } else if ("helpPerson" == type) {
                    if (!this.f.teamId) {
                        api.toast({
                            msg: '请先选择帮扶团队',
                            duration: 1500,
                            location: 'bottom'
                        });
                        return;
                    }
                    var defaultVal = this.f.helper; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.helpPerson_arr.forEach(function (value, index, arr) {
                            if (value.text == this_.f.helper) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.helpPerson_arr, this.f.helper, "helper");
                    api.addEventListener({
                        name: 'helper'
                    }, function (ret, err) {
                        if (ret) {
                            this_.f.helper = ret.value.key1;
                            this_.f.helperId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } else if ("time" == type) {
                    UICore.openTimeComponent2(this.f.time);
                    api.addEventListener({
                        name: 'buildingTime'
                    }, function (ret, err) {
                        if (ret) {
                            this_.f.time = ret.value.key1;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            del: function (item) {
                var that = this;
                api.confirm({
                    title: '提醒',
                    msg: '是否删除该条信息',
                    buttons: ['确定', '取消']
                },
                    function (ret, err) {
                        var index = ret.buttonIndex;
                        if (index == 1) {
                            console.log(JSON.stringify(item));
                            for (var i = 0; i < that.memberinfo_arr.length; i++) {
                                if (that.memberinfo_arr[i] == item) {
                                    console.log(JSON.stringify(that.memberjson[i]));
                                    that.removeByValue(that.populationIdsArr, that.memberjson[i].population.id);
                                    //that.delResidentId_arr.push(that.memberjson[i].population.id)
                                    that.memberinfo_arr.splice(i, 1);
                                    that.memberjson.splice(i, 1);
                                    that.houseMembers = that.houseMembers - 1;
                                }
                            }
                        }
                    });
            },
            removeByValue: function (arr, val) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == val) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            }
        },
        components: {
            "houseComponent": {
                props: ['hosetitle', 'myclass'],
                template: "#houseInfo",
            }
        }
    });
}
