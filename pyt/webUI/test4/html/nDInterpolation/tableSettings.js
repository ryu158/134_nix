const hyperformulaInstance = HyperFormula.buildEmpty({
  licenseKey: 'internal-use-in-handsontable',
});

const tableSettingsAtStart = {
  data: [
    [ , , ],
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
  height: '91%',
  renderAllRows: false,
  outsideClickDeselects: false,
  selectionMode: 'multiple',
  licenseKey: 'non-commercial-and-evaluation',
  // formulas: { engine: hyperformulaInstance },
};

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
  },
};
