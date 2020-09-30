'use strict';

function buildSchedule(obj, data, categories, interval) {
    return Highcharts.chart('container', {
        title: {
            text: `${ obj.Cur_Scale } ${ obj.Cur_Name } (${ obj.Cur_Abbreviation }) в белорусских рублях (BYN)`
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
            //tickInterval: 7 * 24 * 3600 * 1000, // one week
            //tickWidth: 0,
            //gridLineWidth: 1,
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
            name: obj.Cur_Name,
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