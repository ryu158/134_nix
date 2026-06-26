let panelCounter = 0;
var plotCount = -1;
const contextMenuHTable = {
  //https://handsontable.com/docs/8.2.0/demo-context-menu.html
  items: {
    'col_right': {
      name: 'insert column'
    },
    'remove_col': {
      name: 'remove column(s)'
    },
    'row_below': {
      name: 'insert row'
    },
    'remove_row': {
      name: 'remove row(s)'
    },
    freeze: {
      name: 'freeze(unfreeze: set A1)',
      callback: function(key, selection, event) {
        var sel = this.getSelected();
        this.updateSettings({
          fixedRowsTop: sel[0][2],
          fixedColumnsLeft: sel[0][3],
        });
      },
    },
    "sp1": '---------',

    plot: {
      name: 'Plot selected Data',
      submenu: {
        items: [
          {
            key: 'plot:heatMap',
            name: 'heatMap',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              let sheetName = tableName.replace('table', 'sheet');
              createNewPlot(sheetName);
              heatMapPlotData(getDataFromSelectedRange(tableName), 'plot'+plotCount);
            },
          },
          {
            key: 'plot:scatter',
            name: 'scatter',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              let sheetName = tableName.replace('table', 'sheet');
              createNewPlot(sheetName);
              scatterPlotData(getDataFromSelectedRange(tableName), 'plot'+plotCount);
            },
          },

        ]
      },
    },

    exportSelectedData: {
      name: 'Export Selected Data',
      callback: function(key, selection, event) {
        let tableName = this.view.hot.rootElement.id;
        exportDataToCSV(getDataFromSelectedRange(tableName));
      },
    },

    editRowHeader: {
      name: 'Edit Row Header',
      callback: function(key, selection, event) {
        var row = selection.start.row;
        var currentLabel = tableContent[table0].getDataAtCell(row, 0);
        var newLabel = prompt('Enter new label for Row ' + (row + 1), currentLabel);
        if (newLabel !== null) {
          hot.setDataAtCell(row, 0, newLabel);
        }
      }
    },
  },
};

function createNewSheet() {
  const panelName = `sheet${panelCounter}`;
  const tableName = `table${panelCounter}`;
  panelCounter++;

  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.id = panelName;
  panel.style = 'color:#EC7063; z-Index: 1';
  panel.innerHTML = `
    <div class="panel-header" onmousedown="bringToFront('${panelName}')">
      <span contenteditable="true" spellcheck="false" class="panel-title">${panelName}</span>
      <div class="panel-controls">
        <button class="panel-minimize" onclick="loadCSVFile('${tableName}')">\u2193</button>
        <button class="panel-minimize" onclick="exportToCSV('${tableName}')">\u2191</button>
        <button class="panel-minimize" onclick="toggleMinimize('${panelName}')">-</button>
        <button class="panel-minimize" onclick="toggleMaximize('${panelName}')">\u25A1</button>
        <button class="panel-close" onclick="closePanel('${panelName}')">×</button>
      </div>
    </div>
    <div class="panel-content" onmousedown="bringToFront('${panelName}'); handleMouseRightDown(event);">
      <div id='${tableName}'></div>
    </div>
    <div class="panel-resize-handle" onmousedown="bringToFront('${panelName}'); handleMouseDown(event);"></div>
    <script>
    </script/>
  `;

  document.body.appendChild(panel);
  let tableSettingsAtStartTemp = JSON.parse(JSON.stringify(tableSettingsAtStart));
  //tableSettingsAtStartTemp.contextMenu = ['row_below', 'col_right'];
  tableSettingsAtStartTemp.contextMenu = contextMenuHTable;
  tableContent[tableName] = new Handsontable(document.getElementById(tableName), tableSettingsAtStartTemp);
}


