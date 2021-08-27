export const RenderPosition = {
  AFTER_BEGIN: 'afterBegin',
  BEFORE_END: 'beforeEnd',
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
  }
};


export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML =template;
  return newElement.firstChild;
};
