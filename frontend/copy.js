window.Clipboard = (function (window, document, navigator) {
  let textArea;
  let copy;

  function createTextArea(text) {
    textArea = document.createElement('textArea');
    textArea.value = text;
    document.body.appendChild(textArea);
  }

  function selectText() {
    let range;
    let selection;

    if (navigator.userAgent.match(/ipad|iphone/i)) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }

  function copyToClipboard() {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  copy = function (text) {
    const pageX = window.pageXOffset;
    const pageY = window.pageYOffset;
    createTextArea(text);
    selectText();
    copyToClipboard();
    window.scrollTo(pageX, pageY);
  };

  return { copy };
})(window, document, navigator);

document.addEventListener("DOMContentLoaded", () => {
  const getMissingStickersText = function () {
    let text = 'Minha lista de faltantes é:\n';
    document.querySelectorAll('[js-sticker-button]').forEach((node) => {
      if (node.getAttribute('js-sticker-filled') !== 'true') {
        text = text.concat(node.getAttribute('js-sticker-id') + ' - ')
      }
    });
    text = text.replace(/\s-\s$/g, '');

    return text;
  }

  document.querySelector('[js-copy]').addEventListener('click', (event) => {
    event.preventDefault();
    Clipboard.copy(getMissingStickersText());
    event.target.focus();
  });
});
