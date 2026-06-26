
let panelCounter = 0;
let treeCounter = 0;
let plotCounter = 0;
var panels = [];
var trees = [];
var tables = [];
var plots = [];



function createNewPanel(panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
  const panelName = `panels${panelCounter}`;
  panels[panelCounter] = new MyPanel(panelName, panelHeight, panelWidth, panelYposition, panelXposition);
  panelCounter++;
}

function createNewTree(panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
  const treeName = `trees${treeCounter}`;
  trees[treeCounter] = new MyTree(treeName, panelHeight, panelWidth, panelYposition, panelXposition);
  treeCounter++;
}
