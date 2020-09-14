'use strict';

Highcharts.chart('container', {

  title: {
      text: '1 доллар (USD) в белорусских рублях (BYN)'
  },

  subtitle: {
      text: 'Источник: Национальный Банк Республики Беларусь'
  },

  yAxis: {
      title: {
          text: 'Белорусский рубль (BYN)'
      }
  },

  xAxis: {
      accessibility: {
          rangeDescription: 'Range: 2010 to 2017'
      }
  },

  legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom'
  },


  plotOptions: {
      series: {
          label: {
              connectorAllowed: false
          },
          pointStart: 2010
      }
  },

  series: [{
      name: 'Название валюты',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
  }, {
      name: 'Медианное значение',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
  }, {
      name: 'Среднее значение',
      data: [35353, 36373, 34535, 36373, 44558, 98989, 15151, 352]
  }],

  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }

});