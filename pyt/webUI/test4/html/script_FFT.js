        // Initialize the scatter chart
        var fileInput = document.getElementById('csvFile');
        var ctx = document.getElementById('myChart').getContext('2d');
        var ctx2 = document.getElementById('myChart2').getContext('2d');
        const options = document.getElementsByName('options');

        let selectedOption;

        var scatterChart = new Chart(ctx, {
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
                        // beginAtZero: true
                        suggestedMin: -0.1,
                        suggestedMax: 2.2

                    }
                }
            }
        });
        var stemChart = new Chart(ctx2, {
            type: 'scatter', // Set the chart type to scatter
            data: {
                datasets: [],
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                    },
                    y: {
                        // beginAtZero: true,
                        suggestedMin: -0.1,
                        suggestedMax: 2.2
                    }
                }
            }
        });
//https://www.chartjs.org/docs/latest/charts/mixed.html
        var hot;
        const settingTableElement = document.getElementById('settingTable');
        const settingTableSettings = {
            data: [
                [0, 1, -5, 5],
                [0, 1, -5, 5],
            ],
            allowEmpty: true,
            type: 'numeric',
            numericFormat: {
                pattern: '0,0.00',
            },
            colHeaders: ['xMin', 'xMax', 'yMin', 'yMax' ],
            rowHeaders: true,
            customBorders: true,
            height: 'auto',
            licenseKey: 'non-commercial-and-evaluation'
        };

        const settingTable = new Handsontable(settingTableElement, settingTableSettings);

        fileInput.addEventListener('change', function(event) {
            const selectedFile = event.target.files[0];
            loadCSVFromFile();
        });

        function parseCSV() {
            var csvData = document.getElementById("csvData").value;
            var csvDataAOA = convertToAOA(csvData);
            createHandsonTable(csvDataAOA);
            drawchart();
        }


        function loadCSVFromFile() {
            var fileInput = document.getElementById("csvFile");
            var file = fileInput.files[0];

            if (file) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var csvData = e.target.result;
                    var csvDataAOA = convertToAOA(csvData);

                    createHandsonTable(csvDataAOA);
                    drawchart();
                };

                reader.readAsText(file);
            }
        }


        function exportToCSV() {
            var Data0 = hot.getData()
            const csvFormat = Data0.map(row => row.join(',')).join('\n');
            const blob = new Blob([csvFormat], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data0.csv';
            a.click();
            URL.revokeObjectURL(url);
        }


        function convertToAOA(csvData) {
            var rows = csvData.split("\n");
            var csvDataAOA = rows.map(row => row.split(/[\t,]/));
            return csvDataAOA;
        }

        async function calculate() {
            var col0 = hot.getDataAtCol(0)
            var col1 = hot.getDataAtCol(1)
            var data0 = hot.getData()
            const check1 = document.getElementById('check1');
            const trRatio = document.getElementById('trInput').value;

            const response = await fetch('http://192.168.12.135:6969/FFT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    check: check1.checked,
                    data: data0,
                    truncateRatio: trRatio
                })
            });

            const data = await response.json();

            createHandsonTable(data);
            drawchart();
        }

        function createHandsonTable(csvData) {
            if (hot) { hot.destroy(); }
            const parsedData = csvData;
            // console.log("parsedData = " + typeof parsedData);

            const hotElement = document.getElementById('handsonTable');
            const hotSettings = {
                data: parsedData,
                allowEmpty: true,
                // type: 'numeric',
                // numericFormat: {
                //     pattern: '0,0',
                // },
                //columnSorting: true,
                columns: [
                    {
                    },
                    {
                        type: 'numeric',
                        numericFormat: {
                            pattern: '0,0.000',
                        }
                    },
                    {
                        type: 'numeric',
                        numericFormat: {
                            pattern: '0,0.000',
                        }
                    },
                                        {
                        type: 'numeric',
                        numericFormat: {
                            pattern: '0,0.0',
                        }
                    },
                    {
                        type: 'numeric',
                        numericFormat: {
                            pattern: '0,0.000',
                        }
                    },
                    {
                        type: 'numeric',
                        numericFormat: {
                            pattern: '0,0.000',
                        }
                    },
                    {
                        type: 'numeric',
                        numericFormat: {
                            pattern: '0,0.000',
                        }
                    },
                    {
                        type: 'numeric',
                        numericFormat: {
                            pattern: '0,0.000',
                        }
                    },
                ],
                colHeaders: ['time', 'input', 'cal', 'freq', 'amp', 'phase', 'real', 'image' ],
                // colHeaders(index) {
                //     return 'Col ' + (index + 1);
                // },
                rowHeaders: true,
                customBorders: true,
                dropdownMenu: false,
                width: 'auto',
                height: 'auto',
                licenseKey: 'non-commercial-and-evaluation'
            };

            hot = new Handsontable(hotElement, hotSettings);
        }

        function modifyRange() {
            var xMin1 = settingTable.getDataAtCell(0,0);
            var xMax1 = settingTable.getDataAtCell(0,1);
            var yMin1 = settingTable.getDataAtCell(0,2);
            var yMax1 = settingTable.getDataAtCell(0,3);

            var xMin2 = settingTable.getDataAtCell(1,0);
            var xMax2 = settingTable.getDataAtCell(1,1);
            var yMin2 = settingTable.getDataAtCell(1,2);
            var yMax2 = settingTable.getDataAtCell(1,3);

            // console.log({ xMin1, xMax1, yMin1, yMax1 })
            // console.log({ xMin2, xMax2, yMin2, yMax2 })

            var xData0 = hot.getDataAtCol(0);
            var yData00 = hot.getDataAtCol(1);
            var yData01 = hot.getDataAtCol(2);
            var xData1 = hot.getDataAtCol(3);

            options.forEach(option => {
                if (option.checked) {
                    selectedOption = option.value;
                }
            });

            if (selectedOption == "amp") {
                yData10 = hot.getDataAtCol(4);
            } else {
                yData10 = hot.getDataAtCol(5);
            }


            scatterChart.options.scales = {
                x: {
                    min: xMin1,
                    max: xMax1,
                },
                y: {
                    min: yMin1,
                    max: yMax1,
                }
            };

            stemChart.options.scales = {
                x: {
                    min: xMin2,
                    max: xMax2,
                },
                y: {
                    min: yMin2,
                    max: yMax2,
                }
            };
            scatterChart.update();
            stemChart.update();
        }

        function drawchart() {

            var xData0 = hot.getDataAtCol(0);
            var yData00 = hot.getDataAtCol(1);
            var yData01 = hot.getDataAtCol(2);
            var xData1 = hot.getDataAtCol(3);
            var yData10

            options.forEach(option => {
                if (option.checked) {
                    selectedOption = option.value;
                }
            });

            if (selectedOption == "amp") {
                yData10 = hot.getDataAtCol(4);
            } else if (selectedOption == "phase") {
                yData10 = hot.getDataAtCol(5);
            } else if (selectedOption == "real") {
                yData10 = hot.getDataAtCol(6);
            } else {
                yData10 = hot.getDataAtCol(7);
            }


            scatterChart.options.scales = {
                x: {
                    min: xData0.min,
                    max: xData0.max
                }
            };

            stemChart.options.scales = {
                x: {
                    min: xData0.min,
                    max: xData0.max
                }
            };

            scatterChart.data.datasets = [
                {
                    label: 'Input',
                    data: xData0.map((value, index) => ({ x: value, y: yData00[index] })),
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    pointRadius: 3,
                    pointHoverRadius: 3,
                    //pointStyle: 'rectRot',
                    showLine: true,
                    fill: false,
                    borderWidth: 1,
                    borderColor: "rgba(75, 192, 192, 0.6)",
                    borderDash: [10, 2],
                    tension: 0.5,
                },
                {
                    label: 'Calculated',
                    data: xData0.map((value, index) => ({ x: value, y: yData01[index] })),
                    backgroundColor: "rgba(150, 100, 100, 0.6)",
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    showLine: true,
                    fill: false,
                    borderWidth: 3,
                    borderColor: "rgba(150, 100, 100, 0.6)",
                    //borderDash: [10, 3, 20, 10],
                    tension:0.5
                }
            ];

            stemChart.data.datasets = [
                {
                    label: 'FFT amplitude',
                    type: 'bar',
                    data: xData1.map((value, index) => ({ x: value, y: yData10[index] })),
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    barThickness: 3,
                    borderColor: "rgba(75, 192, 192, 0.6)",
                    borderWidth: 1,
                },
                {
                    label: '',
                    type: 'scatter',
                    data: xData1.map((value, index) => ({ x: value, y: yData10[index] })),
                    backgroundColor: "rgba(150, 100, 100, 0.6)",
                    pointRadius: 2,
                    pointHoverRadius: 2,
                    showLine: false,
                    fill: false,
                    borderWidth: 1,
                    borderColor: "rgba(150, 100, 100, 0.6)",
                    borderDash: [10, 3, 20, 10],
                }
            ];

            // Update scatter chart
            scatterChart.update();
            stemChart.update();
        }
