    const settingTableElement = document.getElementById('settingTable');
    const settingTableSettings = {
        data: [
            [0, 50, 0, 2],
            [500, 900, 0, 20],
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
    const settingTable = new Handsontable(settingTableElement, settingTableSettings);

    const table1Element = document.getElementById('table1');
    const table1Settings = {
        data: [
            [0, 0, 0,],
        ],
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0.00',
        },
        colHeaders: ['freq', 'amp/re', 'phs/im'],
        rowHeaders: true,
        customBorders: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
    };
    var table1Content = new Handsontable(table1Element, table1Settings);

    const table2Element = document.getElementById('table2');
    const table2Settings = {
        data: [
            [0, 0,],
        ],
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0.00',
        },
        colHeaders: ['time', 'intensity',],
        rowHeaders: true,
        customBorders: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
    };

    var table2Content = new Handsontable(table2Element, table2Settings);


    const REFTableElement = document.getElementById('table3');
    const REFTableSettings = {
        data: [
            [0, 0,],
        ],
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0.00',
        },
        colHeaders: ['time', 'intensity'],
        rowHeaders: true,
        customBorders: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
    };
    var table3Content = new Handsontable(REFTableElement, REFTableSettings);
