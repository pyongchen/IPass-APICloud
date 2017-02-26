<template>
  <div>
    <header class="aui-bar aui-bar-nav">
      <div class="aui-pull-left aui-btn" @click="goBack">
        <img id="left-icon" src="../image/me/left.png">
        <span id="pre">{{pre}}</span>
      </div>
      <div class="aui-title" id="name">{{name}}</div>
    </header>
  </div>
</template>
<script>
  export default {
    props: ['name', 'pre'],
    data() {
      return {

      }
    },
    methods: {
      goBack() {
        api.historyBack(
          function (ret, err) {
            if (!ret.status) {
              api.closeWin();
            }
          }
        );
      }
    },
    mounted() {
      let key = api.pageParam.item.key;
      let h = $api.dom('header').offsetHeight;
      api.openFrame({
        name: key,
        url: '../html/' + key + '.html',
        rect: {
          x: 0,
          y: h,
          w: 'auto',
          h: 'auto'
        },
        pageParam: {name: key, h: h},
        bounces: true
      });
    }
  }
</script>
<style>
  .aui-bar {
    padding-top: 0.5rem !important;
    overflow-y: hidden;
  }
  #left-icon {
    width: 1.2rem;
    height: 1.2rem;
  }
  #name {
    font-size: 1.1rem;
  }
  #pre {
    font-size: 0.9rem;
  }
</style>