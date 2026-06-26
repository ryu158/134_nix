let panelCounter = 0;

function createNewSheet() {
  const panelName = `sheet${panelCounter}`;
  const tableName = `table${panelCounter}`;
  panelCounter++;

  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.id = panelName;
  panel.style = 'color:#EC7063; z-Index: 1';
  panel.innerHTML = `
    <div class="panel-header" onmousedown="bringToFront('${panelName}')">
      <span class="panel-title">${panelName}</span>
      <div class="panel-controls">
        <button class="panel-minimize" onclick="toggleMinimize('${panelName}')">-</button>
        <button class="panel-minimize" onclick="toggleMaximize('${panelName}')">\u25A1</button>
        <button class="panel-close" onclick="closePanel('${panelName}')">×</button>
      </div>
    </div>
    <div class="panel-content" onmousedown="bringToFront('${panelName}'); handleMouseRightDown(event);">
      <div id='${tableName}'></div>
    </div>
    <div class="panel-resize-handle" onmousedown="bringToFront('${panelName}'); handleMouseDown(event);"></div>
    <script>
    </script/>
  `;

  document.body.appendChild(panel);
  tableContent[tableName] = new Handsontable(document.getElementById(tableName), tableSettingsAtStart);
}

let isDragging = false;
let isResizing = false;
let offsetX, offsetY;
let initialWidth, initialHeight;
let isMinimized = false;
let isMaximized = false;
let currentPanel;

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
    initialWidth = currentPanel.offsetWidth;
    initialHeight = currentPanel.offsetHeight;
  } else if (panelResizeHandle) {
    isResizing = true;
    offsetX = panelResizeHandle.getBoundingClientRect().left;
    offsetY = panelResizeHandle.getBoundingClientRect().top;
    currentPanel = panelResizeHandle.closest('.panel');
    initialWidth = currentPanel.offsetWidth;
    initialHeight = currentPanel.offsetHeight;
  }
}

function handleMouseMove(e) {
  if (isDragging) {
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

    currentPanel.style.width = `${Math.max(newWidth, 200)}px`; // Minimum width is set to 200px
    currentPanel.style.height = `${Math.max(newHeight, 100)}px`; // Minimum height is set to 100px
  }
}

function handleMouseUp() {
  isDragging = false;
  isResizing = false;
}

// document.addEventListener('mousemove', drag);
// document.addEventListener('mouseup', stopDragging);

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

function toggleMinimize(panelName) {
  isMinimized = !isMinimized;
  const panel = document.getElementById(panelName);

  if (isMinimized) {
    panel.style.height = '40px';
    panel.style.width = '80px';
    panel.style.overflow = 'hidden';
  } else {
    panel.style.height = '210px';
    panel.style.width = '320px';
    panel.style.overflow = 'hidden';
  }
}

function toggleMaximize(panelName) {
  isMaximized = !isMaximized;
  const panel = document.getElementById(panelName);

  if (isMaximized) {
    panel.style.left = '2px';
    panel.style.top = '22px';
    panel.style.height = '97.5%';
    panel.style.width = '99.5%';
    panel.style.overflow = 'hidden';
  } else {
    panel.style.height = '210px';
    panel.style.width = '320px';
    panel.style.overflow = 'hidden';
  }
}


function closePanel(panelName) {
  const panel = document.getElementById(panelName);
  panel.style.display = 'none';
}


function bringToFront(panelID) {
  const panels = document.querySelectorAll('.panel');
  const panel = document.getElementById(panelID);

  // Set the clicked panel to the highest z-index
  let maxZIndex = 0;
  let minZIndex = 0;
  let count = 0;
  panels.forEach(p => {
    const zIndex = parseInt(window.getComputedStyle(p).zIndex, 10);
    maxZIndex = Math.max(maxZIndex, zIndex);
    minZIndex = Math.min(minZIndex, zIndex);
    count++;
    p.style.zIndex = p.style.zIndex - 1;
  });

  panel.style.zIndex = maxZIndex;
}


function handleMouseRightDown(e) {
  const panelContent = e.target.closest('.panel-content');
  currentPanel = panelContent.closest('.panel');
  currentPanel.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Prevent the default context menu
    popup.style.left = `${e.clientX}px`; // Set the popup position based on mouse coordinates
    popup.style.top = `${e.clientY}px`;
    popup.style.display = 'block';
  document.addEventListener('click', (e) => {
    if (e.target !== currentPanel) {
      popup.style.display = 'none';
    }
  });

  });
}











// let isDragging = false;
// let offsetX, offsetY;
// let isMinimized = false;

// const panel = document.getElementById('panel');
// const panelHeader = document.getElementById('panelHeader');

// panelHeader.addEventListener('mousedown', startDragging);
// document.addEventListener('mousemove', drag);
// document.addEventListener('mouseup', stopDragging);

// function startDragging(e) {
//   isDragging = true;
//   offsetX = e.clientX - panel.getBoundingClientRect().left;
//   offsetY = e.clientY - panel.getBoundingClientRect().top;
// }

// function drag(e) {
//   if (!isDragging) return;
//   const x = e.clientX - offsetX;
//   const y = e.clientY - offsetY;

//   panel.style.left = `${x}px`;
//   panel.style.top = `${y}px`;
// }

// function stopDragging() {
//   isDragging = false;
// }

// function toggleMinimize() {
//   isMinimized = !isMinimized;
//   if (isMinimized) {
//     panel.style.height = '40px';
//     panel.style.overflow = 'hidden';
//   } else {
//     panel.style.height = '200px';
//     panel.style.overflow = 'auto';
//   }
// }

// function closePanel() {
//   panel.style.display = 'none';
// }
