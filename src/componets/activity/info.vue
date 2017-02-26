<template>
  <div id="info">
    <div id="progress">
      <div id="progress-left">40%</div>
    </div>
    <div class="aui-btn" id="heat-btn" @click="goToHead">
      <svg class="icon heat-icon" aria-hidden="true">
        <use xlink:href="#icon-redu1"></use>
      </svg>
      <span>热度</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['data'],
    data() {
      return {}
    },
    methods: {
      goToHead() {
        api.openWin({
          name: 'heat',
          url: '../html/general-head.html',
          pageParam: {item: {
            key: 'heat',
            name: '热力图',
            pre: 'IPass'
          }}
        });
      }
    }
  }
</script>
<style>
  #info {
    width: 100%;
    height: 2rem;
    background-color: #9e9e9e;
  }
  #heat-btn {
    float: right;
    width: 3.5rem;
    margin-right: 0.2rem;
    margin-top: 0.3rem;
    margin-left: 0;
    background-color: #39b4ae;
  }
  .heat-icon {
    width: 1.2rem;
    height: 1.2rem;
    float: left;
    margin-top: 0.2rem;
    margin-right: 0.1rem;
    margin-left: -0.2rem;
    color: red;
  }
  #progress {
    float: left;
    margin-left: 0.8rem;
    margin-top: 0.3rem;
    border-radius: 0.5rem;
    width: 14rem;
    height: 1.5rem;
    background-color: white;
    border: 0.1rem solid #fff203;
  }
  #progress-left{
    float: left;
    height: 100%;
    width: 40%;
    text-align: center;
    border-radius: 0.5rem;
    background-color: #3ABA63;
  }
</style>