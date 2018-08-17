/**
 * Created by kevin on 2017/6/26.
 */
apiready = function() {
    new Vue({
        el: "#list",
        data: {
            name: "", //姓名
            identity: "", //身份证号
            sex: "", //性别
            sexId: "", //性别id
            sex_arr: [], //性别列表

            birthday: "", //出生日期

            relationship: "", //户成员关系
            relationshipId: "", //户成员关系id
            residentRelationship_arr: [], //户成员关系列表

            nation: "", //民族
            nationId: "", //民族id
            nation_arr: [], //民族列表

            politics: "", //政治面貌
            politicsId: "", //政治面貌id
            politicalStatus_arr: [], //政治面貌列表

            religion: "", //宗教信仰
            religionId: "", //宗教信仰id
            religion_arr: [], //宗教信仰列表

            degree: "", //文化程度
            degreeId: "", //文化程度id
            degree_arr: [], //文化程度列表

            maritalStatus: "", //婚姻状况
            maritalStatusyId: "", //婚姻状况id
            maritalStatus_arr: [], //婚姻状况列表

            socialOffice: "", //社会任职
            socialOfficeId: "", //社会任职id
            position_arr: [], //社会任职列表

            registType: "", //户口性质
            registTypeId: "", //户口性质id
            accountProperties_arr: [], //户口性质列表

            province: "", //户 籍 省
            provinceId: "", //户 籍 省id
            regProvince_arr: [], //户籍省列表

            city: "", //户 籍 市
            cityId: "", //户 籍 市id
            regCity_arr: [], //户籍市列表

            county: "", //户籍区/县
            countyId: "", //户籍区/县id
            regCounty_arr: [], //户籍区县列表

            registerAddress: "", //户籍详址
            address: "", //现居地址
            telephone: "", //固定电话
            cellphone: "", //手机号码
            contactMethod: "", //联系方法
            contactMethodId: "", //联系方法id
            otherContact_arr: [], //联系方法列表
            contactWay: "", //联系方式

            linkHouse: "", //关联房屋
            houseOwner: "", //户号
            houseAddress: "", //地址
            residentId:"",

            linkBuilding: "", //关联建筑
            buiName: "", //建筑名称
            unit: "", //单元/梯
            unitId: "", //单元/梯id
            buildingUnit_arr: [], //单元/梯列表
            layerNum: "", //所属楼层
            houseNum: "", //房号

            isprovincechange: false,
            idx:0,
            expandstr: "", //表单预览数据
            expandjson: {}, //动态表单数据
            expandTab_arr: [], //扩展信息
            isNew: true, //是否是新增
            isBrowser: false, //是否是浏览模式
            edited:false,
            isClick: false, //是否可点击
            param: {},
            shouldhide: false,
            shouldshow: true,
            entity: {}, //关联房屋对象
            buiEntity: {}, //户主关联建筑对象
            ids: "",
            // isactive:false

            imgarr: {
                imgpaths: [], //图片地址存放数组
                photo:"",//附件ID
            },
            imgtemps:[],//图片地址临时存放，为了选择多个图片时候一起显示出来，因为要递归压缩图片，如果不存，会一张一张的显示图片
            phoneImg:"../../image/photo_default.png",
            deleteImgShow:false,

        },
        created: function() {
            this.param = api.pageParam;
            var info = $api.getStorage('userinf');
            console.log(JSON.stringify(this.param));
            UICore.showLoading("正在加载中...", "请稍候");
            this.initSelectData();
            this.parseXMLForData();
            this.ExpandTab();
            if (this.param.from == 'populationQuery') {
                this.isBrowser = true; //是否是浏览模式
                this.isClick = this.isBrowser //是否可点击
                this.isNew = false; //是否是新增
                this.shouldhide = true; //管理房屋可见
                $api.text($api.byId('pkh_add_su'), '编辑');
            } else {

            }
            api.hideProgress();
        }, //created end
        methods: {
            initSelectData: function() {
                console.log(this.param.from);
                var that = this;
                var jsonData = JSON.parse($api.getStorage('settingdata'));
                jsonData.data.forEach(function(value) {
                    if (value.parentKey == "sex") {
                        that.sex_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        });
                    };
                    if (value.parentKey == "ResidentRelationship") {
                        that.residentRelationship_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    };
                    if (value.parentKey == "nation") {
                        that.nation_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    };
                    if (value.parentKey == "politicalStatus") {
                        that.politicalStatus_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    };
                    if (value.parentKey == "religion") {
                        that.religion_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    };
                    if (value.parentKey == "degree") {
                        that.degree_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    };
                    if (value.parentKey == "maritalStatus") {
                        that.maritalStatus_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    };
                    if (value.parentKey == "position") {
                        that.position_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    };
                    if (value.parentKey == "accountProperties") {
                        that.accountProperties_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    };
                    if (value.parentKey == "otherContact") {
                        that.otherContact_arr.push({
                            text: value.extendAttributeValue,
                            status: 'normal',
                            key: value.extendAttributeKey
                        })
                    }
                });

                if (this.param.from == 'populationQuery') {
                    that.EditData(that.param.name);
                }

            },
            parseXMLForData: function() {
                var that = this;
                var trans = api.require('trans');
                trans.parse({
                    path: 'widget://res/pca.xml'
                }, function(ret, err) {
                    if (ret) {
                        ret.Country.province.forEach(function(value, index) {
                            that.regProvince_arr.push({
                                text: value.name,
                                code: value.code,
                                status: 'normal',
                                key: index,
                                city: value.City
                            })
                        });
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            loadBuildUnitData: function(buildId) {
                var that = this;
                console.log(UICore.serviceUrl + 'mobile/mobileInterfaceForBuilding.shtml?act=getBuildingInfo&data={buiId:' + buildId + '}');
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/mobileInterfaceForBuilding.shtml?act=getBuildingInfo&data={buiId:' + buildId + '}',
                    method: 'post',
                }, function(ret, err) {
                    that.buildingUnit_arr.splice(0, that.buildingUnit_arr.length);
                    if (ret.success) {
                        ret.data.unitList.forEach(function(value) {
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
            ExpandTab: function() {
                var that = this;
                console.log(UICore.serviceUrl + 'mobile/mobileDataCollection.shtml?act=getDynaBaseTab&data={baseKey:RKXX}');
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/mobileDataCollection.shtml?act=getDynaBaseTab&data={baseKey:RKXX}',
                    method: 'get',
                }, function(ret, err) {
                    if (ret.success) {

                        ret.data.forEach(function(value) {
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
            EditData: function(params) {
                var that = this;
                this.ids = params.id;
                this.imgarr.photo = params.photo;
                if(this.imgarr.photo){
                  if(params.photoPath&&params.photoPath.indexOf('upload')>-1){
                    this.phoneImg = UICore.serviceUrl+params.photoPath;
                    this.imgarr.imgpaths.push(UICore.serviceUrl+params.photoPath);
                  }else{
                    this.phoneImg = params.photoPath;
                    this.imgarr.imgpaths.push(params.photoPath);
                  }

                  console.log(this.phoneImg);
                  this.imgarr.imgpaths.push(UICore.serviceUrl+params.photoPath);
                }
                this.edited = params.edited;
                this.name = params.name; //姓名
                this.identity = params.idNumber; //身份证号
                this.birthday = params.birthday; //出生日期
                if (params.sex == "男") {
                    params.sex = "1";
                } else {
                    params.sex = "2";
                };

                this.sex_arr.forEach(function(value) {
                    if (value.key == params.sex)
                        that.sex = value.text;
                });
                this.sexId = params.sex; //性别id

                this.residentRelationship_arr.forEach(function(value) {
                    if (value.key == params.relation)
                        that.relationship = value.text;
                });
                this.relationshipId = params.relation; //户成员关系id

                this.nation_arr.forEach(function(value) {
                    if (value.key == params.nation)
                        that.nation = value.text;
                });
                this.nationId = params.nation; //民族id


                this.politicalStatus_arr.forEach(function(value) {
                    if (value.key == params.politicalStatus)
                        that.politics = value.text;
                });
                this.politicsId = params.politicalStatus; //政治面貌id

                this.religion_arr.forEach(function(value) {
                    if (value.key == params.religion)
                        that.religion = value.text;
                });
                this.religionId = params.religion; //宗教信仰id

                this.degree_arr.forEach(function(value) {
                    if (value.key == params.degree)
                        that.degree = value.text;
                });
                this.degreeId = params.degree; //文化程度id

                this.maritalStatus_arr.forEach(function(value) {
                    if (value.key == params.maritalStatus)
                        that.maritalStatus = value.text;
                });
                this.maritalStatusyId = params.maritalStatus; //婚姻状况id

                this.position_arr.forEach(function(value) {
                    if (value.key == params.position)
                        that.socialOffice = value.text;
                });
                this.socialOfficeId = params.position; //社会任职id

                this.accountProperties_arr.forEach(function(value) {
                    if (value.key == params.accountProperties)
                        that.registType = value.text;
                });
                this.registTypeId = params.accountProperties; //户口性质id

                this.province = params.regProvince; //户籍省
                this.city = params.regCity; //户籍市
                this.county = params.regCounty; //户籍区/县

                this.registerAddress = params.livingAddress; //户籍详址
                this.address = params.regAddress; //现居地址
                this.telephone = params.telephone; //固定电话
                this.cellphone = params.mobile; //手机号码

                this.otherContact_arr.forEach(function(value) {
                    if (value.key == params.otherContact)
                        that.contactMethod = value.text;
                });
                this.contactMethodId = params.otherContact; //联系方法id

                this.contactWay = params.otherContactNo; //联系方式
                this.houseOwner=params.houseOwner; //户号
                this.houseAddress=params.address; //地址
                this.residentId=params.residentId;
                this.entity.residentId=params.residentId;
            },
            checkidentity:function(){
              var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                var idNumber=this.identity;
                if (!reg.test(idNumber)) {
                  api.toast({
                      msg: '请输入正确的身份证号码',
                      duration: 3000,
                      location: 'top'
                  });
                  return false;
                }else {
                  return true;
                }
            },
            checkPhone: function() {
              var phone=this.cellphone;
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
            sexf: function() { //性别
                console.log("性别");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.sex; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.sex_arr.forEach(function(value, index, arr) {
                            if (value.text == that.sex) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.sex_arr, this.sex, "sex");
                    api.addEventListener({
                        name: 'sex'
                    }, function(ret, err) {
                        if (ret) {
                            that.sex = ret.value.key1;
                            that.sexId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            birthdayf: function() { //出生日期
                console.log("出生日期");
                var that = this;
                if (!this.isBrowser) {
                    UICore.openTimeComponent2(this.birthday);
                    api.addEventListener({
                        name: 'buildingTime'
                    }, function(ret, err) {
                        if (ret) {
                            that.birthday = ret.value.key1;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            relationshipf: function() { //户成员关系
                console.log("户成员关系");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.relationship; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.residentRelationship_arr.forEach(function(value, index, arr) {
                            if (value.text == that.relationship) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.residentRelationship_arr, this.relationship, "relationship");
                    api.addEventListener({
                        name: 'relationship'
                    }, function(ret, err) {
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
            nationf: function() { //民族
                console.log("民族");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.nation; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.nation_arr.forEach(function(value, index, arr) {
                            if (value.text == that.nation) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.nation_arr, this.nation, "nation");
                    api.addEventListener({
                        name: 'nation'
                    }, function(ret, err) {
                        if (ret) {
                            that.nation = ret.value.key1;
                            that.nationId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            politicsf: function() { //政治面貌
                console.log("政治面貌");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.politics; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.politicalStatus_arr.forEach(function(value, index, arr) {
                            if (value.text == that.politics) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.politicalStatus_arr, this.politics, "politics");
                    api.addEventListener({
                        name: 'politics'
                    }, function(ret, err) {
                        if (ret) {
                            that.politics = ret.value.key1;
                            that.politicsId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            religionf: function() { //宗教信仰
                console.log("宗教信仰");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.religion; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.religion_arr.forEach(function(value, index, arr) {
                            if (value.text == that.religion) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.religion_arr, this.religion, "religion");
                    api.addEventListener({
                        name: 'religion'
                    }, function(ret, err) {
                        if (ret) {
                            that.religion = ret.value.key1;
                            that.religionId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            degreef: function() { //文化程度
                console.log("文化程度");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.degree; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.degree_arr.forEach(function(value, index, arr) {
                            if (value.text == that.degree) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.degree_arr, this.degree, "degree");
                    api.addEventListener({
                        name: 'degree'
                    }, function(ret, err) {
                        if (ret) {
                            that.degree = ret.value.key1;
                            that.degreeId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            maritalStatusf: function() { //婚姻状况
                console.log("婚姻状况");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.maritalStatus; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.maritalStatus_arr.forEach(function(value, index, arr) {
                            if (value.text == that.maritalStatus) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.maritalStatus_arr, this.maritalStatus, "maritalStatus");
                    api.addEventListener({
                        name: 'maritalStatus'
                    }, function(ret, err) {
                        if (ret) {
                            that.maritalStatus = ret.value.key1;
                            that.maritalStatusyId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            socialOfficef: function() { //社会任职
                console.log("社会任职");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.socialOffice; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.position_arr.forEach(function(value, index, arr) {
                            if (value.text == that.socialOffice) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.position_arr, this.socialOffice, "socialOffice");
                    api.addEventListener({
                        name: 'socialOffice'
                    }, function(ret, err) {
                        if (ret) {
                            that.socialOffice = ret.value.key1;
                            that.socialOfficeId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            registTypef: function() { //户口性质
                console.log("户口性质");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.registType; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.accountProperties_arr.forEach(function(value, index, arr) {
                            if (value.text == that.registType) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.accountProperties_arr, this.registType, "registType");
                    api.addEventListener({
                        name: 'registType'
                    }, function(ret, err) {
                        if (ret) {
                            that.registType = ret.value.key1;
                            that.registTypeId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },
            provincef: function() { //户 籍 省
                console.log("户 籍 省");
                var that = this;
                if (!this.isBrowser) {
                    var defaultVal = this.province; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.regProvince_arr.forEach(function(value, index, arr) {
                            if (value.text == that.province) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.regProvince_arr, this.province, "province");
                    api.addEventListener({
                        name: 'province'
                    }, function(ret, err) {
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
            cityf: function() { //户 籍 市
                console.log("户 籍 市");
                var that = this;
                if (this.province) { //必须省份先选择不能为空
                    this.regProvince_arr.forEach(function(value) { //遍历数组
                        if (value.text == that.province) { //寻找符合当前省份下的对象比如江苏省则regProvince_arr对应到江苏省
                            var isArray = Object.prototype.toString.call(value.city) == '[object Array]'; //判断是否是直辖市
                            if (isArray) { //判断数据源是否是数组(非直辖市city则为数组对象)
                                that.regCity_arr.splice(0, that.regCity_arr.length);
                                value.city.forEach(function(value, index) {
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
                            this.regCity_arr.forEach(function(value, index, arr) {
                                if (value.text == that.city) {
                                    arr[index].status = "selected";
                                }
                            })
                        }
                        UICore.openSelect3(this.regCity_arr, this.city, "city");
                        api.addEventListener({
                            name: 'city'
                        }, function(ret, err) {
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
            countyf: function() { //户籍区/县
                console.log("户籍区/县");
                var that = this;
                if (this.city) { //判断当前省份和城市是否有
                    this.regProvince_arr.forEach(function(value) { //遍历省份
                        if (value.text == that.province) { //寻找符合当前省份下的对象比如江苏省则regProvince_arr对应到江苏省
                            var isArray = Object.prototype.toString.call(value.city) == '[object Array]'; //判断是否是直辖市
                            if (isArray) { //判断数据源是否是数组(非直辖市city则为数组对象)
                                value.city.forEach(function(vlauecity) { //遍历城市查询
                                    if (vlauecity.name == that.city) { //如果城市是相等的则查询区/县
                                        var isArray = Object.prototype.toString.call(vlauecity.Piecearea) == '[object Array]';
                                        that.regCounty_arr.splice(0, that.regCounty_arr.length);
                                        if (isArray) {
                                            vlauecity.Piecearea.forEach(function(value1, i) { //具体到城市后对区/线赋值
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
                                    value.city.Piecearea.forEach(function(value1, i) { //具体到城市后对区/线赋值
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
                            this.regCounty_arr.forEach(function(value, index, arr) {
                                if (value.text == that.county) {
                                    arr[index].status = "selected";
                                }
                            })
                        }
                        UICore.openSelect3(this.regCounty_arr, this.county, "city");
                        api.addEventListener({
                            name: 'city'
                        }, function(ret, err) {
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
            contactMethodf: function() { //联系方法
                console.log("联系方法");
                var that = this;
                if (!this.isBrowser) { //如果是新增状态
                    var defaultVal = this.contactMethod; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.otherContact_arr.forEach(function(value, index, arr) {
                            if (value.text == that.contactMethod) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.otherContact_arr, this.contactMethod, "contactMethod");
                    api.addEventListener({
                        name: 'contactMethod'
                    }, function(ret, err) {
                        if (ret) {
                            that.contactMethod = ret.value.key1;
                            that.contactMethodId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }

            },
            linkHousef: function() { //关联房屋
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
                }, function(ret, err) {
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
            linkBuildingf: function() { //关联建筑
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
                }, function(ret, err) {
                    if (ret) {
                        that.buiEntity = ret.value.key1;
                        that.loadBuildUnitData(ret.value.key1.id);
                        that.buiName = ret.value.key1.buiName; //建筑名称
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },
            unitf: function() { //单元/梯
                console.log("单元/梯");
                var that = this;
                if (!this.isBrowser && this.buildingUnit_arr) {
                    var defaultVal = this.unit; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.buildingUnit_arr.forEach(function(value, index, arr) {
                            if (value.text == that.unit) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.buildingUnit_arr, this.unit, "unit");
                    api.addEventListener({
                        name: 'unit'
                    }, function(ret, err) {
                        if (ret) {
                            that.unit = ret.value.key1;
                            that.unitId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                } //if语句结束
            },

            expandselect: function(index, english_name, title) {
                var expandParams = this.param.name.extendAtt;
                console.log(expandParams)
                var that = this;
                if (this.expandstr != ""&&this.isNew) {
                    api.openWin({
                        name: 'dynamic',
                        url: '../dynamic.html',
                        pageParam: {
                            title: title,
                            name: english_name,
                            isNew:this.isNew,
                            id: this.id,
                            isBrowser: this.isBrowser,
                            attr: "{"+this.expandstr.substring(0,this.expandstr.length-1)+"}"
                        }
                    });
                }else if(!this.isNew&&this.edited){
                  var myatt = "";
                  var flag = false;
                  for(var mykey in this.expandjson){
                    flag = true;
                    break;
                  }
                  if(flag){
                    myatt = JSON.stringify(this.expandjson);
                  }else{
                    myatt = JSON.stringify(expandParams);
                  }
                  api.openWin({
                      name: 'dynamic',
                      url: '../dynamic.html',
                      pageParam: {
                          title: title,
                          name: english_name,
                          isNew:this.isNew,
                          edited:true,
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
                            isNew:this.isNew,
                            id: this.id,
                            isBrowser: this.isBrowser,
                            attr: expandParams
                        }
                    });
                }

                api.addEventListener({
                    name: 'population_json'
                }, function(ret, err) {
                  if(!that.isNew){
                    that.expandjson=ret.value.key;
                    that.edited=ret.value.key2
                  }else{
                      that.doExpand(ret.value.key,index)
                  }
                });
            }, //动态表单选择结束
            doExpand:function(value,index) {
                var s = JSON.stringify(value);
                var json = eval('(' + s + ')');
                for (var key in json) { //上个页面的json
                    var t=JSON.stringify(json[key])
                    this.expandstr += t.substring(1,t.length-1)+",";
                }
                this.expandjson=eval('(' + "{"+this.expandstr.substring(0,this.expandstr.length-1)+"}" + ')');
                  console.log(JSON.stringify(this.expandjson))
            },
            uploadAttach:function(){
                if (this.isBrowser) {
                    $api.text($api.byId('pkh_add_su'), '提交');
                    this.isBrowser = false;
                    this.isClick = this.isBrowser;
                    this.shouldhide = false; //管理房屋可见
                    if(this.imgarr.imgpaths.length>0){
                      this.deleteImgShow = true;
                    }

                }else{
                  if(this.checkVal()){
                    UICore.showLoading("上传附件中","请稍侯");
                    if(this.imgarr.imgpaths.length>0&&!(this.imgarr.imgpaths[0].indexOf("http")>-1)){
                      console.log(UICore.serviceUrl+'mobile/mobileWf.shtml?act=uploadAttachment&accountId=' + $api.getStorage('userinf').accountId);
                      console.log("imgPaht: " + JSON.stringify(this.imgarr.imgpaths));
                      var _self = this;
                      api.ajax({
                          url:UICore.serviceUrl + 'mobile/mobileWf.shtml?act=uploadAttachment&accountId=' + $api.getStorage('userinf').accountId,
                          method: 'post',
                          data: {
                            files : {
                              file : this.imgarr.imgpaths,
                            }
                          }
                      },function(ret, err){
                          api.hideProgress();
                          if (ret) {
                              if(ret.success){
                                _self.imgarr.photo = ret.data;
                              }
                              _self.submit();
                          } else {
                              alert( "附件上传失败" );
                          }
                      });
                    }else{
                      this.submit();
                    }
                  }
                }

            },
            checkVal:function(){
                if (!this.name) {
                  alert("请输入姓名");
                  return false;
                }
                if (!this.identity) {
                  alert("请输入身份证号");
                  return false;
                }
                if (!this.sexId) {
                  alert("请选择性别");
                  return false;
                }
                if (!this.province) {
                  alert("请选择户籍省");
                  return false;
                }
                if (!this.city) {
                  alert("请选择户籍市");
                  return false;
                }
                if (!this.county) {
                  alert("请选择户籍区/县");
                  return false;
                }
                if (!this.registerAddress) {
                  alert("请选择户籍详址");
                  return false;
                }
                if (!this.address) {
                  alert("请选择现居地址");
                  return false;
                }
                return true;
            },
            submit: function() {
                console.log("提交");
                var postjson = {}; //提交postjson
                var resultjson = {}; ////最终整合真正提交的json

                var info = $api.getStorage('userinf');
                if (!this.isNew) { //如果是编辑
                    postjson.id = this.ids;
                }
                postjson.photo = this.imgarr.photo;
                postjson.photoPath = this.phoneImg;
                postjson.createUserId = info.accountId; //创建人
                postjson.data_area_code = info.dataAreaCode;
                postjson.gridId=info.gridId

                if (!this.name ==""||!this.name==null) {
                  postjson.name = this.name;
                }
                if (!this.identity ==""||!this.identity==null) {
                  postjson.idNumber = this.identity;
                }
                if (!this.sexId ==""||!this.sexId==null) {
                  postjson.sex = this.sexId;
                }
                postjson.birthday = this.birthday;

                postjson.relation = this.relationshipId;

                postjson.nation = this.nationId;

                postjson.politicalStatus = this.politicsId;

                postjson.religion = this.religionId;

                postjson.degree = this.degreeId;

                postjson.maritalStatus = this.maritalStatusyId;

                postjson.position = this.socialOfficeId;

                postjson.accountProperties = this.registTypeId;

                if (!this.province ==""||!this.province==null) {
                  postjson.regProvince = this.province;
                }
                if (!this.city ==""||!this.city==null) {
                  postjson.regCity = this.city;
                }
                if (!this.county ==""||!this.county==null) {
                  postjson.regCounty = this.county;
                }
                if (!this.registerAddress ==""||!this.registerAddress==null) {
                  postjson.regAddress = this.registerAddress;
                }
                if (!this.address ==""||!this.address==null) {
                  postjson.livingAddress = this.address;
                }
                postjson.telephone = this.telephone;

                postjson.mobile = this.cellphone;

                postjson.otherContact = this.contactMethodId;

                postjson.otherContactNo = this.contactWay;

                postjson.residentId=this.entity.residentId;
                postjson.houseOwner = this.houseOwner;


                postjson.dataSource = 2;
                resultjson.population = postjson;
                resultjson.expand = this.expandjson;
                eventuallyjson = resultjson;
                /*人口相关数据结束*/

                /* 基本户主的房屋信息 */
                // var resident = {};
                // resident.ENTITYID = this.entity.entityId;
                // resident.GRIDID = this.entity.gridCode;
                // if (this.relationship == "户主" || this.relationshipId == "5") { //户主
                //     resident.id = this.buiEntity.id;
                //     resident.houseid = this.buiEntity.houseId;
                //     resultjson.population.residentId = this.buiEntity.id;
                //     if (this.unit == "请选择" && this.maritalStatusyId) { //单元/梯
                //         resident.unitId = this.unit // 单元值
                //         resident.unitNum = this.unitId; // 单元名 单元/梯id
                //     };
                // if (this.layerNum) //所属楼层
                //     resident.floorNum = this.layerNum; //楼层
                // if (this.houseNum) //房号
                //     resident.roomNum = this.houseNum; //楼号
                // } else { //非户主
                // resident.unitId = this.entity.unitId;
                // resident.unitNum = this.entity.unitNum;
                // resident.floorNum = this.entity.floorNum; //楼层
                // resident.roomNum = this.entity.roomNum; //楼号
                // }
                // resident.useType = 1;
                // resident.actualUseType = 1;
                // resident.dataSource = 2;
                // resident.data_area_code = info.villageOrCommunityCode;
                // eventuallyjson.house = resident;
                /*户主房屋信息以及非户主但仍需要相同字段数据结束*/

                // 户信息
                var housejson = {};
                housejson.HOUSE_OWNER = this.houseOwner;
                if (this.entity)
                    housejson.id = this.entity.id
                housejson.RESIDENT_TYPE = 1; // 类别
                housejson.IS_NEED_HELP = 0; // 需求帮助
                housejson.dataSource = 2;
                housejson.data_area_code = info.villageOrCommunityCode;
                eventuallyjson.resident = housejson;
                /*非户主房屋信息数据结束*/
                console.log(JSON.stringify(eventuallyjson));
                var json = JSON.stringify(eventuallyjson);
                console.log(UICore.serviceUrl + 'mobile/mobileInterfaceForPopulation.shtml?act=edit&data=' + json);
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/mobileInterfaceForPopulation.shtml?act=edit&data=' + json,
                    method: 'get',
                }, function(ret, err) {
                    if (ret) {
                      console.log(JSON.stringify(ret));
                      if(ret.success){
                        api.toast({
                            msg: '保存成功',
                            duration: 3000,
                            global: 'true',
                            location: 'bottom'
                        });
                        api.sendEvent({
                            name: 'refreshResultList',
                            extra: {
                                myJson: eventuallyjson
                            }
                        });
                        api.closeWin();
                      }else{
                        alert(ret.errorinfo);
                      }


                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            },

            closeWin: function() {
                api.closeWin();
            },
            getImg: function() {
                if(this.isBrowser){
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
                }, function(ret) {
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
                        }, function(ret, err) {
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
                                }, function(ret, err) {
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
                        mycomponent.imgarr.imgpaths.splice(0,mycomponent.imgarr.imgpaths.length);
                        mycomponent.imgarr.imgpaths = mycomponent.imgarr.imgpaths.concat(mycomponent.imgtemps);
                        //$("#imgAdd").append(tempimgp);
                    }
                }
            },
            //删除图片
            deleteImg: function() {
                var mycomponent = this;
                api.confirm({
                    title: '提示',
                    msg: '确定要删除图片吗？',
                    buttons: ['确定', '取消']
                }, function(ret, err) {
                    var buttonIndex = ret.buttonIndex;
                    if (buttonIndex == 1) {
                        mycomponent.removeByValue(mycomponent.imgarr.imgpaths, mycomponent.phoneImg);
                    }
                });
            },
            //从图片数组中删除
            removeByValue: function(arr, val) {
                this.imgarr.photo = "";
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == val) {
                        arr.splice(i, 1);
                        this.phoneImg="../../image/photo_default.png";
                        this.deleteImgShow=false;
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