function createNewPlot(sheetName) {
  plotCount++;
  const plotName = 'plot' + plotCount;
  const panelName = plotName+'_panel';
  const currentPlot = document.createElement('div');
  currentPlot.className = 'panel';
  currentPlot.id = panelName;
  currentPlot.style = 'color:#EC7063; z-Index: 1; width: 550px; height: 480px;';
  currentPlot.innerHTML = `
    <div class="panel-header" onmousedown="bringToFront('${panelName}')">
      <span contenteditable="true" spellcheck="false" class="panel-title">${plotName}(${sheetName})</span>
      <div class="panel-controls">
        <button class="panel-minimize" onclick="toggleMinimize('${panelName}')">-</button>
        <button class="panel-minimize" onclick="toggleMaximize('${panelName}')">\u25A1</button>
        <button class="panel-close" onclick="closePanel('${panelName}')">×</button>
      </div>
    </div>
    <div class="panel-content" onmousedown="bringToFront('${panelName}'); handleMouseRightDown(event);">
      <div id='${plotName}'></div>
    </div>
    <div class="panel-resize-handle" onmousedown="bringToFront('${panelName}'); handleMouseDown(event);"></div>
    <script>
    </script/>
  `;

  document.body.appendChild(currentPlot);
}

let isDragging = false;
let isResizing = false;
let offsetX, offsetY;
let initialWidth, initialHeight;
let isMinimized = false;
let isMaximized = false;
let currentPanel;

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(e) {
  const panelHeader = e.target.closest('.panel-header');
  const panelResizeHandle = e.target.closest('.panel-resize-handle');

  if (panelHeader) {
    isDragging = true;
    offsetX = e.clientX - panelHeader.getBoundingClientRect().left;
    offsetY = e.clientY - panelHeader.getBoundingClientRect().top;
    currentPanel = panelHeader.closest('.panel');
    initialWidth = currentPanel.offsetWidth;
    initialHeight = currentPanel.offsetHeight;
  } else if (panelResizeHandle) {
    isResizing = true;
    offsetX = panelResizeHandle.getBoundingClientRect().left;
    offsetY = panelResizeHandle.getBoundingClientRect().top;
    currentPanel = panelResizeHandle.closest('.panel');
    initialWidth = currentPanel.offsetWidth;
    initialHeight = currentPanel.offsetHeight;
  }
}

function handleMouseMove(e) {
  if (isDragging) {
    // const panel = document.querySelector('.panel');
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    // panel.style.left = `${x}px`;
    // panel.style.top = `${y}px`;
    currentPanel.style.left = `${x}px`;
    currentPanel.style.top = `${y}px`;
  } else if (isResizing) {
    const newWidth = e.clientX - offsetX + initialWidth;
    const newHeight = e.clientY - offsetY + initialHeight;

    currentPanel.style.width = `${Math.max(newWidth, 200)}px`; // Minimum width is set to 200px
    currentPanel.style.height = `${Math.max(newHeight, 100)}px`; // Minimum height is set to 100px
    const currentPlotName = currentPanel.id.replace("_panel", "");
    updatePlotSize(currentPlotName,Math.max(newWidth, 200),Math.max(newHeight, 100)*0.95);
  }
}

function handleMouseUp() {
  isDragging = false;
  isResizing = false;
}

// document.addEventListener('mousemove', drag);
// document.addEventListener('mouseup', stopDragging);

function startDragging(e) {
  isDragging = true;
  offsetX = e.clientX - e.target.getBoundingClientRect().left;
  offsetY = e.clientY - e.target.getBoundingClientRect().top;
}

function drag(e) {
  if (!isDragging) return;
  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;

  e.target.style.left = `${x}px`;
  e.target.style.top = `${y}px`;
}

function stopDragging() {
  isDragging = false;
}

function toggleMinimize(panelName) {
  isMinimized = !isMinimized;
  const panel = document.getElementById(panelName);

  if (isMinimized) {
    panel.style.height = '40px';
    panel.style.width = '80px';
    panel.style.overflow = 'hidden';
  } else {
    panel.style.height = '210px';
    panel.style.width = '320px';
    panel.style.overflow = 'hidden';
  }
}

function toggleMaximize(panelName) {
  isMaximized = !isMaximized;
  const panel = document.getElementById(panelName);
  const currentPlotName = currentPanel.id.replace("_panel", "");

  if (isMaximized) {
    panel.style.left = '2px';
    panel.style.top = '22px';
    panel.style.width = '99.5%';
    panel.style.height = '97.5%';
    panel.style.overflow = 'hidden';
    try {
      updatePlotSize(currentPlotName,window.innerWidth * 0.995,window.innerHeight * 0.945);
    } catch (error) {  }
  } else {
    panel.style.width = '320px';
    panel.style.height = '290px';
    panel.style.overflow = 'hidden';
    try {
      updatePlotSize(currentPlotName,320,265);
    } catch (error) {  }
  }
}


