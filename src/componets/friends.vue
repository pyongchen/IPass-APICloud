<template>
  <div id="friends">
    <h1 id="load">正在加载好友列表...</h1>
    <ul class="aui-list aui-media-list">
      <li class="aui-list-item rank-item" v-for="friend in friends"
          @click="goToPlayer(friend._id)">
        <div class="aui-media-list-item-inner" id="item-up">
          <div class="aui-list-item-media" id="bg-box">
            <img id="friend-head" v-lazy="'../src/image/players/' + friend.image">
          </div>
          <div class="aui-list-item-inner">
            <div :class="key1" v-for="(shows, key1, index1) in showItems">
              <div :class="key1 + '-' + show.key" v-for="(show, index2) in shows">
                <svg v-if="index1 != 0 || index2 != 0" :class="'icon ' + show.key + '-icon'">
                  <use :xlink:href="'#icon-' + show.icon"></use>
                </svg>
                <span :class="show.key + '-text'">{{friend[show.key]}}</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import data_ from '../js/data/rank-main';
  export default {
    data() {
      return {
        friends: [],
        showItems: ''
      }
    },
    methods: {
      goToFriend(id) {
        alert("根据" + id + "跳转到球员详情");
      }
    },
    beforeMount() {
      // 先把所有球员当做朋友
      _api.resolve('players', api).then((players) => {
        this.friends = players;
        $api.css($api.dom('#load'), 'display: none');
      });
      this.showItems = data_;
    },

  }
</script>
<style>
  #friends {
    width: 100%;
    height: auto;
    overflow-x: hidden;
  }
  #friend-head {
    width: 3rem;
    height: 3rem;
  }
  #load {
    text-align: center;
    margin-top: 1rem;
  }
  .rank-item {
    background-color: #e7eaed;
    border-bottom: 1px solid #bababa !important;
  }
  [class*='-icon'] {
    width: 1.1rem;
    height: 1.1rem;
    float: left;
  }
  .position-text, .MVP-text {
    margin-left: 0.2rem;
    margin-top: 0.2rem;
  }
  .line1, .line2 {
    display: flex;
  }
  [class*='line1-'], [class*='line2-'] {
    flex: 1;
    font-size: 1rem;
  }
  .MVP-icon {
    color: #1dabca;
  }
  .position-icon {
    color: #b06d17;
  }
  .level-icon {
    width: 1.3rem;
    height: 1.3rem;
    color :#bb990d;
  }
  .fans-icon {
    color: #daa0d3;
  }
  .loseRate-icon {
    color: red;
  }

  .line1-level, .line1-fans, .line2-MVP, .line2-loseRate {
    margin-left: 1rem;
  }
</style>