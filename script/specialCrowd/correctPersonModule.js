/**
 *   Created by hzh on 2017/7/10
 */
apiready = function() {
    new Vue({
        el: "#list",
        data: {
            title: api.pageParam.title,
            infos: api.pageParam.infos,
            item: api.pageParam.item
        },
        methods: {
            skip: function(title, flag) {
                var engUrl = false;
                switch (title) {
                    case '社区矫正人员':
                        engUrl = flag ? 'correctPersonAdd' : 'correctPersonQuery'
                        break;
                    case '吸毒人员':
                        engUrl = flag ? 'drug/newDrug' : 'drug/DrugQuery'
                        break;
                    case '安置帮教人员':
                        engUrl = flag ? 'arrangePersonAdd' : 'arrangePersonQuery'
                        break;
                    case '法轮功人员':
                        engUrl = flag ? 'common/addEdit' : 'common/query'
                        break;
                    case '邪教人员':
                        engUrl = flag ? 'common/addEdit' : 'common/query'
                        break;
                    case '精神障碍人员':
                        engUrl = flag ? 'common/addEdit' : 'common/query'
                        break;
                    case '重点信访人员':
                        engUrl = flag ? 'keyMonitor/NewKeyMonitor' : 'keyMonitor/KeyMonitorQuery'
                        break;
                    default:
                        break;
                }
                var _this = this;
                engUrl && api.openWin({
                    name: engUrl,
                    url: './' + engUrl + '.html',
                    vScrollBarEnabled: false,
                    pageParam: {
                        name: (flag ? "新增" : '查询') + title,
                        infos: _this.infos,
                        item: _this.item
                    }
                });
            },
            closeWin: function() {
                api.closeWin();
            }
        } // methods end.
    });
}
