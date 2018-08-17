/**
 *   Created by hzh on 2017/7/10
 */
apiready = function () {
    new Vue({
        el: "#list",
        mixins: [ocnFunction2],
        data: {
            ids: '',
            name: "", //姓名
            numberId: "", //身份证号
            oldName: '', //曾用名
            date: "", //出生日期
            placeOrigin: '', //籍贯
            job: '', //职业

            nation: '', //名族
            nationId: '', //名族id
            nation_arr: [], //民族列表

            sex: "", //性别
            sexId: "", //性别id
            sex_arr: [], //性别列表

            marry: '', //婚姻状况
            marryId: '', //婚姻状况id
            marry_arr: [], //婚姻状况列表

            politicalLandscape: '', //政治面貌
            politicalLandscapeId: '', //政治面貌id
            politicalLandscape_arr: [], //政治面貌列表

            education: '', //文化程度
            educationId: '', //文化程度id
            education_arr: [], //文化程度列表

            religiousBelief: '', //宗教信仰
            religiousBeliefId: '', //宗教信仰id
            religiousBelief_arr: [], //宗教信仰列表

            workCategory: '', //职业类别
            workCategoryId: '', //职业类别id
            workCategory_arr: [], //职业类别列表

            domicile: '', //	户籍地
            domicileAddress: '', //	户籍详细地址
            address: '', //	现住地
            addressDetail: '', //	现住地详细地址
            tel: '', //手机号码
            firstFindDate: '', //初次发现日期
            server: '', //服务处所
            others: '', //其它需要说明的问题

            controlSituation: '', //管控情况
            controlSituationId: '',
            controlSituation_arr: [],

            controller: '', //管控人姓名
            controllerTel: '', //管控人联系方式
            helpSituation: '', //帮扶情况
            helperName: '', //帮扶人姓名
            helperTel: '', //帮扶人联系方式

            crimeHistory: '', //有无犯罪史
            crimeHistoryId: '',
            crimeHistory_arr: [],

            crimeSituation: '', //犯罪情况

            personType: '', //人员类别
            personTypeId: '',
            personType_arr: [],

            drugofReason: '', //吸毒原因
            drugofReasonId: '',
            drugofReason_arr: [],

            drugResult: '',
            palatabilityType: '', //适口类型
            palatabilityTypeId: '',
            palatabilityType_arr: [],

            originalSin: '', //原罪名
            originalSinId: '',
            originalSin_arr: [],

            followDegree: '', //关注程度
            followDegreeId: '',
            followDegree_arr: [],

            dataAreaCode: '',
            coordinate: '',//关联地图
            isClick: false, //是否可点击
            isNew: true,
            edited: false,
            title: '',
        },
        created: function () {
            var pageParam = api.pageParam;
            console.log(JSON.stringify(pageParam));
            if (pageParam != null && pageParam.name) { //新增
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
                    if (value.parentKey == "hyzk") { //婚姻状况
                        that.marry_arr.push({
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
                    if (value.parentKey == "edutation") { //学历
                        that.education_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "FLOW_ZJXY") { //宗教信仰
                        that.religiousBelief_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "ZYLB") { //职业类别
                        that.workCategory_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "SKLX") { //适口类别
                        that.palatabilityType_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }

                    if (value.parentKey == "GKQK") { //管控情况
                        that.controlSituation_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "sfzdgzry") { //有无犯罪史
                        that.crimeHistory_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "ZMFL") { //原罪名
                        that.originalSin_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "XDYY") { //吸毒原因
                        that.drugofReason_arr.push({
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
                    if (value.parentKey == "DegreeConcern") { //关注程度
                        that.followDegree_arr.push({
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
                console.log(UICore.serviceUrl + 'mobile/mobileDrug.shtml?act=getDetailInfo&data=' + JSON.stringify(json));
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/mobileDrug.shtml?act=getDetailInfo&data=' + JSON.stringify(json),
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
                })
            },
            initEditForm: function (info) {

                this.ids = info.id;
                this.dataAreaCode = info.dataAreaCode;
                this.name = info.name; //姓名
                this.numberId = info.idNum; //身份证号
                this.oldName = info.oldName; //曾用名
                this.date = info.date; //出生日期
                this.placeOrigin = info.root; //籍贯
                this.job = info.job; //职业

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

                for (var num in this.marry_arr) { //婚姻状况
                    if (this.marry_arr[num].key == info.marry) {
                        this.marry = this.marry_arr[num].text;
                        this.marryId = this.marry_arr[num].key;
                    }
                }

                for (var num in this.politicalLandscape_arr) { //政治面貌
                    if (this.politicalLandscape_arr[num].key == info.status) {
                        this.politicalLandscape = this.politicalLandscape_arr[num].text;
                        this.politicalLandscapeId = this.politicalLandscape_arr[num].key;
                    }
                }

                for (var num in this.education_arr) { //文化程度
                    if (this.education_arr[num].key == info.education) {
                        this.education = this.education_arr[num].text;
                        this.educationId = this.education_arr[num].key;
                    }
                }

                for (var num in this.religiousBelief_arr) { //宗教信仰
                    if (this.religiousBelief_arr[num].key == info.creed) {
                        this.religiousBelief = this.religiousBelief_arr[num].text;
                        this.religiousBeliefId = this.religiousBelief_arr[num].key;
                    }
                }

                for (var num in this.workCategory_arr) { //职业类别
                    if (this.workCategory_arr[num].key == info.career) {
                        this.workCategory = this.workCategory_arr[num].text;
                        this.workCategoryId = this.workCategory_arr[num].key;
                    }
                }

                this.domicile = info.domicile; //	户籍地
                this.domicileAddress = info.domAdd; //	户籍详细地址
                this.address = info.residence; //现住地
                this.addressDetail = info.resAdd; //	现住地详细地址
                this.tel = info.contact; //手机号码
                this.firstFindDate = info.firstDate; //初次发现日期
                this.server = info.server; //服务处所
                this.others = info.otherProblem; //其它需要说明的问题
                this.coordinate = info.coordinate;//关联地图

                for (var num in this.controlSituation_arr) { //管控情况
                    if (this.controlSituation_arr[num].key == info.conSit) {
                        this.controlSituation = this.controlSituation_arr[num].text;
                        this.controlSituationId = this.controlSituation_arr[num].key;
                    }
                }

                this.controller = info.conName; //管控人姓名
                this.controllerTel = info.conContact; //管控人联系方式
                this.helpSituation = info.helpSit; //帮扶情况
                this.helperName = info.helpName; //帮扶人姓名
                this.helperTel = info.helpCon; //帮扶人联系方式

                for (var num in this.crimeHistory_arr) { //有无犯罪史
                    if (this.crimeHistory_arr[num].key == info.illegal) {
                        this.crimeHistory = this.crimeHistory_arr[num].text;
                        this.crimeHistoryId = this.crimeHistory_arr[num].key;
                    }
                }

                this.crimeSituation = info.illSit; //犯罪情况

                for (var num in this.personType_arr) { //人员类别
                    if (this.personType_arr[num].key == info.pepType) {
                        this.personType = this.personType_arr[num].text;
                        this.personTypeId = this.personType_arr[num].key;
                    }
                }

                for (var num in this.drugofReason_arr) { //吸毒原因
                    if (this.drugofReason_arr[num].key == info.reason) {
                        this.drugofReason = this.drugofReason_arr[num].text;
                        this.drugofReasonId = this.drugofReason_arr[num].key;
                    }
                }

                this.drugResult = info.afterEffect; //吸毒后果

                for (var num in this.palatabilityType_arr) { //适口类型
                    if (this.palatabilityType_arr[num].key == info.palatabilityType) {
                        this.palatabilityType = this.palatabilityType_arr[num].text;
                        this.palatabilityTypeId = this.palatabilityType_arr[num].key;
                    }
                }

                for (var num in this.originalSin_arr) { //原罪名
                    if (this.originalSin_arr[num].key == info.originalSin) {
                        this.originalSin = this.originalSin_arr[num].text;
                        this.originalSinId = this.originalSin_arr[num].key;
                    }
                }

                for (var num in this.followDegree_arr) { //关注程度
                    if (this.followDegree_arr[num].key == info.followDegree) {
                        this.followDegree = this.followDegree_arr[num].text;
                        this.followDegreeId = this.followDegree_arr[num].key;
                    }
                }

            },
            checkidentity: function () {

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
            datef: function () { //出生日期
                var that = this;
                UICore.openTimeComponent2(this.date);
                api.addEventListener({
                    name: 'buildingTime'
                }, function (ret, err) {
                    if (ret) {
                        that.date = ret.value.key1;
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
            marryf: function () { //婚姻状况
                var that = this;
                var defaultVal = this.marry; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.marry_arr.forEach(function (value, index, arr) {
                        if (value.text == that.marry) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.marry_arr, this.marry, "marry");
                api.addEventListener({
                    name: 'marry'
                }, function (ret, err) {
                    if (ret) {
                        that.marry = ret.value.key1;
                        that.marryId = ret.value.key2;
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
            educationf: function () { //文化程度
                var that = this;
                var defaultVal = this.education; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.education_arr.forEach(function (value, index, arr) {
                        if (value.text == that.education) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.education_arr, this.education, "education");
                api.addEventListener({
                    name: 'education'
                }, function (ret, err) {
                    if (ret) {
                        that.education = ret.value.key1;
                        that.educationId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            workCategoryf: function () { //职业类别
                var that = this;
                var defaultVal = this.workCategory; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.workCategory_arr.forEach(function (value, index, arr) {
                        if (value.text == that.workCategory) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.workCategory_arr, this.workCategory, "workCategory");
                api.addEventListener({
                    name: 'workCategory'
                }, function (ret, err) {
                    if (ret) {
                        that.workCategory = ret.value.key1;
                        that.workCategoryId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            religionf: function () { //宗教信仰
                var that = this;
                var defaultVal = this.religiousBelief; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.religiousBelief_arr.forEach(function (value, index, arr) {
                        if (value.text == that.religiousBelief) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.religiousBelief_arr, this.religiousBelief, "religiousBelief");
                api.addEventListener({
                    name: 'religiousBelief'
                }, function (ret, err) {
                    if (ret) {
                        that.religiousBelief = ret.value.key1;
                        that.religiousBeliefId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            controlSituationf: function () { //管控情况
                var that = this;
                var defaultVal = this.controlSituation; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.controlSituation_arr.forEach(function (value, index, arr) {
                        if (value.text == that.controlSituation) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.controlSituation_arr, this.controlSituation, "controlSituation");
                api.addEventListener({
                    name: 'controlSituation'
                }, function (ret, err) {
                    if (ret) {
                        that.controlSituation = ret.value.key1;
                        that.controlSituationId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            palatabilityTypef: function () { //适口类型
                var that = this;
                var defaultVal = this.palatabilityType; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.palatabilityType_arr.forEach(function (value, index, arr) {
                        if (value.text == that.palatabilityType) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.palatabilityType_arr, this.palatabilityType, "palatabilityType");
                api.addEventListener({
                    name: 'palatabilityType'
                }, function (ret, err) {
                    if (ret) {
                        that.palatabilityType = ret.value.key1;
                        that.palatabilityTypeId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            crimeHistoryf: function () { //有无犯罪史
                var that = this;
                var defaultVal = this.crimeHistory; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.crimeHistory_arr.forEach(function (value, index, arr) {
                        if (value.text == that.crimeHistory) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.crimeHistory_arr, this.crimeHistory, "crimeHistory");
                api.addEventListener({
                    name: 'crimeHistory'
                }, function (ret, err) {
                    if (ret) {
                        that.crimeHistory = ret.value.key1;
                        that.crimeHistoryId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            drugofReasonf: function () { //吸毒原因
                var that = this;
                var defaultVal = this.drugofReason; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.drugofReason_arr.forEach(function (value, index, arr) {
                        if (value.text == that.drugofReason) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.drugofReason_arr, this.drugofReason, "drugofReason");
                api.addEventListener({
                    name: 'drugofReason'
                }, function (ret, err) {
                    if (ret) {
                        that.drugofReason = ret.value.key1;
                        that.drugofReasonId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            originalSinf: function () { //原罪名
                var that = this;
                var defaultVal = this.originalSin; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.originalSin_arr.forEach(function (value, index, arr) {
                        if (value.text == that.originalSin) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.originalSin_arr, this.originalSin, "originalSin");
                api.addEventListener({
                    name: 'originalSin'
                }, function (ret, err) {
                    if (ret) {
                        that.originalSin = ret.value.key1;
                        that.originalSinId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            followDegreef: function () { //关注程度
                var that = this;
                var defaultVal = this.followDegree; //获取默认值
                if (defaultVal != null && defaultVal != "") {
                    this.followDegree_arr.forEach(function (value, index, arr) {
                        if (value.text == that.followDegree) {
                            arr[index].status = "selected";
                        }
                    })
                }
                UICore.openSelect3(this.followDegree_arr, this.followDegree, "followDegree");
                api.addEventListener({
                    name: 'followDegree'
                }, function (ret, err) {
                    if (ret) {
                        that.followDegree = ret.value.key1;
                        that.followDegreeId = ret.value.key2;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            personTypef: function () {
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
            firstFindDatef: function () {
                var that = this;

                UICore.openTimeComponent2(this.firstFindDate);
                api.addEventListener({
                    name: 'buildingTime'
                }, function (ret, err) {
                    if (ret) {
                        that.firstFindDate = ret.value.key1;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            checkPhone: function () {

            },
            submitForm: function () { //提交
                if (this.checkVal()) {
                    var json = this.makejson();
                    var postJson = {};
                    postJson.drugVo = json;
                    console.log(UICore.serviceUrl + '/mobile/mobileDrug.shtml?act=addOrEdit&data=' + JSON.stringify(postJson));

                    api.ajax({
                        url: UICore.serviceUrl + '/mobile/mobileDrug.shtml?act=addOrEdit&data=' + JSON.stringify(postJson),
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
                                    name: 'refreshDrugList',
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
                postjson.id = this.ids;//吸毒人员主键
                if (this.isNew) {
                    postjson.dataAreaCode = $api.getStorage('userinf').dataAreaCode; //行政区划编号
                } else {
                    postjson.dataAreaCode = this.dataAreaCode;
                }

                postjson.idNum = this.numberId; //证件号码
                postjson.name = this.name; //姓名
                postjson.oldName = this.oldName; //曾用名
                postjson.sex = this.sexId; //性别
                postjson.date = this.date; //出生日期
                postjson.nation = this.nationId; //民族
                postjson.root = this.placeOrigin; //籍贯
                postjson.marry = this.marryId; //婚姻状况
                postjson.status = this.politicalLandscapeId; //政治面貌
                postjson.education = this.educationId; //文化程度
                postjson.creed = this.religiousBeliefId; //宗教信仰
                postjson.job = this.job; //职业
                postjson.server = this.server; //服务处所
                postjson.career = this.workCategoryId; //职业类别
                postjson.otherProblem = this.others; //
                postjson.contact = this.tel; //联系方式
                postjson.domicile = this.domicile; //户籍地
                postjson.domAdd = this.domicileAddress; //户籍详细地址
                postjson.residence = this.address; //现住地
                postjson.resAdd = this.addressDetail; //现住地详细地址
                postjson.firstDate = this.firstFindDate; //初次发现日期
                postjson.conSit = this.controlSituationId; //管控情况
                postjson.conName = this.controller; //管控人姓名
                postjson.conContact = this.controllerTel; //管控人联系方式
                postjson.helpSit = this.helpSituation; //帮扶情况
                postjson.helpName = this.helperName; //帮扶人姓名
                postjson.helpCon = this.helperTel; //帮扶人联系方式
                postjson.illegal = this.crimeHistoryId; //有无犯罪史
                postjson.illSit = this.crimeSituation; //犯罪情况
                postjson.reason = this.drugofReasonId; //吸毒原因
                postjson.afterEffect = this.drugResult; //吸毒后果
                postjson.pepType = this.personTypeId; //人员类别
                postjson.palatabilityType = this.palatabilityTypeId; //适口类型
                postjson.originalSin = this.originalSinId; //原罪名
                postjson.followDegree = this.followDegreeId; //关注程度
                postjson.coordinate = this.coordinate;//关联地图
                return postjson;
            },
            checkVal: function () {
                if (!this.numberId) {
                    alert("请输入身份证号");
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
                if (!this.nation) {
                    alert("请选择民族");
                    return false;
                }
                if (!this.marry) {
                    alert("请选择婚姻状况");
                    return false;
                }
                if (!this.politicalLandscape) {
                    alert("请选择政治面貌");
                    return false;
                }
                if (!this.education) {
                    alert("请选择文化程度");
                    return false;
                }
                if (!this.workCategory) {
                    alert("请选择职业类别");
                    return false;
                }
                if (!this.domicile) {
                    alert("请输入户籍地");
                    return false;
                }
                if (!this.domicileAddress) {
                    alert("请输入户籍详细地址");
                    return false;
                }
                if (!this.address) {
                    alert("请输入现住地");
                    return false;
                }
                if (!this.addressDetail) {
                    alert("请输入现住地详细地址");
                    return false;
                }
                if (!this.controller) {
                    alert("请输入管控人姓名");
                    return false;
                }
                if (!this.controllerTel) {
                    alert("请输入管控人联系方式");
                    return false;
                }
                if (!this.helperName) {
                    alert("请输入帮扶人姓名");
                    return false;
                }
                if (!this.helperTel) {
                    alert("请输入帮扶人联系方式");
                    return false;
                }
                if (!this.palatabilityType) {
                    alert("请选择适口类型");
                    return false;
                }
                if (!this.drugofReason) {
                    alert("请选择吸毒原因");
                    return false;
                }
                if (!this.originalSin) {
                    alert("请选择原罪名");
                    return false;
                }
                if (!this.coordinate) {
                    alert("请关联地图");
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
