document.addEventListener("DOMContentLoaded", () => {
  const getMissingStickersText = function() {
    let text = 'Minha lista de faltantes é:\n';
    document.querySelectorAll('[js-sticker-button]').forEach((node) => {
      if(node.getAttribute('js-sticker-filled') !== 'true') {
        text = text.concat(node.getAttribute('js-sticker-id') + ' - ')
      }
    });
    text = text.replace(/\s-\s$/g, '');

    return text;
  }

  const fakeTextArea = document.createElement('textarea');
  fakeTextArea.style.fontSize = '12pt';
  fakeTextArea.style.border = '0';
  fakeTextArea.style.padding = '0';
  fakeTextArea.style.margin = '0';
  fakeTextArea.style.position = 'absolute';
  fakeTextArea.style.top =
    `${window.pageYOffset || document.documentElement.scrollTop}px`;
  fakeTextArea.setAttribute('readonly', '');
  document.body.appendChild(fakeTextArea);

  const copyLink = document.querySelector('[js-copy]');
  copyLink.addEventListener('click', (event) => {
    event.preventDefault();
    fakeTextArea.value = getMissingStickersText();
    fakeTextArea.select();
    document.execCommand('copy');
    fakeTextArea.value = '';
    copyLink.focus();
  });
});
