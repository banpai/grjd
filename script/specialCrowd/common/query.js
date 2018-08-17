/**
 * Created by kevin on 2017/7/18.
 */
apiready = function () {
  new Vue({
    el: "#list",
    data: {
      isshow: false,
      isSlideInDown: false,
      title: api.pageParam.item.name,
      params: api.pageParam
    },
    created: function () {
      this.openFrame();
      var container = $api.dom(".wrapper");
      $api.css(container, 'display:block');
    },
    methods: {
      // 打开列表
      openFrame: function () {
        api.openFrame({
          name: 'list',
          url: './list.html',
          vScrollBarEnabled: false,
          rect: {
            x: 0,
            y: $api.dom('.header').offsetHeight,
            w: api.winWidth,
            h: api.winHeight - $api.dom('.header').offsetHeight
          },
          pageParam: {
            item: api.pageParam.item
          },
          bounces: true,
          reload: true,
        });
      },
      search: function () {
        this.isshow = true;
        UICore.sendEvent("searchHouse", true);
      },
      closeWin: function () {
        if (this.isshow == true) {
          this.isshow = false;
          UICore.sendEvent("searchHouse", false)
        } else {
          api.closeWin();
        }
      }
    }
  });
}
