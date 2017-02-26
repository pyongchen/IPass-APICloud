<template>
  <div id="me-part1" @click="goToInfo">
    <div id="part1-left">
      <img :src="imgSrc" alt="头像" id="head-img">
    </div>
    <div id="part1-right">
      <div id="base">
        <span class="me-name">{{player.name}}</span>
        <span class="me-level">Lv{{player.level}}</span>
      </div>
      <div id="loseRate">
        失约率:{{player.loseRate}}
      </div>
      <svg class="icon you-icon" aria-hidden="true">
        <use xlink:href="#icon-you"></use>
      </svg>
      <svg class="icon erweima-icon" aria-hidden="true">
        <use xlink:href="#icon-erweima"></use>
      </svg>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['data'],
    data() {
      return {
        imgSrc: require('../../image/players/1.jpg'),
        player: {}
      }
    },
    mounted() {
      this.player = $api.getStorage('player');
    },
    methods: {
      goToInfo() {
        api.openWin({
          name: 'info',
          url: '../html/general-head.html',
          pageParam: {item: {
            key: 'info', name: '个人信息'
          }}
        });
      }
    }
  }
</script>
<style>
  #me-part1 {
    width: 100%;
    height: 5rem;
    margin-top: 1rem;
    background-color: #e8eae9;
  }

  #part1-left {
    float: left;
    width: 5rem;
    height: 5rem;
  }

  #part1-right {
    width: 12rem;
    float: left;
  }

  #head-img {
    width: 4rem;
    height: 4rem;
    margin-left: 1rem;
    margin-top: 0.5rem;
    border-radius: 2rem;
  }

  #base, #loseRate {
    float: left;
    width: 100%;
    height: 2.5rem;
    margin-left: 1rem;
  }

  #base {
    padding-top: 0.5rem;
  }

  [class*="me"] {
    margin-right: 1rem;
  }

  .me-name {
    font-size: 1.1rem;
  }

  .me-level {
    color: red;
    font-size: 1rem;
  }

  .erweima-icon, .you-icon{
    position: absolute !important;
    top: 3rem !important;
  }

  .erweima-icon {
    width: 1.2rem;
    height: 1.2rem;
    right: 1.5rem;
    color: #00acc1;
  }

  .you-icon {
    width: 1.2rem;
    height: 1.2rem;
    right: 0.5rem;
  }
</style>