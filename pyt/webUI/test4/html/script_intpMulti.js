    var ctx = document.getElementById('myChart').getContext('2d');
    var showIndex = document.getElementById('showIndex').value;
    const options = document.getElementsByName('options');
    const optionsChart = document.getElementsByName('optionsChart');
    const optionsInput = document.getElementsByName('optionsInput');

    var data;

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
        licenseKey: 'non-commercial-and-evaluation'
    };

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

                }
            }
        }
    });

    async function calculate() {
        var data0 = table1Content.getData()
        const rangeMin = document.getElementById('rangeMin').value;
        const rangeMax = document.getElementById('rangeMax').value;
        const interval = document.getElementById('interval').value;

        const response = await fetch('http://192.168.12.135:6969/intpMulti', {
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
        drawchart1();
    }

    function createTable1(csvData) {
        if (table1Content) { table1Content.destroy(); }
        const table1Settings = tableSettingsCommon;
        table1Settings.data = csvData;

        table1Content = new Handsontable(table1Element, table1Settings);
    }

    function createTable2(csvData) {
        if (table2Content) { table2Content.destroy(); }
        const table2Element = document.getElementById('table2');
        const table2Settings = tableSettingsCommon;
        table2Settings.data = csvData;

        table2Content = new Handsontable(table2Element, table2Settings);
    }

    function modifyRange() {
        showIndex = document.getElementById('showIndex').value;

        var xMin1 = settingTable.getDataAtCell(0,0);
        var xMax1 = settingTable.getDataAtCell(0,1);
        var yMin1 = settingTable.getDataAtCell(0,2);
        var yMax1 = settingTable.getDataAtCell(0,3);

        var xData0 = table1Content.getDataAtCol(0);
        var yData00 = table1Content.getDataAtCol(parseInt(showIndex));

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

    function drawchart1() {
        showIndex = document.getElementById('showIndex').value;
        var xData1 = table1Content.getDataAtCol(0);
        var yData10 = table1Content.getDataAtCol(parseInt(showIndex));
        var xData2 = table2Content.getDataAtCol(0);
        var yData20 = table2Content.getDataAtCol(parseInt(showIndex));

        scatterChart.options.scales = {
            x: {
                min: xData1.min,
                max: xData1.max
            }
        };

        scatterChart.data.datasets = [
            {
                label: 'Input',
                data: xData1.map((value, index) => ({ x: value, y: yData10[index] })),
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
                data: xData2.map((value, index) => ({ x: value, y: yData20[index] })),
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
        scatterChart.update();
    }
