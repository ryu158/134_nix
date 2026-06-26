
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
    optionsPaste.forEach(option => {
        if (option.checked) {
            selectedOption = option.value;
        }
    });
    if (selectedOption == "pasteInput") {
        createTable1(csvDataAOA);
        drawchart1();
    } else {
        createTable3(csvDataAOA);
    }
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

        if (selectedOption == "loadInput") {
            createTable1(csvDataAOA);
            drawchart1();
        } else {
            createTable3(csvDataAOA);
        }
        };
        reader.readAsText(file);
    }
}

function exportToCSV(keyStr) {
    if (keyStr == 2) {
        var Data0 = table2Content.getData();
    } else if (keyStr == 3) {
        var Data0 = table3Content.getData();
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

function convertToAOA(csvData) {
    var rows = csvData.split("\n");
    var csvDataAOA = rows.map(row => row.split(/[\t,]/));
    return csvDataAOA;
}
