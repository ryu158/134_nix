     async function calculate() {
       var data0 = table0Content.getData();
       var data1 = table1Content.getData();
       var response;
       var options2p3p = document.getElementsByName('options2p3p');

       options2p3p.forEach(option => {
           if (option.checked) {
               selectedOption = option.value;
           }
       });

       if (selectedOption == '2p') {
           response = await fetch('http://192.168.12.135:6969/custom_sensitivity', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                   data0: data0,
                   data1: data1,
               })
           });
       } else {
            response = await fetch('http://192.168.12.135:6969/custom_sensitivity3P', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                   data0: data0,
                   data1: data1,
               })
           });

       }
       data = await response.json();
       dataForTable20 = data.data0;
       dataForTable21 = data.data1;
       dataCov = data.dataCov;

       createTable2();
       drawchart1();
       drawchart2();
       drawchart3();
       createCorrelationTable();
    }
    async function calCorRange() {
    var data0 = table0Content.getData();
    var data1 = table1Content.getData();
    var dataRange = settingTable.getData();

    const response = await fetch('http://192.168.12.135:6969/custom_sensitivity2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data0: data0,
            data1: data1,
            dataRange: dataRange,
        })
    });
    data = await response.json();
    dataCov = data.dataCov;

    createCorrelationTable();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function createTable1(csvData) {
        if (table1Content) { table1Content.destroy(); }
        var table1Settings = Object.assign({}, tableSettingsCommon);
        table1Settings.data = csvData;
        table1Settings.colHeaders = [ 'freq', 'pc', 'p1_0', 'p1_1', 'p2_0', 'p2_1', 'p3_0', 'p3_1', 'sigma' ];

        table1Content = new Handsontable(table1Element, table1Settings);
    }

    function createTable2() {
        if (table2Content) { table2Content.destroy(); }
        const table2Element = document.getElementById('table2');
        const table2Settings = Object.assign({}, tableSettingsCommon);

       optionsSimpleNorm.forEach(option => {
           if (option.checked) {
               selectedOption = option.value;
           }
       });

       if (selectedOption == "simple") {
           table2Settings.data = dataForTable20;
       } else {
           table2Settings.data = dataForTable21;
       }
        table2Settings.numericFormat.pattern = '0,0.000';
        table2Settings.colHeaders = [ 'freq', 'p1', 'p2', 'p', ];

        table2Content = new Handsontable(table2Element, table2Settings);
    }

    function createCorrelationTable() {
        if (correlationTableContent) { correlationTableContent.destroy(); }
        var correlationTableElement = document.getElementById('correlationTable');
        var correlationTableSettings = Object.assign({}, tableSettingsCommon);
        correlationTableSettings.data = dataCov;
        correlationTableSettings.colHeaders = [ 'p1', 'p2', 'p3', ];
        correlationTableSettings.rowHeaders = [ 'p1', 'p2', 'p3', ];

        correlationTableContent = new Handsontable(correlationTableElement, correlationTableSettings);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function modifyRange() {
        var xMin1 = settingTable.getDataAtCell(0,0);
        var xMax1 = settingTable.getDataAtCell(0,1);
        var yMin1 = settingTable.getDataAtCell(0,2);
        var yMax1 = settingTable.getDataAtCell(0,3);

        var xMin2 = settingTable.getDataAtCell(1,0);
        var xMax2 = settingTable.getDataAtCell(1,1);
        var yMin2 = settingTable.getDataAtCell(1,2);
        var yMax2 = settingTable.getDataAtCell(1,3);

        var xMin3 = settingTable.getDataAtCell(2,0);
        var xMax3 = settingTable.getDataAtCell(2,1);
        var yMin3 = settingTable.getDataAtCell(2,2);
        var yMax3 = settingTable.getDataAtCell(2,3);

        scatterChart1.options.scales = {
            x: {
                min: xMin1,
                max: xMax1,
            },
            y: {
                min: yMin1,
                max: yMax1,
            }
        };
        scatterChart2.options.scales = {
            x: {
                min: xMin2,
                max: xMax2,
            },
            y: {
                min: yMin2,
                max: yMax2,
            }
        };
        scatterChart3.options.scales = {
            x: {
                min: xMin3,
                max: xMax3,
            },
            y: {
                min: yMin3,
                max: yMax3,
            }
        };

        scatterChart1.update();
        scatterChart2.update();
        scatterChart3.update();
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function drawchart1() {
        var xData1 = table2Content.getDataAtCol(0);
        var yData10 = table2Content.getDataAtCol(1);
        var yData11 = table2Content.getDataAtCol(4);
        var yData12 = table2Content.getDataAtCol(7);

        chartSettingsScatPoint1 = [Object.assign({}, chartSettingsScatPoint)];
        chartSettingsScatPoint1[0].data = xData1.map((value, index) => ({ x: value, y: yData10[index] }));

        chartSettingsScatPoint1.push(Object.assign({}, chartSettingsBarCommon));
        chartSettingsScatPoint1[1].data = xData1.map((value, index) => ({ x: value, y: yData11[index] }));

        chartSettingsScatPoint1.push(Object.assign({}, chartSettingsBarOverlap));
        chartSettingsScatPoint1[2].data = xData1.map((value, index) => ({ x: value, y: yData12[index] }));


        console.log(chartSettingsScatPoint1);
        scatterChart1.data.datasets = [
            chartSettingsScatPoint1[0],
            chartSettingsScatPoint1[2],
            chartSettingsScatPoint1[1],
        ];

        if (!checkKeepAxis.checked) {
            scatterChart1.options.scales = {
                x: {
                    min: xData1.min,
                    max: xData1.max
                }
            };
        } else {
        }
        scatterChart1.update();
    }

    function drawchart2() {
        var xData1 = table2Content.getDataAtCol(0);
        var yData20 = table2Content.getDataAtCol(2);
        var yData21 = table2Content.getDataAtCol(5);
        var yData22 = table2Content.getDataAtCol(8);

        chartSettingsScatPoint2 = [Object.assign({}, chartSettingsScatPoint)];
        chartSettingsScatPoint2[0].data = xData1.map((value, index) => ({ x: value, y: yData20[index] }));

        chartSettingsScatPoint2.push(Object.assign({}, chartSettingsBarCommon));
        chartSettingsScatPoint2[1].data = xData1.map((value, index) => ({ x: value, y: yData21[index] }));

        chartSettingsScatPoint2.push(Object.assign({}, chartSettingsBarOverlap));
        chartSettingsScatPoint2[2].data = xData1.map((value, index) => ({ x: value, y: yData22[index] }));

        scatterChart2.data.datasets = [
            chartSettingsScatPoint2[0],
            chartSettingsScatPoint2[2],
            chartSettingsScatPoint2[1],
        ];

        if (!checkKeepAxis.checked) {
            scatterChart2.options.scales = {
                x: {
                    min: xData1.min,
                    max: xData1.max
                }
            };
        } else {
        }
        scatterChart2.update();
    }

    function drawchart3() {
        var xData1 = table2Content.getDataAtCol(0);
        var yData30 = table2Content.getDataAtCol(3);
        var yData31 = table2Content.getDataAtCol(6);
        var yData32 = table2Content.getDataAtCol(9);

        chartSettingsScatPoint3 = [Object.assign({}, chartSettingsScatPoint)];
        chartSettingsScatPoint3[0].data = xData1.map((value, index) => ({ x: value, y: yData30[index] }));

        chartSettingsScatPoint3.push(Object.assign({}, chartSettingsBarCommon));
        chartSettingsScatPoint3[1].data = xData1.map((value, index) => ({ x: value, y: yData31[index] }));

        chartSettingsScatPoint3.push(Object.assign({}, chartSettingsBarOverlap));
        chartSettingsScatPoint3[2].data = xData1.map((value, index) => ({ x: value, y: yData32[index] }));

        scatterChart3.data.datasets = [
            chartSettingsScatPoint3[0],
            chartSettingsScatPoint3[2],
            chartSettingsScatPoint3[1],
        ];

        if (!checkKeepAxis.checked) {
            scatterChart3.options.scales = {
                x: {
                    min: xData1.min,
                    max: xData1.max
                }
            };
        } else {
        }
        scatterChart3.update();
    }
