var tableSettingsAtStart1 = Object.assign({}, tableSettingsAtStart);
tableSettingsAtStart1.data = digitMap;
tableSettingsAtStart1.height = '50%';
// columnsConfig1 = columnsConfig.slice();
// for (var i = 0; i < tableSettingsAtStart1.data[0].length; i++) {
//   if (i === 0) {
//     columnsConfig1.push({ type: 'numeric', numericFormat: { pattern: '0,0', }, });
//   } else {
//     columnsConfig1.push({ renderer: scientificRenderer });
//   }
// }
// tableSettingsAtStart1.columns = columnsConfig1;
tableContent.table1 = new Handsontable(document.getElementById('table1'), tableSettingsAtStart1);


zValues = (tableContent.table1.getData()).map(row => row.map(value => value));
data = [{
    z: zValues,
    type: 'heatmap',
    colorscale: 'Viridis' // Choose your desired color scale
}];

Plotly.newPlot('plot1', data, layoutHeatMap, {scrollZoom: true});
