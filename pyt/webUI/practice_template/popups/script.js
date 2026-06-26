  function show() {
    document.querySelector(".background").className = "background show";
  }

  function close() {
    document.querySelector(".background").className = "background";
  }

  document.querySelector("#show").addEventListener("click", show);
  document.querySelector("#close").addEventListener("click", close);

  const myButton = document.getElementById("myButton");
  const modal = document.getElementById("myModal");

  // Left-click function
  function leftClickFunction() {
    console.log("Left click executed");
    // Your function execution code here
  }

  // Right-click function
  function rightClickFunction() {
    console.log("Right click executed");
    setTimeout(() => {
      modal.style.display = "block";
    }, 0)
    // modal.style.display = "block"; // Display modal on right-click
  }

  // Detect left/right mouse click
  myButton.addEventListener("mousedown", (event) => {
    if (event.button === 0) {
      leftClickFunction(); // Left click
    } else if (event.button === 2) {
      myButton.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        rightClickFunction(); // Right click
      });
    }
  });

  // Close modal function
  function closeModal() {
    modal.style.display = "none";
  }


  const customContextMenu = document.getElementById('customContextMenu');
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

  let subWindow;

  function openSubWindow() {
    // Open a new sub-window and pass the reference of the opener (parent) window
    subWindow = window.open('child.html', 'SubWindow', 'width=400,height=300');
    subWindow.opener = window; // Assign the reference of the opener window to the sub-window
  }

  // Function to communicate with the sub-window
  function sendMessageToSubWindow(message) {
    if (subWindow) {
      subWindow.postMessage(message, '*'); // Send a message to the sub-window
    }
  }

  // Receive message from the sub-window
  window.addEventListener('message', function(event) {
    console.log('Message received from sub-window:', event.data);
  });


  // Function to make the modal draggable
  function dragModal(modalElement) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    if (document.getElementById(modalElement.id + "-header")) {
      // if present, the header is where you move the modal from:
      document.getElementById(modalElement.id + "-header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the modal from anywhere inside the modal:
      modalElement.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      modalElement.style.top = modalElement.offsetTop - pos2 + "px";
      modalElement.style.left = modalElement.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  // Open the modal and make it draggable
  function openModal2() {
    let modal = document.getElementById('myModal2');
    modal.style.display = 'block';
    dragModal(modal);
  }

  function minimizeModal2() {
    let modal = document.getElementById('myModal2');
    modal.style.display = 'none';
  }

  // Close the modal
  function closeModal2() {
    document.getElementById('myModal2').style.display = 'none';
  }
