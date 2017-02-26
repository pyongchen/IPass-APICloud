<template>
  <div>
    <section class="aui-grid" id="me-part2">
      <div id="part2-key">
        <div class="key-position">位置</div>
        <div class="key-position">实力</div>
        <div class="key-position">MVP</div>
        <div class="key-position">粉丝</div>
      </div>
      <div id="part2-val">
        <div class="val-position">小前</div>
        <div class="val-position">75</div>
        <div class="val-position">3</div>
        <div class="val-position">25万</div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    props: ['data'],
    data() {
      return {

      }
    }
  }
</script>
<style>
  #me-part2 {
    margin-top: 1rem;
    background-color: #e8eae9;
  }
  #part2-key, #part2-val {
    width: 100%;
    height: 2rem;
    font-size: 1.2rem;
    display: flex;
    text-align: center
  }
  [class*='key-'] {
    flex: 1;
    font-size: 1.2rem
  }
  [class*='val-'] {
    flex: 1;
    color: #3f51b5;
    font-size: 1.1rem
  }
</style>