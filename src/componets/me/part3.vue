<template>
  <div>
    <section class="aui-grid" id="me-part3">
      <div class="aui-row" id="part3-item">
        <div class="aui-col-xs-3" v-for="item in data" @click="goToNewWin(item)">
          <svg class="icon part3-icon" aria-hidden="true"  style="color: #00acc1">
            <use :xlink:href="'#icon-' + item.icon"></use>
          </svg>
          <div class="aui-grid-label">{{item.name}}</div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import data_ from '../../js/data/me-part3'
  export default {
    data() {
      return {
        data: data_,
        src: ''
      }
    },
    methods: {
      goToNewWin(item) {
        api.openWin({
          name: item.key,
          url: '../html/general-head.html',
          pageParam: {item: item}
        });
      }
    },
    mounted() {

    }
  }
</script>
<style>
  #me-part3 {
    margin-top: 1rem;
    background-color: #e8eae9;
  }
  .part3-icon {
    width: 2rem;
    height: 2rem;
  }
</style>