<template>
  <div id="games">
    <div id="J-menu">
      <div v-for="(game, index) in games" :class="'games games-' + game.key"
           @click="openGame(index, game.key)">
        <span class="game-text">{{game.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        games: [
          {key: 'one', name: '单挑'},
          {key: 'wild', name: '野球'},
          {key: 'three', name: '3V3'},
          {key: 'five', name: '5V5'}
        ],
        activeIndex: -1
      }
    },
    methods: {
      openGame(index, key) {
        if(index == this.activeIndex) return;

        // 调整样式
        let games = $api.domAll('.games');
        let texts = $api.domAll('.game-text');
        for(let i = 0; i < games.length; i++) {
          $api.removeCls(games[i], 'active');
          $api.removeCls(texts[i], 'active-text');
        }
        $api.addCls(games[index], 'active');
        $api.addCls(texts[index], 'active-text');
        this.activeIndex = index;

        let h = api.pageParam.h + $api.dom('#games').offsetHeight;

        //隐藏其他Frame
        this.games.forEach((game) => {
          api.setFrameAttr({
            name: 'games-' + game.key,
            hidden: true
          });
        });
        api.openFrame({
          name: 'games-' + key,
          url: '../html/games-' + key + '.html',
          rect: {
            x: 0,
            y: h,
            w: 'auto',
            h: api.winHeight - h
          },
          pageParam: {type: key},
          animation: {
            type:"push",                //动画类型（详见动画类型常量）
            subType:"from_left",       //动画子类型（详见动画子类型常量）
            duration: 200
          },
          bounces: true
        });
      }
      // Tab滑动效果以后再加
//      scrollTab() {
//        let IScroll = require('../js/common/iscroll');
//        new IScroll('#J-menu', {
//          scrollX: true,
//          scrollY: false,
//          freeScroll: false
//        });
//        document.addEventListener('touchmove', function (e) {
//          alert('1231');
//        }, false);
//      }
    },
    mounted() {
      let first = $api.domAll('.games')[0];
      $api.addCls(first, 'active');
      this.openGame(0, 'one');
//      this.scrollTab();
    }
  }
</script>
<style>

  #games {
    width: 100%;
    overflow: hidden;
  }
  #J-menu {
    width: 100%;
    display: flex;
    background-color: #cbdcdc;
    padding: 0.2rem 0.5rem 0 0.5rem;
  }
  [class*='games'] {
    flex: 1;
    height: 2rem;
    font-size: 1.1rem;
    text-align: center;
    justify-content: center;
  }

  .active {
    border-bottom: 2px solid #0caeff;
  }

  .active-text {
    color: #0caeff;
  }
</style>