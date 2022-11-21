export const extractContent = (markupContent: string) => {
  const span = document.createElement('span');
  let htmlContent = markupContent;

  if (markupContent.includes('<br>')) {
    htmlContent = markupContent.replaceAll('<br>', '\n');
  }

  span.innerHTML = htmlContent;

  return span.textContent ?? span.innerText;
};
