const option1_File = document.createElement('option');
option1_File.value = 0;
option1_File.text = 'file';
const option1_Folder = document.createElement('option');
option1_Folder.value = 1;
option1_Folder.text = 'fold';


dynUI1.modifySelect('select1_fileFolder', [option1_File, option1_Folder]);
dynUI1.fileInputList['fileInput1'].webkitdirectory = false;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
dynUI1.selectList['select1_fileFolder'].addEventListener('change', function(event) {
    dynUI1.fileInputList['fileInput1'].webkitdirectory = dynUI1.selectList['select1_fileFolder'].value === '1';
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
dynUI1.fileInputList['fileInput1'].addEventListener('change', async function(event) {
    var headerNum = +document.getElementById('input1').value;
    var colRanMin = +document.getElementById('input2').value;
    var colRanMax = +document.getElementById('input3').value;
    var fileNum = dynUI1.fileInputList.fileInput1.files.length;

    options1 = [];
    for (i = 0; i < fileNum; i++) {
        const option = document.createElement('option');
        option.value = (i+1).toString();
        option.text = (i+1).toString();
        options1[i] = option;
    }

    await loadCSVsFromFolder(dynUI1, 'fileInput1', 'table1', headerNum, colRanMin, colRanMax);
    dynUI1.modifySelect('select1', options1);
    dynUI1.selectList['select1'].value = fileNum.toString();
    dynUI1.selectList['select1'].text = fileNum.toString();

    dynUI2.inputList['input2_fcOver'].value = dynUI1.tableDataList[fileNum - 1].length/2;
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

dynUI1.selectList['select1'].addEventListener('change', function(event) {
    const container = dynUI1;
    const selNum = +container.selectList['select1'].value;
    var dataTable1 = dynUI1.tableDataList[selNum-1];
    var dataTable2 = dynUI2.tableDataList[selNum-1];

    dynUI1.tableSettings['table1'].data = dataTable1;
    dynUI1.modifyTable('table1', dynUI1.tableSettings['table1']);

    if(dynUI2.checkBoxList['amp'].checked) {
        dynUI2.tableSettings['table2_1'].data = dynUI2.tableDataList[selNum-1].amp_result;
    } else {
        dynUI2.tableSettings['table2_1'].data = dynUI2.tableDataList[selNum-1].phs_result.map(row =>
            row.map((value, index) => {
                if (index === 0) {
                    return value;
                } else {
                    return value / Math.PI * 180;
                }
            })
        );
    }
    dynUI2.modifyTable('table2_1', dynUI2.tableSettings['table2_1']);

    var waveLength = dataTable1.map(row => row[0]);
    var energyLevel = dataTable1.map(row => 1240/row[0]);
    var alpha = dataTable1.map(row => row[1]);
    var beta = dataTable1.map(row => row[2]);
    var frequency = dataTable2.amp_result.map(row => row[0]);
    var amp_alpha = dataTable2.amp_result.map(row => row[1]);
    var amp_beta = dataTable2.amp_result.map(row => row[2]);
    var phs_alpha = dataTable2.phs_result.map(row => row[1]);
    var phs_beta = dataTable2.phs_result.map(row => row[2]);
    var phs_alpha_deg = phs_alpha.map(value => value / Math.PI * 180);
    var phs_beta_deg = phs_beta.map(value => value / Math.PI * 180);

    var iFFT_alpha = dataTable2.iFFT_result.map(row => row[1]);
    var iFFT_beta = dataTable2.iFFT_result.map(row => row[2]);

    var xAxis = waveLength;

    if(dynUI2.checkBoxList['eV'].checked) {
        xAxis = energyLevel;
    }

    const traceAlpha = {
        x: xAxis,
        y: alpha,
        mode: 'markers',
        type: 'scatter',
        name: 'input',

        line: {
            color: 'blue',
            width: 1,
            dash: 'dot',
        },
        marker: {
            size: 3,
        }
    };

    const traceiFFTAlpha = {
        x: xAxis,
        y: iFFT_alpha,
        mode: 'lines',
        type: 'scatter',
        name: 'iFFT',

        line: {
            color: 'red',
            width: 1,
            dash: 'solid',
        },
        marker: {
            size: 3,
        }
    };

    const traceBeta = Object.assign({}, traceAlpha);
    traceBeta.y = beta;

    const traceAmpAlpha = Object.assign({}, traceAlpha);
    traceAmpAlpha.x = frequency;
    traceAmpAlpha.y = amp_alpha;
    traceAmpAlpha.mode = 'lines';
    traceAmpAlpha.line.dash = 'solid';

    const traceAmpBeta = Object.assign({}, traceAlpha);
    traceAmpBeta.x = frequency;
    traceAmpBeta.y = amp_beta;
    traceAmpBeta.mode = 'lines';
    traceAmpBeta.line.dash = 'solid';

    const tracePhsAlpha = Object.assign({}, traceAmpAlpha);
    tracePhsAlpha.y = phs_alpha_deg;

    const tracePhsBeta = Object.assign({}, traceAmpBeta);
    tracePhsBeta.y = phs_beta_deg;

    const traceiFFTBeta = Object.assign({}, traceiFFTAlpha);
    traceiFFTBeta.y = iFFT_beta;


    Plotly.newPlot('plot3_1', [traceAlpha], dynUI3.plotLayoutList['plot3_1']);
    Plotly.newPlot('plot4_1', [traceBeta], dynUI3.plotLayoutList['plot3_1']);
    Plotly.addTraces('plot3_1', [traceiFFTAlpha]);
    Plotly.addTraces('plot4_1', [traceiFFTBeta]);

    Plotly.newPlot('plot3_2', [traceAmpAlpha], dynUI3.plotLayoutList['plot3_1']);
    Plotly.newPlot('plot4_2', [traceAmpBeta], dynUI3.plotLayoutList['plot3_1']);

    if(dynUI2.checkBoxList['amp'].checked) {
        Plotly.newPlot('plot3_2', [traceAmpAlpha], dynUI3.plotLayoutList['plot3_1']);
        Plotly.newPlot('plot4_2', [traceAmpBeta], dynUI3.plotLayoutList['plot3_1']);
    } else {
        Plotly.newPlot('plot3_2', [tracePhsAlpha], dynUI3.plotLayoutList['plot3_1']);
        Plotly.newPlot('plot4_2', [tracePhsBeta], dynUI3.plotLayoutList['plot3_1']);
    }


    // dynUI3.chartSettings['chart3_1'] = {
    //     backgroundColor: "rgba(75, 192, 192, 0.6)",
    //     borderColor: "rgba(75, 192, 192, 0.6)",
    //     showLine: true,
    //     borderWidth: 5,
    //     borderDash: [1, 1],
    // };
    // // drawChart2(waveLength, [alpha, beta], dynUI3.chartList['chart3_1']);
    // // drawChart(waveLength, alpha, dynUI3.chartList['chart3_1'], dynUI3, dynUI3.chartSettings['chart3_1']);
    // drawChart(frequency, amp_alpha, dynUI3.chartList['chart3_2'], dynUI3);
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
dynUI2.buttonList['button2_1'].addEventListener('click',async function(event) {

    var fileNum = dynUI1.fileInputList.fileInput1.files.length;
    var noiseLevel = parseFloat(dynUI1.inputList['input4'].value)/100;

    for (i = 0; i < fileNum; i++) {
        var dataTemp = dynUI1.tableDataList[i].map(row => [...row]);
        let colNum = dataTemp.length > 0 ? dataTemp[0].length : 0;
        for (j = 1; j < colNum; j++ ) {
            let absMax = Math.max(...dataTemp.map(row => Math.abs(row[j])));
            dataTemp.forEach(row => {
                let value = parseFloat(row[j]);
                row[j] = value + absMax * noiseLevel * (Math.random() - 0.5);
            })
        }
        // if(dynUI2.checkBoxList['eV'].checked) {

        //     dataTemp = dataTemp.map(row => {
        //         row[0] = 1240 / row[0];
        //         return row;
        //     });
        // }
        const trRatio = document.getElementById('input2_tr').value;
        const trRatioOver = document.getElementById('input2_trOver').value;

        const freqCut = document.getElementById('input2_fc').value;
        const freqCutOver = document.getElementById('input2_fcOver').value;

        const response = await fetch('http://192.168.12.135:6969/FFTMulti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                check: true,
                data: dataTemp,
                truncateRatio: trRatio,
                truncateRatioOver: trRatioOver,
                frequencyCut: freqCut,
                frequencyCutOver: freqCutOver,
            })
        });

        data = await response.json();

        dynUI2.tableDataList[i] = Object.assign({}, data);
    }

    const selNum = +dynUI1.selectList['select1'].value;

    if(dynUI2.checkBoxList['amp'].checked) {
        dynUI2.tableSettings['table2_1'].data = dynUI2.tableDataList[selNum-1].amp_result;
    } else {
        dynUI2.tableSettings['table2_1'].data = dynUI2.tableDataList[selNum-1].phs_result.map(row =>
            row.map((value, index) => {
                if (index === 0) {
                    return value;
                } else {
                    return value / Math.PI * 180;
                }
            })
        );
    }
    dynUI2.modifyTable('table2_1', dynUI2.tableSettings['table2_1']);

    var dataTable1 = dynUI1.tableDataList[selNum-1];
    var dataTable2 = dynUI2.tableDataList[selNum-1];

    var waveLength = dataTable1.map(row => row[0]);
    var energyLevel = dataTable1.map(row => 1240/row[0]);
    var alpha = dataTable1.map(row => row[1]);
    var beta = dataTable1.map(row => row[2]);
    var frequency = dataTable2.amp_result.map(row => row[0]);
    var amp_alpha = dataTable2.amp_result.map(row => row[1]);
    var amp_beta = dataTable2.amp_result.map(row => row[2]);
    var phs_alpha = dataTable2.phs_result.map(row => row[1]);
    var phs_beta = dataTable2.phs_result.map(row => row[2]);
    var phs_alpha_deg = phs_alpha.map(value => value / Math.PI * 180);
    var phs_beta_deg = phs_beta.map(value => value / Math.PI * 180);

    var iFFT_alpha = dataTable2.iFFT_result.map(row => row[1]);
    var iFFT_beta = dataTable2.iFFT_result.map(row => row[2]);

    var xAxis = waveLength;

    if(dynUI2.checkBoxList['eV'].checked) {
        xAxis = energyLevel;
    }

    const traceAlpha = {
        x: xAxis,
        y: alpha,
        mode: 'markers',
        type: 'scatter',
        name: 'input',

        line: {
            color: 'blue',
            //color: 'rgba(75, 192, 192, 0.3)',
            width: 1,
            dash: 'dot',
        },
        marker: {
            size: 3,
        }
    };

    const traceiFFTAlpha = {
        x: xAxis,
        y: iFFT_alpha,
        mode: 'lines',
        type: 'scatter',
        name: 'iFFT',

        line: {
            color: 'red',
            //color: 'rgba(150, 100, 100, 0.6)',
            width: 1,
            dash: 'solid',
        },
        marker: {
            size: 3,
        }
    };

    const traceAmp = Object.assign({}, traceAlpha);
    traceAmp.x = frequency;
    traceAmp.y = amp_alpha;

    traceAlpha.mode = 'lines';
    traceAlpha.line.dash = 'soliBetad';
    traceAlpha.line.width = 2;

    const traceBeta = Object.assign({}, traceAlpha);
    traceBeta.y = beta;
    traceBeta.mode = 'lines';
    traceBeta.line.dash = 'soliBetad';


    const traceAmpAlpha = Object.assign({}, traceAlpha);
    traceAmpAlpha.x = frequency;
    traceAmpAlpha.y = amp_alpha;
    traceAmpAlpha.mode = 'lines';
    traceAmpAlpha.line.dash = 'solid';


    const traceAmpBeta = Object.assign({}, traceAlpha);
    traceAmpBeta.x = frequency;
    traceAmpBeta.y = amp_beta;
    traceAmpBeta.mode = 'lines';
    traceAmpBeta.line.dash = 'solid';

    const tracePhsAlpha = Object.assign({}, traceAmpAlpha);
    tracePhsAlpha.y = phs_alpha_deg;

    const tracePhsBeta = Object.assign({}, traceAmpBeta);
    tracePhsBeta.y = phs_beta_deg;

    const traceiFFTBeta = Object.assign({}, traceiFFTAlpha);
    traceiFFTBeta.y = iFFT_beta;



    Plotly.newPlot('plot3_1', [traceAlpha], dynUI3.plotLayoutList['plot3_1']);
    Plotly.newPlot('plot4_1', [traceBeta], dynUI3.plotLayoutList['plot3_1']);
    Plotly.addTraces('plot3_1', [traceiFFTAlpha]);
    Plotly.addTraces('plot4_1', [traceiFFTBeta]);

    Plotly.newPlot('plot3_2', [traceAmpAlpha], dynUI3.plotLayoutList['plot3_1']);
    Plotly.newPlot('plot4_2', [traceAmpBeta], dynUI3.plotLayoutList['plot3_1']);

    if(dynUI2.checkBoxList['amp'].checked) {
        Plotly.newPlot('plot3_2', [traceAmpAlpha], dynUI3.plotLayoutList['plot3_1']);
        Plotly.newPlot('plot4_2', [traceAmpBeta], dynUI3.plotLayoutList['plot3_1']);
    } else {
        Plotly.newPlot('plot3_2', [tracePhsAlpha], dynUI3.plotLayoutList['plot3_1']);
        Plotly.newPlot('plot4_2', [tracePhsBeta], dynUI3.plotLayoutList['plot3_1']);
    }
})



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
dynUI2.buttonList['button2_2'].addEventListener('click',async function(event) {
    var fileNum = dynUI1.fileInputList.fileInput1.files.length;

    await exportToCSVsAsZip2(dynUI2, dynUI1.fileNameList);
})

// dynUI2.buttonList['button2_2'].addEventListener('click',async function(event) {
//     var fileNum = dynUI1.fileInputList.fileInput1.files.length;
//     var ampPhs = 0;
//     if(dynUI2.checkBoxList['phs'].checked) {
//         ampPhs = 1;
//     }

//     await exportToCSVSequentially(dynUI2, ampPhs, dynUI1.fileNameList);
//     // for(i = 0; i < fileNum; i++) {
//     //     await exportToCSV(dynUI2, i, ampPhs);
//     //     await delay(500);
//     // }
// })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
dynUI2.buttonList['button2_3'].addEventListener('click',async function(event) {
    var fileNum = dynUI1.fileInputList.fileInput1.files.length;
    var ampPhs = 0;
    if(dynUI2.checkBoxList['phs'].checked) {
        ampPhs = 1;
    }

    await exportToCSVsAsZip(dynUI2, ampPhs, dynUI1.fileNameList);
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
dynUI2.checkBoxList['nm'].addEventListener('change',async function(event) {
    dynUI2.checkBoxList['eV'].checked = ! dynUI2.checkBoxList['eV'].checked;
    document.getElementById('button2_1').click();
})
dynUI2.checkBoxList['eV'].addEventListener('change',async function(event) {
    dynUI2.checkBoxList['nm'].checked = ! dynUI2.checkBoxList['nm'].checked;
    document.getElementById('button2_1').click();
})

dynUI2.checkBoxList['amp'].addEventListener('change',async function(event) {
    dynUI2.checkBoxList['phs'].checked = ! dynUI2.checkBoxList['phs'].checked;
    document.getElementById('button2_1').click();
})
dynUI2.checkBoxList['phs'].addEventListener('change',async function(event) {
    dynUI2.checkBoxList['amp'].checked = ! dynUI2.checkBoxList['amp'].checked;
    document.getElementById('button2_1').click();
})
