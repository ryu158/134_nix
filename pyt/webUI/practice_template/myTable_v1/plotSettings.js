
let defaultPlotId = 'plot1';
let axisType = [ 'linear', 'linear' ];
let xRange = [ 0, 1.0 ];
let yRange = [ -0.2, 1.2 ];

let icon1 = {
  'width': 500,
  'height': 600,
  'path': 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z'
};
let iconPallete = {
  'width': 512,
  'height': 512,
  'path': 'M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z'
};
let iconRectangleList = {
  'width': 576,
  'height': 512,
  'path': 'M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM128 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm32-128a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm96-248c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224z'
};
let iconArrowUpDownLeftRight = {
  'width': 512,
  'height': 512,
  'path': 'M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4V224H109.3l9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4H224V402.7l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4V288H402.7l-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4H288V109.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z'
};
let iconSliders = {
  'width': 512,
  'height': 512,
  'path': 'M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z'
};


const layoutScatter = {
  width: 310,
  height: 176,
  // autosize: true,
  margin: {
    l: 25,
    r: 15,
    t: 15,
    b: 15,
  },
  dragmode: 'zoom',
  xaxis: {
    type: 'linear',
    showaline: true,
    showticklabels: true,
  },
  yaxis: {
    type: 'linear',
    showline: true,
    showticklabels: true,
  },
  showlegend: true,
  legend: {
    x: 0.95,
    y: 0.97,
    xanchor: 'right',
    yanchor: 'top',
  },
}


const configPlotScatter = {

  scrollZoom: true,
  displaylogo: false,
  modeBarButtonsToAdd: [
  {
    plotId: defaultPlotId,
    name: 'legend on/off',
    icon: iconRectangleList,
    click: function() {
      showlegendMark = ! plot1.layout.showlegend;
      Plotly.relayout(this.plotId, { showlegend: showlegendMark, });
    },
  },
  {
    plotId: defaultPlotId,
    name: 'axis setup',
    icon: iconSliders,
    click: function() {
      if (popupScatter1.style.display == 'none'){
        openPopUp(this.plotId, popupScatter1, 675, 820);
      }
      else {
        console.log('here');
        closePopUp(popupScatter1);
      }
    },
  },
  {
    plotId: defaultPlotId,
    name: 'user setup',
    icon: iconPallete,
    click: function() {
      const numElem = parseInt(window[this.plotId].data.length);

      if (!strTest(document.getElementById("scatterUserSet").value)) {
        let strColor = ""; let strLW = ""; let strLT = ""; let strMR = ""; let strMT = "";
        for (let i = 0; i < numElem; i++) {
          //   const inputs = document.createElement('input');
          //   inputs.innerHTML = innerHtml1;
          //   inputs.setAttribute('type', 'text');
          //   inputs.setAttribute('value', '1 1 1 1')
          //   //select.innerHTML = '<option value="1">Option 1</option><option value="2">Option 2</option>'; // Add options as needed
          //   elemContainer.appendChild(elems);
          strLabel = " color:\n line  type:\n mark  type:\n line width:\nmark radius:";
          strLT = strLT + 's ';
          strMT = strMT + 'o ';
          strLW = strLW + '1 ';
          strMR = strMR + '1 ';
          strAll = strColor + "\n" + strLT + "\n" +strMT + "\n" + strLW + "\n" + strMR;
        }
        document.getElementById("labelScatterUserSet").value = strLabel;
        document.getElementById("scatterUserSet").value = strAll;
      } else {}

      if (popupScatter2.style.display == 'none'){
        openPopUp(this.plotId, popupScatter2, 490, 675);
      } else { closePopUp(popupScatter2); }
    },
  },

  ],
  modeBarButtonsToRemove: [
    'select2d', 'lasso2d', 'toImage', 'resetScale2d', 'zoomOut2d', 'zoomIn2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian',
  ],
};
