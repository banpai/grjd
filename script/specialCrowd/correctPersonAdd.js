/**
 * Created by kevin on 2017/6/26.
 */
apiready = function () {
    new Vue({
        el: "#list",
        mixins:[ocnFunction],
        data: {
            ids: '',
            name: "", //姓名
            numberId: "", //身份证号
            oldName: '',//曾用名
            date: "", //出生日期
            placeOrigin: '',//籍贯

            nation: '',//名族
            nationId: '',//名族id
            nation_arr: [],//民族列表

            sex: "", //性别
            sexId: "", //性别id
            sex_arr: [], //性别列表

            marry: '',//婚姻状况
            marryId: '',//婚姻状况id
            marry_arr: [],//婚姻状况列表

            politicalLandscape: '',//政治面貌
            politicalLandscapeId: '',//政治面貌id
            politicalLandscape_arr: [],//政治面貌列表

            education: '', //文化程度
            educationId: '', //文化程度id
            education_arr: [], //文化程度列表

            religiousBelief: '', //宗教信仰
            religiousBeliefId: '', //宗教信仰id
            religiousBelief_arr: [], //宗教信仰列表

            workCategory: '', //职业类别
            workCategoryId: '', //职业类别id
            workCategory_arr: [], //职业类别列表

            receivingMode: '',//	接收方式
            receivingModeId: '',//	接收方式id
            receivingMode_arr: [],//	接收方式列表

            palatabilityType: '',//	适口类型
            palatabilityTypeId: '',//	适口类型id
            palatabilityType_arr: [],//	适口类型列表

            correctiveCategory: '',//	矫正类别
            correctiveCategoryId: '',//	矫正类别id
            correctiveCategory_arr: [],//	矫正类别列表

            fourCases: '',//	四史情况
            fourCasesId: '',//	四史情况id
            fourCases_arr: [],//	四史情况列表

            threeInvolved: '',//	三涉情况
            threeInvolvedId: '',//	三涉情况id
            threeInvolved_arr: [],//	三涉情况列表

            correctionDetail: '',//	矫正小组人员组成情况
            correctionDetailId: '',//	矫正小组人员组成情况id
            correctionDetail_arr: [],//	矫正小组人员组成情况

            whetherRecidivists: '',//	是否累惯犯
            whetherRecidivistsId: '',//	是否累惯犯id
            whetherRecidivists_arr: [],//	是否累惯犯列表

            correctionGroup: '',//	是否建立矫正小组
            correctionGroupId: '',//	是否建立矫正小组id
            correctionGroup_arr: [],//	是否建立矫正小组列表

            thereisFthecamp: '',//	是否有脱营
            thereisFthecampId: '',//	是否有脱营id
            thereisFthecamp_arr: [],//	是否有脱营

            isLouguan: '',//	是否有漏管
            isLouguanId: '',//	是否有漏管id
            isLouguan_arr: [],//	是否有漏管列表

            isMorecrimes: '',//	是否重新犯罪
            isMorecrimesId: '',//	是否重新犯罪id
            isMorecrimes_arr: [],//	是否重新犯罪列表

            work: '', //职业
            unitService: '',//	服务处所
            tel: '',//	联系方式
            domicile: '',//	户籍地
            domicileAddress: '',//	户籍详细地址
            address: '',//	现住地
            addressDetail: '',//	现住地详细地址
            personnelNumber: '',//	社区矫正人员编号
            placeDetention: '',//	原羁押场所
            caseCategory: '',//	案件类别
            specificCharges: '',//	具体罪名
            time: '',//	原判刑期
            sentencingPeriod: '',//	原判刑开始日期
            sentencinOldgperiod: '',//	原判刑结束日期
            startData: '',//	矫正开始日期
            oldData: '',//	矫正结束日期
            reasonpPeremoval: '',//	脱管原因
            checkSupervision: '',//	检查监督脱管情况
            rectifySituation: '',//	脱管纠正情况

            releaseType: '',//	矫正解除（终止）类型
            releaseTypeId: '',//	矫正解除（终止）类型id
            releaseType_arr: [],//	矫正解除（终止）类型列表

            leakageReason: '',//	漏管原因
            checkLeakage: '',//	检查监督漏管情况
            leakageCorrection: '',//	漏管纠正情况
            punishments: '',//	奖惩情况
            penaltyAlteration: '',//	刑罚变更执行情况

            crimesName: '',//	重新犯罪名称犯罪
            otherProblem: '',//	其它需要说明的问题
            coordinate:'',//关联地图
            expandTab_arr: [],//扩展信息
            isNew: true, //是否是新增
            isBrowser: false, //是否是浏览模式
            edited: false,
            isClick: false, //是否可点击
            param: {},
            shouldhide: false,
            shouldshow: true,
        },
        created: function () {
            this.param = api.pageParam;
            this.accountId = $api.getStorage('userinf').accountId;
            console.log(JSON.stringify(this.param));
            UICore.showLoading("正在加载中...", "请稍候");
            this.initSelectData();
            this.parseXMLForData();
            //this.ExpandTab();
            if (this.param.from == 'correctPersonQuery') {
                this.isBrowser = true; //是否是浏览模式
                this.isClick = this.isBrowser //是否可点击
                $api.text($api.byId('pkh_add_su'), '编辑');
            } else {

            }
            api.hideProgress();
        }, //created end
        methods: {
            initSelectData: function () {
                var that = this;
                var jsonData = JSON.parse($api.getStorage('settingdata'));
                jsonData.data.forEach(function (value) {
                    if (value.parentKey == "gentles") {
                        that.sex_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "familyname") {
                        that.nation_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "hyzk") {
                        that.marry_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "zzmm") {
                        that.politicalLandscape_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "FLOW_WHCD") {
                        that.education_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "FLOW_ZJXY") {
                        that.religiousBelief_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "ZYLB") {
                        that.workCategory_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "JSFS") {
                        that.receivingMode_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "SKLX") {
                        that.palatabilityType_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "JZLB") {
                        that.correctiveCategory_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "SSQK") {
                        that.fourCases_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "SsQK") {
                        that.threeInvolved_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "JZXZRYZCLX") {
                        that.correctionDetail_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "sfzdgzry") {
                        that.whetherRecidivists_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "sfzdgzry") {
                        that.correctionGroup_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "sfzdgzry") {
                        that.thereisFthecamp_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "sfzdgzry") {
                        that.isLouguan_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "sfzdgzry") {
                        that.isMorecrimes_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "JZJCLX") {
                        that.releaseType_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    
                });
                this.param = api.pageParam;
                this.accountId = $api.getStorage('userinf').accountId;
                var json = { accountId: this.accountId, spId: this.param.id };
                var _self = this;
            },
            parseXMLForData: function () {
                var that = this;
                var trans = api.require('trans');
                trans.parse({
                    path: 'widget://res/pca.xml'
                }, function (ret, err) {
                    if (ret) {
                        // ret.Country.province.forEach(function (value, index) {
                        //     that.regProvince_arr.push({
                        //         text: value.name,
                        //         code: value.code,
                        //         status: 'normal',
                        //         key: index,
                        //         city: value.City
                        //     })
                        // });
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            loadBuildUnitData: function (buildId) {
                var that = this;
                console.log(UICore.serviceUrl + 'mobile/mobileInterfaceForBuilding.shtml?act=getBuildingInfo&data={buiId:' + buildId + '}');
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/mobileInterfaceForBuilding.shtml?act=getBuildingInfo&data={buiId:' + buildId + '}',
                    method: 'post',
                }, function (ret, err) {
                    that.buildingUnit_arr.splice(0, that.buildingUnit_arr.length);
                    if (ret.success) {
                        ret.data.unitList.forEach(function (value) {
                            that.buildingUnit_arr.push({
                                text: value.unitName,
                                status: 'normal',
                                key: value.id
                            });
                        });
                    } else {
                        alert(JSON.stringify(err));
                    }
                });

            },
            ExpandTab: function () {
                var that = this;
                console.log(UICore.serviceUrl + 'mobile/mobileDataCollection.shtml?act=getDynaBaseTab&data={baseKey:RKXX}');
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/mobileDataCollection.shtml?act=getDynaBaseTab&data={baseKey:RKXX}',
                    method: 'get',
                }, function (ret, err) {
                    if (ret.success) {

                        ret.data.forEach(function (value) {
                            that.expandTab_arr.push({
                                name: value.name,
                                english_name: value.english_name
                            });
                        });
                    } else {
                        alert(JSON.stringify(err));

                    }
                });
            },
            EditData: function (params) {
                var that = this;
            },
            checkidentity: function () {
                var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                var idNumber = this.numberId;
                if (!reg.test(idNumber)) {
                    api.toast({
                        msg: '请输入正确的身份证号码',
                        duration: 3000,
                        location: 'top'
                    });
                    return false;
                } else {
                    return true;
                }
            },
            checkPhone: function () {
                var phone = this.cellphone;
                if (!(/^1[34578]\d{9}$/.test(phone))) {
                    api.toast({
                        msg: '请输入正确的手机号码',
                        duration: 3000,
                        location: 'top'
                    });
                    return false;
                } else {
                    return true;
                }
            },
            sexf: function () { //性别
                console.log("性别");
                var that = this;
                if (!this.isBrowser) {
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
                } //if语句结束
            },
            datef: function () { //出生日期
                console.log("出生日期");
                var that = this;
                if (!this.isBrowser) {
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
                }
            },
            relationshipf: function () { //户成员关系
                console.log("户成员关系");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.relationship; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.residentRelationship_arr.forEach(function (value, index, arr) {
                            if (value.text == that.relationship) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.residentRelationship_arr, this.relationship, "relationship");
                    api.addEventListener({
                        name: 'relationship'
                    }, function (ret, err) {
                        if (ret) {
                            that.relationship = ret.value.key1;
                            that.relationshipId = ret.value.key2;
                            // if (that.relationship == "户主" || that.relationshipId == "5") {
                            //     that.shouldhide = true;
                            //     that.shouldshow = false;
                            // } else {
                            //     that.shouldhide = false;
                            //     that.shouldshow = true
                            // }
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            nationf: function () { //民族
                console.log("民族");
                var that = this;
                if (!this.isBrowser) {
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
                } //if语句结束
            },
            politicalLandscapef: function () { //政治面貌
                console.log("政治面貌");
                var that = this;
                if (!this.isBrowser) {
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
                } //if语句结束
            },
            religionf: function () { //宗教信仰
                console.log("宗教信仰");
                var that = this;
                if (!this.isBrowser) {
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
                } //if语句结束
            },
            educationf: function () { //文化程度
                console.log("文化程度");
                var that = this;
                if (!this.isBrowser) {
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
                } //if语句结束
            },
            marryf: function () { //婚姻状况
                console.log("婚姻状况");
                var that = this;
                if (!this.isBrowser) {
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
                } //if语句结束
            },
            workCategoryf: function () { //职业类别
                console.log("职业类别");
                var that = this;
                if (!this.isBrowser) {
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
                } //if语句结束
            },
            receivingModef: function () { //接收方式
                console.log("接收方式");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.receivingMode; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.receivingMode_arr.forEach(function (value, index, arr) {
                            if (value.text == that.receivingMode) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.receivingMode_arr, this.receivingMode, "receivingMode");
                    api.addEventListener({
                        name: 'receivingMode'
                    }, function (ret, err) {
                        if (ret) {
                            that.receivingMode = ret.value.key1;
                            that.receivingModeId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            palatabilityTypef: function () { //适口类型
                console.log("适口类型");
                var that = this;
                if (!this.isBrowser) {
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
                } //if语句结束
            },
            correctiveCategoryf: function () { //矫正类别
                console.log("矫正类别");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.correctiveCategory; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.correctiveCategory_arr.forEach(function (value, index, arr) {
                            if (value.text == that.correctiveCategory) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.correctiveCategory_arr, this.correctiveCategory, "correctiveCategory");
                    api.addEventListener({
                        name: 'correctiveCategory'
                    }, function (ret, err) {
                        if (ret) {
                            that.correctiveCategory = ret.value.key1;
                            that.correctiveCategoryId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            whetherRecidivistsf: function () { //是否惯犯
                console.log("是否惯犯");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.whetherRecidivists; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.whetherRecidivists_arr.forEach(function (value, index, arr) {
                            if (value.text == that.whetherRecidivists) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.whetherRecidivists_arr, this.whetherRecidivists, "whetherRecidivists");
                    api.addEventListener({
                        name: 'whetherRecidivists'
                    }, function (ret, err) {
                        if (ret) {
                            that.whetherRecidivists = ret.value.key1;
                            that.whetherRecidivistsId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            correctionGroupf: function () { //是否建立矫正小组
                console.log("是否建立矫正小组");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.correctionGroup; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.correctionGroup_arr.forEach(function (value, index, arr) {
                            if (value.text == that.correctionGroup) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.correctionGroup_arr, this.correctionGroup, "correctionGroup");
                    api.addEventListener({
                        name: 'correctionGroup'
                    }, function (ret, err) {
                        if (ret) {
                            that.correctionGroup = ret.value.key1;
                            that.correctionGroupId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            thereisFthecampf: function () { //是否有脱管
                console.log("是否有脱管");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.thereisFthecamp; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.thereisFthecamp_arr.forEach(function (value, index, arr) {
                            if (value.text == that.thereisFthecamp) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.thereisFthecamp_arr, this.thereisFthecamp, "thereisFthecamp");
                    api.addEventListener({
                        name: 'thereisFthecamp'
                    }, function (ret, err) {
                        if (ret) {
                            that.thereisFthecamp = ret.value.key1;
                            that.thereisFthecampId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            isLouguanf: function () { //是否有漏管
                console.log("是否有漏管");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.isLouguan; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.isLouguan_arr.forEach(function (value, index, arr) {
                            if (value.text == that.isLouguan) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.isLouguan_arr, this.isLouguan, "isLouguan");
                    api.addEventListener({
                        name: 'isLouguan'
                    }, function (ret, err) {
                        if (ret) {
                            that.isLouguan = ret.value.key1;
                            that.isLouguanId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            isMorecrimesf: function () { //是否重新犯罪
                console.log("是否重新犯罪");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.isMorecrimes; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.isMorecrimes_arr.forEach(function (value, index, arr) {
                            if (value.text == that.isMorecrimes) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.isMorecrimes_arr, this.isMorecrimes, "isMorecrimes");
                    api.addEventListener({
                        name: 'isMorecrimes'
                    }, function (ret, err) {
                        if (ret) {
                            that.isMorecrimes = ret.value.key1;
                            that.isMorecrimesId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },

            fourCasesf: function () { //四史情况(多选)
                console.log("四史情况");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.fourCases; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        var temp_arr = defaultVal.split(' ');
                        if (temp_arr != null && temp_arr.length > 0) {
                            for (var i = 0; i < temp_arr.length; i++) {
                                this.fourCases_arr.forEach(function (value, index, arr) {
                                    if (value.text == temp_arr[i]) {
                                        arr[index].status = "selected";
                                    }
                                })
                            }
                        }
                    }
                    UICore.openSelectmulti(this.fourCases_arr, this.fourCases, "fourCases");
                    api.addEventListener({
                        name: 'fourCases'
                    }, function (ret, err) {
                        if (ret) {
                            that.fourCases = '';//先清空
                            that.fourCasesId = '';//先清空
                            ret.value.key1.forEach(function (value, index, arr) {
                                that.fourCases += arr[index].text + ' ';
                                that.fourCasesId += ',' + arr[index].key;
                            });
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            threeInvolvedf: function () { //三涉情况(多选)
                console.log("三涉情况");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.threeInvolved; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        var temp_arr = defaultVal.split(' ');
                        if (temp_arr != null && temp_arr.length > 0) {
                            for (var i = 0; i < temp_arr.length; i++) {
                                this.threeInvolved_arr.forEach(function (value, index, arr) {
                                    if (value.text == temp_arr[i]) {
                                        arr[index].status = "selected";
                                    }
                                })
                            }
                        }
                    }
                    UICore.openSelectmulti(this.threeInvolved_arr, this.threeInvolved, "threeInvolved");
                    api.addEventListener({
                        name: 'threeInvolved'
                    }, function (ret, err) {
                        if (ret) {
                            that.threeInvolved = '';//先清空
                            that.threeInvolvedId = '';//先清空
                            ret.value.key1.forEach(function (value, index, arr) {
                                that.threeInvolved += arr[index].text + ' ';
                                that.threeInvolvedId += ',' + arr[index].key;
                            });
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            correctionDetailf: function () { //矫正小组人员组成情况(多选)
                console.log("矫正小组人员组成情况");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.correctionDetail; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        var temp_arr = defaultVal.split(' ');
                        if (temp_arr != null && temp_arr.length > 0) {
                            for (var i = 0; i < temp_arr.length; i++) {
                                this.correctionDetail_arr.forEach(function (value, index, arr) {
                                    if (value.text == temp_arr[i]) {
                                        arr[index].status = "selected";
                                    }
                                })
                            }
                        }
                    }
                    UICore.openSelectmulti(this.correctionDetail_arr, this.correctionDetail, "correctionDetail");
                    api.addEventListener({
                        name: 'correctionDetail'
                    }, function (ret, err) {
                        if (ret) {
                            that.correctionDetail = '';//先清空
                            that.correctionDetailId = '';//先清空
                            ret.value.key1.forEach(function (value, index, arr) {
                                that.correctionDetail += arr[index].text + ' ';
                                that.correctionDetailId += ',' + arr[index].key;
                            });
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },

            registTypef: function () { //户口性质
                console.log("户口性质");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.registType; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.accountProperties_arr.forEach(function (value, index, arr) {
                            if (value.text == that.registType) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.accountProperties_arr, this.registType, "registType");
                    api.addEventListener({
                        name: 'registType'
                    }, function (ret, err) {
                        if (ret) {
                            that.registType = ret.value.key1;
                            that.registTypeId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            provincef: function () { //户 籍 省
                console.log("户 籍 省");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.province; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.regProvince_arr.forEach(function (value, index, arr) {
                            if (value.text == that.province) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.regProvince_arr, this.province, "province");
                    api.addEventListener({
                        name: 'province'
                    }, function (ret, err) {
                        if (ret) {
                            that.province = ret.value.key1;
                            that.provinceId = ret.value.key2;
                            if (defaultVal != that.province) {
                                that.city = "";
                                that.county = "";
                            }
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            releaseTypef: function () { //矫正解除（终止）类型
                console.log("矫正解除（终止）类型");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.releaseType; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.releaseType_arr.forEach(function (value, index, arr) {
                            if (value.text == that.releaseType) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.releaseType_arr, this.releaseType, "releaseType");
                    api.addEventListener({
                        name: 'releaseType'
                    }, function (ret, err) {
                        if (ret) {
                            that.releaseType = ret.value.key1;
                            that.releaseTypeId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            
            cityf: function () { //户 籍 市
                console.log("户 籍 市");
                var that = this;
                if (this.province) { //必须省份先选择不能为空
                    this.regProvince_arr.forEach(function (value) { //遍历数组
                        if (value.text == that.province) { //寻找符合当前省份下的对象比如江苏省则regProvince_arr对应到江苏省
                            var isArray = Object.prototype.toString.call(value.city) == '[object Array]'; //判断是否是直辖市
                            if (isArray) { //判断数据源是否是数组(非直辖市city则为数组对象)
                                that.regCity_arr.splice(0, that.regCity_arr.length);
                                value.city.forEach(function (value, index) {
                                    that.regCity_arr.push({
                                        text: value.name,
                                        code: value.code,
                                        status: 'normal',
                                        key: 0,
                                        city: value.Piecearea
                                    })
                                }); //循环遍历变化数据源主要目的是迎合选择框的格式
                            } else { //如果不是数组即为对象(直辖市city为数组对象)
                                that.regCity_arr = [];
                                that.regCity_arr.push({
                                    text: value.city.name,
                                    code: value.city.code,
                                    status: 'normal',
                                    key: 0,
                                    city: value.city.Piecearea
                                }); //循环遍历变化数据源主要目的是迎合选择框的格式
                            } //判断是否是数组结束
                        } //判断是否是当前省份结束
                    }); //循环省数组结束

                    if (!this.isBrowser) { //如果是新增状态
                        var defaultVal = this.city; //获取默认值
                        if (defaultVal != null && defaultVal != "") {
                            this.regCity_arr.forEach(function (value, index, arr) {
                                if (value.text == that.city) {
                                    arr[index].status = "selected";
                                }
                            })
                        }
                        UICore.openSelect3(this.regCity_arr, this.city, "city");
                        api.addEventListener({
                            name: 'city'
                        }, function (ret, err) {
                            if (ret) {
                                that.city = ret.value.key1;
                                that.cityId = ret.value.key2;
                                if (defaultVal != that.city) {
                                    that.county = "";
                                }
                            } else {
                                alert(JSON.stringify(err));
                            }
                        });
                    }
                } else {
                    alert("请先选择省份")
                }
            },
            countyf: function () { //户籍区/县
                console.log("户籍区/县");
                var that = this;
                if (this.city) { //判断当前省份和城市是否有
                    this.regProvince_arr.forEach(function (value) { //遍历省份
                        if (value.text == that.province) { //寻找符合当前省份下的对象比如江苏省则regProvince_arr对应到江苏省
                            var isArray = Object.prototype.toString.call(value.city) == '[object Array]'; //判断是否是直辖市
                            if (isArray) { //判断数据源是否是数组(非直辖市city则为数组对象)
                                value.city.forEach(function (vlauecity) { //遍历城市查询
                                    if (vlauecity.name == that.city) { //如果城市是相等的则查询区/县
                                        var isArray = Object.prototype.toString.call(vlauecity.Piecearea) == '[object Array]';
                                        that.regCounty_arr.splice(0, that.regCounty_arr.length);
                                        if (isArray) {
                                            vlauecity.Piecearea.forEach(function (value1, i) { //具体到城市后对区/线赋值
                                                that.regCounty_arr.push({
                                                    text: value1.name,
                                                    code: value1.code,
                                                    status: 'normal',
                                                    key: i,
                                                });
                                            });
                                        } else {
                                            that.regCounty_arr.push({
                                                text: vlauecity.Piecearea.name,
                                                code: vlauecity.Piecearea.code,
                                                status: 'normal',
                                                key: 0,
                                            });
                                        }
                                    } //如果城市是相等的则查询区/县结束
                                }); //遍历城市查询结束
                            } else { //判断数据源是否是数组(非直辖市city则为数组对象)结束
                                if (value.city.name == that.city) { //如果城市是相等的则查询区/县
                                    value.city.Piecearea.forEach(function (value1, i) { //具体到城市后对区/线赋值
                                        that.regCounty_arr.push({
                                            text: value1.name,
                                            code: value1.code,
                                            status: 'normal',
                                            key: i,
                                        });
                                    });
                                }
                            }
                        } //判断是否是当前省份结束
                    }); //循环省数组结束

                    if (!this.isBrowser) { //如果是新增状态
                        var defaultVal = this.county; //获取默认值
                        if (defaultVal != null && defaultVal != "") {
                            this.regCounty_arr.forEach(function (value, index, arr) {
                                if (value.text == that.county) {
                                    arr[index].status = "selected";
                                }
                            })
                        }
                        UICore.openSelect3(this.regCounty_arr, this.county, "city");
                        api.addEventListener({
                            name: 'city'
                        }, function (ret, err) {
                            if (ret) {
                                that.county = ret.value.key1;
                                that.countyId = ret.value.key2;
                            } else {
                                alert(JSON.stringify(err));
                            }
                        });
                    }

                } else {
                    alert("请先选择省份和城市")
                }
            },
            contactMethodf: function () { //联系方法
                console.log("联系方法");
                var that = this;
                if (!this.isBrowser) { //如果是新增状态
                    var defaultVal = this.contactMethod; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.otherContact_arr.forEach(function (value, index, arr) {
                            if (value.text == that.contactMethod) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.otherContact_arr, this.contactMethod, "contactMethod");
                    api.addEventListener({
                        name: 'contactMethod'
                    }, function (ret, err) {
                        if (ret) {
                            that.contactMethod = ret.value.key1;
                            that.contactMethodId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }

            },
            linkHousef: function () { //关联房屋
                console.log("关联房屋");
                var that = this;
                api.openWin({
                    name: 'HouseQuery',
                    url: './HouseQuery.html',
                    pageParam: {
                        from: 'houseOwer'
                    }
                });
                api.addEventListener({
                    name: 'houseOwer'
                }, function (ret, err) {
                    if (ret) {
                        that.entity = ret.value.key1;
                        console.log(JSON.stringify(ret.value.key1));
                        that.houseOwner = (that.entity).houseOwner;
                        that.houseAddress = (that.entity).unitName + (that.entity).roomNum;
                    } else {
                        alert(JSON.stringify(err));
                    }
                });

            },
            linkBuildingf: function () { //关联建筑
                console.log("关联建筑");
                var that = this;
                api.openWin({
                    name: 'buildingQuery',
                    url: '../building/buildingQuery.html',
                    pageParam: {
                        from: 'frompopulation'
                    }
                });
                api.addEventListener({
                    name: 'populationr'
                }, function (ret, err) {
                    if (ret) {
                        that.buiEntity = ret.value.key1;
                        that.loadBuildUnitData(ret.value.key1.id);
                        that.buiName = ret.value.key1.buiName; //建筑名称
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            unitf: function () { //单元/梯
                console.log("单元/梯");
                var that = this;
                if (!this.isBrowser && this.buildingUnit_arr) {
                    var defaultVal = this.unit; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.buildingUnit_arr.forEach(function (value, index, arr) {
                            if (value.text == that.unit) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.buildingUnit_arr, this.unit, "unit");
                    api.addEventListener({
                        name: 'unit'
                    }, function (ret, err) {
                        if (ret) {
                            that.unit = ret.value.key1;
                            that.unitId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },

            expandselect: function (index, english_name, title) {
                var expandParams = this.param.name.extendAtt;
                console.log(expandParams)
                var that = this;
                if (this.expandstr != "" && this.isNew) {
                    api.openWin({
                        name: 'dynamic',
                        url: '../dynamic.html',
                        pageParam: {
                            title: title,
                            name: english_name,
                            isNew: this.isNew,
                            id: this.id,
                            isBrowser: this.isBrowser,
                            attr: "{" + this.expandstr.substring(0, this.expandstr.length - 1) + "}"
                        }
                    });
                } else if (!this.isNew && this.edited) {
                    var myatt = "";
                    var flag = false;
                    for (var mykey in this.expandjson) {
                        flag = true;
                        break;
                    }
                    if (flag) {
                        myatt = JSON.stringify(this.expandjson);
                    } else {
                        myatt = JSON.stringify(expandParams);
                    }
                    api.openWin({
                        name: 'dynamic',
                        url: '../dynamic.html',
                        pageParam: {
                            title: title,
                            name: english_name,
                            isNew: this.isNew,
                            edited: true,
                            id: this.id,
                            isBrowser: this.isBrowser,
                            attr: myatt
                        }
                    });
                } else {
                    api.openWin({
                        name: 'dynamic',
                        url: '../dynamic.html',
                        pageParam: {
                            title: title,
                            name: english_name,
                            isNew: this.isNew,
                            id: this.id,
                            isBrowser: this.isBrowser,
                            attr: expandParams
                        }
                    });
                }

                api.addEventListener({
                    name: 'population_json'
                }, function (ret, err) {
                    if (!that.isNew) {
                        that.expandjson = ret.value.key;
                        that.edited = ret.value.key2
                    } else {
                        that.doExpand(ret.value.key, index)
                    }
                });
            }, //动态表单选择结束
            doExpand: function (value, index) {
                var s = JSON.stringify(value);
                var json = eval('(' + s + ')');
                for (var key in json) { //上个页面的json
                    var t = JSON.stringify(json[key])
                    this.expandstr += t.substring(1, t.length - 1) + ",";
                }
                this.expandjson = eval('(' + "{" + this.expandstr.substring(0, this.expandstr.length - 1) + "}" + ')');
                console.log(JSON.stringify(this.expandjson))
            },
            uploadAttach: function () {
                if (this.isBrowser) {
                    $api.text($api.byId('pkh_add_su'), '提交');
                    this.isBrowser = false;
                    this.isClick = this.isBrowser;
                    this.shouldhide = false; //管理房屋可见

                } else {
                    if (this.checkVal()) {
                        //UICore.showLoading("上传附件中", "请稍侯");
                        this.submit();
                    }
                }

            },
            checkVal: function () {
                if (!this.name) {
                    alert("请输入姓名");
                    return false;
                }
                if (!this.numberId) {
                    alert("请输入身份证号");
                    return false;
                }
                if (!this.sex) {
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
                if (!this.receivingMode) {
                    alert("请选择接收方式");
                    return false;
                }
                if (!this.correctiveCategory) {
                    alert("请选择矫正类别");
                    return false;
                }
                if (!this.correctionDetail) {
                    alert("请选择矫正小组人员组成情况");
                    return false;
                }
                if (!this.correctionGroup) {
                    alert("请选择是否建立矫正小组");
                    return false;
                }
                if (!this.thereisFthecamp) {
                    alert("请选择是否有脱管");
                    return false;
                }
                if (!this.isLouguan) {
                    alert("请选择是否有漏管");
                    return false;
                }
                if (!this.isMorecrimes) {
                    alert("请选择是否重新犯罪");
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
                if (!this.coordinate) {
                    alert("请关联地图");
                    return false;
                }
                return true;
            },
            submit: function () {
                console.log("提交");
                var postjson = {}; //提交postjson
                var resultjson = {}; //最终整合真正提交的json

                var info = $api.getStorage('userinf');
                postjson.dataAreaCode = $api.getStorage('userinf').dataAreaCode;
                postjson.id = '';//新增，id直接给空
                postjson.name = this.name, //姓名
                    postjson.numberId = this.numberId, //身份证号
                    postjson.sex = this.sexId, //性别
                    postjson.oldName = this.oldName,//曾用名
                    postjson.date = this.date, //出生日期
                    postjson.nation = this.nationId,//名族
                    postjson.placeOrigin = this.placeOrigin,//籍贯
                    postjson.marry = this.marryId,//婚姻状况
                    postjson.politicalLandscape = this.politicalLandscapeId,//政治面貌

                    postjson.education = this.educationId, //文化程度
                    postjson.religiousBelief = this.religiousBeliefId, //宗教信仰
                    postjson.workCategory = this.workCategoryId, //职业类别
                    postjson.work = this.work, //职业
                    postjson.unitService = this.unitService,//	服务处所
                    postjson.tel = this.tel,//	联系方式
                    postjson.domicile = this.domicile,//	户籍地
                    postjson.domicileAddress = this.domicileAddress,//	户籍详细地址
                    postjson.address = this.address,//	现住地
                    postjson.addressDetail = this.addressDetail,//	现住地详细地址
                    postjson.personnelNumber = this.personnelNumber,//	社区矫正人员编号
                    postjson.placeDetention = this.placeDetention,//	原羁押场所
                    postjson.correctiveCategory = this.correctiveCategoryId,//	矫正类别
                    postjson.caseCategory = this.caseCategory,//	案件类别
                    postjson.specificCharges = this.specificCharges,//	具体罪名
                    postjson.time = this.time,//	原判刑期
                    postjson.sentencingPeriod = this.sentencingPeriod,//	原判刑开始日期
                    postjson.sentencinOldgperiod = this.sentencinOldgperiod,//	原判刑结束日期
                    postjson.startData = this.startData,//	矫正开始日期
                    postjson.oldData = this.oldData,//	矫正结束日期
                    postjson.receivingMode = this.receivingModeId,//	接收方式
                    postjson.fourCases = this.fourCases,//	四史情况
                    postjson.whetherRecidivists = this.whetherRecidivistsId,//	是否累惯犯
                    postjson.threeInvolved = this.threeInvolved,//	三涉情况
                    postjson.correctionGroup = this.correctionGroupId,//	是否建立矫正小组
                    postjson.thereisFthecamp = this.thereisFthecampId,//	是否有脱营
                    postjson.reasonpPeremoval = this.reasonpPeremoval,//	脱管原因
                    postjson.checkSupervision = this.checkSupervision,//	检查监督脱管情况
                    postjson.rectifySituation = this.rectifySituation,//	脱管纠正情况
                    postjson.correctionDetail = this.correctionDetail,//	矫正小组人员组成情况
                    postjson.releaseType = this.releaseType,//	矫正解除（终止）类型
                    postjson.palatabilityType = this.palatabilityTypeId,//	适口类型
                    postjson.isLouguan = this.isLouguanId,//	是否有漏管
                    postjson.leakageReason = this.leakageReason,//	漏管原因
                    postjson.checkLeakage = this.checkLeakage,//	检查监督漏管情况
                    postjson.leakageCorrection = this.leakageCorrection,//	漏管纠正情况
                    postjson.punishments = this.punishments,//	奖惩情况
                    postjson.penaltyAlteration = this.penaltyAlteration,//	刑罚变更执行情况
                    postjson.isMorecrimes = this.isMorecrimesId,//	是否重新犯罪
                    postjson.crimesName = this.crimesName,//	重新犯罪名称犯罪
                    postjson.otherProblem = this.otherProblem//	其它需要说明的问题
                    postjson.coordinate = this.coordinate//关联地图

                resultjson.communitypeResounnelVo = postjson;

                //resultjson.population = postjson;
                //resultjson.expand = this.expandjson;

                console.log(JSON.stringify(resultjson));
                var json = JSON.stringify(resultjson);
                console.log(UICore.serviceUrl + 'mobile/mobileCommunCorrect.shtml?act=addOrEdit&data=' + json);
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/mobileCommunCorrect.shtml?act=addOrEdit&data=' + json,
                    method: 'post',
                }, function (ret, err) {
                    if (ret) {
                        console.log(JSON.stringify(ret));
                        if (ret.success) {
                            api.toast({
                                msg: '保存成功',
                                duration: 3000,
                                global: 'true',
                                location: 'bottom'
                            });
                            api.sendEvent({
                                name: 'refreshResultList',
                                extra: {
                                    myJson: resultjson
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
            },

            closeWin: function () {
                api.closeWin();
            },
            getImg: function () {
                if (this.isBrowser) {
                    return;
                }
                this.imgtemps = [];
                var mycomponent = this;
                var imageFilter = api.require('imageFilter');
                var UIMediaScanner = api.require('UIMediaScanner');
                UIMediaScanner.open({
                    type: 'picture',
                    column: 4,
                    classify: true,
                    max: 1,
                    sort: {
                        key: 'time',
                        order: 'desc'
                    },
                    texts: {
                        stateText: '已选择*项',
                        cancelText: '取消',
                        finishText: '完成'
                    },
                    styles: {
                        bg: '#fff',
                        mark: {
                            icon: '',
                            position: 'bottom_left',
                            size: 20
                        },
                        nav: {
                            bg: '#eee',
                            stateColor: '#000',
                            stateSize: 18,
                            cancelBg: 'rgba(0,0,0,0)',
                            cancelColor: '#000',
                            cancelSize: 18,
                            finishBg: 'rgba(0,0,0,0)',
                            finishColor: '#000',
                            finishSize: 18
                        }
                    },
                    scrollToBottom: {
                        intervalTime: -1,
                        anim: false
                    },
                    exchange: true,
                    rotation: true
                }, function (ret) {
                    if (ret) {
                        if (ret.eventType != "cancel") {
                            tempimgp = "";
                            loadImg(ret.list, 0, tempimgp);
                        }
                    }
                });

                function loadImg(list, num, tempimgp) {
                    if (list.length > 0) {
                        var imgpath = "";
                        if (api.systemType == "ios") {
                            imgpath = list[0].thumbPath;
                        }
                        if (api.systemType == "android") {
                            imgpath = list[0].path;
                        }
                        var fileName = UICore.getTimeStamp();
                        console.log(fileName);
                        imageFilter.getAttr({
                            path: imgpath
                        }, function (ret, err) {
                            if (ret.status) {
                                var tempwidth = ret.width;
                                var tempheight = ret.height;
                                var bili = tempwidth / tempheight;
                                var width = 0;
                                var height = 1200
                                if (height > tempheight) {
                                    height = tempheight
                                    width = tempwidth
                                } else {
                                    height = 1200;
                                    width = height * bili;
                                }
                                if (width > tempwidth) {
                                    height = tempheight
                                    width = tempwidth
                                }
                                imageFilter.compress({
                                    img: imgpath,
                                    quality: 1,
                                    size: {
                                        w: width,
                                        h: height
                                    },
                                    save: {
                                        album: false,
                                        imgPath: "fs://test/",
                                        imgName: fileName + '.jpg'
                                    }
                                }, function (ret, err) {
                                    if (ret.status) {
                                        var pathtemp = api.fsDir + "/test/" + fileName + ".jpg";
                                        mycomponent.phoneImg = pathtemp;
                                        mycomponent.deleteImgShow = true;
                                        mycomponent.imgtemps.push(pathtemp)
                                        list.splice(0, 1)
                                        loadImg(list, 0, tempimgp);
                                    } else {
                                        alert(JSON.stringify(err));
                                    }
                                });
                            } else {
                                alert(JSON.stringify(err));
                            }
                        });
                    } else {
                        mycomponent.imgarr.imgpaths.splice(0, mycomponent.imgarr.imgpaths.length);
                        mycomponent.imgarr.imgpaths = mycomponent.imgarr.imgpaths.concat(mycomponent.imgtemps);
                        //$("#imgAdd").append(tempimgp);
                    }
                }
            },
            //删除图片
            deleteImg: function () {
                var mycomponent = this;
                api.confirm({
                    title: '提示',
                    msg: '确定要删除图片吗？',
                    buttons: ['确定', '取消']
                }, function (ret, err) {
                    var buttonIndex = ret.buttonIndex;
                    if (buttonIndex == 1) {
                        mycomponent.removeByValue(mycomponent.imgarr.imgpaths, mycomponent.phoneImg);
                    }
                });
            },
            //从图片数组中删除
            removeByValue: function (arr, val) {
                this.imgarr.photo = "";
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == val) {
                        arr.splice(i, 1);
                        this.phoneImg = "../../image/photo_default.png";
                        this.deleteImgShow = false;
                        break;
                    }
                }
            }

        }, //methods end
        components: {
            "populationComponent": {
                props: ['personinfos', 'myclass'],
                template: "#personinfo",
            },
            // "checkComponent": {
            //     props: ['checkinfos', 'customclass'],
            //     template: "#personcheck",
            // },
        }

    }); //VUe end

}
