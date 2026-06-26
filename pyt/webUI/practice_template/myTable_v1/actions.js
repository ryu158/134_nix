
let isDragging = false;
let isResizing = false;
let offsetX, offsetY;
let initialWidth, initialHeight;
let isMinimized = false;
let isMaximized = false;
let currentPanel;
let plotId;
let currentPlot;

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(e) {
  const panelHeader = e.target.closest('.panel-header');
  const panelResizeHandle = e.target.closest('.panel-resize-handle');

  if (panelHeader) {
    isDragging = true;
    offsetX = e.clientX - panelHeader.getBoundingClientRect().left;
    offsetY = e.clientY - panelHeader.getBoundingClientRect().top;
    currentPanel = panelHeader.closest('.panel');
    plotId = currentPanel.id.slice(0, -5) + 'plot';
    currentPlot = document.getElementById(plotId);
    // console.log(currentPlot);
    initialWidth = currentPanel.offsetWidth;
    initialHeight = currentPanel.offsetHeight;
  } else if (panelResizeHandle) {
    isResizing = true;
    offsetX = panelResizeHandle.getBoundingClientRect().left;
    offsetY = panelResizeHandle.getBoundingClientRect().top;
    currentPanel = panelResizeHandle.closest('.panel');
    plotId = currentPanel.id.slice(0, -5) + 'plot';
    currentPlot = document.getElementById(plotId);
    // console.log(currentPlot);
    initialWidth = currentPanel.offsetWidth;
    initialHeight = currentPanel.offsetHeight;
  }
}

function handleMouseMove(e) {
  if (isDragging && !currentPanel.isMaximized) {
    // const panel = document.querySelector('.panel');
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    // panel.style.left = `${x}px`;
    // panel.style.top = `${y}px`;
    currentPanel.style.left = `${x}px`;
    currentPanel.style.top = `${y}px`;
  } else if (isResizing) {
    const newWidth = e.clientX - offsetX + initialWidth;
    const newHeight = e.clientY - offsetY + initialHeight;

    var newWidthMax = Math.max(newWidth, 200);
    var newHeightMax = Math.max(newHeight, 100);
    currentPanel.style.width = `${newWidthMax}px`; // Minimum width is set to 200px
    currentPanel.style.height = `${newHeightMax}px`; // Minimum height is set to 100px
    // const currentPlotName = currentPanel.id.replace("_panel", "");
    // updatePlotSize(currentPlotName,Math.max(newWidth, 200),Math.max(newHeight, 100)*0.95);
    var updatePlotLayout = { width: newWidthMax - 11, height: newHeightMax - 34 };
    Plotly.relayout(plotId, updatePlotLayout);
  }
}

function handleMouseUp() {
  isDragging = false;
  isResizing = false;
}

function startDragging(e) {
  isDragging = true;
  offsetX = e.clientX - e.target.getBoundingClientRect().left;
  offsetY = e.clientY - e.target.getBoundingClientRect().top;
}

function drag(e) {
  if (!isDragging) return;
  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;

  e.target.style.left = `${x}px`;
  e.target.style.top = `${y}px`;
}

function stopDragging() {
  isDragging = false;
}
