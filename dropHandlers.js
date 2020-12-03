const memoryObject = {};
/**
 *  This function is used to change the style of the dropzone so as to highlight it.
 *
 * @param element {HTMLElement} The DropZone to target.
 */
const draggedOverStyle = function (element) {
  element.style.border = "8px solid black";
  element.style.boxShadow = "10px 10px 6px lightsalmon";
};
/**
 *  This function is used to reset the style of the dropzone.
 *
 * @param element {HTMLElement} The DropZone to target.
 */
const defaultStyle = function (element) {
  element.style.border = "5px dashed black";
  element.style.boxShadow = "none";
};

/**
 *  This function is used to handle the changes that occur when a draggable element is dragged into the dropzone.
 *
 * @param e {Event} Event Object. This will be used to target the active dropzone.
 */
const handleDragEnter = function (e) {
  "use strict";
  if (e.target.className.includes("dropZone")) {
    draggedOverStyle(e.target);
  }
};

/**
 *  This function is used to handle the changes that occur when a draggable element leaves the dropzone.
 *
 * @param e {Event} Event Object. This will be used to target the active dropzone.
 */
const handleDragLeave = function (e) {
  "use strict";
  //   e.preventDefault();
  if (e.target.className.includes("dropZone")) {
    defaultStyle(e.target);
  }
};

/**
 *  This function is used to handle the changes that occur when a draggable element is dragged over a dropzone.
 *
 * @param e {Event} Event Object. This will be used to target the active dropzone.
 */
const handleDragOver = function (e) {
  e.preventDefault();
};

/**
 *  This function is used to handle the changes that occur when a draggable element is dropped into a dropzone.
 *
 * @param e {Event} Event Object. This will be used to target the active dropzone.
 */
const handleDrop = function (e) {
  e.preventDefault();
  if (e.target.className.includes("dropZone")) {
    const draggedElement = document.getElementById(
      e.dataTransfer.getData("text")
    );
    const dropZone = e.target;

    // Exchange the current Child for the Dragged Element
    const currentChildren = dropZone.childNodes;
    if (currentChildren.length > 0) {
      if (draggedElement.parentNode.className.includes("dropZone")) {
        // Update the Memory for the Parent Element; If it is a dropzone too.
        memoryObject[draggedElement.parentNode.id] = currentChildren.item(0).id;
      }
      draggedElement.parentNode.appendChild(currentChildren.item(0));
    }
    // Update the Memory for the current dropzone
    memoryObject[dropZone.id] = e.dataTransfer.getData("text");
    dropZone.appendChild(draggedElement);
    e.dataTransfer.clearData();
    defaultStyle(e.target);
  }
};

/**
 *  This function is used to handle a drop zone. Basically, assign events to a dropzone.
 *
 */
const handleDropZones = function () {
  "use strict";
  const dropZones = document.getElementsByClassName("dropZone");
  let dropZone;
  for (dropZone of dropZones) {
    dropZone.ondragenter = handleDragEnter;
    dropZone.ondragleave = handleDragLeave;
    dropZone.ondragover = handleDragOver;
    dropZone.ondrop = handleDrop;
  }
};

handleDropZones();
