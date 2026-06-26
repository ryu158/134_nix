
var fileInput = document.getElementById('csvFile');
const optionsLoad = document.getElementsByName('optionsLoad');
const optionsPaste = document.getElementsByName('optionsPaste');

fileInput.addEventListener('change', function(event) {
    const selectedFile = event.target.files[0];
    loadCSVFromFile();
});

function parseCSV() {
    var csvData = document.getElementById("csvData").value;
    var csvDataAOA = convertToAOA(csvData);
    createTable1(csvDataAOA);
    drawchart1();
}

function loadCSVFromFile() {
    var fileInput = document.getElementById("csvFile");
    var file = fileInput.files[0];
    optionsLoad.forEach(option => {
        if (option.checked) {
            selectedOption = option.value;
        }
    });

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var csvData = e.target.result;
            var csvDataAOA = convertToAOA(csvData);
            createTable1(csvDataAOA);
            drawchart1();
        };
        reader.readAsText(file);
    }
}

function exportToCSV(keyStr) {
    if (keyStr == 2) {
        var Data0 = table2Content.getData();
    } else if (keyStr == 3) {
        var Data0 = table3Content.getData();
    } else if (keyStr == 4) {
        var Data0 = table4Content.getData();
    } else {
        var Data0 = table1Content.getData();
    }
    const csvFormat = Data0.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvFormat], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data0.csv';
    a.click();
    URL.revokeObjectURL(url);
}

function exportAllDataToCSV() {
    let datum = {
        key1: iFFT_result,
        key2: amp_result,
        key3: phs_result,
        key4: real_result,
        key5: imag_result
    };
    for (let key in datum) {
        Data0 = datum[key];
        const csvFormat = Data0.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvFormat], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data0.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
}


function convertToAOA(csvData) {
    var rows = csvData.split("\n");
    var csvDataAOA = rows.map(row => row.split(/[\t,]/));
    return csvDataAOA;
}
