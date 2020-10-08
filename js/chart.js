'use strict';

function buildSchedule(cur, data, categories) {
    return Highcharts.chart('container', {
        title: {
            text: `${ cur.Cur_Scale } ${ cur.Cur_Name } (${ cur.Cur_Abbreviation }) в белорусских рублях (BYN)`
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
                rangeDescription: `Range: ${ categories[0] } to ${ categories[categories.length - 1] }`
            },
            categories
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
                
            }
        },
      
        series: [{
            name: cur.Cur_Name,
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