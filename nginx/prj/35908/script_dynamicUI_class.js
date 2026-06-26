
class DynUI {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
        this.buttonList = {};
        this.inputList = {};
        this.fileInputList = {};
        this.fileNameList = {};
        this.selectList = {};
        this.checkBoxList = {};
        this.GroupedCheckBoxList = {};
        this.tableList = {};
        this.canvasList = {};
        this.chartList = {};
        this.plotList = {};

        this.tableSettings = {};
        this.chartSettings = {};
        this.plotLayoutList = {};
        this.tableDataList = {};

        this.tableSettingsAtStart = {
            data: [
                [ , ],
            ],
            allowEmpty: true,
            type: 'numeric',
            numericFormat: {
                pattern: '0,0.00',
            },
            colHeaders: true,
            rowHeaders: true,
            customBorders: true,
            width: '100%',
            height: '63.5%',
            renderAllRows: false,
            licenseKey: 'non-commercial-and-evaluation'
        }
        this.chartSettingsScatPoint = {
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

    }

    handleClick() {
        alert('button clicked!');
    }

    addTitle(titleText, font) {
        const title = document.createElement(font);
        title.textContent = titleText;
        this.container.appendChild(title);
    }

    addLabel(labelText) {
        const label = document.createElement('label');
        label.textContent = labelText;
        this.container.appendChild(label);
    }

    addLines(lineNum) {
        for (let i = 0; i <= lineNum; i++) {
            const line = document.createElement('br');
            this.container.appendChild(line);
        }
    }

    addSpace(spaceNum) {
            const space = document.createElement('div');
            space.style.display = 'inline-block';
            space.style.width = spaceNum + 'px';
            space.style.height = '1px';
            this.container.appendChild(space);
    }

    addButton(buttonID, buttonText) {
        const button = document.createElement('button');
        button.id = buttonID;
        button.textContent = buttonText;
        button.style = {
            width: '200px',
            height: '50px'
        };
        this.container.appendChild(button);
        this.buttonList[buttonID] = button;
    }

    addSelect(selectID) {
        const select = document.createElement('select');
        select.id = selectID;
        const option = document.createElement('option');
        option.value = 'no data';
        option.text = 'no data';
        select.appendChild(option);
        this.container.appendChild(select);
        this.selectList[selectID] = select;
    }

    modifySelect(selectID, options) {
        const select = document.getElementById(selectID);
        select.innerHTML ="";
        for (var option of options) {
            select.appendChild(option);
        }
    }

    addCheckBox(checkBoxName, checkBoxValue, defaultCheck = true) {
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.name = checkBoxName;
        check.value = checkBoxValue;
        check.checked = defaultCheck;
        this.container.appendChild(check);
        this.checkBoxList[checkBoxValue] = check;
    }

    addGroupedCheckBox(checkBoxName, valueList) {
        const groupCheckField = document.createElement('fieldset');
        this.container.appendChild(groupCheckField);

        const checkList = {};
        const numValue = valueList.length;
        for (let i = 0; i < numValue; i++ ) {
            checkList[i] = document.createElement('input');
            checkList[i].type = 'checkbox';
            checkList[i].name = checkBoxName;
            checkList[i].value = valueList[i];
            groupCheckField.appendChild(checkList[i]);
        }

        // this.groupCheckBoxList[checkBoxName] = checkList;
    }

