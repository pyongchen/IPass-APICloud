<template>
  <div>
    <div id="heat-map"></div>
    <div id="btns">
      <div class="aui-btn aui-btn-success aui-btn-block open">打开</div>
      <div class="aui-btn aui-btn-danger aui-btn-block close">关闭</div>
    </div>
  </div>
</template>
<script>
  export default {
    mounted() {
      var aMap = api.require('aMap');
      aMap.addEventListener({
        name: 'click'
      }, function (ret) {
        alert(JSON.stringify(ret));
      });
      api.setFrameAttr({
        name: 'heat',
        bounces: false,
        vScrollBarEnabled: false,
        hScrollBarEnabled: false
      });
      aMap.setMapAttr({
        type: 'standard',
        trafficOn: true,
        zoomEnable: false,
        scrollEnable: false,
        building: true,
        overlookEnabled: false,
        rotateEnabled: false
      });
      aMap.getCoordsFromName({
        city: '广州',
        address: '大学城'
      }, (ret, err) => {
        if (ret.status) {
          let lon = ret.lon, lat = ret.lat;
          aMap.open({
            rect: {
              x: 0,
              y: api.pageParam.h,
              w: 'auto',
              h: $api.dom('#heat-map').offsetHeight
            },
            center: {lon: lon, lat: lat},
            zoomLevel: 15,
            showUserLocation: true,
          }, (ret) => {
            if(!ret.status) {
              alert("定位失败!");
              return;
            }
            aMap.addEventListener({
              name: 'click'
            }, function (ret) {
              let lon = ret.lon, lat = ret.lat;
              aMap.addCircle({
                id: 2,
                center: {lon: lon, lat: lat},
                radius: 10,
                styles: {
                  borderColor: '#FF0000',
                  borderWidth: 3,
                  lineDash: true,
                  fillColor: 'rgba(1,0.8,0,0.8)'
                }
              });
            });
          });
        } else {
          alert(JSON.stringify(err));
        }
      });
    },
    methods: {
    }
  }
</script>
<style>
  #heat-map {
    width: 100%;
    height: 26rem;
  }

  #btns {
    display: flex;
    color: rgb(1,0.8,0);
  }

  .open, .close {
    flex: 1;
    margin: 1rem;
  }
</style>