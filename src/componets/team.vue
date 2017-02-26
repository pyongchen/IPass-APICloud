<template>
  <div id="teams">
    <ul class="aui-list aui-media-list" id="ranks">
      <li class="aui-list-item team-item" v-for="team in teams"
          @click="goToFriend(team._id)">
        <img :src="team.image" class="team-img">
        <div id="team-info">
          <div class="team-name">{{team.name}}</div>
          <div class="team-level">
            <svg class="icon level-icon">
              <use :xlink:href="'#icon-dengji'"></use>
            </svg>
            <span>{{team.level}}</span>
          </div>
          <div class="team-loseRate">
            <svg class="icon loseRate-icon">
              <use :xlink:href="'#icon-shiyuezhuangtai01'"></use>
            </svg>
            <span>{{team.loseRate}}</span>
          </div>
          <div class="team-fans">
            <svg class="icon fans-icon">
              <use :xlink:href="'#icon-unie646'"></use>
            </svg>
            <span>{{team.fans}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        teams: [],
      }
    },
    methods: {
      goToFriend(id) {
        alert('根据id' + id + '跳转到')
      }
    },
    beforeMount() {
      let teams = $api.getStorage('player').teams;
      teams.forEach((team) => {
        team.image = require('../../src/' + 'image/teams/' + team.image);
      });
      this.teams = teams;
    }

  }
</script>
<style>
  #teams {
    background-color: #c6c8cb;
  }
  #team-info {
    display: flex;
    margin-top: 0.2rem;
  }
  .team-item {
    margin-left: 1rem;
    margin-right: 1rem;
    background-color: #dadae0;
    margin-top: 0.5rem !important;
    border-bottom: 1px solid gainsboro;
  }
  .team-img {
    width: 95%;
    margin-right: 1rem;
    padding-top: 0.5rem !important;
  }
  [class*='team'] {
    flex: 1;
  }
  [class*='-icon'] {
    width: 1rem;
    height: 1rem;
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
</style>