// const objetoEjemplo = {
//     'nace01': [{ 'scenario': 2025, 'value': 10 }, { 'scenario': 2030, 'value': 40 }, { 'scenario': 2040, 'value': 60 }, { 'scenario': 2050, 'value': 83 }],
//     'nace02': [{ 'scenario': 2025, 'value': 20 }, { 'scenario': 2030, 'value': 20 }, { 'scenario': 2040, 'value': 50 }, { 'scenario': 2050, 'value': 93 }],
//     'nace03': [{ 'scenario': 2025, 'value': 30 }, { 'scenario': 2030, 'value': 90 }, { 'scenario': 2040, 'value': 40 }, { 'scenario': 2050, 'value': 13 }],
//     'nace04': [{ 'scenario': 2025, 'value': 40 }, { 'scenario': 2030, 'value': 10 }, { 'scenario': 2040, 'value': 30 }, { 'scenario': 2050, 'value': 23 }],
//     'nace05': [{ 'scenario': 2025, 'value': 70 }, { 'scenario': 2030, 'value': 80 }, { 'scenario': 2040, 'value': 20 }, { 'scenario': 2050, 'value': 63 }],
//     'nace06': [{ 'scenario': 2025, 'value': 80 }, { 'scenario': 2030, 'value': 30 }, { 'scenario': 2040, 'value': 10 }, { 'scenario': 2050, 'value': 73 }]
// };

// continue button onclick
nextStepButton.addEventListener('click', (e) => {
    e.preventDefault();
    const currentStepItem = document.querySelector('.step--current');

    let currentStep = parseInt(currentStepItem.getAttribute('attr-step-number'));
    // Si no es el paso final
    if (currentStep !== 4) return;

    const deltaItems = Array.from(document.getElementsByClassName('input_delta'));
    let deltas = deltaItems.reduce((acc, el) => {
        acc.push(el.value);
        return acc;
    }, []);

    createHeatmap(deltas);
});

async function createHeatmap(deltas) {
    const response = await fetch("http://127.0.0.1:3000/heatmap/createHeatmap/" + HEATMAP_TIMESTAMP);
    let data = await response.json();

    let dataTransformed = transformDataToHeatmap(data);
    let categories = getCategories(data); // [x, y]
    loadChart(deltas, dataTransformed, categories[0], categories[1]);
}

function transformDataToHeatmap(obj) {
    let heatmapMatrix = [];
    let y = 0;

    for (let key in obj) {
        obj[key].forEach((el, idx) => {
            heatmapMatrix.push([idx, y, el.value]);
        });
        y++;
    }

    return heatmapMatrix;
}

function getCategories(obj) {
    let categories = [
        [],
        []
    ];
    let categorieXScanned = false;

    for (let categorieY in obj) {
        categories[1].push(categorieY);

        if (!categorieXScanned) {
            obj[categorieY].forEach((el) => {
                categories[0].push(el.scenario);
            });
            categorieXScanned = true;
        }
    }

    return categories;
}

// Highcharts Functions
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

function loadChart(deltas, data, categoriesX, categoriesY) {
    Highcharts.chart('container', {
        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 100,
            plotBorderWidth: 0
        },

        title: {
            text: ''
        },

        xAxis: {
            categories: categoriesX
        },

        yAxis: {
            categories: categoriesY,
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
                to: deltas[0]
            }, {
                color: '#ffff76 ',
                from: deltas[0],
                to: deltas[1]
            }, {
                color: '#FFD700',
                from: deltas[1],
                to: deltas[2]
            }, {
                color: '#e06666',
                from: deltas[2],
                to: deltas[3]
            }, {
                color: '#cc0000',
                from: deltas[3]
            }]
        },

        exporting: {
            buttons: {
                contextButton: {
                    symbol: 'download',
                    verticalAlign: 'top',
                    y: -19,
                    fill: "#e7e7f8"
                }
            }
        },

        tooltip: {
            formatter: function() {
                return 'Prevission for <b>' + getPointCategoryName(this.point, 'y') + '</b><br> in <b>' + getPointCategoryName(this.point, 'x') + '</b> is ' + this.point.value;
            }
        },

        series: [{
            name: 'direct emission risk',
            borderWidth: 1,
            borderColor: '#4c4c4c ',
            data: data,
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
};