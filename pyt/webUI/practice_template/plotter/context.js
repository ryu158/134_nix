const customContextMenu = document.getElementById('sheet0');
const popup = document.getElementById('popup');

customContextMenu.addEventListener('contextmenu', (e) => {
  e.preventDefault(); // Prevent the default context menu

  // Show the custom popup
  popup.style.left = `${e.clientX}px`; // Set the popup position based on mouse coordinates
  popup.style.top = `${e.clientY}px`;
  popup.style.display = 'block';
});

// Close popup when clicking outside
document.addEventListener('click', (e) => {
  if (e.target !== customContextMenu) {
    popup.style.display = 'none';
  }
});
