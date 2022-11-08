export const extractContent = (markupContent: string) => {
  const span = document.createElement('span');

  span.innerHTML = markupContent;

  return span.textContent ?? span.innerText;
};
