

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
//                 // console.log(file.webkitRelativePath);

//                 reader.onload = function(e) {
//                     try {
//                         const csvDataOrigin = e.target.result;
//                         container.fileNameList[i] = file.name;
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

async function loadCSVsFromFolder(container, inputName, tableName, headerNum, colRanMin, colRanMax) {
    const files = container.fileInputList[inputName].files;

    // Initialize fileNameList and tableDataList to maintain order
    container.fileNameList = new Array(files.length);
    container.tableDataList = new Array(files.length);

    const filePromises = Array.from(files).map((file, index) => {
        if (file.type === 'text/csv') {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = function(e) {
                    try {
                        const csvDataOrigin = e.target.result;
                        container.fileNameList[index] = file.name; // Use the index to maintain order
                        container.tableDataList[index] = formattingData(csvDataOrigin, headerNum, colRanMin, colRanMax);

                        container.tableSettings[tableName].data = container.tableDataList[index];
                        container.modifyTable(tableName, container.tableSettings[tableName]);

                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                };

                reader.onerror = function(e) {
                    reject(new Error('Error reading file: ' + file.name));
                };

                reader.readAsText(file);
            });
        } else {
            console.log(`${file.name} is not a CSV file.`);
            return Promise.resolve(); // Resolve immediately for non-CSV files
        }
    });

    await Promise.all(filePromises); // Wait for all files to be processed
}



// async function loadCSVsFromFolder(container, inputName, tableName, headerNum, colRanMin, colRanMax) {
//     var files = container.fileInputList[inputName].files;
//     let i = 0;

//     for (const file of files) {
//         if (file.type === 'text/csv') {
//             const reader = await new FileReader();
//             reader.onload = function(e) {
//                 var csvDataOrigin = e.target.result;
//                 container.tableDataList[i] = formattingData(csvDataOrigin, headerNum, colRanMin, colRanMax);
//                 container.tableSettings[tableName].data = container.tableDataList[i];
//                 container.modifyTable(tableName, container.tableSettings[tableName]);
//                 i++;
//             };
//             reader.readAsText(file);
//         } else {
//             console.log(`${file.name} is not a CSV file.`);
//         }
//     }
// }

function formattingData(csvData, headerNum, colNumRangeMin, colNumRangeMax) {
    var rows = csvData.split("\n");
    var trimedRows = rows.slice(headerNum);
    var csvDataAOA = trimedRows.map(row => {
        let columns = row.split(/[\t,]/);
        let updatedColumns = columns.slice(0, colNumRangeMin).concat(columns.slice(colNumRangeMax));
        return updatedColumns;
    });
    return csvDataAOA;
}

async function exportToCSV(container, selNum, ampPhs) {
    if(ampPhs === 0) {
        let Data0 = container.tableDataList[selNum].amp_result;
    } else {
        let Data0 = container.tableDataList[selNum].phs_result;
    }
    const csvFormat = Data0.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvFormat], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data0.csv';
    await a.click();
    // URL.revokeObjectURL(url);
}

