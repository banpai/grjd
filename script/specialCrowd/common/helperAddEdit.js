/**
 * Created by kevin on 2017/6/26.
 */
apiready = function () {
  var accountId = $api.getStorage('userinf').accountId;
  new Vue({
    el: "#list",
    mixins: [ocnFormMix, upload],
    data: {
      f: {},
      show: [],
      editFlag: true,
      isNew: true,
      // 配置ocn-form的表单
      set: {
        // 配置date日期只显示年月
        dateFlag: 'yearMouth'
      },
      icon: {
        icon_del: '../../../image/icon_del.png',
        video: '../../../image/video.jpg',
        file: '../../../image/file.png',
        record: '../../../image/record.png'
      },
      title: api.pageParam.item.name
    },
    created: function () {
      console.log(JSON.stringify(api.pageParam));
      this.isData();
    },
    methods: {
      // 判断类别
      isData: function () {
        var f = {};
        var show = [];
        var pinUrl = '';
        if (api.pageParam.item.name == '法轮功人员' || api.pageParam.item.name == '邪教人员') {
          f = cultHelper.f;
          show = cultHelper.show;
          pinUrl = UICore.serviceUrl + '/mobile/mobileHeresy.shtml?act=getDetailInfo&data=';
        } else if (api.pageParam.item.name == '精神障碍人员') {
          f = mentalDisorderHelper.f;
          show = mentalDisorderHelper.show;
          pinUrl = UICore.serviceUrl + '/mobile/mobilementalDisorders.shtml?act=getDetailInfo&data=';
        } else if (api.pageParam.item.name == '吸毒人员') {
          f = drugHelper.f;
          show = drugHelper.show;
          pinUrl = UICore.serviceUrl + '/mobile/MobileSpecialHelpRecord.shtml?act=addOrEditDrugHR&data=';
        } else if (api.pageParam.item.name == '重点信访人员') {
          f = keyMonitorHelper.f;
          show = keyMonitorHelper.show;
          pinUrl = UICore.serviceUrl + '/mobile/mobilementalDisorders.shtml?act=getDetailInfo&data=';
        }
        this.f = f;
        this.show = show;
        if (api.pageParam.obj) {
          this.f = api.pageParam.obj;
          this.editFlag = false;
          this.isNew = false; //不是新增
          // 处理附件编辑
          this.f.attachUrl && this.handleAttach(this.f.attachUrl, this.f.attachId);
        }
      },
      // 提交按钮
      uploadAttach: function () {
        this.$refs.ocnForm.validate();
      },
      // 提交数据
      submit: function (f) {
        var self_ = this;
        this.uploadAttachForHelpRecord(function (r) {
          f.attachId = r.data;
          console.log("this.isNew: " + self_.isNew);
          if (self_.isNew) { //判断是否新增
            f.helperId = accountId;
            f.spId = api.pageParam.id
            f.helper = $api.getStorage('userinf').userName
          }
          var pinUrl = '';
          if (api.pageParam.item.name == '法轮功人员' || api.pageParam.item.name == '邪教人员') {
            pinUrl = UICore.serviceUrl + '/mobile/MobileSpecialHelpRecord.shtml?act=addOrEditHeresyHR&data=' + JSON.stringify({
              helpRecordVo: f
            });
          } else if (api.pageParam.item.name == '精神障碍人员') {
            pinUrl = UICore.serviceUrl + 'mobile/MobileSpecialHelpRecord.shtml?act=addOrEditMentalDisHR&data=' + JSON.stringify({
              helpRecordVo: f
            });
          } else if (api.pageParam.item.name == '吸毒人员') {
            pinUrl = UICore.serviceUrl + 'mobile/MobileSpecialHelpRecord.shtml?act=addOrEditDrugHR&data=' + JSON.stringify({
              helpRecordVo: f
            });
          } else if (api.pageParam.item.name == '重点信访人员') {
            pinUrl = UICore.serviceUrl + 'mobile/MobileSpecialHelpRecord.shtml?act=addOrEditKeyPetitionHR&data=' + JSON.stringify({
              helpRecordVo: f
            });
          }
          console.log(pinUrl);
          pinUrl && api.ajax({
            url: pinUrl,
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
                  name: 'refreshResultList',
                  extra: {
                    myJson: r
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
        });

      }
    }
  });
}