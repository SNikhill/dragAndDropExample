/**
 * This function is used to handle ondragstart event.
 *
 * @param e {Event} Event Handler Handler
 */
const handleDragStart = function (e) {
  e.dataTransfer.setData("text", e.target.id);
  e.dataTransfer.effectAlowed = "move";
};

/**
 * This function is used to handle all the draggable elements
 *
 */
const handleDragElements = function () {
  "use strict";
  const dragableElements = document.getElementsByClassName("dragableElement");
  let dragableElement;
  for (dragableElement of dragableElements) {
    dragableElement.ondragstart = handleDragStart;
  }
};

handleDragElements();
