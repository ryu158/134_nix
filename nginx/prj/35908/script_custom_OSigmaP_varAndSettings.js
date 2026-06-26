    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var ctx3 = document.getElementById('myChart3').getContext('2d');
    // var dCtx1 = document.getElementById('dotChart1').getContext('2d');
    // var dCtx2 = document.getElementById('dotChart2').getContext('2d');
    const checkKeepAxis = document.getElementById('checkKeepAxis');
    var optionsCovY = document.getElementsByName('optionsCovY');
    var optionsWeight = document.getElementsByName('optionsWeight');
    var optionsOSigmaP = document.getElementsByName('optionsOSigmaP');
    var table2Content;
    var dataForTable20;
    var dataForTable21;
    var dataForTable22;
    var dataCov;
    var dataOS;
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
        width: '100%',
        height: '71.5%',
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
            plugins: {
                legend: {
                    display: false,
                }
            },
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
            plugins: {
                legend: {
                    display: false,
                }
            },
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
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    ticks: {
                        callback: function(value, index, values) {
                        return value.toExponential(1); // Convert ticks to scientific notation
                        },
                    },
                }
            }
        }
    });

    // var dotChart1 = new Chart(dCtx1, {
    //     type: 'scatter', // Set the chart type to scatter
    //     data: {
    //         datasets: [],
    //     },
    //     options: {
    //         scales: {
    //             x: {
    //                 display: false,
    //                 ticks: { display: false, }
    //             },
    //             y: {
    //                 display: false,
    //                 ticks: { display: false, },
    //                 reverse: true,
    //             }
    //         },
    //         plugins: {
    //             legend: {
    //                 display: false,
    //             }
    //         },
    //     }
    // });

    // var dotChart2 = new Chart(dCtx2, {
    //     type: 'scatter', // Set the chart type to scatter
    //     data: {
    //         datasets: [],
    //     },
    //     options: {
    //         scales: {
    //             x: {
    //                 display: false,
    //                 ticks: { display: false, },
    //             },
    //             y: {
    //                 display: false,
    //                 ticks: { display: false, },
    //                 reverse: true,
    //             }
    //         },
    //         plugins: {
    //             legend: {
    //                 display: false,
    //             }
    //         },
    //     }
    // });
