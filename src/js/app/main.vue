<template>
  <body>
  <main-header></main-header>
  <main-footer @switchFrame="switchFrame"></main-footer>
  </body>
</template>
<script>
  let frames = ['activity', 'rank', 'footprint', 'me'];
  let headers = {
    activity: ['time', 'location', 'type', 'select'],
    rank: ['location', 'distance', 'level', 'select']
  };
  let hasOpenRank = false;
  export default {
    components: {
      "main-header": require("../../componets/frame/header.vue"),
      "main-footer": require("../../componets/frame/footer.vue")
    },
    data() {
      return {
        curIndex: 1,
        headerH: 0,
        footerH: 0,
        player: {}
      }
    },
    methods: {
      init() {
        this.headerH = $api.dom('header').offsetHeight;
        this.footerH = $api.dom('footer').offsetHeight;
        this.openFrame('activity-header');
      },
      openFrame(name) {
        api.openFrame({
          name: name,
          url: '../html/' + name + '.html',
          rect: {
            x: 0,
            y: this.headerH,
            w: 'auto',
            h: api.winHeight - this.headerH - this.footerH
          },
          scrollEnabled: false,
          pageParam: {
            headerH: this.headerH,
            footerH: this.footerH
          },
          bounces: false,
          vScrollBarEnabled: false
        });
      },
      switchFrame(name) {
        frames.forEach(function (val) {
          if(val == 'activity' || val == 'rank') {
            for(let i = 0; i < 4; i++)
              api.setFrameAttr({name: 'activity-header-' + headers[val][i], hidden: true});
            api.setFrameAttr({name: val + '-header', hidden: true});
            api.setFrameAttr({name: val + '-main', hidden: true});
          } else {
            api.setFrameAttr({
              name: val,
              hidden: true
            });
          }
        });
        // 首页或者排行榜,打开两个frame; 足迹或者我的,打开一个frame
        if(name == 'activity' || (hasOpenRank && name == 'rank')) {
          api.setFrameAttr({
            name: name + '-header',
            hidden: false
          });
          api.setFrameAttr({
            name: name + '-main',
            hidden: false
          });
        } else {
          // 第一次打开排行榜页面
          if(name == 'rank') {
            this.openFrame(name + '-header');
            hasOpenRank = true
          } else {
            this.openFrame(name);
          }
        }
      },
      getData() {
        let id = '3d37a9da-e001-4675-a0ab-2290f9e91cd3';
        _api.resolve('player', api, {id: id}).then((data) => {
          $api.setStorage('player', data);
        }).catch((err) => {
          alert(err);
        })
      }
    },
    beforeMount() {
      this.getData();
    },
    mounted() {
      this.init();
    }
  }
</script>