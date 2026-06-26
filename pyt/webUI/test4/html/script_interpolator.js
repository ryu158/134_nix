        var fileInput = document.getElementById('csvFile');
        var ctx = document.getElementById('myChart').getContext('2d');
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
            },
        });

        var table1Content;
        const settingTableElement = document.getElementById('settingTable');
        const settingTableSettings = {
            data: [
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
            createTable1(csvDataAOA);
        }

        function loadCSVFromFile() {
            var fileInput = document.getElementById("csvFile");
            var file = fileInput.files[0];

            if (file) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var csvData = e.target.result;
                    var csvDataAOA = convertToAOA(csvData);

                    createTable1(csvDataAOA);
                };

                reader.readAsText(file);
            }
        }


        function exportToCSV() {
            var Data0 = table2Content.getData()
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
            var col0 = table1Content.getDataAtCol(0)
            var col1 = table1Content.getDataAtCol(1)
            var data0 = table1Content.getData()

            const rangeMin = document.getElementById('rangeMin').value;
            const rangeMax = document.getElementById('rangeMax').value;
            const interval = document.getElementById('interval').value;

            const response = await fetch('http://192.168.12.135:6969/interpolate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: data0,
                    rangeMin: rangeMin,
                    rangeMax: rangeMax,
                    interval: interval,
                })
            });

            const data = await response.json();

            createTable2(data);
            drawchart();
        }

        function createTable1(csvData) {
            if (table1Content) { table1Content.destroy(); }
            const parsedData = csvData;

            const tableElement = document.getElementById('table1');
            const tableSettings = {
                data: parsedData,
                allowEmpty: true,
                columns: [
                    {
                    },
                    {
                        type: 'numeric',
                        numericFormat: {
                            pattern: '0,0.000',
                        }
                    },
                ],
                colHeaders: [ 'x', 'y' ],
                rowHeaders: true,
                customBorders: true,
                dropdownMenu: false,
                width: 'auto',
                height: 'auto',
                licenseKey: 'non-commercial-and-evaluation'
            };

            table1Content = new Handsontable(tableElement, tableSettings);
        }


        function createTable2(csvData) {
            if (table2Content) { table2Content.destroy(); }
            const parsedData = csvData;

            const tableElement = document.getElementById('table2');
            const tableSettings = {
                data: parsedData,
                allowEmpty: true,
                columns: [
                    {
                    },
                    {
                        type: 'numeric',
                        numericFormat: {
                            pattern: '0,0.000',
                        }
                    },
                ],
                colHeaders: [ 'xIntp', 'yIntp' ],
                rowHeaders: true,
                customBorders: true,
                dropdownMenu: false,
                width: 'auto',
                height: 'auto',
                licenseKey: 'non-commercial-and-evaluation'
            };

            table2Content = new Handsontable(tableElement, tableSettings);
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

            var xData0 = table1Content.getDataAtCol(0);
            var yData00 = table1Content.getDataAtCol(1);
            var xData1 = table2Content.getDataAtCol(4);
            var yData10 = table2Content.getDataAtCol(5);



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

            scatterChart.update();
        }

        function drawchart() {

            var xData0 = table1Content.getDataAtCol(0);
            var yData00 = table1Content.getDataAtCol(1);

            var xData1 = table2Content.getDataAtCol(0);
            var yData10 = table2Content.getDataAtCol(1);

            scatterChart.options.scales = {
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
                    data: xData1.map((value, index) => ({ x: value, y: yData10[index] })),
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

            // Update scatter chart
            scatterChart.update();
        }