    addInput(inputID, width, defaultValue) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = inputID;
        input.style.width = width;
        input.style.textAlign = 'center';
        input.value = defaultValue;
        this.container.appendChild(input);
        this.inputList[inputID] = input;
    }

    addFileInput(inputID, folder=false) {
        const input = document.createElement('input');
        input.type = 'file';
        input.id = inputID;
        input.accept = '.csv';
        input.multiple = true;
        input.webkitdirectory = folder;
        this.container.appendChild(input);
        this.fileInputList[inputID] = input;
    }

    addTable(tableID) {
        const table = document.createElement('div');
        table.id = tableID;
        this.container.appendChild(table);
        this.tableSettings[tableID] = Object.assign({}, this.tableSettingsAtStart);
        this.tableList[tableID]= new Handsontable(table, this.tableSettings[tableID]);
    }

    modifyTable(tableID, tableSettings) {
        const table = document.getElementById(tableID);
        this.tableList[tableID]= new Handsontable(table, tableSettings);
    }

    addChart(chartID, width, height){
        const canvas = document.createElement('canvas');
        canvas.id = chartID;
        canvas.width = width;
        canvas.height = height;

        this.container.appendChild(canvas);

        const chart = new Chart(canvas.getContext('2d'), {
            type: 'scatter',
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

        this.canvasList[chartID] = canvas;
        this.chartList[chartID] = chart;
        this.chartSettings[chartID] = Object.assign({}, this.chartSettingsScatPoint);

        chart.options = this.chartSettings[chartID];
    }

    addPlot(plotID, width, height) {

        const plotDiv = document.createElement('div');
        plotDiv.id = plotID;

        this.container.appendChild(plotDiv);

        const trace = {
            x: [],
            y: [],
            mode: 'markers',
            type: 'scatter',
            name: 'Dataset 2'
        };

        var layout = {
            autosize: false,
            width: this.container.offsetWidth * 90/100,
            height: width * (12 / 16),
            // width: width,
            // height: height,
            margin: {
                l: 20,
                r: 20,
                t: 20,
                b: 20,
            },
            legend: {
                showlegend: true,
                x: 0.5,  // Horizontal position (0.5 is centered)
                y: 1.2,  // Vertical position (1.1 is above the plot)
                orientation: 'h',  // Horizontal layout for the legend (default is vertical)
                xanchor: 'center',  // Align legend horizontally to the center
                yanchor: 'bottom'   // Align legend vertically to the bottom
            },
        };
        Plotly.newPlot(plotID, [trace], layout);
        //Plotly.newPlot(plotID + '_div', [trace], layout, { responsive: true});

        this.plotList[plotID] = plotDiv;
        this.plotLayoutList[plotID] = Object.assign({}, layout);
    }
}


// var options1 = [];

// const dynUI1 = new DynUI('dynUI1');
// dynUI1.addTitle('Input', 'h1');
// dynUI1.addLabel('Num of Header: ');
// dynUI1.addInput('input1', '40px', '37');
// dynUI1.addLabel(' , ');
// dynUI1.addLines(1);
// dynUI1.addLabel('column range to remove: ');
// dynUI1.addInput('input2', '35px', '3');
// dynUI1.addLabel(' ~ ');
// dynUI1.addInput('input3', '35px', '7');
// dynUI1.addLines(1);
// dynUI1.addFileInput('fileInput1');
// dynUI1.addLines(1);
// dynUI1.addLabel(' select csv file to show: ');
// dynUI1.addSelect('select1');
// dynUI1.addLabel(' , ');
// dynUI1.addLines(1);
// dynUI1.addTable('table1');

// const dynUI2 = new DynUI('dynUI2');
// dynUI2.addTitle('Output', 'h1');
// dynUI2.addLabel('truncate: under ');
// dynUI2.addInput('input2_tr', '35px', '0');
// dynUI2.addLabel('% , ');
// dynUI2.addLabel('over ');
// dynUI2.addInput('input2_trOver', '35px', '100');
// dynUI2.addLabel('%');
// dynUI2.addLines(1);
// dynUI2.addLabel('xAxis-cut: under ');
// dynUI2.addInput('input2_fc', '35px', '0');
// dynUI2.addLabel(' , ');
// dynUI2.addLabel('over ');
// dynUI2.addInput('input2_fcOver', '35px', '100');
// dynUI2.addLabel('');
// dynUI2.addLines(1);
// dynUI2.addButton('button2_1', 'calculate');

// dynUI2.addLabel(' ');
// dynUI2.addCheckBox('xUnit', 'nm');
// dynUI2.addLabel('nm, ');
// dynUI2.addCheckBox('xUnit', 'eV', false);
// dynUI2.addLabel('eV');

// // dynUI2.addGroupedCheckBox('xUint',['nm', 'eV']);

// dynUI2.addLines(1);
// dynUI2.addButton('button2_2', 'export to csv');
// dynUI2.addLines(1);
// dynUI2.addTable('table2_1');

// const dynUI3 = new DynUI('dynUI3');
// dynUI3.addTitle('Alpha Chart','h1');
// dynUI3.addTitle('Input data','h2');
// dynUI3.addPlot('plot3_1', 400, 250);
// dynUI3.addLines(1);
// dynUI3.addTitle('Output data','h2');
// dynUI3.addPlot('plot3_2', 400, 250);

// const dynUI4 = new DynUI('dynUI4');
// dynUI4.addTitle('Beta Chart','h1');
// dynUI4.addTitle('Input data','h2');
// dynUI4.addPlot('plot4_1', 400, 250);
// dynUI4.addLines(1);
// dynUI4.addTitle('Output data','h2');
// dynUI4.addPlot('plot4_2', 400, 250);



// dynUI1.fileInputList['fileInput1'].addEventListener('change', async function(event) {
//     var headerNum = +document.getElementById('input1').value;
//     var colRanMin = +document.getElementById('input2').value;
//     var colRanMax = +document.getElementById('input3').value;
//     var fileNum = dynUI1.fileInputList.fileInput1.files.length;

//     options1 = [];
//     for (i = 0; i < fileNum; i++) {
//         const option = document.createElement('option');
//         option.value = (i+1).toString();
//         option.text = (i+1).toString();
//         options1[i] = option;
//     }

//     await loadCSVsFromFolder(dynUI1, 'fileInput1', 'table1', headerNum, colRanMin, colRanMax);
//     dynUI1.modifySelect('select1', options1);
//     dynUI1.selectList['select1'].value = fileNum.toString();
//     dynUI1.selectList['select1'].text = fileNum.toString();

//     dynUI2.inputList['input2_fcOver'].value = dynUI1.tableDataList[fileNum - 1].length/2;
// });


// dynUI1.selectList['select1'].addEventListener('change', function(event) {
//     const container = dynUI1;
//     const selNum = +container.selectList['select1'].value;
//     var dataTable1 = dynUI1.tableDataList[selNum-1];
//     var dataTable2 = dynUI2.tableDataList[selNum-1];

//     dynUI1.tableSettings['table1'].data = dataTable1;
//     dynUI1.modifyTable('table1', dynUI1.tableSettings['table1']);
//     dynUI2.tableSettings['table2_1'].data = dynUI2.tableDataList[selNum-1].amp_result;
//     dynUI2.modifyTable('table2_1', dynUI2.tableSettings['table2_1']);

//     var waveLength = dataTable1.map(row => row[0]);
//     var alpha = dataTable1.map(row => row[1]);
//     var beta = dataTable1.map(row => row[2]);
//     var frequency = dataTable2.amp_result.map(row => row[0]);
//     var amp_alpha = dataTable2.amp_result.map(row => row[1]);
//     var amp_beta = dataTable2.amp_result.map(row => row[2]);

//     var iFFT_alpha = dataTable2.iFFT_result.map(row => row[1]);
//     var iFFT_beta = dataTable2.iFFT_result.map(row => row[2]);

//     var xAxis = waveLength;

//     if(dynUI2.checkBoxList['eV'].checked) {
//         xAxis = energyLevel;
//     }

//     const traceAlpha = {
//         x: xAxis,
//         y: alpha,
//         mode: 'markers',
//         type: 'scatter',
//         name: 'input',

//         line: {
//             color: 'blue',
//             width: 1,
//             dash: 'dot',
//         },
//         marker: {
//             size: 3,
//         }
//     };

//     const traceiFFTAlpha = {
//         x: xAxis,
//         y: iFFT_alpha,
//         mode: 'lines',
//         type: 'scatter',
//         name: 'iFFT',

//         line: {
//             color: 'red',
//             width: 1,
//             dash: 'solid',
//         },
//         marker: {
//             size: 3,
//         }
//     };

//     const traceBeta = Object.assign({}, traceAlpha);
//     traceBeta.y = beta;

//     const traceAmpAlpha = Object.assign({}, traceAlpha);
//     traceAmpAlpha.x = frequency;
//     traceAmpAlpha.y = amp_alpha;
//     traceAmpAlpha.mode = 'lines';
//     traceAmpAlpha.line.dash = 'solid';

//     const traceAmpBeta = Object.assign({}, traceAlpha);
//     traceAmpBeta.x = frequency;
//     traceAmpBeta.y = amp_beta;
//     traceAmpBeta.mode = 'lines';
//     traceAmpBeta.line.dash = 'solid';

//     const traceiFFTBeta = Object.assign({}, traceiFFTAlpha);
//     traceiFFTBeta.y = iFFT_beta;



//     Plotly.newPlot('plot3_1', [traceAlpha], dynUI3.plotLayoutList['plot3_1']);
//     Plotly.addTraces('plot3_1', [traceiFFTAlpha]);
//     Plotly.newPlot('plot3_2', [traceAmpAlpha], dynUI3.plotLayoutList['plot3_1']);

//     Plotly.newPlot('plot4_1', [traceBeta], dynUI3.plotLayoutList['plot3_1']);
//     Plotly.addTraces('plot4_1', [traceiFFTBeta]);
//     Plotly.newPlot('plot4_2', [traceAmpBeta], dynUI3.plotLayoutList['plot3_1']);


//     // dynUI3.chartSettings['chart3_1'] = {
//     //     backgroundColor: "rgba(75, 192, 192, 0.6)",
//     //     borderColor: "rgba(75, 192, 192, 0.6)",
//     //     showLine: true,
//     //     borderWidth: 5,
//     //     borderDash: [1, 1],
//     // };
//     // // drawChart2(waveLength, [alpha, beta], dynUI3.chartList['chart3_1']);
//     // // drawChart(waveLength, alpha, dynUI3.chartList['chart3_1'], dynUI3, dynUI3.chartSettings['chart3_1']);
//     // drawChart(frequency, amp_alpha, dynUI3.chartList['chart3_2'], dynUI3);
// })


// dynUI2.buttonList['button2_1'].addEventListener('click',async function(event) {

//     var fileNum = dynUI1.fileInputList.fileInput1.files.length;

//     for (i = 0; i < fileNum; i++) {
//         var dataTemp = dynUI1.tableDataList[i].map(row => [...row]);
//         // if(dynUI2.checkBoxList['eV'].checked) {

//         //     dataTemp = dataTemp.map(row => {
//         //         row[0] = 1240 / row[0];
//         //         return row;
//         //     });
//         // }
//         const trRatio = document.getElementById('input2_tr').value;
//         const trRatioOver = document.getElementById('input2_trOver').value;

//         const freqCut = document.getElementById('input2_fc').value;
//         const freqCutOver = document.getElementById('input2_fcOver').value;

//         await console.log(dataTemp);
//         const response = await fetch('http://192.168.12.135:6969/FFTMulti', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 check: true,
//                 data: dataTemp,
//                 truncateRatio: trRatio,
//                 truncateRatioOver: trRatioOver,
//                 frequencyCut: freqCut,
//                 frequencyCutOver: freqCutOver,
//             })
//         });

//         data = await response.json();

//         dynUI2.tableDataList[i] = Object.assign({}, data);
//     }

//     const selNum = +dynUI1.selectList['select1'].value;
//     dynUI2.tableSettings['table2_1'].data = dynUI2.tableDataList[selNum-1].amp_result;
//     dynUI2.modifyTable('table2_1', dynUI2.tableSettings['table2_1']);

//     var dataTable1 = dynUI1.tableDataList[selNum-1];
//     var dataTable2 = dynUI2.tableDataList[selNum-1];

//     var waveLength = dataTable1.map(row => row[0]);
//     var energyLevel = dataTable1.map(row => 1240/row[0]);
//     var alpha = dataTable1.map(row => row[1]);
//     var beta = dataTable1.map(row => row[2]);
//     var frequency = dataTable2.amp_result.map(row => row[0]);
//     var amp_alpha = dataTable2.amp_result.map(row => row[1]);
//     var amp_beta = dataTable2.amp_result.map(row => row[2]);

//     var iFFT_alpha = dataTable2.iFFT_result.map(row => row[1]);
//     var iFFT_beta = dataTable2.iFFT_result.map(row => row[2]);

//     var xAxis = waveLength;

//     if(dynUI2.checkBoxList['eV'].checked) {
//         xAxis = energyLevel;
//     }

//     const traceAlpha = {
//         x: xAxis,
//         y: alpha,
//         mode: 'markers',
//         type: 'scatter',
//         name: 'input',

//         line: {
//             color: 'blue',
//             //color: 'rgba(75, 192, 192, 0.3)',
//             width: 1,
//             dash: 'dot',
//         },
//         marker: {
//             size: 3,
//         }
//     };

//     const traceiFFTAlpha = {
//         x: xAxis,
//         y: iFFT_alpha,
//         mode: 'lines',
//         type: 'scatter',
//         name: 'iFFT',

//         line: {
//             color: 'red',
//             //color: 'rgba(150, 100, 100, 0.6)',
//             width: 1,
//             dash: 'solid',
//         },
//         marker: {
//             size: 3,
//         }
//     };

//     const traceAmp = Object.assign({}, traceAlpha);
//     traceAmp.x = frequency;
//     traceAmp.y = amp_alpha;

//     traceAlpha.mode = 'lines';
//     traceAlpha.line.dash = 'soliBetad';
//     traceAlpha.line.width = 2;

//     const traceBeta = Object.assign({}, traceAlpha);
//     traceBeta.y = beta;
//     traceBeta.mode = 'lines';
//     traceBeta.line.dash = 'soliBetad';


//     const traceAmpAlpha = Object.assign({}, traceAlpha);
//     traceAmpAlpha.x = frequency;
//     traceAmpAlpha.y = amp_alpha;
//     traceAmpAlpha.mode = 'lines';
//     traceAmpAlpha.line.dash = 'solid';


//     const traceAmpBeta = Object.assign({}, traceAlpha);
//     traceAmpBeta.x = frequency;
//     traceAmpBeta.y = amp_beta;
//     traceAmpBeta.mode = 'lines';
//     traceAmpBeta.line.dash = 'solid';

//     const traceiFFTBeta = Object.assign({}, traceiFFTAlpha);
//     traceiFFTBeta.y = iFFT_beta;



//     Plotly.newPlot('plot3_1', [traceAlpha], dynUI3.plotLayoutList['plot3_1']);
//     Plotly.addTraces('plot3_1', [traceiFFTAlpha]);
//     Plotly.newPlot('plot3_2', [traceAmpAlpha], dynUI3.plotLayoutList['plot3_1']);

//     Plotly.newPlot('plot4_1', [traceBeta], dynUI3.plotLayoutList['plot3_1']);
//     Plotly.addTraces('plot4_1', [traceiFFTBeta]);
//     Plotly.newPlot('plot4_2', [traceAmpBeta], dynUI3.plotLayoutList['plot3_1']);

// })



// dynUI2.buttonList['button2_2'].addEventListener('click',async function(event) {
//     var fileNum = dynUI1.fileInputList.fileInput1.files.length;

//     for(i = 0; i < fileNum; i++) {
//         await exportToCSV(dynUI2, i);
//         await delay(500);
//     }
// })


// dynUI2.checkBoxList['nm'].addEventListener('change',async function(event) {
//     dynUI2.checkBoxList['eV'].checked = ! dynUI2.checkBoxList['eV'].checked;
//     document.getElementById('button2_1').click();
// })
// dynUI2.checkBoxList['eV'].addEventListener('change',async function(event) {
//     dynUI2.checkBoxList['nm'].checked = ! dynUI2.checkBoxList['nm'].checked;
//     document.getElementById('button2_1').click();
// })





// async function loadCSVsFromFolder(container, inputName, tableName, headerNum, colRanMin, colRanMax) {
//     const files = container.fileInputList[inputName].files;
//     let i = 0;

//     const filePromises = [];

//     for (const file of files) {
//         if (file.type === 'text/csv') {
//             const filePromise = new Promise((resolve, reject) => {
//                 const reader = new FileReader();

//                 reader.onload = function(e) {
//                     try {
//                         const csvDataOrigin = e.target.result;
//                         container.tableDataList[i] = formattingData(csvDataOrigin, headerNum, colRanMin, colRanMax);
//                         container.tableSettings[tableName].data = container.tableDataList[i];
//                         container.modifyTable(tableName, container.tableSettings[tableName]);
//                         i++;
//                         resolve();
//                     } catch (error) {
//                         reject(error);
//                     }
//                 };

//                 reader.onerror = function(e) {
//                     reject(new Error('Error reading file: ' + file.name));
//                 };

//                 reader.readAsText(file);
//             });

//             filePromises.push(filePromise);
//         } else {
//             console.log(`${file.name} is not a CSV file.`);
//         }
//     }

//     await Promise.all(filePromises);
// }


// // async function loadCSVsFromFolder(container, inputName, tableName, headerNum, colRanMin, colRanMax) {
// //     var files = container.fileInputList[inputName].files;
// //     let i = 0;

// //     for (const file of files) {
// //         if (file.type === 'text/csv') {
// //             const reader = await new FileReader();
// //             reader.onload = function(e) {
// //                 var csvDataOrigin = e.target.result;
// //                 container.tableDataList[i] = formattingData(csvDataOrigin, headerNum, colRanMin, colRanMax);
// //                 container.tableSettings[tableName].data = container.tableDataList[i];
// //                 container.modifyTable(tableName, container.tableSettings[tableName]);
// //                 i++;
// //             };
// //             reader.readAsText(file);
// //         } else {
// //             console.log(`${file.name} is not a CSV file.`);
// //         }
// //     }
// // }

// function formattingData(csvData, headerNum, colNumRangeMin, colNumRangeMax) {
//     var rows = csvData.split("\n");
//     var trimedRows = rows.slice(headerNum);
//     var csvDataAOA = trimedRows.map(row => {
//         let columns = row.split(/[\t,]/);
//         let updatedColumns = columns.slice(0, colNumRangeMin).concat(columns.slice(colNumRangeMax));
//         return updatedColumns;
//     });
//     return csvDataAOA;
// }

// async function exportToCSV(container, selNum) {
//     var Data0 = container.tableDataList[selNum].amp_result;
//     const csvFormat = Data0.map(row => row.join(',')).join('\n');
//     const blob = new Blob([csvFormat], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'data0.csv';
//     await a.click();
//     // URL.revokeObjectURL(url);
// }

// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }


// function drawChart(xData, yData, chart, chartContainer, options = null) {

//     if (options) {
//         chartSettingsScatPoint = [Object.assign({}, options)];
//     } else {

//         chartSettingsScatPoint = [Object.assign({}, chartContainer.chartSettingsScatPoint)];
//     }
//     chartSettingsScatPoint[0].data = xData.map((value, index) => ({ x: value, y: yData[index] }));

//     chart.data.datasets = [
//         chartSettingsScatPoint[0],
//     ];

//     chart.update();
// }


// function handleCSVFiles(dynUI, fileInputId, headerNum, colRanMin, colRanMax) {
//   return loadCSVsFromFolder(dynUI, fileInputId, 'table1', headerNum, colRanMin, colRanMax);
// }
// // function drawChart2(xData, yData, chart, chartContainer, options = null) {
// //     console.log(yData);
// //     console.log(yData.length);

// // //     if (options) {
// // //         chartSettingsScatPoint = [Object.assign({}, options)];
// // //     } else {

// // //         chartSettingsScatPoint = [Object.assign({}, chartContainer.chartSettingsScatPoint)];
// // //     }
// // //     chartSettingsScatPoint[0].data = xData.map((value, index) => ({ x: value, y: yData[index] }));

// // //     chart.data.datasets = [
// // //         chartSettingsScatPoint[0],
// // //     ];

// // //     chart.update();
// // }
