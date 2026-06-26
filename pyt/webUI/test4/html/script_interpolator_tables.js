    const table1Element = document.getElementById('table1');
    const table1Settings = {
        data: [
            [0, 0,],
        ],
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0.00',
        },
        colHeaders: ['x', 'y',],
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
        colHeaders: ['xIntp', 'yIntp',],
        rowHeaders: true,
        customBorders: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
    };

    var table2Content = new Handsontable(table2Element, table2Settings);
