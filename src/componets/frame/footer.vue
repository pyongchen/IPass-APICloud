<template>
  <div>
    <footer class="aui-bar aui-bar-tab" id="footer" >
      <div class="aui-bar-tab-item tab-item tab0" tapmode
          @click="changeFrame('activity', 0)" id="0">
        <svg class="icon footer-icon" aria-hidden="true" >
          <use xlink:href="#icon-yundonglanqiu"></use>
        </svg>
        <div class="aui-bar-tab-label text">动态</div>
      </div>
      <div class="aui-bar-tab-item tab1 tab-item" tapmode
           @click="changeFrame('rank', 1)" id="1">
        <svg class="icon footer-icon" aria-hidden="true">
          <use xlink:href="#icon-paixingbang"></use>
        </svg>
        <div class="aui-bar-tab-label text">排行榜</div>
      </div>
      <div class="aui-bar-tab-item" tapmode
        @click="openMNAction()">
        <img src="../../image/frame/bb.png" class="btn2" id="middle-btn">
      </div>
      <div class="aui-bar-tab-item tab2 tab-item" tapmode
           @click="changeFrame('footprint', 2)" id="2">
        <div class="aui-badge">99</div>
        <svg class="icon footer-icon" aria-hidden="true">
          <use xlink:href="#icon-zuji"></use>
        </svg>
        <div class="aui-bar-tab-label text">足迹</div>
      </div>
      <div class="aui-bar-tab-item tab3 tab-item" tapmode
           @click="changeFrame('me', 3)" id="3">
        <div class="aui-dot"></div>
        <svg class="icon footer-icon icon-me" aria-hidden="true">
          <use xlink:href="#icon-account"></use>
        </svg>
        <div class="aui-bar-tab-label text">我的</div>
      </div>
    </footer>
  </div>
</template>
<script>
  require("./footer.css");
  export default {
    props: ["data"],
    data() {
      return {}
    },
    mounted() {
      $api.addCls($api.domAll('.footer-icon')[0], 'active');
      $api.addCls($api.domAll('.text')[0], 'active');
    },
    methods: {
      changeFrame(name, index) {
        let icons = $api.domAll('.footer-icon');
        let texts = $api.domAll('.text');
        let activeIndex = parseInt($api.domAll('footer .active').id);
        if(index == activeIndex) return;
        let activeIcon = icons[index],
          activeText = texts[index];
        for(let i = 0; i < icons.length; i++) {
          $api.removeCls(icons[i], 'active');
          $api.removeCls(texts[i], 'active');
        }
        $api.addCls(activeIcon, 'active');
        $api.addCls(activeText, 'active');
        this.$emit('switchFrame', name);
      },
      openMNAction() {
        let MNActionBtn = api.require('MNActionButton');
        MNActionBtn.open({
          layout: {
            row: 2,
            col: 3,
            rowSpacing: 5,
            colSpacing: 10,
            offset: 0
          },
          animation: true,
          autoHide: true,
          styles: {
            maskBg: 'rgba(0,0,0,0.2)',
            bg: '#fff',
          },
          items: [{
            icon: 'widget://image/frame/date.png',
            title: '约球'
          }, {
            icon: 'widget://image/frame/one.jpg',
            title: '单挑'
          }, {
            icon: 'widget://image/frame/ref.jpg',
            title: '裁判'
          }]
        }, function (ret, err) {

        });
      }
    }
  }
</script>