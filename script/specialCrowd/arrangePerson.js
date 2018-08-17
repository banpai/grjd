/**
 * Created by kevin on 2017/6/26.
 */
apiready = function () {
    new Vue({
        el: "#list",
        mixins:[ocnFunction],
        data: {
            id: '',//安置帮教主键
            cardId: '',//证件号码
            name: '',//姓名
            nameBefore: '',//曾用名

            gender: '',//性别
            genderId: '',//性别id
            gender_arr: [],//性别列表

            birthday: '',//出生日期

            nation: '',//民族
            nationId: '',//民族id
            nation_arr: [],//民族列表

            nativePlace: '',//籍贯

            maritalStatus: '',//婚姻状况
            maritalStatusId: '',//婚姻状况id
            maritalStatus_arr: [],//婚姻状况列表
            
            politicalStatus: '',//政治面貌
            politicalStatusId: '',//政治面貌id
            politicalStatus_arr: [],//政治面貌列表

            education: '',//文化程度
            educationId: '',//文化程度id
            education_arr: [],//文化程度列表

            religion: '',//宗教信仰
            religionId: '',//宗教信仰id
            religion_arr: [],//宗教信仰列表

            occupationCategory: '',//职业类别
            occupationCategoryId: '',//职业类别id
            occupationCategory_arr: [],//职业类别列表

            job: '',//职业
            unitService: '',//服务处所
            tel: '',//联系方式
            domicile: '',//户籍地
            domicileAddress: '',//户籍详细地址
            currentResidence: '',//现住地
            currentAddress: '',//现住地详细地址

            pepType:'',//人员类别
            pepTypeId:'',//人员类别id
            pepType_arr:[],//人员类别列表

            recidivism: '',//是否累犯
            recidivismId: '',//是否累犯id
            recidivism_arr: [],//是否累犯列表

            originalName: '',//原罪名
            originalSentence: '',//原判刑期
            servingPlace: '',//服刑场所
            releaseDate: '',//释放日期

            riskAssessment: '',//危险性评估类型
            riskAssessmentId: '',//危险性评估类型id
            riskAssessment_arr: [],//危险性评估类型列表

            linkingDate: '',//衔接日期

            cohesionSituation: '',//衔接情况
            cohesionSituationId: '',//衔接情况id
            cohesionSituation_arr: [],//衔接情况列表

            settlementDate: '',//安置日期

            placementSituation: '',//安置情况
            placementSituationId: '',//安置情况id
            placementSituation_arr: [],//安置情况列表

            notPlacedReason: '',//未安置原因
            educationSituation: '',//帮教情况

            reCrime: '',//是否重新犯罪
            reCrimeId: '',//是否重新犯罪id
            reCrime_arr: [],//是否重新犯罪列表

            reOffending: '',//重新犯罪名

            palatabilityType: '',//	适口类型
            palatabilityTypeId: '',//	适口类型id
            palatabilityType_arr: [],//	适口类型列表

            startData: '',//帮教起日
            endData: '',//帮教止日
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
            if (this.param.from == 'arrangePersonResults') {
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
                        that.gender_arr.push({
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
                        that.maritalStatus_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "zzmm") {
                        that.politicalStatus_arr.push({
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
                        that.religion_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "ZYLB") {
                        that.occupationCategory_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "sfzdgzry") {
                        that.recidivism_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "WXXPGLX") {
                        that.riskAssessment_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "XJQK") {
                        that.cohesionSituation_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "AZQK") {
                        that.placementSituation_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                    if (value.parentKey == "sfzdgzry") {
                        that.reCrime_arr.push({
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
                    if (value.parentKey == "azbjrylb") {
                        that.pepType_arr.push({
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
                console.log(UICore.serviceUrl + 'mobile/mobileInterfaceForRelease.shtml?act=getDetailInfo&data=' + JSON.stringify(json));
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/mobileInterfaceForRelease.shtml?act=getDetailInfo&data=' + JSON.stringify(json),
                    method: 'post',
                }, function (ret, err) {
                    api.hideProgress();
                    if (ret) {
                        console.log(JSON.stringify(ret));
                        if (ret.success) {
                            var redata=ret.data;
                            _self.id=redata.id ,//	安置帮教主键
                            _self.cardId=redata.cardId ,//	证件号码
                            _self.name=redata.name ,//	姓名
                            _self.nameBefore=redata.nameBefore ,//	曾用名
                            _self.birthday=redata.birthday ,//	出生日期
                            _self.nativePlace=redata.nativePlace ,//	籍贯
                            _self.job=redata.job ,//	职业
                            _self.unitService=redata.unitService ,//	服务处所
                            _self.tel=redata.tel ,//	联系方式
                            _self.domicile=redata.domicile ,//	户籍地
                            _self.domicileAddress=redata.domicileAddress ,//	户籍详细地址
                            _self.currentResidence=redata.currentResidence ,//	现住地
                            _self.currentAddress=redata.currentAddress ,//	现住地详细地址
                            _self.originalName=redata.originalName ,//	原罪名
                            _self.originalSentence=redata.originalSentence ,//	原判刑期
                            _self.servingPlace=redata.servingPlace ,//	服刑场所
                            _self.releaseDate=redata.releaseDate ,//	释放日期
                            _self.linkingDate=redata.linkingDate ,//	衔接日期
                            _self.settlementDate=redata.settlementDate ,//	安置日期
                            _self.notPlacedReason=redata.notPlacedReason ,//	未安置原因
                            _self.educationSituation=redata.educationSituation ,//	帮教情况
                            _self.startData=redata.startData ,//	帮教起日
                            _self.endData=redata.endData ,//	帮教止日
                            _self.reOffending=redata.reOffending, //	重新犯罪名
                            _self.coordinate=redata.coordinate//关联地图


                            //加载信息
                            for (var num in _self.gender_arr) {
                                if (_self.gender_arr[num].key == ret.data.gender) {
                                    _self.gender = _self.gender_arr[num].text;
                                    _self.genderId = _self.gender_arr[num].key;
                                }
                            }
                            for (var num in _self.nation_arr) {
                                if (_self.nation_arr[num].key == ret.data.nation) {
                                    _self.nation = _self.nation_arr[num].text;
                                    _self.nationId = _self.nation_arr[num].key;
                                }
                            }
                            for (var num in _self.maritalStatus_arr) {
                                if (_self.maritalStatus_arr[num].key == ret.data.maritalStatus) {
                                    _self.maritalStatus = _self.maritalStatus_arr[num].text;
                                    _self.maritalStatusId = _self.maritalStatus_arr[num].key;
                                }
                            }
                            for (var num in _self.politicalStatus_arr) {
                                if (_self.politicalStatus_arr[num].key == ret.data.politicalStatus) {
                                    _self.politicalStatus = _self.politicalStatus_arr[num].text;
                                    _self.politicalStatusId = _self.politicalStatus_arr[num].key;
                                }
                            }
                            for (var num in _self.education_arr) {
                                if (_self.education_arr[num].key == ret.data.education) {
                                    _self.education = _self.education_arr[num].text;
                                    _self.educationId = _self.education_arr[num].key;
                                }
                            }
                            for (var num in _self.religion_arr) {
                                if (_self.religion_arr[num].key == ret.data.religion) {
                                    _self.religion = _self.religion_arr[num].text;
                                    _self.religionId = _self.religion_arr[num].key;
                                }
                            }
                            for (var num in _self.occupationCategory_arr) {
                                if (_self.occupationCategory_arr[num].key == ret.data.occupationCategory) {
                                    _self.occupationCategory = _self.occupationCategory_arr[num].text;
                                    _self.occupationCategoryId = _self.occupationCategory_arr[num].key;
                                }
                            }
                            for (var num in _self.recidivism_arr) {
                                if (_self.recidivism_arr[num].key == ret.data.recidivism) {
                                    _self.recidivism = _self.recidivism_arr[num].text;
                                    _self.recidivismId = _self.recidivism_arr[num].key;
                                }
                            }
                            for (var num in _self.riskAssessment_arr) {
                                if (_self.riskAssessment_arr[num].key == ret.data.riskAssessment) {
                                    _self.riskAssessment = _self.riskAssessment_arr[num].text;
                                    _self.riskAssessmentId = _self.riskAssessment_arr[num].key;
                                }
                            }
                            for (var num in _self.cohesionSituation_arr) {
                                if (_self.cohesionSituation_arr[num].key == ret.data.cohesionSituation) {
                                    _self.cohesionSituation = _self.cohesionSituation_arr[num].text;
                                    _self.cohesionSituationId = _self.cohesionSituation_arr[num].key;
                                }
                            }
                            for (var num in _self.placementSituation_arr) {
                                if (_self.placementSituation_arr[num].key == ret.data.placementSituation) {
                                    _self.placementSituation = _self.placementSituation_arr[num].text;
                                    _self.placementSituationId = _self.placementSituation_arr[num].key;
                                }
                            }
                            for (var num in _self.palatabilityType_arr) {
                                if (_self.palatabilityType_arr[num].key == ret.data.palatabilityType) {
                                    _self.palatabilityType = _self.palatabilityType_arr[num].text;
                                    _self.palatabilityTypeId = _self.palatabilityType_arr[num].key;
                                }
                            }
                            for (var num in _self.reCrime_arr) {
                                if (_self.reCrime_arr[num].key == ret.data.reCrime) {
                                    _self.reCrime = _self.reCrime_arr[num].text;
                                    _self.reCrimeId = _self.reCrime_arr[num].key;
                                }
                            }
                            for (var num in _self.pepType_arr) {
                                if (_self.pepType_arr[num].key == ret.data.pepType) {
                                    _self.pepType = _self.pepType_arr[num].text;
                                    _self.pepTypeId = _self.pepType_arr[num].key;
                                }
                            }
                        } else {
                            alert(ret.errorinfo);
                        }
                    } else {
                        alert(JSON.stringify(err));
                    }
                });

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
            genderf: function () { //性别
                console.log("性别");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.gender; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.gender_arr.forEach(function (value, index, arr) {
                            if (value.text == that.gender) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.gender_arr, this.gender, "gender");
                    api.addEventListener({
                        name: 'gender'
                    }, function (ret, err) {
                        if (ret) {
                            that.gender = ret.value.key1;
                            that.genderId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            birthdayf: function () { //出生日期
                console.log("出生日期");
                var that = this;
                if (!this.isBrowser) {
                    UICore.openTimeComponent2(this.birthday);
                    api.addEventListener({
                        name: 'buildingTime'
                    }, function (ret, err) {
                        if (ret) {
                            that.birthday = ret.value.key1;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
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
            politicalStatusf: function () { //政治面貌
                console.log("政治面貌");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.politicalStatus; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.politicalStatus_arr.forEach(function (value, index, arr) {
                            if (value.text == that.politicalStatus) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.politicalStatus_arr, this.politicalStatus, "politicalStatus");
                    api.addEventListener({
                        name: 'politicalStatus'
                    }, function (ret, err) {
                        if (ret) {
                            that.politicalStatus = ret.value.key1;
                            that.politicalStatusId = ret.value.key2;
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
                    var defaultVal = this.religion; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.religion_arr.forEach(function (value, index, arr) {
                            if (value.text == that.religion) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.religion_arr, this.religion, "religion");
                    api.addEventListener({
                        name: 'religion'
                    }, function (ret, err) {
                        if (ret) {
                            that.religion = ret.value.key1;
                            that.religionId = ret.value.key2;
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
            maritalStatusf: function () { //婚姻状况
                console.log("婚姻状况");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.maritalStatus; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.maritalStatus_arr.forEach(function (value, index, arr) {
                            if (value.text == that.maritalStatus) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.maritalStatus_arr, this.maritalStatus, "maritalStatus");
                    api.addEventListener({
                        name: 'maritalStatus'
                    }, function (ret, err) {
                        if (ret) {
                            that.maritalStatus = ret.value.key1;
                            that.maritalStatusId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            occupationCategoryf: function () { //职业类别
                console.log("职业类别");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.occupationCategory; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.occupationCategory_arr.forEach(function (value, index, arr) {
                            if (value.text == that.occupationCategory) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.occupationCategory_arr, this.occupationCategory, "occupationCategory");
                    api.addEventListener({
                        name: 'occupationCategory'
                    }, function (ret, err) {
                        if (ret) {
                            that.occupationCategory = ret.value.key1;
                            that.occupationCategoryId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            pepTypef: function () { //人员类别
                console.log("人员类别");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.pepType; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.pepType_arr.forEach(function (value, index, arr) {
                            if (value.text == that.pepType) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.pepType_arr, this.pepType, "pepType");
                    api.addEventListener({
                        name: 'pepType'
                    }, function (ret, err) {
                        if (ret) {
                            that.pepType = ret.value.key1;
                            that.pepTypeId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            recidivismf: function () { //是否累犯
                console.log("是否累犯");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.recidivism; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.recidivism_arr.forEach(function (value, index, arr) {
                            if (value.text == that.recidivismf) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.recidivism_arr, this.recidivism, "recidivism");
                    api.addEventListener({
                        name: 'recidivism'
                    }, function (ret, err) {
                        if (ret) {
                            that.recidivism = ret.value.key1;
                            that.recidivismId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            originalSentencef: function () { //原判刑期
                console.log("原判刑期");
                var that = this;
                if (!this.isBrowser) {
                    UICore.openTimeComponent2(this.originalSentence);
                    api.addEventListener({
                        name: 'buildingTime'
                    }, function (ret, err) {
                        if (ret) {
                            that.originalSentence = ret.value.key1;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            releaseDatef: function () { //释放日期
                console.log("释放日期");
                var that = this;
                if (!this.isBrowser) {
                    UICore.openTimeComponent2(this.releaseDate);
                    api.addEventListener({
                        name: 'buildingTime'
                    }, function (ret, err) {
                        if (ret) {
                            that.releaseDate = ret.value.key1;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            riskAssessmentf: function () { //危险性评估类型
                console.log("危险性评估类型");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.riskAssessment; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.riskAssessment_arr.forEach(function (value, index, arr) {
                            if (value.text == that.riskAssessment) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.riskAssessment_arr, this.riskAssessment, "riskAssessment");
                    api.addEventListener({
                        name: 'riskAssessment'
                    }, function (ret, err) {
                        if (ret) {
                            that.riskAssessment = ret.value.key1;
                            that.riskAssessmentId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            linkingDatef: function () { //衔接日期
                console.log("衔接日期");
                var that = this;
                if (!this.isBrowser) {
                    UICore.openTimeComponent2(this.linkingDate);
                    api.addEventListener({
                        name: 'buildingTime'
                    }, function (ret, err) {
                        if (ret) {
                            that.linkingDate = ret.value.key1;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            cohesionSituationf: function () { //衔接情况
                console.log("衔接情况");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.cohesionSituation; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.cohesionSituation_arr.forEach(function (value, index, arr) {
                            if (value.text == that.cohesionSituation) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.cohesionSituation_arr, this.cohesionSituation, "cohesionSituation");
                    api.addEventListener({
                        name: 'cohesionSituation'
                    }, function (ret, err) {
                        if (ret) {
                            that.cohesionSituation = ret.value.key1;
                            that.cohesionSituationId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            settlementDatef: function () { //安置日期
                console.log("安置日期");
                var that = this;
                if (!this.isBrowser) {
                    UICore.openTimeComponent2(this.settlementDate);
                    api.addEventListener({
                        name: 'buildingTime'
                    }, function (ret, err) {
                        if (ret) {
                            that.settlementDate = ret.value.key1;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            placementSituationf: function () { //安置情况
                console.log("安置情况");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.placementSituation; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.placementSituation_arr.forEach(function (value, index, arr) {
                            if (value.text == that.placementSituation) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.placementSituation_arr, this.placementSituation, "placementSituation");
                    api.addEventListener({
                        name: 'placementSituation'
                    }, function (ret, err) {
                        if (ret) {
                            that.placementSituation = ret.value.key1;
                            that.placementSituationId = ret.value.key2;
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
            startDataf: function () { //帮教起日
                console.log("帮教起日");
                var that = this;
                if (!this.isBrowser) {
                    UICore.openTimeComponent2(this.startData);
                    api.addEventListener({
                        name: 'buildingTime'
                    }, function (ret, err) {
                        if (ret) {
                            that.startData = ret.value.key1;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            endDataf: function () { //帮教止日
                console.log("帮教止日");
                var that = this;
                if (!this.isBrowser) {
                    UICore.openTimeComponent2(this.endData);
                    api.addEventListener({
                        name: 'buildingTime'
                    }, function (ret, err) {
                        if (ret) {
                            that.endData = ret.value.key1;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            reCrimef: function () { //是否重新犯罪
                console.log("是否重新犯罪");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.reCrime; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.reCrime_arr.forEach(function (value, index, arr) {
                            if (value.text == that.reCrime) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.reCrime_arr, this.reCrime, "reCrime");
                    api.addEventListener({
                        name: 'reCrime'
                    }, function (ret, err) {
                        if (ret) {
                            that.reCrime = ret.value.key1;
                            that.reCrimeId = ret.value.key2;
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
                if (!this.cardId) {
                    alert("请输入身份证号");
                    return false;
                }
                if (!this.gender) {
                    alert("请选择性别");
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
                if (!this.currentResidence) {
                    alert("请输入现住地");
                    return false;
                }
                if (!this.currentAddress) {
                    alert("请输入现住地详细地址");
                    return false;
                }
                return true;
            },
            submit: function () {
                console.log("提交");
                var postjson = {}; //提交postjson
                var resultjson = {}; //最终整合真正提交的json

                var info = $api.getStorage('userinf');
                postjson.dataAreaCode= $api.getStorage('userinf').dataAreaCode,
                postjson.id = this.id,//新增，id直接给空，编辑时为原id
                postjson.cardId=this.cardId ,//证件号码
                postjson.name=this.name ,//	姓名
                postjson.nameBefore=this.nameBefore ,//	曾用名
                postjson.gender=this.genderId ,//	性别
                postjson.birthday=this.birthday ,//	出生日期
                postjson.nation=this.nationId ,//	民族
                postjson.nativePlace=this.nativePlace ,//	籍贯
                postjson.maritalStatus=this.maritalStatusId ,//	婚姻状况
                postjson.politicalStatus=this.politicalStatusId ,//	政治面貌
                postjson.education=this.educationId ,//	文化程度
                postjson.religion=this.religionId ,//	宗教信仰
                postjson.occupationCategory=this.occupationCategoryId ,//	职业类别
                postjson.job=this.job ,//	职业
                postjson.unitService=this.unitService ,//	服务处所
                postjson.tel=this.tel ,//	联系方式
                postjson.domicile=this.domicile ,//	户籍地
                postjson.domicileAddress=this.domicileAddress ,//	户籍详细地址
                postjson.currentResidence=this.currentResidence ,//	现住地
                postjson.currentAddress=this.currentAddress ,//	现住地详细地址
                postjson.recidivism=this.recidivismId ,//	是否累犯
                postjson.originalName=this.originalName ,//	原罪名
                postjson.originalSentence=this.originalSentence ,//	原判刑期
                postjson.servingPlace=this.servingPlace ,//	服刑场所
                postjson.releaseDate=this.releaseDate ,//	释放日期
                postjson.riskAssessment=this.riskAssessmentId ,//	危险性评估类型
                postjson.linkingDate=this.linkingDate ,//	衔接日期
                postjson.cohesionSituation=this.cohesionSituationId ,//	衔接情况
                postjson.settlementDate=this.settlementDate ,//	安置日期
                postjson.placementSituation=this.placementSituationId ,//	安置情况
                postjson.notPlacedReason=this.notPlacedReason ,//	未安置原因
                postjson.educationSituation=this.educationSituation ,//	帮教情况
                postjson.reCrime=this.reCrimeId ,//	是否重新犯罪
                postjson.palatabilityType=this.palatabilityTypeId ,//	适口类型
                postjson.startData=this.startData ,//	帮教起日
                postjson.endData=this.endData ,//	帮教止日
                postjson.reOffending=this.reOffending ,//	重新犯罪名
                postjson.pepType=this.pepTypeId,//人员类别
                postjson.coordinate=this.coordinate,//关联地图

                resultjson.releaseVo = postjson;
                //resultjson.expand = this.expandjson;

                console.log(JSON.stringify(resultjson));
                var json = JSON.stringify(resultjson);
                console.log(UICore.serviceUrl + 'mobile/mobileInterfaceForRelease.shtml?act=addOrEdit&data=' + json);
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/mobileInterfaceForRelease.shtml?act=addOrEdit&data=' + json,
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
