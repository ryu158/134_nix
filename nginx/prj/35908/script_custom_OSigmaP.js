     async function calSensitivity() {
       var data0 = tableContent.table0.getData();
       var data1 = tableContent.table1.getData();

       const response = await fetch('http://192.168.12.135:6969/custom_sensitivity_for_OSP', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               data0: data0,
               data1: data1,
           })
       });
       data = await response.json();
       dataForTable20 = data.data0;
       dataCov = data.dataCov;

       createTableAny('table3',dataForTable20);
       drawchart1();
       drawchart2();
       drawchart3();

       createCorrelationTable();
    }

     async function genNoiseData() {
       var data1 = tableContent.table1.getData();
       var sampleNum = document.getElementById('sampleNum').value;
       var oneSigma = document.getElementById('oneSigma').value;
       var arrival = 'http://192.168.12.135:6969/custom_OSigmaP_Noise';

       const response = await fetch(arrival, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             data1: data1,
             sampleNum: sampleNum,
             oneSigma: oneSigma,
           })
       });
       data = await response.json();
       data1 = data.data1;

       createTableAny('table2',data1);
    }

     async function genCovY() {
       var data2 = tableContent.table2.getData();
       var data3 = tableContent.table3.getData();
       var sampleNum = document.getElementById('sampleNum').value;
       var dataNum = data3.length;
       var arrival;

       optionsCovY.forEach(option => {
           if (option.checked) {
               selectedOption = option.value;
           }
       });

       if (selectedOption == "fromNoise") {
         arrival = 'http://192.168.12.135:6969/custom_OSigmaP_genCovY';
       } else if (selectedOption == "rand") {
         arrival = 'http://192.168.12.135:6969/custom_OSigmaP_genCovY_rand';
       } else {
         arrival = 'http://192.168.12.135:6969/custom_OSigmaP_genCovY_unit';
       }

       const response = await fetch(arrival, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             data2: data2,
             sampleNum: sampleNum,
             dataNum: dataNum,
           })
       });
       data = await response.json();
       dataCovY = data.dataCovY;

       createTableAny('table4',dataCovY);
    }

     async function genWeight() {
       var data4 = tableContent.table4.getData();
       var dataNum = data4.length;
       var arrival;

       optionsWeight.forEach(option => {
           if (option.checked) {
               selectedOption = option.value;
           }
       });

       if (selectedOption == "unit") {
         arrival = 'http://192.168.12.135:6969/custom_OSigmaP_genWeight_unit';
       } else if (selectedOption == "rand") {
         arrival = 'http://192.168.12.135:6969/custom_OSigmaP_genWeight_rand';
       } else {
         arrival = 'http://192.168.12.135:6969/custom_OSigmaP_genWeight_covP-1';
       }

       const response = await fetch(arrival, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             data4: data4,
             dataNum: dataNum,
           })
       });
       data = await response.json();
       dataWeight = data.dataWeight;

       createTableAny('table5',dataWeight);
    }

     async function calOSigmaP() {
       var data3 = tableContent.table3.getData();
       var data4 = tableContent.table4.getData();
       var data5 = tableContent.table5.getData();
       var paramNum = (data3[0].length - 1);
       var dataNum = (data4[0].length);

       const response = await fetch('http://192.168.12.135:6969/custom_OSigmaP_calOSigmaP', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             data3: data3,
             data4: data4,
             data5: data5,
             paramNum: paramNum,
             dataNum: dataNum,
           })
       });
       data = await response.json();
       dataOSPSP = data.dataOSPSP;
       dataG = data.dataG;
       dataCovP = data.dataCovP;

       optionsOSigmaP.forEach(option => {
           if (option.checked) {
               selectedOption = option.value;
           }
       });

       if (selectedOption == "OSP,SP") {
         dataOS = dataOSPSP;
       } else if (selectedOption == "G") {
         dataOS = dataG;
       } else {
         dataOS = dataCovP;
       }

       createTableAny('oSigmaPTable',dataOS);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function showAll() {
      console.log('seperate');
      console.log(tableContent.table0.getData());
      console.log(tableContent.table1.getData());
      console.log(tableContent.table2.getData());
      console.log(tableContent.table3.getData());
      console.log(tableContent.table4.getData());
      console.log(tableContent.table5.getData());
    }

    function createTableAny(tableName, csvData) {
        var tableElement = document.getElementById(tableName);
        var tableSettings = Object.assign({}, tableSettingsCommon);
        var sampleNum = document.getElementById('sampleNum').value;
        tableSettings.data = csvData;

        if (tableName == 'table1') {
          tableSettings.height = '65%';
          tableSettings.colHeaders = [ ];
          tableSettingsAtStart0.colHeaders = [ ];
          tableSettings.colHeaders = ['freq', 'center',];
          for (let i = 1; i < (csvData[0].length)/2-1; i++) {
            tableSettings.colHeaders.push(...['p' + i +'_pre', 'p' + i + '_post',]);
            tableSettingsAtStart0.colHeaders.push(...['p' + i +'_cen', 'p' + i + '_post',]);
          }
          tableSettings.colHeaders.push('sigma');
          tableSettingsAtStart0.colHeaders.push('target(%)');
          tableContent.table0 = new Handsontable(table0Element, tableSettingsAtStart0);

      } else if (tableName == 'table3') {
        tableSettings.height = '71.3%';
        tableSettings.data = dataForTable20;
        tableSettings.colHeaders = ['freq',];
        for (let i = 1; i < 4; i++) {
          tableSettings.colHeaders.push(...['s' + i + ',']);
        }

      } else if (tableName == 'table2') {
        tableSettings.colHeaders = ['freq',];
        for (let i = 1; i < 4; i++) {
          for (let j = 1; j < (parseInt(sampleNum)+1); j++) {
            tableSettings.colHeaders.push(...['p' + i + ',']);
          }
        }

      } else {
        tableSettings.colHeaders = [ ];
        tableSettings.height = '71.3%';
        for (let i = 1; i < (parseInt(csvData.length)+1); i++) {
          tableSettings.colHeaders.push(...[ i ]);
        }

      }

        tableContent[tableName] = new Handsontable(tableElement, tableSettings);
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
        var xData1 = tableContent.table3.getDataAtCol(0);
        var yData10 = tableContent.table3.getDataAtCol(1);

        chartSettingsScatPoint1 = [Object.assign({}, chartSettingsScatPoint)];
        chartSettingsScatPoint1[0].data = xData1.map((value, index) => ({ x: value, y: yData10[index] }));

        scatterChart1.data.datasets = [
            chartSettingsScatPoint1[0],
        ];

        if (!checkKeepAxis.checked) {
            scatterChart1.options.scales = {
                x: {
                  min: xData1.min,
                  max: xData1.max
                },
                y: {
                    ticks: {
                        callback: function(value, index, values) {
                        return value.toExponential(1); // Convert ticks to scientific notation
                        },
                    },
                },
            };
        } else {
        }
        scatterChart1.update();
    }

    function drawchart2() {
        var xData1 =  tableContent.table3.getDataAtCol(0);
        var yData20 = tableContent.table3.getDataAtCol(2);

        chartSettingsScatPoint2 = [Object.assign({}, chartSettingsScatPoint)];
        chartSettingsScatPoint2[0].data = xData1.map((value, index) => ({ x: value, y: yData20[index] }));

        scatterChart2.data.datasets = [
            chartSettingsScatPoint2[0],
        ];

        if (!checkKeepAxis.checked) {
            scatterChart2.options.scales = {
                x: {
                    min: xData1.min,
                    max: xData1.max
                },
                y: {
                    ticks: {
                        callback: function(value, index, values) {
                        return value.toExponential(1); // Convert ticks to scientific notation
                        },
                    },
                },
            };
        } else {
        }
        scatterChart2.update();
    }

    function drawchart3() {
        var xData1 =  tableContent.table3.getDataAtCol(0);
        var yData30 = tableContent.table3.getDataAtCol(3);

        chartSettingsScatPoint3 = [Object.assign({}, chartSettingsScatPoint)];
        chartSettingsScatPoint3[0].data = xData1.map((value, index) => ({ x: value, y: yData30[index] }));

        scatterChart3.data.datasets = [
            chartSettingsScatPoint3[0],
        ];

        if (!checkKeepAxis.checked) {
            scatterChart3.options.scales = {
                x: {
                    min: xData1.min,
                    max: xData1.max
                },
                y: {
                    ticks: {
                        callback: function(value, index, values) {
                        return value.toExponential(1); // Convert ticks to scientific notation
                        },
                    },
                },
            };
        } else {
        }
        scatterChart3.update();
    }

    function drawDotChart1() {
      dataMatrix = tableContent.table4.getData();
      dataNum = dataMatrix.length;

      const data = [{
        z: dataMatrix,
        type: 'heatmap',
        colorscale: 'Portland',
      }];

      const layout = {
        width: 300,
        height: 200,
        margin: {
          l: 0,
          r: 0,
          t: 0,
          b: 0,
        },
        showlegend: false,
        xaxis: {
          showticklabels: false,
          showline: false,
        },
        yaxis: {
          showticklabels: false,
          showline: false,
          autorange: 'reversed',
        },
        modeBarButtonsToRemove: ['toImage'],
        coloraxis: {
          showscale: true,
          colorbar: {
            thickness: 10,
          },
        },
      };

      Plotly.newPlot('dotChart1', data, layout );
      // var xValues = [];
      // var yValues = [];
      // var zValues = [];
      // var maxValue;

      // for (let i = 0; i < dataNum; i++) {
      //   for (let j = 0; j < dataMatrix[i].length; j++) {
      //     xValues.push(i); // X values based on matrix row index
      //     yValues.push(j); // Y values based on matrix column index
      //     zValues.push(dataMatrix[i][j]); // Z values from the matrix
      //   }
      // }

      // maxValue = Math.max(...zValues);

      // dotChart1.data = {
      //   datasets: [{
      //     data: xValues.map((value, index) => ({ x: value, y: yValues[index], value: zValues[index] })),
      //     pointBackgroundColor: zValues.map(value => `rgba(255, 99, 132, ${(Math.abs(value / maxValue))})`), // Customizing point colors based on values
      //     pointRadius: Math.round(120/dataNum), // Adjust the point size as needed
      //     pointStyle: 'rect', // Use bubble type to control individual point appearance
      //     borderWidth: 0,
      //     fill: true,
      //   }]
      // };
      //

      // dotChart1.update();
    }

    function drawDotChart2() {
      dataMatrix = tableContent.table5.getData();
      dataNum = dataMatrix.length;

      const data = [{
        z: dataMatrix,
        type: 'heatmap',
        colorscale: 'Portland',
      }];

      const layout = {
        width: 300,
        height: 200,
        margin: {
          l: 0,
          r: 0,
          t: 0,
          b: 0,
        },
        showlegend: false,
        xaxis: {
          showticklabels: false,
          showline: false,
        },
        yaxis: {
          showticklabels: false,
          showline: false,
          autorange: 'reversed',
        },
        modeBarButtonsToRemove: ['toImage'],
        coloraxis: {
          showscale: true,
          colorbar: {
            thickness: 10,
          },
        },
      };

      Plotly.newPlot('dotChart2', data, layout );
    }
