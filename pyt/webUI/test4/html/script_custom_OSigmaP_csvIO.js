
var tableContent = {};
var load1 = document.getElementById('load1');
var load2 = document.getElementById('load2');
var load3 = document.getElementById('load3');
var load4 = document.getElementById('load4');
var load5 = document.getElementById('load5');

load1.addEventListener('change', function(event) { loadCSVFromFile(load1, 'table1'); });
load2.addEventListener('change', function(event) { loadCSVFromFile(load2, 'table2'); });
load3.addEventListener('change', function(event) { loadCSVFromFile(load3, 'table3'); });
load4.addEventListener('change', function(event) { loadCSVFromFile(load4, 'table4'); });
load5.addEventListener('change', function(event) { loadCSVFromFile(load5, 'table5'); });

function loadCSVFromFile(keyStr, tableName) {
    var file = keyStr.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var csvData = e.target.result;
            var csvDataAOA = convertToAOA(csvData);
            createTableAny(tableName, csvDataAOA);
        };
        reader.readAsText(file);
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

function convertToAOA(csvData) {
    var rows = csvData.split("\n");
    var csvDataAOA = rows.map(row => row.split(/[\t,]/));
    console.log(csvData);
    return csvDataAOA;
}
