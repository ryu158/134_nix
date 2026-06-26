

function plotsChoose() {
  var selectedOption = radio('optT');
  heatMapPlot(selectedOption, 'plot1');
}
function plotT1HeatMap() {
  dataSelectedTemp = dataSelected;
  createNewPlot(sheetName);
  heatMapPlotData(dataSelectedTemp, 'plot'+plotCount);
}
function plotT1Scatter() {
  dataSelectedTemp = dataSelected;
  createNewPlot(sheetName);
  scatterPlotData(dataSelectedTemp, 'plot'+plotCount);
}

///////////////////////////////////////////////  for table /////////////////////////////////////////////////////////

function getDataFromSelectedRange(tableName) {
  var selected = tableContent[tableName].getSelected(); // Get the selected range coordinates [startRow, startCol, endRow, endCol]
  var selectedData = [];

  for (var row = selected[0][0]; row <= selected[0][2]; row++) {
    var rowData = [];
    for (var i = 0; i <= selected.length-1; i++) {
      for (var col = selected[i][1]; col <= selected[i][3]; col++) {
        rowData.push(tableContent[tableName].getDataAtCell(row, col));
      }
    }
    selectedData.push(rowData);
  }

  return selectedData;
}

/////////////////////////////////////////////  for plot  /////////////////////////////////////////////////////////



function heatMapPlot(tableName, plotName) {
  dataPlotTemp = tableContent[tableName].getData()
  zValuesTemp = dataPlotTemp.map(row => row.map(value => value));
  dataTemp = [{
      z: zValuesTemp,
      type: 'heatmap',
      colorscale: 'Viridis' // Choose your desired color scaln
  }];

  Plotly.newPlot(plotName, dataTemp, layoutHeatMap, {scrollZoom: true});
}

function heatMapPlotData(dataPlotTemp, plotName) {
  zValuesTemp = dataPlotTemp.map(row => row.map(value => value));
  dataTemp = [{
      z: zValuesTemp,
      type: 'heatmap',
      colorscale: 'Viridis' // Choose your desired color scale
  }];

  Plotly.newPlot(plotName, dataTemp, layoutHeatMap, {scrollZoom: true});
}

function scatterPlotData(dataPlotTemp, plotName) {
  var trace = {
    x: getColumn(dataPlotTemp,0),
    type: 'scatter',
    colorscale: 'Viridis' // Choose your desired color scale
  };

  dataTemp = [];

  for (i = 1; i <= dataPlotTemp[0].length-1; i++) {
    traceTemp = Object.assign({}, trace);
    traceTemp.y = getColumn(dataPlotTemp,i);
    traceTemp.z = i;
    dataTemp.push(traceTemp);
  }

  Plotly.newPlot(plotName, dataTemp, layoutScatter, configPlotCommon);
}


/////////////////////////////////////////////  general utils  /////////////////////////////////////////////////////////
function radio(optionName) {
  var options = document.getElementsByName(optionName);
  options.forEach(option => {
    if (option.checked) {
        selectedOption = option.value;
    }
  });
  return selectedOption;
}

function getColumn(matrix, columnIndex) {
  return matrix.map(row => row[columnIndex]);
}
