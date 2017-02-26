<template>
  <div class="aui-content aui-margin-b-15 aui-margin-t-20">
    <ul class="aui-list aui-list-in">
      <li class="aui-list-item" v-for="(val, key) in settings"
          @click="changeSetting(key, val)">
        <div class="aui-list-item-inner">
          <div class="aui-list-item-title">{{val}}</div>
          <div class="aui-list-item-right">
            <img src="../image/me/right.png" id="right-icon">
          </div>
        </div>
      </li>
    </ul>
    <div id="logout">
      退出登录
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        settings: {
          security: '账号与安全',
          message: '新消息通知',
          help: '帮助反馈',
          us: '关于IPass'
        }
      }
    },
    methods: {
      changeSetting(key, val) {
        alert(key + '|' + val);
      }
    }
  }
</script>
<style>
  #right-icon {
    width: 1rem;
    height: 1rem;
  }
  #logout {
    width: 100%;
    height: 2rem;
    text-align: center;
    padding-top: 0.3rem;
    margin-top: 1rem;
    background-color: #d2d5d5;
    font-size: 1rem;
  }
</style>