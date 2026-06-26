    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var ctx3 = document.getElementById('myChart3').getContext('2d');
    const checkKeepAxis = document.getElementById('checkKeepAxis');
    var optionsSimpleNorm = document.getElementsByName('optionsSimpleNorm');
    var table2Content;
    var dataForTable20;
    var dataForTable21;
    var dataForTable22;
    var dataCov;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const tableSettingsCommon = {
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0.00',
        },
        allowEmpty: true,
        colHeaders: true,
        rowHeaders: true,
        customBorders: true,
        dropdownMenu: false,
        width: 'auto',
        height: 'auto',
        viewportRowRenderingOffset: 10,
        licenseKey: 'non-commercial-and-evaluation'
    };

    const chartSettingsScatPoint = {
        label: 'Calculated',
        backgroundColor: "rgba(150, 100, 100, 0.6)",
        pointRadius: 0,
        pointHoverRadius: 0,
        showLine: true,
        fill: false,
        borderWidth: 3,
        borderColor: "rgba(150, 100, 100, 0.6)",
        //borderDash: [10, 3, 20, 10],
        tension:0.5
    };

    const chartSettingsBarCommon = {
        label: 'larger than 1.0',
        type: 'bar',
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        barThickness: 3,
        borderColor: "rgba(75, 192, 192, 0.3)",
        borderWidth: 0,
    };

    const chartSettingsBarOverlap = {
        label: 'overlapped area',
        type: 'bar',
        backgroundColor: "rgba(220, 118, 51, 0.3)",
        barThickness: 3,
        borderColor: "rgba(220, 118, 51, 0.3)",
        borderWidth: 0,
    };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var scatterChart1 = new Chart(ctx, {
        type: 'scatter', // Set the chart type to scatter
        data: {
            datasets: [],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {

                }
            }
        }
    });
    var scatterChart2 = new Chart(ctx2, {
        type: 'scatter', // Set the chart type to scatter
        data: {
            datasets: [],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {

                }
            }
        }
    });
    var scatterChart3 = new Chart(ctx3, {
        type: 'scatter', // Set the chart type to scatter
        data: {
            datasets: [],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {

                }
            }
        }
    });
