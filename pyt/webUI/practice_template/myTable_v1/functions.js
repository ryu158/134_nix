
let tableCounter = 0;
let plotCounter = 0;
var panels = [];
var tables = [];
var plots = [];

function createNewTable(panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
  const tableName = `tables[${tableCounter}]`;
  tables[tableCounter] = new MyTablePanel(tableName, panelHeight, panelWidth, panelYposition, panelXposition);
  tableCounter++;
}

function createNewPlot(panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
  const plotName = `plots[${plotCounter}]`;
  plots[plotCounter] = new MyPlotPanel(plotName, panelHeight, panelWidth, panelYposition, panelXposition);
  plotCounter++;
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
