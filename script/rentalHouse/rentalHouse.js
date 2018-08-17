/**
 * Created by kevin on 2017/7/13.
 */
apiready = function() {

    new Vue({
        el: "#list",
        data: {
            isNew: true, //是否是新增
            isBrowser: false, //是否是浏览模式
            isClick: false,
            params: {}, //传参
            accountId:"",

            id:"",//出租屋ID
            buildingName: "", //建筑名称
            unit: "", //单元(梯/区)
            unitId: "",
            layer: "", //所属楼层
            houseId:"",
            houseNumber:"",
            houseNum: "", //房号
            houseUse: "", //房屋用途
            houseUseId: "",
            actualUse: "", //实际用途
            actualUseId: "",
            houseArea: "", //房屋面积
            expandTab_arr: [], //扩展信息
            certificateCode:"",//证件代码
            certificateNumber:"",//证件号码
            ownerName:"",//房主姓名
            ownerTell:"",//房主联系方式
            potentialType:"",//隐患类型
            potentialTypeKey:"",//隐患类型
            rentalUse:"",//出租用途
            rentalUseKey:"",//出租用途
            populationIds:"",//租户ID集合以逗号隔开
            populationIdsArr:[],//租户ID集合暂存
            houseMembers:"",
            members: "", //传过来的户成员信息
            memberjson: [],
            memberinfo_arr: [], //户成员列表
            relation_arr: [], //列表中户成员关系


            buildingUnit_arr: [], //建筑中唯一需要填写单元/去 下拉框
            houseUse_arr: [], //房屋用途下拉框数据
            actualUse_arr: [], //实际用途下拉框数据
            potentialTypeArr:[],//隐患类型下拉框数据
            rentalUseArr:[],//出租用途下拉框数据
            expandjson: {},
            expandstr: "", //表单预览数据
            edited:false,
        },
        created: function() {
            var param = api.pageParam;
            var that = this; //保存指针供回调使用
            this.accountId = $api.getStorage('userinf').accountId;
            var jsonData = JSON.parse($api.getStorage('settingdata'));
            jsonData.data.forEach(function(value) {
              if (value.parentKey == "ResidentRelationship") { //户成员关系
                  that.relation_arr.push({
                      text: value.extendAttributeValue,
                      status: 'normal',
                      key: value.extendAttributeKey
                  });
              };
                if (value.parentKey == "ResidentHouseUse") { //房屋用途
                    that.houseUse_arr.push({
                        text: value.extendAttributeValue,
                        status: 'normal',
                        key: value.extendAttributeKey
                    });
                };
                if(value.parentKey == "YHLX"){//隐患类型
                  that.potentialTypeArr.push({
                      text: value.extendAttributeValue,
                      status: 'normal',
                      key: value.extendAttributeKey
                  });
                }
                if(value.parentKey == "CZYT"){//出租用途
                  that.rentalUseArr.push({
                      text: value.extendAttributeValue,
                      status: 'normal',
                      key: value.extendAttributeKey
                  });
                }
            }); //配置文件循环结束
            if (param && param.title && param.title == "rentalHouseResults") { //查询/编辑``
                this.isBrowser = true;
                this.isClick = this.isBrowser;
                this.isNew = false;
                this.id = param.id;
                $api.text($api.byId('pkh_add_su'), '编辑');
                $api.text($api.byId('legalTitle'), '查看编辑出租屋');
                this.loadDetail();
            } //新增  新增时初始化建筑信息 且 建筑信息不可编辑 可编辑的都是部分房屋信息
            else{
              $api.text($api.byId('legalTitle'), '新增出租屋');
            }


            <!--获取扩展信息开始-->
            // api.ajax({
            //     url: UICore.serviceUrl + 'mobile/mobileDataCollection.shtml?act=getDynaBaseTab&data={baseKey:FWXX}',
            //     method: 'get',
            // }, function(ret, err) {
            //     if (ret.success) {
            //         ret.data.forEach(function(value) {
            //             that.expandTab_arr.push({
            //                 name: value.name,
            //                 english_name: value.english_name
            //             });
            //         });
            //     } else {
            //         alert(JSON.stringify(err));
            //
            //     }
            // });
            <!--获取扩展信息结束-->

        },
        methods: {
            loadDetail:function(){
              UICore.showLoading("信息加载中...", "请稍候");
              var json = {accountId:this.accountId,rentalHousingId:this.id};
              var _self = this;
              console.log(UICore.serviceUrl + 'mobile/mobileInterfaceForRentalHousing.shtml?act=getRentalHousingInfo&data=' + JSON.stringify(json));
              api.ajax({
                  url: UICore.serviceUrl + 'mobile/mobileInterfaceForRentalHousing.shtml?act=getRentalHousingInfo&data=' + JSON.stringify(json),
                  method: 'get',
              }, function(ret, err) {
                  api.hideProgress();
                  if (ret) {
                      console.log(JSON.stringify(ret));
                      if (ret.success) {
                        _self.houseNum = ret.data.houseVo.roomNum;
                        _self.houseId = ret.data.houseId;
                        _self.houseNumber = ret.data.houseNumber;
                        _self.certificateCode = ret.data.certificateCode;
                        _self.certificateNumber = ret.data.certificateNumber;
                        _self.ownerName = ret.data.ownerName;
                        _self.ownerTell = ret.data.ownerTell;
                        _self.potentialTypeKey = ret.data.potentialType;
                        _self.rentalUseKey = ret.data.rentalUse;

                        for(var num in _self.houseUse_arr){
                          if(_self.houseUse_arr[num].key==ret.data.houseVo.useType){
                            _self.houseUse = _self.houseUse_arr[num].text;
                          }
                        }
                        for(var num in _self.potentialTypeArr){
                          if(_self.potentialTypeArr[num].key==_self.potentialTypeKey){
                            _self.potentialType = _self.potentialTypeArr[num].text;
                            _self.potentialTypeArr[num].status = "selected";
                          }
                        }
                        for(var num in _self.rentalUseArr){
                          if(_self.rentalUseArr[num].key==_self.rentalUseKey){
                            _self.rentalUse = _self.rentalUseArr[num].text;
                            _self.rentalUseArr[num].status = "selected";
                          }
                        }
                        for(var num in ret.data.populationList){
                          var tempjson = {};
                          tempjson.name = ret.data.populationList[num].name;
                          tempjson.idCard = ret.data.populationList[num].idNumber;
                          _self.memberinfo_arr.push(tempjson);
                          var populationjson = {population: ret.data.populationList[num]}
                          _self.memberjson.push(populationjson);
                          _self.populationIdsArr.push(ret.data.populationList[num].id);

                        }

                      } else {
                          alert(ret.errorinfo);
                      }
                  } else {
                      alert(JSON.stringify(err));
                  }
              });
            },
            houseUsef: function() {
                console.log("房屋用途");
                if (!this.isBrowser) {
                    console.log(JSON.stringify(this.houseUse_arr));
                    var that = this;
                    var defaultVal = this.houseUse; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.houseUse_arr.forEach(function(value, index, arr) {
                            if (value.text == that.houseUse) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.houseUse_arr, this.houseUse, "houseUsed");
                    api.addEventListener({
                        name: 'houseUsed'
                    }, function(ret, err) {
                        if (ret) {
                            that.houseUse = ret.value.key1;
                            that.houseUseId = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            rentalUseSelect: function() {
                console.log("出租用途");
                if (!this.isBrowser) {
                    console.log(JSON.stringify(this.rentalUseArr));
                    var that = this;
                    var defaultVal = this.rentalUse; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.rentalUseArr.forEach(function(value, index, arr) {
                            if (value.text == that.rentalUse) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.rentalUseArr, this.rentalUse, "rentalUse");
                    api.addEventListener({
                        name: 'rentalUse'
                    }, function(ret, err) {
                        if (ret) {
                            that.rentalUse = ret.value.key1;
                            that.rentalUseKey = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            potentialTypeSelect: function() {
                console.log("隐患类型");
                if (!this.isBrowser) {
                    console.log(JSON.stringify(this.potentialTypeArr));
                    var that = this;
                    var defaultVal = this.potentialType; //获取默认值
                    if (defaultVal != null && defaultVal != "") {
                        this.potentialTypeArr.forEach(function(value, index, arr) {
                            if (value.text == that.potentialType) {
                                arr[index].status = "selected";
                            }
                        })
                    }
                    UICore.openSelect3(this.potentialTypeArr, this.potentialType, "potentialType");
                    api.addEventListener({
                        name: 'potentialType'
                    }, function(ret, err) {
                        if (ret) {
                            that.potentialType = ret.value.key1;
                            that.potentialTypeKey = ret.value.key2;
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            submit: function() {
                if (this.isBrowser) {
                    $api.text($api.byId('pkh_add_su'), '提交');
                    this.isBrowser = false;
                    this.isClick = this.isBrowser;
                } else {
                    var postjson = {}; //提交postjson
                    var reslutjson = {}; //最终整合真正提交的json


                    /* 基本房屋信息 */
                    if (!this.isNew) {
                        postjson.id = this.id;
                        postjson.data_area_code = $api.getStorage('userinf').dataAreaCode
                    } else {
                        postjson.data_area_code =$api.getStorage('userinf').dataAreaCode;
                    }
                    postjson.houseId = this.houseId;
                    postjson.houseNumber = this.houseNumber;
                    postjson.certificateCode = this.certificateCode;
                    postjson.certificateNumber = this.certificateNumber;
                    postjson.ownerName = this.ownerName;
                    postjson.ownerTell = this.ownerTell;
                    postjson.potentialType = this.potentialTypeKey;
                    postjson.rentalUse = this.rentalUseKey;
                    for(var num in this.populationIdsArr){
                      if(this.populationIds==""){
                        this.populationIds+=this.populationIdsArr[num];
                      }else{
                        this.populationIds+=","+this.populationIdsArr[num];
                      }

                    }
                    postjson.populationIds = this.populationIds;


                    reslutjson.rentalHousingVo = postjson;

                    /* 扩展信息 */
                    // if (this.expandjson)
                    //     reslutjson.expand = this.expandjson;
                    /* 其它信息 */
                    var otherjson = {};
                    // otherjson.createUserId = $api.getStorage('userinf').accountId;
                    // reslutjson.common = otherjson;

                    var json = JSON.stringify(reslutjson)

                    console.log(UICore.serviceUrl + 'mobile/mobileInterfaceForRentalHousing.shtml?act=edit&data=' + json);
                    var _self = this;
                    api.ajax({
                        url: UICore.serviceUrl + 'mobile/mobileInterfaceForRentalHousing.shtml?act=edit&data=' + json,
                        method: 'get',
                    }, function(ret, err) {
                        if (ret) {
                            console.log(JSON.stringify(ret));
                            if (ret.success) {
                                api.toast({
                                    msg: '保存成功',
                                    duration: 3000,
                                    global: 'true',
                                    location: 'bottom'
                                });
                                if(_self.isNew == false){
                                    api.sendEvent({
                                        name: 'refreshList'
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
                }
            },
            closeWin: function() {
                api.closeWin();
            },
            selectHouse:function(){
              var _self = this;
              if (!_self.isClick) {
                api.openWin({
                    name: 'houseResult',
                    url: '../house/queryhouse.html',
                    pageParam: {
                        from: "rentalHouse", // 标记从哪个页面跳转到建筑查询
                    }
                });
                api.addEventListener({
                    name: 'selectedHouse'
                }, function(ret, err) {
                    if (ret) {
                        var obj = ret.value.key1;
                        console.log(JSON.stringify(obj));
                        _self.houseUseId = obj.useType;
                        _self.houseNum = obj.roomNum;
                        _self.houseId = obj.houseid;
                        //房屋用途
                        _self.houseUse_arr.forEach(function(value,index,arr){
                            if (arr[index].key == _self.houseUseId) {
                              _self.houseUse = arr[index].text;
                              arr[index].status = "selected";
                            }
                        });
                    } else {
                        console.log(JSON.stringify(err));
                    }
                });
              }

            },
            addMenber: function() {
                if (!this.isBrowser) { //在浏览状态下 显示数据
                    var that = this;
                    api.openWin({
                        name: 'addHouseMember',
                        url: '../houseowner/addHouseMember.html',
                        vScrollBarEnabled:false,
                        pageParam: {
                            name: '新增户成员',
                            edit:this.edit
                        }
                    });
                    api.addEventListener({
                        name: 'houseMenberResult'
                    }, function(ret, err) {
                        if (ret) {
                            console.log(JSON.stringify(ret.value.key1));
                            console.log(JSON.stringify(ret.value.key2));
                            var index= parseInt(ret.value.key2);
                            if (ret.value.key2 != undefined&& !isNaN(index)) {
                                this.members = ret.value.key1;
                                var memberinfo = ret.value.key1.population;
                                var relationkey = parseInt(memberinfo.relation);
                                var relationship = "";0000
                                if (relationkey > -1) {
                                    that.relation_arr.forEach(function(value, index, arr) {
                                        if (value.key == relationkey) {
                                            relationship = arr[index].text;
                                        }
                                    });
                                };
                                that.memberinfo_arr.splice(index,1,{
                                    name: memberinfo.name,
                                    idCard: memberinfo.idNumber,
                                    relation: relationship
                                });
                                 //that.memberjson.splice(0, that.memberjson.length)
                                that.memberjson.splice(index,1,ret.value.key1);
                                that.houseMembers = that.memberinfo_arr.length;
                                that.populationIdsArr.push(memberinfo.id);
                            } else {
                                if(ret.value.key1&&ret.value.key1.population.id){
                                    this.members = ret.value.key1;
                                    var memberinfo = ret.value.key1.population;
                                    for(var num in that.populationIdsArr){
                                        if(that.populationIdsArr[num]==memberinfo.id){
                                            return;
                                        }
                                    }
                                    var relationkey = parseInt(memberinfo.relation);
                                    var relationship = "";
                                    if (relationkey > -1) {
                                        that.relation_arr.forEach(function(value, index, arr) {
                                            if (value.key == relationkey) {
                                                relationship = arr[index].text;
                                            }
                                        });
                                    };
                                    that.memberinfo_arr.push({
                                        name: memberinfo.name,
                                        idCard: memberinfo.idNumber,
                                        relation: relationship
                                    });
                                     //that.memberjson.splice(0, that.memberjson.length)
                                    that.memberjson.push(ret.value.key1);
                                    that.houseMembers = that.memberinfo_arr.length;
                                    that.populationIdsArr.push(memberinfo.id);
                                }

                            }
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            },
            edits: function(item) {
                for (var i = 0; i < this.memberinfo_arr.length; i++) {
                    if (this.memberinfo_arr[i] == item) {
                      console.log(JSON.stringify(this.memberjson[i]));
                        api.openWin({
                            name: 'addHouseMember',
                            url: '../houseowner/addHouseMember.html',
                            vScrollBarEnabled:false,
                            pageParam: {
                                from: "addHouseMemberedit",
                                name: this.memberjson[i],
                                index: i
                            }
                        });
                    }
                }
            },
            del: function(item) {
                var that = this;
                api.confirm({
                        title: '提醒',
                        msg: '是否删除该条信息',
                        buttons: ['确定', '取消']
                    },
                    function(ret, err) {
                        var index = ret.buttonIndex;
                        if (index == 1) {
                            console.log(JSON.stringify(item));
                            for (var i = 0; i < that.memberinfo_arr.length; i++) {
                                if (that.memberinfo_arr[i] == item) {
                                  console.log(JSON.stringify(that.memberjson[i]));
                                    that.removeByValue(that.populationIdsArr,that.memberjson[i].population.id);
                                    //that.delResidentId_arr.push(that.memberjson[i].population.id)
                                    that.memberinfo_arr.splice(i, 1);
                                    that.memberjson.splice(i, 1);
                                    that.houseMembers = that.houseMembers - 1;
                                }
                            }
                        }
                    });
            },
            removeByValue:function(arr, val) {
              for(var i=0; i<arr.length; i++) {
                if(arr[i] == val) {
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
