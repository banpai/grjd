/**
 * Created by ymy on 2018/7/2.
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
        // 帮扶人员ID
        helperId: '',
        // 随行人员
        followers: '',
        // 帮扶人员姓名
        helper: '',
        //有无按时提交思想报告
        isSubmitReport: '',
        isSubmitReportId: '',
        isSubmitReport_arr: [],
        //有无接受教育辅导
        isReceiveGuidance: '',
        isReceiveGuidanceId: '',
        isReceiveGuidance_arr: [],
        //有无积极参加社区组织的康复活动
        isJoinActivity: '',
        isJoinActivityId: '',
        isJoinActivity_arr: [],
        //有无按时报到	
        isRegisterOnTime: '',
        isRegisterOnTimeId: '',
        isRegisterOnTime_arr: [],
        //有无受到奖赏	
        isGetSpurs: '',
        isGetSpursId: '',
        isGetSpurs_arr: [],
        //邻里评价	
        neighborEval: '',
        neighborEvalId: '',
        neighborEval_arr: [],
        //综合评价	
        overallEval: '',
        // 附件id
        attachId: ''
      },
      title: "",
      isNew: true, //是否是新增
      isBrowser: false, //是否是浏览模式
      edited: false,
      isClick: false, //是否可点击
      shouldhide: false,
      shouldshow: true,
      editFlag: true,
      icon: {
        icon_del: '../../image/icon_del.png',
        video: '../../image/video.jpg',
        file: '../../image/file.png',
        record: '../../image/record.png'
      },
    },
    created: function () {
      var param = api.pageParam.people;
      this.f.spId = param.id;
      this.f.helper = $api.getStorage('userinf').userName;
      this.initSelectData();
      if (api.pageParam.title == "editHelper") {
        var info = api.pageParam.item;
        this.isNew = false;
        this.getEditInfo(info);
        this.title = "编辑帮扶记录"
      } else {
        this.title = "新增帮扶记录"
      }

    },
    methods: {
      showMutiPicker: function () {
        var that = this;
        var currYear = new Date().getFullYear();
        var col1Data = [];
        var col2Data = [];
        for (var i = currYear; i >= 1970; i--) {
          col1Data.push({
            text: i,
            value: i
          });
        }
        for (var j = 1; j <= 12; j++) {
          if (j < 10) {
            col2Data.push({
              text: '0' + j,
              value: '0' + j
            });
          } else {
            col2Data.push({
              text: j,
              value: j
            });
          }
        }
        this.$createPicker({
          title: '选择年月',
          data: [col1Data, col2Data],
          onSelect: function (selectedVal, selectedIndex, selectedText) {

            var valArr = String(selectedVal).split(',');
            that.f.time = valArr[0] + '-' + valArr[1];

          },
          onCancel: function () {}
        }).show()
      },
      //初始化单选框或多选框
      initSelectData: function () {
        var that = this;
        var jsonData = JSON.parse($api.getStorage('settingdata'));
        jsonData.data.forEach(function (value) {
          if (value.parentKey == "yw") {
            that.f.isSubmitReport_arr.push({
              text: value.extendAttributeValue,
              status: 'normal',
              key: value.extendAttributeKey
            })
          }
          if (value.parentKey == "yw") {
            that.f.isReceiveGuidance_arr.push({
              text: value.extendAttributeValue,
              status: 'normal',
              key: value.extendAttributeKey
            })
          }
          if (value.parentKey == "yw") {
            that.f.isJoinActivity_arr.push({
              text: value.extendAttributeValue,
              status: 'normal',
              key: value.extendAttributeKey
            })
          }
          if (value.parentKey == "yw") {
            that.f.isRegisterOnTime_arr.push({
              text: value.extendAttributeValue,
              status: 'normal',
              key: value.extendAttributeKey
            })
          }
          if (value.parentKey == "yw") {
            that.f.isGetSpurs_arr.push({
              text: value.extendAttributeValue,
              status: 'normal',
              key: value.extendAttributeKey
            })
          }
          if (value.parentKey == "lypj") {
            that.f.neighborEval_arr.push({
              text: value.extendAttributeValue,
              status: 'normal',
              key: value.extendAttributeKey
            })
          }
        })
      },
      getEditInfo: function (info) {
        this.f.id = info.id;
        this.f.content = info.content; // 帮扶内容
        this.f.place = info.place; // 帮扶地点
        this.f.time = info.time; // 帮扶时间
        this.f.spId = info.spId; // 特殊人群id
        this.f.bsId = info.bsId; // 基础人口id
        this.f.teamId = info.teamId; // 帮扶对象ID
        this.f.teamName = info.teamName; // 服务团队名称
        this.f.helperId = info.helperId; // 帮扶人员ID
        this.f.followers = info.followers; // 随行人员
        this.f.type = info.type; // 特殊人群类型
        this.f.helper = info.helper; // 帮扶人员
        this.f.recordId = info.recordId; // 获取所有附件用ID
        this.f.attachUrl = info.attachUrl; // 附件路径
        this.f.attachId = info.attachId; //附件id
      },
      uploadAttach: function () {
        if (this.isBrowser) {
          $api.text($api.byId('pkh_add_su'), '提交');
          this.isBrowser = false;
          this.isClick = this.isBrowser;
          this.shouldhide = false;

        } else {
          if (this.checkVal()) {
            //UICore.showLoading("上传附件中", "请稍侯");
            this.save();
          }
        }

      },
      // 帮扶记录新增
      save: function () {
        var tempjson = {};
        tempjson.id = '';
        tempjson.spId = this.f.spId; //特殊人员主键
        tempjson.helperId = $api.getStorage('userinf').accountId; //帮扶人员主键（移动端即当前用户accountId）
        tempjson.place = this.f.place; //帮扶地点
        tempjson.time = this.f.time; //帮扶年月

        tempjson.content = this.f.content; //帮扶内容
        tempjson.followers = this.f.followers; //随行人员
        tempjson.helper = this.f.helper; //帮扶人员姓名
        tempjson.isSubmitReport = this.f.isSubmitReportId; //有无按时提交思想报告
        tempjson.isReceiveGuidance = this.f.isReceiveGuidanceId; //有无接受教育辅导
        tempjson.isJoinActivity = this.f.isJoinActivityId; //有无积极参加社区组织的康复活动
        tempjson.isRegisterOnTime = this.f.isRegisterOnTimeId; //有无按时报到
        tempjson.isGetSpurs = this.f.isGetSpursId; //有无受到奖赏
        tempjson.neighborEval = this.f.neighborEvalId; //邻里评价
        tempjson.overallEval = this.f.overallEval;


        var _this = this;
        this.uploadAttachForHelpRecord(function (r) {
          // _this.f.attachUrl = r.Object;
          // _this.f.attachId = r.data;
          tempjson.attachId = r.data; //附件Id
          var postjson = {};
          postjson.helpRecordVo = tempjson;
          var parameterToken = '?act=addOrEditCommunityCorrect&data=' + JSON.stringify(postjson);

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
              if (_this.isNew) {
                UICore.sendEvent("refreshrentalSpec")
              } else {
                //UICore.sendEvent("refreshrentalSpec")
              }
              api.closeWin();
            }
          });
        })


      },
      checkVal: function () {
        if (!this.f.place) {
          alert("请输入矫正走访地点");
          return false;
        }
        if (!this.f.time) {
          alert("请输入矫正走访月份");
          return false;
        }
        if (!this.f.helper) {
          alert("请输入网格员姓名");
          return false;
        }
        if (!this.f.isSubmitReport) {
          alert("请选择有无按时提交思想报告");
          return false;
        }
        if (!this.f.isReceiveGuidance) {
          alert("请选择有无接受教育辅导");
          return false;
        }
        if (!this.f.isJoinActivity) {
          alert("请选择有无参加社区公益活动");
          return false;
        }
        if (!this.f.isRegisterOnTime) {
          alert("请选择有无按时报到");
          return false;
        }
        if (!this.f.isGetSpurs) {
          alert("请选择有无受到奖赏");
          return false;
        }
        if (!this.f.neighborEval) {
          alert("请选择邻里评价");
          return false;
        }
        //   if (!this.f.overallEval) {
        //     alert("请选择综合评价");
        //     return false;
        //   }
        return true;
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
      timef: function () { //帮扶时间
        console.log("帮扶时间");
        var that = this;
        if (!this.isBrowser) {
          UICore.openTimeComponent3(this.time);
          api.addEventListener({
            name: 'buildingTime'
          }, function (ret, err) {
            if (ret) {
              that.f.time = ret.value.key1.substring(0, 7);
            } else {
              alert(JSON.stringify(err));
            }
          });
        }
      },
      isSubmitReportf: function () { //有无按时提交思想报告
        console.log("有无按时提交思想报告");
        var that = this;
        if (!this.isBrowser) {
          var defaultVal = this.f.isSubmitReport; //获取默认值
          if (defaultVal != null && defaultVal != "") {
            this.f.isSubmitReport_arr.forEach(function (value, index, arr) {
              if (value.text == that.f.isSubmitReport) {
                arr[index].status = "selected";
              }
            })
          }
          UICore.openSelect3(this.f.isSubmitReport_arr, this.f.isSubmitReport, "isSubmitReport");
          api.addEventListener({
            name: 'isSubmitReport'
          }, function (ret, err) {
            if (ret) {
              that.f.isSubmitReport = ret.value.key1;
              that.f.isSubmitReportId = ret.value.key2;
              that.f.overallEval = parseInt(2) + parseInt(that.f.isSubmitReportId == 1 ? 2 : 0) + parseInt(that.f.isReceiveGuidanceId == 1 ? 2 : 0) + parseInt(that.f.isJoinActivityId == 1 ? 2 : 0) + parseInt(that.f.isRegisterOnTimeId == 1 ? 2 : 0); //综合评价 1为是，2为否

            } else {
              alert(JSON.stringify(err));
            }
          });
        } //if语句结束
      },
      isReceiveGuidancef: function () { //有无接受教育辅导
        console.log("有无接受教育辅导");
        var that = this;
        if (!this.isBrowser) {
          var defaultVal = this.f.isReceiveGuidance; //获取默认值
          if (defaultVal != null && defaultVal != "") {
            this.f.isReceiveGuidance_arr.forEach(function (value, index, arr) {
              if (value.text == that.f.isReceiveGuidance) {
                arr[index].status = "selected";
              }
            })
          }
          UICore.openSelect3(this.f.isReceiveGuidance_arr, this.f.isReceiveGuidance, "isReceiveGuidance");
          api.addEventListener({
            name: 'isReceiveGuidance'
          }, function (ret, err) {
            if (ret) {
              that.f.isReceiveGuidance = ret.value.key1;
              that.f.isReceiveGuidanceId = ret.value.key2;
              that.f.overallEval = parseInt(2) + parseInt(that.f.isSubmitReportId == 1 ? 2 : 0) + parseInt(that.f.isReceiveGuidanceId == 1 ? 2 : 0) + parseInt(that.f.isJoinActivityId == 1 ? 2 : 0) + parseInt(that.f.isRegisterOnTimeId == 1 ? 2 : 0); //综合评价 1为是，2为否

            } else {
              alert(JSON.stringify(err));
            }
          });
        } //if语句结束
      },
      isJoinActivityf: function () { //有无积极参加社区组织的康复活动
        console.log("有无积极参加社区组织的康复活动");
        var that = this;
        if (!this.isBrowser) {
          var defaultVal = this.f.isJoinActivity; //获取默认值
          if (defaultVal != null && defaultVal != "") {
            this.f.isJoinActivity_arr.forEach(function (value, index, arr) {
              if (value.text == that.f.isJoinActivity) {
                arr[index].status = "selected";
              }
            })
          }
          UICore.openSelect3(this.f.isJoinActivity_arr, this.f.isJoinActivity, "isJoinActivity");
          api.addEventListener({
            name: 'isJoinActivity'
          }, function (ret, err) {
            if (ret) {
              that.f.isJoinActivity = ret.value.key1;
              that.f.isJoinActivityId = ret.value.key2;
              that.f.overallEval = parseInt(2) + parseInt(that.f.isSubmitReportId == 1 ? 2 : 0) + parseInt(that.f.isReceiveGuidanceId == 1 ? 2 : 0) + parseInt(that.f.isJoinActivityId == 1 ? 2 : 0) + parseInt(that.f.isRegisterOnTimeId == 1 ? 2 : 0); //综合评价 1为是，2为否

            } else {
              alert(JSON.stringify(err));
            }
          });
        } //if语句结束
      },
      isRegisterOnTimef: function () { //有无按时报到
        console.log("有无按时报到");
        var that = this;
        if (!this.isBrowser) {
          var defaultVal = this.f.isRegisterOnTime; //获取默认值
          if (defaultVal != null && defaultVal != "") {
            this.f.isRegisterOnTime_arr.forEach(function (value, index, arr) {
              if (value.text == that.f.isRegisterOnTime) {
                arr[index].status = "selected";
              }
            })
          }
          UICore.openSelect3(this.f.isRegisterOnTime_arr, this.f.isRegisterOnTime, "isRegisterOnTime");
          api.addEventListener({
            name: 'isRegisterOnTime'
          }, function (ret, err) {
            if (ret) {
              that.f.isRegisterOnTime = ret.value.key1;
              that.f.isRegisterOnTimeId = ret.value.key2;
              that.f.overallEval = parseInt(2) + parseInt(that.f.isSubmitReportId == 1 ? 2 : 0) + parseInt(that.f.isReceiveGuidanceId == 1 ? 2 : 0) + parseInt(that.f.isJoinActivityId == 1 ? 2 : 0) + parseInt(that.f.isRegisterOnTimeId == 1 ? 2 : 0); //综合评价 1为是，2为否

            } else {
              alert(JSON.stringify(err));
            }
          });
        } //if语句结束
      },
      isGetSpursf: function () { //有无受到奖赏
        console.log("有无受到奖赏");
        var that = this;
        if (!this.isBrowser) {
          var defaultVal = this.f.isGetSpurs; //获取默认值
          if (defaultVal != null && defaultVal != "") {
            this.f.isGetSpurs_arr.forEach(function (value, index, arr) {
              if (value.text == that.f.isGetSpurs) {
                arr[index].status = "selected";
              }
            })
          }
          UICore.openSelect3(this.f.isGetSpurs_arr, this.f.isGetSpurs, "isGetSpurs");
          api.addEventListener({
            name: 'isGetSpurs'
          }, function (ret, err) {
            if (ret) {
              that.f.isGetSpurs = ret.value.key1;
              that.f.isGetSpursId = ret.value.key2;
            } else {
              alert(JSON.stringify(err));
            }
          });
        } //if语句结束
      },
      neighborEvalf: function () { //邻里评价
        console.log("邻里评价");
        var that = this;
        if (!this.isBrowser) {
          var defaultVal = this.f.neighborEval; //获取默认值
          if (defaultVal != null && defaultVal != "") {
            this.f.neighborEval_arr.forEach(function (value, index, arr) {
              if (value.text == that.f.neighborEval) {
                arr[index].status = "selected";
              }
            })
          }
          UICore.openSelect3(this.f.neighborEval_arr, this.f.neighborEval, "neighborEval");
          api.addEventListener({
            name: 'neighborEval'
          }, function (ret, err) {
            if (ret) {
              that.f.neighborEval = ret.value.key1;
              that.f.neighborEvalId = ret.value.key2;
            } else {
              alert(JSON.stringify(err));
            }
          });
        } //if语句结束
      },
      overallEvalf: function () { //综合评价
        console.log("综合评价");
        var that = this;
        if (!this.isBrowser) {
          var defaultVal = this.f.overallEval; //获取默认值
          if (defaultVal != null && defaultVal != "") {
            this.f.overallEval_arr.forEach(function (value, index, arr) {
              if (value.text == that.f.overallEval) {
                arr[index].status = "selected";
              }
            })
          }
          UICore.openSelect3(this.f.overallEval_arr, this.f.overallEval, "overallEval");
          api.addEventListener({
            name: 'overallEval'
          }, function (ret, err) {
            if (ret) {
              that.f.overallEval = ret.value.key1;
              that.f.overallEvalId = ret.value.key2;
            } else {
              alert(JSON.stringify(err));
            }
          });
        } //if语句结束
      },

      closeWin: function () {
        api.closeWin();
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