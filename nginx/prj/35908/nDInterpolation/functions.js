let panelCounter = 0;
var panels = [];
var sheets = [];
let aoa = new AoaFunctions();

function createNewSheet(panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22', name=`sheets[${panelCounter}]`) {
  const panelName = `panels[${panelCounter}]`;
  // const sheetName = `sheets[${panelCounter}]`;
  sheets[panelCounter] = new MySheet(name, panelHeight, panelWidth, panelYposition, panelXposition);
  panelCounter++;
}

function createNewPlotPanel(panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22', name=`sheets[${panelCounter}]`) {
  const panelName = `panels[${panelCounter}]`;
  // const sheetName = `sheets[${panelCounter}]`;
  sheets[panelCounter] = new MyPlotPanel(name, panelHeight, panelWidth, panelYposition, panelXposition);
  panelCounter++;
}

function updatePlot(plotId) {
  newData = [];
  inputsData = sheets[0].tableCurrent.tableContent.getData();
  inputsPointsData = sheets[1].tableCurrent.tableContent.getData();
  // outputData = sheets[3].tableCurrent.tableContent.getData();
  inputsDataTr = aoa.transpose(inputsData);
  inputsPointsDataTr = aoa.transpose(inputsPointsData);
  // outputDataTr = aoa.transpose(outputData);
  // dataNum = inputsData[0].length + outputData[0].length -2;

  xData = inputsDataTr[0];
  console.log(xData);
  // console.log(dataNum);

  for (i = 1; i <= inputsData[0].length-1; i++) {
    traceTemp = { mode: 'lines', };
    traceTemp.x = xData;
    traceTemp.y = inputsDataTr[i];
    traceTemp.z = i/inputsData[0].length;
    traceTemp.name = String(inputsPointsDataTr[i][0]) + '_' + String(inputsPointsDataTr[i][1]);
    traceTemp.type = 'scatter';
    traceTemp.line = {
      dash: 'solid',
      width: 1,
    };
    newData.push(traceTemp);
  }
  Plotly.react(plotId, newData, layoutScatter, { scrollZoom: true, responsive: true});
}

function updatePlot2(plotId) {
  newData = [];
  inputsData = sheets[3].tableCurrent.tableContent.getData();
  inputsPointsData = sheets[2].tableCurrent.tableContent.getData();
  // outputData = sheets[3].tableCurrent.tableContent.getData();
  inputsDataTr = aoa.transpose(inputsData);
  inputsPointsDataTr = aoa.transpose(inputsPointsData);
  // outputDataTr = aoa.transpose(outputData);
  // dataNum = inputsData[0].length + outputData[0].length -2;

  xData = inputsDataTr[0];
  console.log(xData);
  // console.log(dataNum);

  for (i = 1; i <= inputsData[0].length-1; i++) {
    traceTemp = { mode: 'lines', };
    traceTemp.x = xData;
    traceTemp.y = inputsDataTr[i];
    traceTemp.z = i/inputsData[0].length;
    traceTemp.name = String(inputsPointsDataTr[i][0]) + '_' + String(inputsPointsDataTr[i][1]);
    traceTemp.type = 'scatter';
    traceTemp.line = {
      dash: 'solid',
      width: 1,
    };
    newData.push(traceTemp);
  }
  Plotly.react(plotId, newData, layoutScatter, { scrollZoom: true, responsive: true});
}


function bringToFront(panelID) {
  const panels = document.querySelectorAll('.panel');
  const panel = document.getElementById(panelID);

  // Set the clicked panel to the highest z-index
  let maxZIndex = 0;
  let minZIndex = 0;
  let count = 0;
  panels.forEach(p => {
    const zIndex = parseInt(window.getComputedStyle(p).zIndex, 10);
    maxZIndex = Math.max(maxZIndex, zIndex);
    minZIndex = Math.min(minZIndex, zIndex);
    count++;
    p.style.zIndex = p.style.zIndex - 1;
  });

  panel.style.zIndex = maxZIndex;
}

async function calculate() {
  var xData = aoa.transpose(sheets[0].tableCurrent.tableSettings.data)[0];
  var inputData  = aoa.deleteCoaToAoa(sheets[0].tableCurrent.tableSettings.data,0);
  var paramData  = aoa.deleteCoaToAoa(sheets[1].tableCurrent.tableSettings.data,0);
  var pointsData = aoa.deleteCoaToAoa(sheets[2].tableCurrent.tableSettings.data,0);
  // var inputData = aoa.transpose(aoa.deleteCoaToAoa(sheets[0].tableCurrent.tableSettings.data,0));
  // var paramData = aoa.transpose(aoa.deleteCoaToAoa(sheets[1].tableCurrent.tableSettings.data,0));
  // var pointsData = aoa.transpose(aoa.deleteCoaToAoa(sheets[2].tableCurrent.tableSettings.data,0));
  var paramHead = aoa.transpose(sheets[1].tableCurrent.tableSettings.data);
  // console.log(paramHead[0]);

  // console.log(inputData);
  // console.log(paramData);
  // console.log(pointsData);

  const response = await fetch('http://192.168.12.135:6969/nD_interpolation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      xData: xData,
      inputData: inputData,
      paramData: paramData,
      pointsData: pointsData,
      paramHead: paramHead[0],
    })
  });

  const data = await response.json();

  console.log(data.results);

  sheets[3].tableCurrent.tableContent.updateSettings({
    data: data.results,
    numericFormat: {
      pattern: '0,0.000',
    },
  });


  // sheets[3].tableCurrent.tableSettings.data = data.results;
  // sheets[3].tableCurrent.tableContent.updateSettings;


  // // createTableAny('table2', data.tst_X);
  // tableContent['table2'].updateSettings({
  //   data: data.tst_X,
  //   colHeaders: headerX,
  //   // colHeaders: removeElementsFromArray(header1, 2),
  //   // numericFormat: {
  //   //   pattern: '0,0.00',
  //   // },
  //   renderer: scientificRenderer,
  //   // formulas: {
  //   //   engine: HyperFormula,
  //   // },
  // });
}

async function calculate_internal_engine() {
  var xData = aoa.transpose(sheets[0].tableCurrent.tableSettings.data)[0];
  var inputData  = aoa.deleteCoaToAoa(sheets[0].tableCurrent.tableSettings.data,0);
  var paramData  = aoa.deleteCoaToAoa(sheets[1].tableCurrent.tableSettings.data,0);
  var pointsData = aoa.deleteCoaToAoa(sheets[2].tableCurrent.tableSettings.data,0);
  var paramHead = aoa.transpose(sheets[1].tableCurrent.tableSettings.data);

  const response = await fetch('http://192.168.12.135:6969/nD_interpolation_internal_engine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      xData: xData,
      inputData: inputData,
      paramData: paramData,
      pointsData: pointsData,
      paramHead: paramHead[0],
    })
  });

  const data = await response.json();

  console.log(data.results);

  sheets[3].tableCurrent.tableContent.updateSettings({
    data: data.results,
    numericFormat: {
      pattern: '0,0.000',
    },
  });
}
