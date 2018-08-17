/**
 *   Created by hzh on 2017/7/10
 */
apiready = function () {
    new Vue({
        el: "#list",
        mixins:[ocnFunction2],
        data: {
            ids: '',
            name: "", //姓名
            numberId: "", //身份证号
            placeOrigin: '', //籍贯

            nation: '', //名族
            nationId: '', //名族id
            nation_arr: [], //民族列表

            sex: "", //性别
            sexId: "", //性别id
            sex_arr: [], //性别列表

            politicalLandscape: '', //政治面貌
            politicalLandscapeId: '', //政治面貌id
            politicalLandscape_arr: [], //政治面貌列表

            tel: '', //	联系方式
            addressDetail: '', //	现住地
            visitTime: '', //上访时间
            visitPlace: '', //上访地点
            visitorName: '', //接访人员姓名
            visitorTel: '', //接访人员联系方式

            visitStatus: '', //上访状态
            visitStatusId: '',
            visitStatus_arr: [],

            isRevisit: '', //是否重访
            isRevisitId: '',
            isRevisit_arr: [],

            focusDegree: '', //关注程度
            focusDegreeId: '',
            focusDegree_arr: [],

            visitTypes: '', //上访类型
            visitTypesId: '',
            visitTypes_arr: [],

            personType: '', //人员类别
            personTypeId: '',
            personType_arr: [],

            visitReason: '', //
            dataAreaCode: '',
            coordinate:'',//关联地图
            isNew: true,
            title: '',
            isClick: false, //是否可点击
            edited: false,
        },
        created: function () {
            var pageParam = api.pageParam
            if (pageParam != null && pageParam.name) {
                this.title = pageParam.name;
                this.isNew = true;
            } else {
                this.title = "编辑" + pageParam.params.item.name;
                this.isNew = false;
            }
            this.initSelectData();
        },
        methods: {
            initSelectData: function () {
                var that = this;
                var jsonData = JSON.parse($api.getStorage('settingdata'));
                jsonData.data.forEach(function (value) {
                    if (value.parentKey == "gentles") { //性别
                        that.sex_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "familyname") { //民族
                        that.nation_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "zzmm") { //政治面貌
                        that.politicalLandscape_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "sfzt") { //上访状态
                        that.visitStatus_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "sfzdgzry") { //是否重访
                        that.isRevisit_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "GZCD") { //关注程度
                        that.focusDegree_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "sflx") { //上访类型
                        that.visitTypes_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }

                    if (value.parentKey == "JSZARYLB") { //人员类别
                        that.personType_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }

                });
                if (!this.isNew) {
                    this.getEditForm();
                }
            },
            getEditForm: function () {
                var spIds = api.pageParam.id;
                this.accountId = $api.getStorage('userinf').accountId;
                var json = {
                    accountId: this.accountId,
                    spId: spIds
                };
                var _self = this;
                console.log(UICore.serviceUrl + 'mobile/mobileKeyPetition.shtml?act=getDetailInfo&data=' + JSON.stringify(json));
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/mobileKeyPetition.shtml?act=getDetailInfo&data=' + JSON.stringify(json),
                    method: 'post',
                }, function (ret, err) {
                    api.hideProgress();
                    if (ret) {
                        if (ret.success) {
                            _self.initEditForm(ret.data)
                        }
                    } else {
                        alert(JSON.stringify(err))
                    }
                });
            },
            initEditForm: function (info) {
                console.log(JSON.stringify(info));
                this.ids = info.id;
                this.dataAreaCode = info.dataAreaCode;
                this.name = info.name; //姓名
                this.numberId = info.idNumber; //身份证号
                this.placeOrigin = info.root; //籍贯

                for (var num in this.nation_arr) { //民族
                    if (this.nation_arr[num].key == info.nation) {
                        this.nation = this.nation_arr[num].text;
                        this.nationId = this.nation_arr[num].key;
                    }
                }

                for (var num in this.sex_arr) { //性别
                    if (this.sex_arr[num].key == info.sex) {
                        this.sex = this.sex_arr[num].text;
                        this.sexId = this.sex_arr[num].key;
                    }
                }

                for (var num in this.politicalLandscape_arr) { //政治面貌
                    if (this.politicalLandscape_arr[num].key == info.political) {
                        this.politicalLandscape = this.politicalLandscape_arr[num].text;
                        this.politicalLandscapeId = this.politicalLandscape_arr[num].key;
                    }
                }

                this.tel = info.telphone; //	联系方式
                this.addressDetail = info.residence; //	现住地
                this.visitTime = info.petitionDate; //上访时间
                this.visitPlace = info.petitionAddress; //上访地点
                this.visitorName = info.petitionReceiveName; //接访人员姓名
                this.visitorTel = info.petitionReceiveTel; //接访人员联系方式
                this.visitReason = info.petitionReason;
                this.coordinate=info.coordinate;//关联地图

                for (var num in this.visitStatus_arr) { //上访状态
                    if (this.visitStatus_arr[num].key == info.petitionStatus) {
                        this.visitStatus = this.visitStatus_arr[num].text;
                        this.visitStatusId = this.visitStatus_arr[num].key;
                    }
                }

                for (var num in this.isRevisit_arr) { //是否重访
                    if (this.isRevisit_arr[num].key == info.petitionRepeat) {
                        this.isRevisit = this.isRevisit_arr[num].text;
                        this.isRevisitId = this.isRevisit_arr[num].key;
                    }
                }

                for (var num in this.focusDegree_arr) { //关注程度
                    if (this.focusDegree_arr[num].key == info.followDegree) {
                        this.focusDegree = this.focusDegree_arr[num].text;
                        this.focusDegreeId = this.focusDegree_arr[num].key;
                    }
                }

                for (var num in this.visitTypes_arr) { //上访类型
                    if (this.visitTypes_arr[num].key == info.petitionType) {
                        this.visitTypes = this.visitTypes_arr[num].text;
                        this.visitTypesId = this.visitTypes_arr[num].key;
                    }
                }

                for (var num in this.personType_arr) { //人员类别
                    if (this.personType_arr[num].key == info.petitionReason) {
                        this.personType = this.personType_arr[num].text;
                        this.personTypeId = this.personType_arr[num].key;
                    }
                }


            },
            sexf: function () { //性别
                var that = this;
                var defaultVal = this.sex; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.sex_arr.forEach(function (value, index, arr) {
                        if (value.text == that.sex) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.sex_arr, this.sex, "sex");
                api.addEventListener({
                    name: 'sex'
                }, function (ret, err) {
                    if (ret) {
                        that.sex = ret.value.key1;
                        that.sexId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });

            },
            nationf: function () { //民族
                var that = this;
                var defaultVal = this.nation; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.nation_arr.forEach(function (value, index, arr) {
                        if (value.text == that.nation) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.nation_arr, this.nation, "nation");
                api.addEventListener({
                    name: 'nation'
                }, function (ret, err) {
                    if (ret) {
                        that.nation = ret.value.key1;
                        that.nationId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });

            },
            politicalLandscapef: function () { //政治面貌
                var that = this;
                var defaultVal = this.politicalLandscape; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.politicalLandscape_arr.forEach(function (value, index, arr) {
                        if (value.text == that.politicalLandscape) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.politicalLandscape_arr, this.politicalLandscape, "politicalLandscape");
                api.addEventListener({
                    name: 'politicalLandscape'
                }, function (ret, err) {
                    if (ret) {
                        that.politicalLandscape = ret.value.key1;
                        that.politicalLandscapeId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });

            },
            visitTimef: function () { //上访时间
                var that = this;
                UICore.openTimeComponent2(this.visitTime);
                api.addEventListener({
                    name: 'buildingTime'
                }, function (ret, err) {
                    if (ret) {
                        that.visitTime = ret.value.key1;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            visitStatusf: function () { //上访状态
                var that = this;
                var defaultVal = this.visitStatus; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.visitStatus_arr.forEach(function (value, index, arr) {
                        if (value.text == that.sex) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.visitStatus_arr, this.visitStatus, "visitStatus");
                api.addEventListener({
                    name: 'visitStatus'
                }, function (ret, err) {
                    if (ret) {
                        that.visitStatus = ret.value.key1;
                        that.visitStatusId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            isRevisitf: function () { //是否重访
                var that = this;
                var defaultVal = this.isRevisit; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.isRevisit_arr.forEach(function (value, index, arr) {
                        if (value.text == that.isRevisit) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.isRevisit_arr, this.isRevisit, "isRevisit");
                api.addEventListener({
                    name: 'isRevisit'
                }, function (ret, err) {
                    if (ret) {
                        that.isRevisit = ret.value.key1;
                        that.isRevisitId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            focusDegreef: function () { //关注程度
                var that = this;
                var defaultVal = this.focusDegree; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.focusDegree_arr.forEach(function (value, index, arr) {
                        if (value.text == that.sex) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.focusDegree_arr, this.focusDegree, "focusDegree");
                api.addEventListener({
                    name: 'focusDegree'
                }, function (ret, err) {
                    if (ret) {
                        that.focusDegree = ret.value.key1;
                        that.focusDegreeId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            visitTypesf: function () { //上访类型
                var that = this;
                var defaultVal = this.visitTypes; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.visitTypes_arr.forEach(function (value, index, arr) {
                        if (value.text == that.visitTypes) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.visitTypes_arr, this.visitTypes, "visitTypes");
                api.addEventListener({
                    name: 'visitTypes'
                }, function (ret, err) {
                    if (ret) {
                        that.visitTypes = ret.value.key1;
                        that.visitTypesId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            personTypef: function () { //上访类型
                var that = this;
                var defaultVal = this.personType; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.personType_arr.forEach(function (value, index, arr) {
                        if (value.text == that.personType) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.personType_arr, this.personType, "personType");
                api.addEventListener({
                    name: 'personType'
                }, function (ret, err) {
                    if (ret) {
                        that.personType = ret.value.key1;
                        that.personTypeId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            checkidentity: function () {

            },
            checkPhone: function () {

            },
            submitForm: function () { //提交
                if (this.checkVal()) {
                    var json = this.makejson();
                    var postJson = {};
                    postJson.keyPetitionVo = json;
                    console.log(UICore.serviceUrl + '/mobile/mobileKeyPetition.shtml?act=addOrEdit&data=' + JSON.stringify(postJson));
                    api.ajax({
                        url: UICore.serviceUrl + '/mobile/mobileKeyPetition.shtml?act=addOrEdit&data=' + JSON.stringify(postJson),
                        method: 'post',
                    }, function (ret, err) {
                        if (ret) {
                            if (ret.success) {
                                api.toast({
                                    msg: '保存成功',
                                    duration: 3000,
                                    global: 'true',
                                    location: 'bottom'
                                });
                                api.sendEvent({
                                    name: 'refreshKeyMonitorList',
                                    extra: {
                                        myJson: json
                                    }
                                });
                                api.closeWin();
                            } else {
                                alert(ret.errorinfo);
                            }
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            makejson: function () {
                var postjson = {}; //提交postjson
                var info = $api.getStorage('userinf');
                postjson.id = this.ids //重点上访人员主键
                if (this.isNew) {
                    postjson.dataAreaCode = $api.getStorage('userinf').dataAreaCode; //行政区划编号
                } else {
                    postjson.dataAreaCode = this.dataAreaCode;
                }
                postjson.idNumber = this.numberId; //证件号码
                postjson.name = this.name; //姓名
                postjson.nation = this.nationId; //民族
                postjson.sex = this.sexId; //性别
                postjson.root = this.placeOrigin; //籍贯
                postjson.political = this.politicalLandscapeId; //政治面貌
                postjson.telphone = this.tel; //联系方式
                postjson.residence = this.addressDetail; //现居地址
                postjson.petitionDate = this.visitTime; //上访时间
                postjson.petitionAddress = this.visitPlace; //上访地点
                postjson.petitionReceiveName = this.visitorName; //接访人员姓名
                postjson.petitionReceiveTel = this.visitorTel; //接访人员联系方式
                postjson.petitionStatus = this.visitStatusId; //上访状态
                postjson.petitionRepeat = this.isRevisitId; //是否重访
                postjson.followDegree = this.focusDegreeId; //关注程度
                postjson.petitionType = this.visitTypesId; //上访类型
                postjson.petitionReason = this.visitReason; //上访原因
                postjson.coordinate=this.coordinate;//关联地图

                return postjson;

            },
            checkVal: function () {
                if (!this.numberId) {
                    alert("请输入证件号码");
                    return false;
                }
                if (!this.name) {
                    alert("请输入姓名");
                    return false;
                }
                if (!this.sexId) {
                    alert("请选择性别");
                    return false;
                }
                if (!this.tel) {
                    alert("请输入联系方式");
                    return false;
                }
                if (!this.politicalLandscape) {
                    alert("请选择政治面貌");
                    return false;
                }
                if (!this.visitPlace) {
                    alert("请输入上访地点");
                    return false;
                }
                if (!this.visitStatus) {
                    alert("请选择上访状态");
                    return false;
                }
                return true;
            },
            closeWin: function () {
                api.closeWin();
            }
        }, // methods end.
        components: {
            "populationComponent": {
                props: ['personinfos', 'myclass'],
                template: "#personinfo",
            },
        }
    })
}
