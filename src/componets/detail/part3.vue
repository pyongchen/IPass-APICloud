<template>
  <div id="overall">
    <div id="title">实力图</div>
    <canvas id="overallChart"></canvas>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      let strength = $api.getStorage('player').strength;
      let radarChartData = {
        labels: ["得分", "助攻", "篮板", "盖帽", "防守"],
        datasets: [
          {
            fillColor: "rgba(220,143,43,0.5)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,41,27,1)",
            pointStrokeColor: "#fff",
            data: [strength.score, strength.assist, strength.board, strength.block, strength.defend]
          }
        ]
      };
      window.myRadar = new Chart(document.getElementById("overallChart")
        .getContext("2d")).Radar(radarChartData, {responsive: true});
    }
  }
</script>
<style>
  #overall {
    margin-top: 1rem;
  }
  #overallChart {
    margin-top: 0.5rem;
  }
</style>