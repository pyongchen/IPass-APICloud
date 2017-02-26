<template>
  <body>
    <detail-part1></detail-part1>
    <detail-part2></detail-part2>
    <detail-part3></detail-part3>
  </body>
</template>
<script>
  export default {
    components: {
      'detail-part1': require('../../componets/detail/part1.vue'),
      'detail-part2': require('../../componets/detail/part2.vue'),
      'detail-part3': require('../../componets/detail/part3.vue'),
    }
  }
</script>