    var settingTableElement = document.getElementById('settingTable');
    var settingTableSettings = {
        data: [
            [200, 1000, -12, 12],
            [200, 1000, -7, 7],
            [200, 1000, -1, 3.5],
        ],
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0.00',
        },
        colHeaders: ['xMin', 'xMax', 'yMin', 'yMax' ],
        rowHeaders: true,
        customBorders: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
    };
    var settingTable = new Handsontable(settingTableElement, settingTableSettings);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var tableSettingsAtStart = {
        data: [
            [0, 0, 0, 0,],
        ],
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0.00',
        },
        colHeaders: true,
        rowHeaders: true,
        customBorders: true,
        height: 'auto',
        renderAllRows: false,
        licenseKey: 'non-commercial-and-evaluation'
    };
    var table0Element = document.getElementById('table0');
    tableSettingsAtStart0 = Object.assign({}, tableSettingsAtStart);
    tableSettingsAtStart0.data = [ [950, 50, 7000, 350, 10000, 500, 0.1 ] ];
    tableSettingsAtStart0.numericFormat.pattern = '0,0';
    tableSettingsAtStart0.colHeaders = [ 'p1Center', 'p1Delta', 'p2Center', 'p2Delta', 'p3Center', 'p3Delta','target(%)' ];
    var table0Content = new Handsontable(table0Element, tableSettingsAtStart0);

    var table1Element = document.getElementById('table1');
    tableSettingsAtStart1 = Object.assign({}, tableSettingsAtStart);
    tableSettingsAtStart1.data = [ [0, 0, 0, 0, 0, 0, 0, 0,] ];
    tableSettingsAtStart1.colHeaders = [ 'freq', 'pcen', 'p1_0', 'p1_1', 'p2_0', 'p2_1', 'p3_0', 'p3_1', 'sigma' ];
    var table1Content = new Handsontable(table1Element, tableSettingsAtStart1);

    var table2Element = document.getElementById('table2');
    tableSettingsAtStart2 = Object.assign({}, tableSettingsCommon);
    tableSettingsAtStart2.colHeaders = [ 'freq', 'p1', 'p2', 'p', ];
    var table2Content = new Handsontable(table2Element, tableSettingsAtStart2);

    var correlationTableElement = document.getElementById('correlationTable');
    tableSettingsAtStartC = Object.assign({}, tableSettingsAtStart);
    tableSettingsAtStartC.data = [ [0, 0, 0,], [0, 0, 0,], [0, 0, 0,],];
    tableSettingsAtStartC.colHeaders = [ 'p1', 'p2', 'p3', ];
    var correlationTableContent = new Handsontable(correlationTableElement, tableSettingsAtStartC);
