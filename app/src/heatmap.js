Highcharts.SVGRenderer.prototype.symbols.download = function(x, y, w, h) {
    var path = [
        'M', x + w * 0.5, y,
        'L', x + w * 0.5, y + h * 0.7,
        'M', x + w * 0.3, y + h * 0.5,
        'L', x + w * 0.5, y + h * 0.7,
        'L', x + w * 0.7, y + h * 0.5,
        'M', x, y + h * 0.9,
        'L', x, y + h,
        'L', x + w, y + h,
        'L', x + w, y + h * 0.9
    ];
    return path;
};

function getPointCategoryName(point, dimension) {
    var series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
}

Highcharts.chart('container', {
    chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 0
    },

    title: {
        text: ''
    },

    xAxis: {
        categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
    },

    yAxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        title: null,
        reversed: true
    },

    accessibility: {
        enabled: false
    },

    colorAxis: {
        dataClasses: [{
            color: '#ffffff',
            to: 1
        }, {
            color: '#fffdd0',
            from: 1,
            to: 30
        }, {
            color: '#f5ef2f',
            from: 30,
            to: 70
        }, {
            color: '#e06666',
            from: 70,
            to: 85
        }, {
            color: '#cc0000',
            from: 85
        }]
    },

    legend: {
        margin: 0,
    },

    exporting: {
        buttons: {
            contextButton: {
                // align: 'left',
                // x: -100,
                symbol: 'download',
                verticalAlign: 'top',
                y: -19,
                fill: "#e7e7f8"
            }
        }
    },

    tooltip: {
        formatter: function() {
            return '<b>' + getPointCategoryName(this.point, 'x') + '</b> sold <br><b>' +
                this.point.value + '</b> items on <br><b>' + getPointCategoryName(this.point, 'y') + '</b>';
        }
    },

    series: [{
        name: 'direct emission risk',
        borderWidth: 1,
        borderColor: '#e7e7f8',
        data: [
            [0, 0, 0],
            [0, 1, 10],
            [0, 2, 20],
            [0, 3, 24],
            [0, 4, 67],
            [1, 0, 92],
            [1, 1, 58],
            [1, 2, 78],
            [1, 3, 100],
            [1, 4, 48],
            [2, 0, 35],
            [2, 1, 15],
            [2, 2, 100],
            [2, 3, 64],
            [2, 4, 52],
            [3, 0, 72],
            [3, 1, 100],
            [3, 2, 100],
            [3, 3, 19],
            [3, 4, 16],
            [4, 0, 38],
            [4, 1, 5],
            [4, 2, 8],
            [4, 3, 100],
            [4, 4, 100],
            [5, 0, 88],
            [5, 1, 32],
            [5, 2, 12],
            [5, 3, 6],
            [5, 4, 100],
            [6, 0, 13],
            [6, 1, 44],
            [6, 2, 88],
            [6, 3, 98],
            [6, 4, 96],
            [7, 0, 31],
            [7, 1, 1],
            [7, 2, 82],
            [7, 3, 32],
            [7, 4, 30],
            [8, 0, 85],
            [8, 1, 97],
            [8, 2, 100],
            [8, 3, 64],
            [8, 4, 84],
            [9, 0, 47],
            [9, 1, 100],
            [9, 2, 31],
            [9, 3, 48],
            [9, 4, 91]
        ],
        dataLabels: {
            enabled: false,
            color: '#000000'
        }
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                yAxis: {
                    labels: {
                        formatter: function() {
                            return this.value.charAt(0);
                        }
                    }
                }
            }
        }]
    }

});