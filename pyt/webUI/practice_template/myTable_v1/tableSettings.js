const hyperformulaInstance = HyperFormula.buildEmpty({
  licenseKey: 'internal-use-in-handsontable',
});

const tableSettingsAtStart = {
  data: [
    [ , , , , , ],
    [ , , , , , ],
    [ , , , , , ],
    [ , , , , , ],
    [ , , , , , ],
    [ , , , , , ],
    [ , , , , , ],
    [ , , , , , ],
  ],
  dropdownMenu: false,
  filters: false,
  allowEmpty: true,
  type: 'numeric',
  // numericFormat: {
  //     pattern: '0,0.000',
  // },
  // renderer: scientificRenderer,
  //contextMenu: contextMenuTest,
  manualColumnFreeze: true,
  colHeaders: true,
  rowHeaders: true,
  manualColumnResize: true,
  manualRowResize: true,
  customBorders: true,
  width: '100%',
  height: '90%',
  renderAllRows: false,
  outsideClickDeselects: false,
  selectionMode: 'multiple',
  licenseKey: 'non-commercial-and-evaluation',
  // formulas: { engine: hyperformulaInstance },
};

const contextMenuHTable = {
  //https://handsontable.com/docs/8.2.0/demo-context-menu.html
  items: {
    plot: {
      name: 'Plot selected Data',
      submenu: {
        items: [
          {
            key: 'plot:heatMap',
            name: 'heatMap',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              heatMapPlotData(getDataFromSelectedRange(tableName), 'plot1');
            },
          },
          {
            key: 'plot:scatter',
            name: 'scatter',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              scatterPlotData(getDataFromSelectedRange(tableName), getHeaderFromSelectedRange(tableName), 'plot1');
            },
          },
        ]
      },
    },
    dataPrcs: {
      name: 'Data Processing',
      submenu: {
        items: [
          {
            key: 'dataPrcs:rowToHeader',
            name: 'rowToHeader',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              var sel = this.getSelected();
              rowToHeader(tableName, sel[0][0]);
            },
          },
          {
            key: 'dataPrcs:trimEmpty',
            name: 'trimEmpty',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              removeEmptyRows(tableName);
              removeEmptyCols(tableName);
            },
          },
          {
            key: 'dataPrcs:exportSelectedData',
            name: 'exportSelectedData',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              exportDataToCSV(getDataFromSelectedRange(tableName));
            },
          },

        ]
      },
    },

    "sp1": '---------',
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
    "sp2": '---------',

    tableInfo: {
      name: 'Table Info',
      callback: function(key, selection, event) {
        console.log("tableID:", this.view.hot.rootElement.id);
      },
    },
  },
};
