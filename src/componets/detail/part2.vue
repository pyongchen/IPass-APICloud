<template>
  <div id="active">
    <ul class="aui-list aui-list-in">
      <li id="title">活跃地点</li>
      <li class="aui-list-item" v-for="place in places">
        <div class="aui-list-item-inner">
          <div class="aui-list-item-title">
            <svg class="icon active-icon" aria-hidden="true">
              <use xlink:href="#icon-huoyue"></use>
            </svg>
            <span id="place">{{place}}</span>
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
        places: []
      }
    },
    mounted() {
      let player = $api.getStorage('player');
      this.places = player.activePlaces;
    }
  }
</script>
<style>
  #active {
    margin-top: 1rem;
  }
  .active-icon {
    float: left;
    width: 1rem;
    height: 1rem;
    color: #007aff;
  }
  #place {
    float: left;
    margin-left: 0.5rem;
  }
</style>