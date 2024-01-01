export const setLinesCounterElement = (element?: HTMLTextAreaElement): void => {
  const oldElement = document.querySelector('.temp-item');

  if (oldElement) {
    oldElement.remove();
  }

  if (element) {
    const newEl = document.createElement('div');
    newEl.classList.add('temp-item');
    newEl.style.width = `${element.clientWidth}px`;
    newEl.style.overflowWrap = 'break-word';
    newEl.style.fontSize = '14px';
    newEl.style.lineHeight = '1.5714285714285714';
    newEl.style.position = 'absolute';
    newEl.style.opacity = '0';
    newEl.style.top = '0';
    newEl.style.left = '0';
    newEl.style.pointerEvents = 'none';
    newEl.style.padding = '0 11px';
    document.body.append(newEl);
  }
};

export const removeCounterElement = (): void => {
  const element = document.querySelector('.temp-item');

  if (element) {
    element.remove();
  }
};
