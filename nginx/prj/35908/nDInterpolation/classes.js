
class MySheet {
  constructor(name, panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
    this.name = name;
    this.panelCurrent = new MyPanel(this.name, panelHeight, panelWidth, panelYposition, panelXposition);
    this.tableCurrent = new MyTable(this.name);
  }

  identify() {
    console.log(`the sheet name is ${this.name}`);
  }
}

class MyPlotPanel {
  constructor(name, panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
    this.name = name;
    this.panelCurrent = new MyPanel(this.name, panelHeight, panelWidth, panelYposition, panelXposition);
    this.plotCurrent = new MyPlot(this.name);
  }

  identify() {
    console.log(`the sheet name is ${this.name}`);
  }
}

class MyPlot {
  constructor(PlotName) {
    this.id = `${PlotName}_plot`;
    this.trace = {
      x: [],
      y: [],
      z: 1,
      mode: 'lines',
      line: {
        dash: 'line',
        size: 5,
      },
      type: 'scatter',
      colorscale: 'Hot'
    };
    Plotly.newPlot(this.id, [this.trace], layoutScatter, {scrollZoom: true, responsive: true});
  }
}

class MyTable {
  constructor(sheetName) {
    this.id = `${sheetName}_table`;
    this.tableElement = document.getElementById(`${this.id}`);
    this.tableSettings = JSON.parse(JSON.stringify(tableSettingsAtStart));
    this.tableSettings.contextMenu = contextMenuHTable;
    // this.tableSettings.dropdownMenu = true;
    // this.tableSettings.filters = true;
    // this.tableSettings.formulas = { engine: hyperformulaInstance, };
    this.tableContent = new Handsontable(this.tableElement, this.tableSettings);
  }
}

class MyPanel {
  constructor(sheetName, panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
    this.isMinimized = false;
    this.isMaximized = false;
    this.panel = document.createElement('div');
    this.panel.className = 'panel';
    this.panel.id = `${sheetName}_panel`;
    this.panel.style = 'color:#EC7063; z-Index: 1';
    this.panel.style.height = panelHeight + 'px';
    this.panel.style.width = panelWidth + 'px';
    this.panel.style.top = panelYposition + 'px';
    this.panel.style.left = panelXposition + 'px';
    var innerHTMLStart = `
      <div class="panel-header" onmousedown="bringToFront('${this.panel.id}')">
        <span contenteditable="true" spellcheck="false" class="panel-title">${sheetName}</span>
        <div class="panel-controls">
    `;
    var innerHTMLContents1DB = `
          <button class="panel-minimize">\u2193</button>
          <button class="panel-minimize">\u2191</button>
    `;
    var innerHTMLContents1Toggle = `
          <button class="panel-minimize" onclick="${sheetName}.panelCurrent.toggleMinimize()">-</button>
          <button class="panel-minimize" onclick="${sheetName}.panelCurrent.toggleMaximize()">\u25A1</button>
    `;
    var innerHTMLContents1Close = `
          <button class="panel-close" onclick="${sheetName}.panelCurrent.closePanel()" >×</button>
    `;

    var innerHTMLLinker1 = `
        </div>
      </div>
      <div class="panel-content" onmousedown="bringToFront('${this.panel.id}')">
    `;
    var innerHTMLContents2Table = `
        <div id="${sheetName}_table"></div>
    `;
    var innerHTMLContents2Plot = `
        <div id="${sheetName}_plot" style="margin-left:1px"></div>
    `;
    var innerHTMLEnd = `
      </div>
      <div class="panel-resize-handle" onmousedown="bringToFront('${this.panel.id}')"></div>
      <script>
      </script/>
    `;

    this.panel.innerHTML =
      innerHTMLStart
      // + innerHTMLContents1DB
      // + innerHTMLContents1Toggle
      // + innerHTMLContents1Close
      + innerHTMLLinker1
      + innerHTMLContents2Table
      + innerHTMLContents2Plot
      + innerHTMLEnd;
  //   this.panel.innerHTML = `
  //   <div class="panel-header" onmousedown="bringToFront('${this.panel.id}')">
  //     <span contenteditable="true" spellcheck="false" class="panel-title">${sheetName}</span>
  //     <div class="panel-controls">
  //       <button class="panel-minimize">\u2193</button>
  //       <button class="panel-minimize">\u2191</button>
  //       <button class="panel-minimize" onclick="${sheetName}.panelCurrent.toggleMinimize()">-</button>
  //       <button class="panel-minimize" onclick="${sheetName}.panelCurrent.toggleMaximize()">\u25A1</button>
  //       <button class="panel-close" onclick="${sheetName}.panelCurrent.closePanel()" >×</button>
  //     </div>
  //   </div>
  //   <div class="panel-content" onmousedown="bringToFront('${this.panel.id}')">
  //     <div id="${sheetName}_table"></div>
  //   </div>
  //   <div class="panel-resize-handle" onmousedown="bringToFront('${this.panel.id}')"></div>
  //   <script>
  //   </script/>
  // `;
    document.body.appendChild(this.panel);
  }

  closePanel() {
    this.panel.style.display = 'none';
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;

    if (this.isMinimized) {
      this.panel.style.height = '40px';
      this.panel.style.width = '80px';
      this.panel.style.overflow = 'hidden';
    } else {
      this.panel.style.height = '210px';
      this.panel.style.width = '320px';
      this.panel.style.overflow = 'hidden';
    }
  }

  toggleMaximize() {
    this.isMaximized = !this.isMaximized;

    if (this.isMaximized) {
      this.panel.style.left = '2px';
      this.panel.style.top = '22px';
      this.panel.style.width = '99.5%';
      this.panel.style.height = '97.5%';
      this.panel.style.overflow = 'hidden';
    } else {
      this.panel.style.width = '320px';
      this.panel.style.height = '290px';
      this.panel.style.overflow = 'hidden';
    }
  }
}

class AoaFunctions {
  constructor() { }

  deepCopy(aoa) {
    const rowNum = aoa.length;
    const colNum = aoa[0].length;
    const deepCopy = [];

    for (let i = 0; i < rowNum; i++) {
      deepCopy.push([]);
      for (let j = 0; j < colNum; j++) {
        deepCopy[i].push(aoa[i][j]);
      }
    }
    return deepCopy;
  }

  deleteCoaToAoa(aoaInput, delIndex=(aoaInput[0].length -1)) {
    let aoa = this.deepCopy(aoaInput);
    aoa.map(row => {
      row.splice(delIndex, 1);
      return row;
    })
    return aoa;
  }

  transpose(aoa) {
    const rowNum = aoa.length;
    const colNum = aoa[0].length;
    const transposedAoa = [];

    for (let j = 0; j < colNum; j++) {
      transposedAoa.push([]);
      for (let i = 0; i < rowNum; i++) {
        transposedAoa[j].push(aoa[i][j]);
      }
    }
    return transposedAoa;
  }

}