async function exportToCSVSequentially(container, ampPhs, nameList) {
    let selNum = Object.keys(container.tableDataList).length;

    for (let i = 0; i < selNum; i++) {
        var ampPhs = 0;
        if(dynUI2.checkBoxList['phs'].checked) {
            ampPhs = 1;
        }

        let Data0 = container.tableDataList[i].amp_result;
        let addingText = '_amp';

        if (ampPhs === 0) {
        } else {
            Data0 = container.tableDataList[i].phs_result;
            addingText = '_phs';
        }

        const csvFormat = Data0.map(row => row.join(',')).join('\n');

        const blob = new Blob([csvFormat], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = nameList[i].slice(0, -4) + addingText  + '.csv';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);

        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

// async function exportToCSVSequentiallyFullAuto(container, ampPhs, nameList) {

//     const directoryHandle = await window.showDirectoryPicker();

//     var ampPhs = 0;
//     if(dynUI2.checkBoxList['phs'].checked) {
//         ampPhs = 1;
//     }

//     let selNum = Object.keys(container.tableDataList).length;

//     for (let i = 0; i < selNum; i++) {
//         let data, filename;
//         let addingText = '_amp';

//         if (ampPhs === 0) {
//             data = container.tableDataList[i].amp_result;
//         } else {
//             data = container.tableDataList[i].phs_result;
//             addingText = '_phs';
//         }

//         const csvFormat = data.map(row => row.join(',')).join('\n');
//         filename = nameList[i].slice(0, -4) + addingText  + '.csv';

//         const fileHandle = directoryHandle.getFileHandle(filename, { create: true });
//         const writableStream = fileHandle.createWritable();
//         await writableStream.write(csvFormat);
//         await writableStream.close();

//         console.log(`File ${filename} saved successfully.`);
//     }
// }

async function exportToCSVsAsZip(container, ampPhs, nameList) {
    const zip = new JSZip();

    var ampPhs = 0;
    if(dynUI2.checkBoxList['phs'].checked) {
        ampPhs = 1;
    }
    let zipText = 'amplitude'

    let selNum = Object.keys(container.tableDataList).length;
    for (let i = 0; i < selNum; i++) {
        let data, filename;
        let addingText = '_amp';

        if (ampPhs === 0) {
            data = container.tableDataList[i].amp_result;
        } else {
            data = dynUI2.tableDataList[i].phs_result.map(row =>
                row.map((value, index) => {
                    if (index === 0) {
                        return value;
                    } else {
                        return value / Math.PI * 180;
                    }
                })
            );

            addingText = '_phs';
            zipText = 'phase';
        }

        const csvFormat = data.map(row => row.join(',')).join('\n');
        filename = nameList[i].slice(0, -4) + addingText  + '.csv';

        zip.file(filename, csvFormat);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = await URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = await url;
    a.download = zipText + '.zip';
    await document.body.appendChild(a);
    await a.click();
    await document.body.removeChild(a);

    console.log('ZIP file exported successfully.');
}

async function exportToCSVsAsZip2(container, nameList) {
    const zip = new JSZip();

    let zipText = 'iFFT'

    let selNum = Object.keys(container.tableDataList).length;
    for (let i = 0; i < selNum; i++) {
        let data, filename;
        let addingText = '_iFFT';

        data = dynUI2.tableDataList[i].iFFT_result.map(row => [...row]);
        data.forEach(row => row.push(0));
        data.forEach(row => row.push(0));
        data.forEach(row => row.push(1));
        data.forEach(row => row.push(0));
        data.unshift(['Wavelength','Alpha','Beta','AlphaStd','BetaStd','MirrorTanPsi','MirrorDelta']);
        data.unshift(['RecipeType','SE']);
        data.unshift(['WavelengthShift','0.649']);
        data.unshift(['PolarizerAngle','35']);
        data.unshift(['AngularSpread','6.66586']);
        data.unshift(['AOI','66.80328']);
        data.unshift(['ScanCount','20']);
        data.unshift(['SEFilter','ND03']);
        data.unshift(['MeasureType',' ']);
        data.unshift(['Humidity','30']);
        data.unshift(['Temperature','10']);
        data.unshift(['StageZ','-1034.625']);
        data.unshift(['StageY','-6366.020508']);
        data.unshift(['StageX','5958.727539']);
        data.unshift(['WaferY','5000']);
        data.unshift(['WaferX','-6000']);
        data.unshift(['DieHeight','0']);
        data.unshift(['DieWidth','0']);
        data.unshift(['DieY','0']);
        data.unshift(['DieX','0']);
        data.unshift(['UseDieMap','False']);
        data.unshift(['SiteNumber','0']);
        data.unshift(['StageGroupName','G1']);
        data.unshift(['CassetteRecipeName','SiGe_Static_MNS1']);
        data.unshift(['FilmRecipeName','#3_10um']);
        data.unshift(['StageRecipeName','#3_SIGE_Static_150X_1st']);
        data.unshift(['WaferRecipeName','SKH_SiGe_100Pair_STATIC_150X_MNS1']);
        data.unshift(['WaferID','21']);
        data.unshift(['LotID',' ']);
        data.unshift(['TaskName','SiGe_Static_MNS1']);
        data.unshift(['WaferSize','0']);
        data.unshift(['AcquisitionTime','2024-11-11 22:36:00']);
        data.unshift(['SystemSoftwareVersion','v1.0']);
        data.unshift(['SystemID',' ']);
        data.unshift(['SystemModel','AEliT2021']);
        data.unshift(['SystemName','AEliT2021']);
        data.unshift(['FormatVersion','1.1.0']);

        const csvFormat = data.map(row => row.join(',')).join('\n');
        filename = nameList[i].slice(0, -4) + addingText  + '.csv';

        zip.file(filename, csvFormat);
    }


    const content = await zip.generateAsync({ type: 'blob' });
    const url = await URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = await url;
    a.download = zipText + '.zip';
    await document.body.appendChild(a);
    await a.click();
    await document.body.removeChild(a);

    console.log('ZIP file exported successfully.');
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function drawChart(xData, yData, chart, chartContainer, options = null) {

    if (options) {
        chartSettingsScatPoint = [Object.assign({}, options)];
    } else {

        chartSettingsScatPoint = [Object.assign({}, chartContainer.chartSettingsScatPoint)];
    }
    chartSettingsScatPoint[0].data = xData.map((value, index) => ({ x: value, y: yData[index] }));

    chart.data.datasets = [
        chartSettingsScatPoint[0],
    ];

    chart.update();
}


function handleCSVFiles(dynUI, fileInputId, headerNum, colRanMin, colRanMax) {
  return loadCSVsFromFolder(dynUI, fileInputId, 'table1', headerNum, colRanMin, colRanMax);
}
// function drawChart2(xData, yData, chart, chartContainer, options = null) {
//     console.log(yData);
//     console.log(yData.length);

// //     if (options) {
// //         chartSettingsScatPoint = [Object.assign({}, options)];
// //     } else {

// //         chartSettingsScatPoint = [Object.assign({}, chartContainer.chartSettingsScatPoint)];
// //     }
// //     chartSettingsScatPoint[0].data = xData.map((value, index) => ({ x: value, y: yData[index] }));

// //     chart.data.datasets = [
// //         chartSettingsScatPoint[0],
// //     ];

// //     chart.update();
// }
