angular.module('app')
    .directive('drawChart', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch('chartInfo', function (chartInfo) {
                    if (_.isUndefined(chartInfo))
                        return;
                    var data = constructDataForChart(chartInfo);
                    var labels = constructLabelsForChart(chartInfo);
                    var myChart = new Chart(element, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: data
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: false
                                    }
                                }]
                            }
                        }
                    });
                });
            }
        }
    });

function constructDataForChart(chartInfo) {
    var borderColor = ['rgba(255,99,132,1)','rgba(259,199,122,1)','rgba(225,89,232,1)'];
    var backgroundColor = ['rgba(255,99,132,1)'];
    var data = [];
    for (i = 0; i < chartInfo.length; i++) {
        var bookingCount = [];
        for (j = 0; j < chartInfo[i].bookings.length; j++) {
            bookingCount.push(chartInfo[i].bookings[j].order_count)
        }
        var dataSet = {
            label: chartInfo[i].service_location,
            data: bookingCount,
            backgroundColor: [
                backgroundColor[i / chartInfo.length]
            ],
            borderColor: [
                borderColor[i / chartInfo.length]
            ],
            borderWidth: 2
        };
        data.push(dataSet);
    }
    return data;
}
function constructLabelsForChart(chartInfo) {
    var labels = [];
        for (j = 0; j < chartInfo[0].bookings.length; j++) {
            var label=chartInfo[0].bookings[j].date;
            labels.push(label);
        }

    return labels;

}