function closePanel(panelName) {
  const panel = document.getElementById(panelName);
  panel.style.display = 'none';
}


function bringToFront(panelID) {
  const panels = document.querySelectorAll('.panel');
  const panel = document.getElementById(panelID);
  // Set the clicked panel to the highest z-index
  panels.forEach(p => {
    const zIndex = parseInt(window.getComputedStyle(p).zIndex, 10);
    p.style.zIndex = 1;
  });

  panel.style.zIndex = 2;
}


var sheetName;
function handleMouseRightDown(e) {
  if (e.button == 2) {
    const panelContent = e.target.closest('.panel-content');
    currentPanel = panelContent.closest('.panel');
    currentTableName = currentPanel.id.replace("sheet", "table");
    currentPanel.addEventListener('contextmenu', (e) => {
      e.preventDefault(); // Prevent the default context menu
      popup.style.left = `${e.clientX}px`; // Set the popup position based on mouse coordinates
      popup.style.top = `${e.clientY}px`;
      popup.style.display = 'block';
    });
    document.addEventListener('click', (e) => {
      if (e.target !== currentPanel) {
        popup.style.display = 'none';
      }
    });

    dataSelected = getDataFromSelectedRange(currentTableName);
    sheetName = currentPanel.id;
  }
}

function updatePlotSize(plotName,w,h) {
  // New layout options
  var newLayout = {
    width: w,
    height: h,
  };

  // Update the layout
  try {
    Plotly.update(plotName, {}, newLayout);
  } catch (error) {  }
}


function loadCSVFile(tableName) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.csv';
  fileInput.addEventListener('change', handleFileSelection);
  fileInput.click();

  function handleFileSelection() {
    const output = document.getElementById('output');

    // Check if a file is selected
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Callback function when reading is completed
      reader.onload = function (e) {
        const csvData = e.target.result;
        var csvDataAOA = convertToAOA(csvData);
        createTableAny(tableName,csvDataAOA);
        // Display the CSV data in the output element
        // output.textContent = csvData;
        // You can parse the CSV data and perform further processing here
        // Example: parseCSV(csvData);
      };

      // Read the file as text
      reader.readAsText(file);
    } else {
      output.textContent = 'Please select a CSV file.';
    }
  }
}

function exportToCSV(tableName) {
    var Data0 = tableContent[tableName].getData();
    const csvFormat = Data0.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvFormat], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data0.csv';
    a.click();
    URL.revokeObjectURL(url);
}

function exportDataToCSV(Data0) {
    const csvFormat = Data0.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvFormat], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data0.csv';
    a.click();
    URL.revokeObjectURL(url);
}

function convertToAOA(csvData) {
    var rows = csvData.split("\n");
    var csvDataAOA = rows.map(row => row.split(/[\t,]/));
    return csvDataAOA;
}

function createTableAny(tableName, csvData) {
    var tableElement = document.getElementById(tableName);
    let tableSettings = JSON.parse(JSON.stringify(tableSettingsAtStart));
    tableSettings.contextMenu = contextMenuHTable;
    tableSettings.data = csvData;
    tableContent[tableName] = new Handsontable(tableElement, tableSettings);
}








// let isDragging = false;
// let offsetX, offsetY;
// let isMinimized = false;

// const panel = document.getElementById('panel');
// const panelHeader = document.getElementById('panelHeader');

// panelHeader.addEventListener('mousedown', startDragging);
// document.addEventListener('mousemove', drag);
// document.addEventListener('mouseup', stopDragging);

// function startDragging(e) {
//   isDragging = true;
//   offsetX = e.clientX - panel.getBoundingClientRect().left;
//   offsetY = e.clientY - panel.getBoundingClientRect().top;
// }

// function drag(e) {
//   if (!isDragging) return;
//   const x = e.clientX - offsetX;
//   const y = e.clientY - offsetY;

//   panel.style.left = `${x}px`;
//   panel.style.top = `${y}px`;
// }

// function stopDragging() {
//   isDragging = false;
// }

// function toggleMinimize() {
//   isMinimized = !isMinimized;
//   if (isMinimized) {
//     panel.style.height = '40px';
//     panel.style.overflow = 'hidden';
//   } else {
//     panel.style.height = '200px';
//     panel.style.overflow = 'auto';
//   }
// }

// function closePanel() {
//   panel.style.display = 'none';
// }
