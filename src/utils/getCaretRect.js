export const saveCaretPosition = () => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    return selection.getRangeAt(0).cloneRange();
  }
};

export const restoreCaretPosition = (element, savedSelection) => {
  if (savedSelection && element) {
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedSelection);
    element.focus();
  }
};

export const clearSelection = () => {
  window.getSelection().removeAllRanges();
}

export const getCaretRect = (element) => {
  const isSupported = typeof window.getSelection !== "undefined";

  if (isSupported) {
    const savedSelection = saveCaretPosition(element);
    const selection = window.getSelection();

    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0);
      const temp = document.createTextNode("\0");
      range.insertNode(temp);
      const res = range.getBoundingClientRect();
      temp.parentNode.removeChild(temp);
      restoreCaretPosition(element, savedSelection);
      return { x: res.x, y: res.y };
    }
  }

  return { x: 0, y: 0 };
};