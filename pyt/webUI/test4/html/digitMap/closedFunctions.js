
///////////////////////////////////////////////  UI level /////////////////////////////////////////////////////////
function selectedDataTo(tableNameFrom, tableNameTo) {
  tableSettingsAtStartSDT = Object.assign({}, tableSettingsAtStart);
  tableSettingsAtStartSDT.data = getDataFromSelectedRange(tableNameFrom);
  if (tableContent[tableNameTo]) { tableContent[tableNameTo].destroy() };
  tableContent[tableNameTo] = new Handsontable(document.getElementById(tableNameTo), tableSettingsAtStartSDT);
}

function plotsChoose() {
  var selectedOption = radio('optT');
  heatMapPlot(selectedOption, 'plot1');
}
function plotT1HeatMap() {
  dataPlotTemp = getDataFromSelectedRange('table1');
  heatMapPlotData(dataPlotTemp, 'plot1');
}
function plotT1Scatter() {
  dataPlotTemp = getDataFromSelectedRange('table1');
  scatterPlotData(dataPlotTemp, 'plot1');
}




///////////////////////////////////////////////  for table /////////////////////////////////////////////////////////
function scientificRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);

  if (typeof value === 'number') {
    // Convert number to scientific notation
    td.textContent = value.toExponential(2); // 2 represents the number of digits after the decimal point
  }
}

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
      colorscale: 'Viridis' // Choose your desired color scale
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
