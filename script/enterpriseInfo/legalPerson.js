apiready = function() {
    new Vue({
        el: "#list",
        data: {
            isClick: false, //标记是否可以编辑, false表示不绑定，可以编辑；true表示绑定，不可编辑
            id: "",
            enterpriseName: "", //单位名称
            organizationCode: "", //组织机构代码
            enterprisePropertiesId: "", //单位性质id
            enterpriseProperties: "", //单位性质
            enterpriseTypeId: "", //单位类别id
            enterpriseType: "", //单位类别
            enterpriseIndustryId: "", //所属行业id
            enterpriseIndustry: "", //所属行业
            enterpriseScaleId: "", //规模id
            enterpriseScale: "", //规模
            registerCapital: "", //注册资金
            enterpriseCreateTime: "", //成立日期
            legalPersonId: "", //法人id
            legalPerson: "", //法人
            enterpriseCorporate: "", //法人代表
            certificateTypeId: "", //证件类型id
            certificateType: "", //证件类型
            certificateNumber: "", //证件号
            advancedUnitId: "", //文明单位id
            advancedUnit: "", //文明单位
            unitLeader: "", //单位负责人
            unitLeaderPhone: "", //联系电话
            buildingName: "", //建筑名称
            buildingNumber: "", //楼号
            buildingUnitId: "", //单元/梯ID
            buildingUnit: "", //单元/梯
            belongFloorNum: "", //所属楼层
            roomNumber: "", //房号
            housingUseId: "", //房屋用途id
            housingUse: "", //房屋用途
            actuallyUseId: "", //实际用途id
            actuallyUse: "", //实际用途
            houseArea: "", //房屋面积
            expands: [],

            queryParam: {}, //查询参数，由查询界面传递，目的是编辑提交之后用来刷新查询结果列表。
            mStatus: "isNew", //标记当前状态，新增、编辑、查看
            infoJson: {}, // 查询企业基础信息json
            editBuildingData: {}, //建筑信息json

            unitProperties_arr: [], //单位性质
            unitType_arr: [], //单位类别
            belongIndustry_arr: [], //所属行业
            enterpriseScale_arr: [], //企业规模
            legalPerson_arr: [], //法人
            certificateType_arr: [], //证件类型
            organizationUnit_arr: [], //文明单位
            buildingID: "", //建筑id
            buildingUnit_arr: [], //单元、梯
            housingUse_arr: [], //房屋用途
            actuallyUse_arr: [], //实际用途
            expandTab_arr: [], //扩展信息
            expandjson: {},
            expandstr: "",
            isNew: true,
            edited: false,

            /* 以下参数编辑再提交时需要,新增不需要 */
            mEnterpriseID: "",
            mHouseID: "",
            mEntityID: "",
            mGridID: "",

            imgarr: {
                imgpaths: [], //图片地址存放数组
                videopaths: [], //视频地址存放数组
                imgnum: 0, //图片全局索引
                videonum: 0, //视频全局索引
                attachmentId:"",//附件ID
            },
            show: { //控制父组件和子组件部分DIV的显示和隐藏
                camerashow: false,
                videoshow: false,
                bgshow: false
            },
        },
        created: function() {
            var param = api.pageParam;
            if (param != "" && param.queryParam != "" && param.queryParam != undefined) {
                //保存查询参数
                this.queryParam = param.queryParam;
            }
            if (param != "" && param.status != "" && param.status != undefined) {
                this.mStatus = param.status; //初始化状态
                if (this.mStatus == "isBrownse") {
                    // 获取企业信息数据
                    this.infoJson = param.data;
                    this.mEnterpriseID = param.data.id;
                    this.edited = this.infoJson.edited;
                }
            }

            if (this.mStatus == "isBrownse") {
                $api.text($api.byId('pkh_add_su'), '编辑');
                $api.text($api.byId('legalTitle'), '编辑法人');
                this.isClick = true;
                this.isNew = false;
            } else {
                $api.text($api.byId('legalTitle'), '新增法人');
            }
            this.initSelectData();
        },
        mounted: function() {
            api.hideProgress();

        },
        methods: {
            // 初始化下拉条数据
            initSelectData: function() {
                UICore.showLoading("正在初始化数据", "请稍等");
                console.log("initSelectData");
                var that = this;
                var jsonData = JSON.parse($api.getStorage('settingdata'));
                if (jsonData != "") {
                    jsonData.data.forEach(function(value) {
                        if (value.parentKey == "UnitProperties") { //单体性质
                            that.unitProperties_arr.push({
                                text: value.extendAttributeValue,
                                status: 'normal',
                                key: value.extendAttributeKey
                            })
                        }
                        if (value.parentKey == "UnitCategory") { //单位类别
                            that.unitType_arr.push({
                                text: value.extendAttributeValue,
                                status: 'normal',
                                key: value.extendAttributeKey
                            })
                        }
                        if (value.parentKey == "UnitIndustry") { //所属行业
                            that.belongIndustry_arr.push({
                                text: value.extendAttributeValue,
                                status: 'normal',
                                key: value.extendAttributeKey
                            })
                        }
                        if (value.parentKey == "UnitSize") { //企业规模
                            that.enterpriseScale_arr.push({
                                text: value.extendAttributeValue,
                                status: 'normal',
                                key: value.extendAttributeKey
                            })
                        }
                        if (value.parentKey == "LegalPerson") { //法人
                            that.legalPerson_arr.push({
                                text: value.extendAttributeValue,
                                status: 'normal',
                                key: value.extendAttributeKey
                            })
                        }
                        if (value.parentKey == "IdType") { //证件类型
                            that.certificateType_arr.push({
                                text: value.extendAttributeValue,
                                status: 'normal',
                                key: value.extendAttributeKey
                            })
                        }
                        if (value.parentKey == "CivilizedUnit") { //文明单位
                            that.organizationUnit_arr.push({
                                text: value.extendAttributeValue,
                                status: 'normal',
                                key: value.extendAttributeKey
                            })
                        }
                        if (value.parentKey == "HouseUseType") { //房屋用途
                            that.housingUse_arr.push({
                                text: value.extendAttributeValue,
                                status: 'normal',
                                key: value.extendAttributeKey
                            })
                        }
                        if (value.parentKey == "HouseActualUseType") { //实际用途
                            that.actuallyUse_arr.push({
                                text: value.extendAttributeValue,
                                status: 'normal',
                                key: value.extendAttributeKey
                            })
                        }

                    })
                } else {
                    alert("初始化失败，数据为空");
                }
                this.setDataToView();
                this.ExpandTab();
            },
            setDataToView: function() {
                var that = this;
                if (that.mStatus == "isBrownse") {
                    console.log("brownse items: " + JSON.stringify(this.infoJson));
                    this.imgarr.attachmentId = this.infoJson.attachmentId;
                    if(this.imgarr.attachmentId){
                      if(this.infoJson.attachPath&&this.infoJson.attachPath.indexOf('upload')>-1){
                        this.imgarr.imgpaths.push(UICore.serviceUrl+this.infoJson.attachPath)
                      }else{
                        this.imgarr.imgpaths.push(this.infoJson.attachPath)
                      }

                    }
                    that.enterpriseName = that.infoJson.unitName;
                    that.organizationCode = that.infoJson.organizationCode;
                    that.registerCapital = that.infoJson.registerMoney;
                    that.enterpriseCreateTime = that.infoJson.registerDate;
                    that.enterpriseCorporate = that.infoJson.legalRepresent;
                    that.certificateNumber = that.infoJson.idNumber;
                    that.unitLeader = that.infoJson.unitLeader;
                    that.unitLeaderPhone = that.infoJson.telephone;
                    //单位性质
                    that.unitProperties_arr.forEach(function(value, index, arr) {
                        if (arr[index].key == that.infoJson.unitProperties) {
                            that.enterpriseProperties = arr[index].text;
                            that.enterprisePropertiesId = arr[index].key;
                            arr[index].status = "selected";
                        }
                    });
                    //单位类别
                    that.unitType_arr.forEach(function(value, index, arr) {
                        if (arr[index].key == that.infoJson.unitCategory) {
                            that.enterpriseType = arr[index].text;
                            that.enterpriseTypeId = arr[index].key;
                            arr[index].status = "selected";
                        }
                    });
                    //所属行业
                    that.belongIndustry_arr.forEach(function(value, index, arr) {
                        if (arr[index].key == that.infoJson.unitIndustry) {
                            that.enterpriseIndustry = arr[index].text;
                            that.enterpriseIndustryId = arr[index].key;
                            arr[index].status = "selected";
                        }
                    });
                    //规模
                    that.enterpriseScale_arr.forEach(function(value, index, arr) {
                        if (arr[index].key == that.infoJson.unitSize) {
                            that.enterpriseScale = arr[index].text;
                            that.enterpriseScaleId = arr[index].key;
                            arr[index].status = "selected";
                        }
                    });
                    //法人
                    that.legalPerson_arr.forEach(function(value, index, arr) {
                        if (arr[index].key == that.infoJson.legalPerson) {
                            that.legalPerson = arr[index].text;
                            that.legalPersonId = arr[index].key;
                            arr[index].status = "selected";
                        }
                    });
                    //证件类型
                    that.certificateType_arr.forEach(function(value, index, arr) {
                        if (arr[index].key == that.infoJson.idType) {
                            that.certificateType = arr[index].text;
                            that.certificateTypeId = arr[index].key;
                            arr[index].status = "selected";
                        }
                    });
                    //文明单位
                    that.organizationUnit_arr.forEach(function(value, index, arr) {
                        if (arr[index].key == that.infoJson.civilizedUnit) {
                            that.advancedUnit = arr[index].text;
                            that.advancedUnitId = arr[index].key;
                            arr[index].status = "selected";
                        }
                    });

                    /** 加载建筑信息  **/
                    console.log(UICore.serviceUrl + 'mobile/mobileInterfaceForEnterprise.shtml?act=queryhouse&data={houseid:' + that.infoJson.houseId + '}');
                    api.ajax({
                        url: UICore.serviceUrl + 'mobile/mobileInterfaceForEnterprise.shtml?act=queryhouse&data={houseid:' + that.infoJson.houseId + '}',
                        method: 'get',
                    }, function(ret, err) {
                        if (ret) {
                            console.log("loadBuilding: " + JSON.stringify(ret));
                            if (ret.success) {
                                that.editBuildingData = ret.data;
                                that.mHouseID = ret.data.houseid;
                                that.mEntityID = ret.data.entityId;
                                that.mGridID = ret.data.gridId;
                                that.buildingName = that.editBuildingData.buiName;
                                that.buildingNumber = that.editBuildingData.buiCode;
                                that.belongFloorNum = that.editBuildingData.floorNum;
                                that.roomNumber = that.editBuildingData.roomNum;
                                that.houseArea = that.editBuildingData.area;

                                that.buildingUnit = ret.data.unitName;
                                that.buildingUnitId = ret.data.unitId;
                                //房屋用途
                                that.housingUse_arr.forEach(function(value, index, arr) {
                                    if (arr[index].key == that.editBuildingData.usertype) {
                                        that.housingUse = arr[index].text;
                                        that.housingUseId = arr[index].key;
                                        arr[index].status = "selected";
                                    }
                                });
                                //实际用途
                                that.actuallyUse_arr.forEach(function(value, index, arr) {
                                    if (arr[index].key == that.editBuildingData.actualusertype) {
                                        that.actuallyUse = arr[index].text;
                                        that.actuallyUseId = arr[index].key;
                                        arr[index].status = "selected";
                                    }
                                });
                                //单元、梯
                                // 这里初始化数据需要建筑id，而查询结果没有，除非编辑的时候重新选择建筑才能获取。这里取决于业务，暂时不初始化
                                //that.loadBuildUnitData(that.editBuildingData.id);
                            }
                        } else {
                            api.toast({
                                msg: '加载建筑信息失败',
                                duration: 2000,
                                location: 'bottom'
                            });
                        }
                    });

                }
            },
            ExpandTab: function() {
                var that = this;
                console.log(UICore.serviceUrl + 'mobile/mobileDataCollection.shtml?act=getDynaBaseTab&data={baseKey:DWXX}');
                api.ajax({
                    url: UICore.serviceUrl + 'mobile/mobileDataCollection.shtml?act=getDynaBaseTab&data={baseKey:DWXX}',
                    method: 'get',
                }, function(ret, err) {
                    api.hideProgress();
                    if (ret.success) {
                        ret.data.forEach(function(value) {
                            that.expandTab_arr.push({
                                name: value.name,
                                english_name: value.english_name
                            });
                        });
                    } else {
                        //alert(JSON.stringify(err));
                        api.toast({
                            msg: '加载拓展信息失败',
                            duration: 2000,
                            location: 'bottom'
                        });
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
                    that.buildingUnit_arr = [];
                    if (ret.success) {
                        //console.log("unitData： " + JSON.stringify( ret ));
                        ret.data.unitList.forEach(function(value) {
                            that.buildingUnit_arr.push({
                                text: value.unitName,
                                status: 'normal',
                                key: value.id,
                            });
                        });
                        if (that.mStatus == "isBrownse") {
                            that.buildingUnit_arr.forEach(function(value, index, arr) {
                                if (arr[index].key == that.editBuildingData.unitId) {
                                    that.buildingUnit = arr[index].text;
                                    that.buildingUnitId = arr[index].key;
                                    arr[index].status = "selected";
                                }
                            });
                        }
                    } else {
                        //alert( "加载建筑单元失败!" );
                        api.toast({
                            msg: '加载建筑单元失败!',
                            duration: 2000,
                            location: 'bottom'
                        });

                    }
                });

            },
            registerCapitalf: function() {
                var money = this.registerCapital;
                if (!(/^(([1-9][0-9])|(([0].\d{0,2}|[1-9][0-9].\d{0,2})))$/.test(money))) {
                    api.toast({
                        msg: '请输入并保留两位小数',
                        duration: 3000,
                        location: 'top'
                    });
                    return false;
                } else {
                    return true;
                }
            },
            closeWin: function() {
                this.imgarr.imgpaths = [];
                api.closeWin({
                    name: 'legalPerson'
                });
            },
            checkValue: function() {
                if(!this.enterpriseName){
                    alert("请输入单位名称");
                    return false;
                }
                if(!this.enterpriseProperties){
                    alert("请选择单位性质");
                    return false;
                }
                if (!this.enterpriseType){
                    alert("请选择单位类别");
                    return false;
                }
                if (!this.enterpriseIndustry){
                    alert("请选择所属行业");
                    return false;
                }
                if (!this.enterpriseScale){
                    alert("请选择规模");
                    return false;
                }
                return true;
            },
            uploadAttach:function(){
              if (this.mStatus == "isBrownse") {
                  $api.text($api.dom("#pkh_add_su"), '提交');
                  this.isClick = false;
                  this.mStatus = 'isEdit';
              }else{
                if (this.checkValue()) {
                  UICore.showLoading("上传附件中","请稍侯");
                  if(this.imgarr.imgpaths.length>0&&!(this.imgarr.imgpaths[0].indexOf("http")>-1)){
                    console.log(UICore.serviceUrl+'mobile/mobileWf.shtml?act=uploadAttachment&accountId=' + $api.getStorage('userinf').accountId);
                    console.log("imgPaht: " + JSON.stringify(this.imgarr.imgpaths));
                    var _self = this;
                    api.ajax({
                        url:UICore.serviceUrl + 'mobile/mobileWf.shtml?act=uploadAttachment&accountId=' + $api.getStorage('userinf').accountId ,
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
                              _self.imgarr.attachmentId = ret.data;
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
            submit: function() {
              var buildingJson = {}; //建筑信息
              var enterpriseJson = {}; //企业信息
              var expandjson = {}; //扩展信息json
              var commonjson = {}; //其他信息
              var resultJson = {}; //最终提交的json
              /** 企业基本信息 **/
              enterpriseJson.id = this.id;
              enterpriseJson.unitName = this.enterpriseName;
              if(this.imgarr.attachmentId){
                enterpriseJson.attachmentId = this.imgarr.attachmentId;
                enterpriseJson.attachPath = this.imgarr.imgpaths[0];
              }


              enterpriseJson.organizationCode = this.organizationCode;

              enterpriseJson.unitProperties = this.enterprisePropertiesId;
              enterpriseJson.unitCategory = this.enterpriseTypeId;
              enterpriseJson.unitIndustry = this.enterpriseIndustryId;
              enterpriseJson.unitSize = this.enterpriseScaleId;
              enterpriseJson.registerMoney = this.registerCapital;
              enterpriseJson.registerDate = this.enterpriseCreateTime;
              enterpriseJson.legalPerson = this.legalPersonId;
              enterpriseJson.legalRepresent = this.enterpriseCorporate;
              enterpriseJson.idType = this.certificateTypeId;
              enterpriseJson.idNumber = this.certificateNumber;
              enterpriseJson.civilizedUnit = this.advancedUnitId;
              enterpriseJson.unitLeader = this.unitLeader;
              enterpriseJson.telephone = this.unitLeaderPhone;
              enterpriseJson.dataSource = 2;
              enterpriseJson.data_area_code = $api.getStorage('userinf').gridCode;
              if (this.mStatus == "isEdit") {
                  enterpriseJson.id = this.mEnterpriseID;
              }
              enterpriseJson.houseid = this.mHouseID;
              /** 建筑信息 **/
              // if (this.buildingUnit) {
              //     buildingJson.unitId = this.buildingUnitId;
              //     buildingJson.unitNum = this.buildingUnit;
              // }
              // buildingJson.floorNum = this.belongFloorNum;
              // buildingJson.roomNum = this.roomNumber
              // if (this.housingUse) {
              //     buildingJson.useType = this.housingUseId;
              // }
              // if (this.actuallyUse) {
              //     buildingJson.actualUseType = this.actuallyUseId;
              // }
              // buildingJson.area = this.houseArea;
              // buildingJson.dataSource = "2";
              // buildingJson.gridCode = $api.getStorage('userinf').gridCode;
              // buildingJson.data_area_code = $api.getStorage('userinf').gridCode;
              // if (this.mStatus == "isEdit") {
              //     buildingJson.ENTITYID = this.mEntityID;
              //     buildingJson.GRIDID = this.mGridID;
              //     buildingJson.houseid = this.mHouseID;
              // }

              //resultJson.house = buildingJson;
              resultJson.enterprise = enterpriseJson;
              resultJson.expand = this.expandjson;
              commonjson.createUserId = $api.getStorage('userinf').accountId;
              resultJson.common = commonjson;
              console.log("提交信息： " + JSON.stringify(resultJson));

              var jsonString = JSON.stringify(resultJson);
              var that = this;
              console.log(UICore.serviceUrl + 'mobile/mobileInterfaceForEnterprise.shtml?act=editHtml&data=' + jsonString);
              //return;
              api.ajax({
                  url: UICore.serviceUrl + 'mobile/mobileInterfaceForEnterprise.shtml?act=editHtml&data=' + jsonString,
                  method: 'get',
              }, function(ret, err) {
                  if (ret) {
                      console.log(JSON.stringify(ret));
                      if (ret.success) {
                          api.toast({
                              msg: '保存成功',
                              duration: 2000,
                              global: 'true',
                              location: 'bottom'
                          });
                          if (that.mStatus == "isEdit") {
                              //编辑提交，关闭当前页面，回到列表页面，刷新列表需要查询参数
                              api.sendEvent({
                                  name: 'refreshResultList',
                                  extra: {
                                      myJson: resultJson
                                  }
                              });
                          }
                          api.closeWin();

                      } else {
                          alert(ret.errorinfo);
                      }
                  } else {
                      alert(JSON.stringify(err));
                  }
              });
            },
            enterprisePropertiesf: function() {
                console.log("单位性质");
                var that = this;
                if (!that.isClick) {
                    var defaultVal = that.enterpriseProperties; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        that.unitProperties_arr.forEach(function(value, index, arr) {
                            if (value.text == that.enterpriseProperties) {
                                arr[index].status = "selected";
                            }
                        });
                    }

                    UICore.openSelect3(that.unitProperties_arr, that.enterpriseProperties, "enterpriseProperties");
                    api.addEventListener({
                        name: 'enterpriseProperties'
                    }, function(ret, err) {
                        if (ret) {
                            console.log(JSON.stringify(ret.value.key1));
                            that.enterpriseProperties = ret.value.key1;
                            that.enterprisePropertiesId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }

            },
            enterpriseTypef: function() {
                console.log("单位类别");
                var that = this;
                if (!that.isClick) {
                    var defaultVal = that.enterpriseType; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        that.unitType_arr.forEach(function(value, index, arr) {
                            if (value.text == that.enterpriseType) {
                                arr[index].status = "selected";
                            }
                        });
                    }

                    UICore.openSelect3(that.unitType_arr, that.enterpriseType, "enterpriseType");
                    api.addEventListener({
                        name: 'enterpriseType'
                    }, function(ret, err) {
                        if (ret) {
                            console.log(JSON.stringify(ret.value.key1));
                            that.enterpriseType = ret.value.key1;
                            that.enterpriseTypeId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }

            },
            enterpriseIndustryf: function() {
                console.log("所属行业");
                var that = this;
                if (!that.isClick) {
                    var defaultVal = that.enterpriseIndustry; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        that.belongIndustry_arr.forEach(function(value, index, arr) {
                            if (value.text == that.enterpriseIndustry) {
                                arr[index].status = "selected";
                            }
                        });
                    }

                    UICore.openSelect3(that.belongIndustry_arr, that.enterpriseIndustry, "enterpriseIndustry");
                    api.addEventListener({
                        name: 'enterpriseIndustry'
                    }, function(ret, err) {
                        if (ret) {
                            console.log(JSON.stringify(ret.value.key1));
                            that.enterpriseIndustry = ret.value.key1;
                            that.enterpriseIndustryId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });

                }
            },
            enterpriseScalef: function() {
                console.log("规模");
                var that = this;
                if (!that.isClick) {
                    var defaultVal = that.enterpriseScale //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        that.enterpriseScale_arr.forEach(function(value, index, arr) {
                            if (value.text == that.enterpriseScale) {
                                arr[index].status = "selected";
                            }
                        });
                    }

                    UICore.openSelect3(that.enterpriseScale_arr, that.enterpriseScale, "enterpriseScale");
                    api.addEventListener({
                        name: 'enterpriseScale'
                    }, function(ret, err) {
                        if (ret) {
                            console.log(JSON.stringify(ret.value.key1));
                            that.enterpriseScale = ret.value.key1;
                            that.enterpriseScaleId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });

                }
            },
            enterpriseCreateTimef: function() {
                console.log("成立日期");
                var that = this;
                if (!that.isClick) {
                    UICore.openTimeComponent2(that.enterpriseCreateTime);
                    api.addEventListener({
                        name: 'buildingTime' //广播接收key，已写死。
                    }, function(ret, err) {
                        if (ret) {
                            that.enterpriseCreateTime = ret.value.key1;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            legalPersonf: function() {
                console.log("法人");
                var that = this;
                if (!that.isClick) {
                    var defaultVal = that.legalPerson //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        that.legalPerson_arr.forEach(function(value, index, arr) {
                            if (value.text == that.legalPerson) {
                                arr[index].status = "selected";
                            }
                        });
                    }

                    UICore.openSelect3(that.legalPerson_arr, that.legalPerson, "legalPerson");
                    api.addEventListener({
                        name: 'legalPerson'
                    }, function(ret, err) {
                        if (ret) {
                            console.log(JSON.stringify(ret.value.key1));
                            that.legalPerson = ret.value.key1;
                            that.legalPersonId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });

                }
            },
            certificateTypef: function() {
                console.log("证件类型");
                var that = this;
                if (!that.isClick) {
                    var defaultVal = that.certificateType //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        that.certificateType_arr.forEach(function(value, index, arr) {
                            if (value.text == that.certificateType) {
                                arr[index].status = "selected";

                            }
                        });
                    }

                    UICore.openSelect3(that.certificateType_arr, that.certificateType, "certificateType");
                    api.addEventListener({
                        name: 'certificateType'
                    }, function(ret, err) {
                        if (ret) {
                            console.log(JSON.stringify(ret.value.key1));
                            that.certificateType = ret.value.key1;
                            that.certificateTypeId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });

                }
            },
            advancedUnitf: function() {
                console.log("文明单位");
                var that = this;
                if (!that.isClick) {
                    var defaultVal = that.advancedUnit //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        that.organizationUnit_arr.forEach(function(value, index, arr) {
                            if (value.text == that.advancedUnit) {
                                arr[index].status = "selected";
                            }
                        });
                    }

                    UICore.openSelect3(that.organizationUnit_arr, that.advancedUnit, "advancedUnit");
                    api.addEventListener({
                        name: 'advancedUnit'
                    }, function(ret, err) {
                        if (ret) {
                            console.log(JSON.stringify(ret.value.key1));
                            that.advancedUnit = ret.value.key1;
                            that.advancedUnitId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });

                }
            },
            selectHouse: function() {
                var _self = this;
                if (!_self.isClick) {
                    api.openWin({
                        name: 'houseResult',
                        url: '../house/queryhouse.html',
                        pageParam: {
                            from: "legalPerson", // 标记从哪个页面跳转到建筑查询
                        }
                    });
                    api.addEventListener({
                        name: 'selectedHouse'
                    }, function(ret, err) {
                        if (ret) {
                            var obj = ret.value.key1;
                            console.log(JSON.stringify(obj));
                            _self.buildingName = obj.buiName;
                            _self.buildingNumber = obj.buiCode
                            _self.buildingUnit = obj.unitName;
                            _self.belongFloorNum = obj.floorNum;
                            _self.roomNumber = obj.roomNum;
                            _self.housingUse = obj.useType;
                            _self.actuallyUse = obj.actualUseType;
                            _self.houseArea = obj.area;

                            _self.mHouseID = obj.houseid;
                            //房屋用途
                            _self.housingUse_arr.forEach(function(value, index, arr) {
                                if (arr[index].key == _self.housingUse) {
                                    _self.housingUse = arr[index].text;
                                    arr[index].status = "selected";
                                }
                            });
                            //实际用途
                            _self.actuallyUse_arr.forEach(function(value, index, arr) {
                                if (arr[index].key == _self.actuallyUse) {
                                    _self.actuallyUse = arr[index].text;
                                    arr[index].status = "selected";
                                }
                            });
                        } else {
                            console.log(JSON.stringify(err));
                        }
                    });
                }

            },
            selectBuildingf: function(flag) {
                console.log("建筑名称");
                var that = this;
                if (!that.isClick) {
                    api.openWin({
                        name: 'buildingQuery',
                        url: '../building/buildingQuery.html',
                        pageParam: {
                            from: flag, // 标记从哪个页面跳转到建筑查询
                        }
                    });
                    api.addEventListener({
                        name: 'selectedBuildData'
                    }, function(ret, err) {
                        if (ret) {
                            var obj = ret.value.key1;
                            that.buildingName = obj.buiName;
                            that.buildingNumber = obj.buiCode
                            that.buildingUnit = "";
                            that.buildingUnitId = "";
                            that.loadBuildUnitData(obj.id);
                        } else {
                            console.log(JSON.stringify(err));
                        }
                    });
                }
            },
            buildingUnitf: function() {
                console.log("单元、梯");
                var that = this;
                if (!that.isClick) {
                    var defaultVal = that.buildingUnit; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        that.buildingUnit_arr.forEach(function(value, index, arr) {
                            if (value.text == that.buildingUnit) {
                                arr[index].status = "selected";
                            }
                        });
                    }

                    UICore.openSelect3(that.buildingUnit_arr, that.buildingUnit, "buildingUnit");
                    api.addEventListener({
                        name: 'buildingUnit'
                    }, function(ret, err) {
                        if (ret) {
                            console.log(JSON.stringify(ret.value.key1));
                            that.buildingUnit = ret.value.key1;
                            that.buildingUnitId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });

                }
            },
            housingUsef: function() {
                console.log("房屋用途");
                var that = this;
                if (!that.isClick) {
                    var defaultVal = that.housingUse; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        that.housingUse_arr.forEach(function(value, index, arr) {
                            if (value.text == that.housingUse) {
                                arr[index].status = "selected";
                            }
                        });
                    }

                    UICore.openSelect3(that.housingUse_arr, that.housingUse, "housingUse");
                    api.addEventListener({
                        name: 'housingUse'
                    }, function(ret, err) {
                        if (ret) {
                            console.log(JSON.stringify(ret.value.key1));
                            that.housingUse = ret.value.key1;
                            that.housingUseId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });

                }
            },
            actuallyUsef: function() {
                console.log("实际用途");
                var that = this;
                if (!that.isClick) {
                    var defaultVal = that.actuallyUse; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        that.actuallyUse_arr.forEach(function(value, index, arr) {
                            if (value.text == that.actuallyUse) {
                                arr[index].status = "selected";
                            }
                        });
                    }

                    UICore.openSelect3(that.actuallyUse_arr, that.actuallyUse, "actuallyUse");
                    api.addEventListener({
                        name: 'actuallyUse'
                    }, function(ret, err) {
                        if (ret) {
                            console.log(JSON.stringify(ret.value.key1));
                            that.actuallyUse = ret.value.key1;
                            that.actuallyUseId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });

                }
            },
            expandselect: function(index, english_name, title) {
                var expandParams = this.infoJson.extendAtt;
                var that = this;
                if (this.expandstr != "" && this.isNew) {
                    api.openWin({
                        name: 'dynamic',
                        url: '../dynamic.html',
                        vScrollBarEnabled: false,
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
                        vScrollBarEnabled: false,
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
                        vScrollBarEnabled: false,
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
                }, function(ret, err) {
                    if (!that.isNew) {
                        console.log(JSON.stringify(ret));
                        that.expandjson = ret.value.key;
                        that.edited = ret.value.key2
                    } else {
                        that.doExpand(ret.value.key, index)
                    }
                });



                // if (!this.isClick) {
                //     var expend = {};
                //     console.log(english_name);
                //     api.openWin({
                //         name: 'dynamic',
                //         url: '../dynamic.html',
                //         pageParam: {
                //             title: title,
                //             name: english_name,
                //         }
                //     });
                //     api.addEventListener({
                //         name: 'population_json'
                //     }, function(ret, err) {
                //         expendjson = ret.value.key;
                //         console.log("拓展信息保存:  " + JSON.stringify(expendjson));
                //     });
                //
                // }
            }, //动态表单选择结束
            doExpand: function(value, index) {
                var s = JSON.stringify(value);
                var json = eval('(' + s + ')');
                for (var key in json) { //上个页面的json
                    var t = JSON.stringify(json[key])
                    this.expandstr += t.substring(1, t.length - 1) + ",";
                }
                this.expandjson = eval('(' + "{" + this.expandstr.substring(0, this.expandstr.length - 1) + "}" + ')');
                console.log(JSON.stringify(this.expandjson))
            },

        }, // methods end.
        computed: {
            enterpriseCreateTime_computed: function() {
                return this.enterpriseCreateTime ? this.enterpriseCreateTime.substring(0, 10) : "";
            }

        },
        components: {
            "input-item": {
                template: "#item-input", //模版内容
                props: ["titlename", "myclass"],
                methods: {},
            },
            //附件上传组件
            'attach-comp': {
                template: "#attach-template",
                props: ['myshow', 'imgarray'], //一个指向父组件中的show，一个指向父组件中的imgarr,必须指向含有子属性的值，VUE2.0子组件只能修改父组件属性中的子属性值
                data: function() {
                    return {
                        imgtemps: [] //图片地址临时存放，为了选择多个图片时候一起显示出来，因为要递归压缩图片，如果不存，会一张一张的显示图片
                    }
                },
                methods: {
                    //显示附件选择DIV
                    showItem: function(type) {
                        if (type == 'video') {
                            this.myshow.videoshow = true;
                            this.myshow.bgshow = true;
                        } else if (type == 'photo') {
                            this.myshow.camerashow = true;
                            this.myshow.bgshow = true;
                        }
                    },
                    //关闭附件选择DIV
                    closeItem: function() {
                        this.myshow.videoshow = false;
                        this.myshow.camerashow = false;
                        this.myshow.bgshow = false;
                    },
                    //拍照
                    camera_img: function() {
                        this.closeItem();
                        var mycomponent = this;
                        var imageFilter = api.require('imageFilter');
                        api.getPicture({
                            sourceType: 'camera',
                            encodingType: 'jpg',
                            mediaValue: 'pic',
                            destinationType: 'url',
                            allowEdit: true,
                            quality: 50,
                            saveToPhotoAlbum: false
                        }, function(ret, err) {
                            if (ret) {
                                var imgpath = ret.data;
                                if (imgpath != "") {
                                    imageFilter.getAttr({
                                        path: imgpath
                                    }, function(ret, err) {
                                        if (ret.status) {
                                            var tempwidth = ret.width;
                                            var tempheight = ret.height;
                                            var bili = tempwidth / tempheight;
                                            var height = 1200;
                                            var width = height * bili;
                                            var fileName = UICore.getTimeStamp();
                                            //图片压缩
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
                                                    mycomponent.imgarray.imgpaths.splice(0,mycomponent.imgarray.imgpaths.length)
                                                    mycomponent.imgarray.imgpaths.push(pathtemp);
                                                    mycomponent.imgarray.imgnum++;
                                                } else {
                                                    alert(JSON.stringify(err));
                                                }
                                            });
                                        } else {
                                            alert(JSON.stringify(err));
                                        }
                                    });
                                }

                            } else {
                                alert(JSON.stringify(err));
                            }
                        });
                    },
                    //选择相册中的图片
                    getImg: function() {
                        this.closeItem();
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
                                    loadImg(ret.list, mycomponent.imgarray.imgnum, tempimgp);
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
                                                mycomponent.imgtemps.push(pathtemp)
                                                    //mycomponent.imgarray.imgpaths.push(pathtemp);
                                                mycomponent.imgarray.imgnum++;
                                                list.splice(0, 1)
                                                loadImg(list, mycomponent.imgarray.imgnum, tempimgp);
                                            } else {
                                                alert(JSON.stringify(err));
                                            }
                                        });
                                    } else {
                                        alert(JSON.stringify(err));
                                    }
                                });
                            } else {
                                mycomponent.imgarray.imgpaths.splice(0,mycomponent.imgarray.imgpaths.length);
                                mycomponent.imgarray.imgpaths = mycomponent.imgarray.imgpaths.concat(mycomponent.imgtemps);
                                //$("#imgAdd").append(tempimgp);
                            }
                        }
                    },
                    //预览图片
                    openImg: function(pathtemp) {
                        var imgindex = this.findIndex(this.imgarray.imgpaths, pathtemp);
                        var imageBrowser = api.require('imageBrowser');
                        console.log(JSON.stringify(this.imgarray.imgpaths));
                        console.log(JSON.stringify(imgindex));
                        imageBrowser.openImages({
                            imageUrls: this.imgarray.imgpaths,
                            showList: false,
                            activeIndex: imgindex,
                            tapClose: true
                        });
                    },
                    //获取图片索引，正确找到图片组中的对应的图片
                    findIndex: function(arr, val) {
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] == val) {
                                return i;
                                break;
                            }
                        }
                    },
                    //删除图片
                    deleteImg: function(pathtemp, index) {
                        var mycomponent = this;
                        api.confirm({
                            title: '提示',
                            msg: '确定要删除图片吗？',
                            buttons: ['确定', '取消']
                        }, function(ret, err) {
                            var buttonIndex = ret.buttonIndex;
                            if (buttonIndex == 1) {
                                mycomponent.removeByValue(mycomponent.imgarray.imgpaths, pathtemp);
                            }
                        });
                    },
                    //从图片数组中删除
                    removeByValue: function(arr, val) {
                        this.imgarray.attachmentId = "";
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] == val) {
                                arr.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            },
        },

    });
}
