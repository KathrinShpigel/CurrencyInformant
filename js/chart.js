'use strict';

function buildWchedule(name, data, rangeDate) {
    return Highcharts.chart('container', {
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
            name,
            data
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
}