ViewFunctions = {
  sync: function () {
    const spinner = document.querySelector('i.fa.fa-refresh').classList;
    spinner.add('fa-spin');
    setupAlbum().then(() => {
      spinner.remove('fa-spin');
    }).catch(() => {
      spinner.remove('fa-spin');
    });
  },
  filter: function (mode) {
    document.querySelectorAll('[js-sticker-button]').forEach((element) => {
      const isVisible = (mode == 'global' || element.getAttribute('js-sticker-filled') !== 'true')
      element.parentElement.style.display = isVisible ? "block" : "none"
    });
  },
  toggleViewMode: function (mode) {
    mode = mode || localStorage.getItem('viewMode');
    switch (mode) {
      case 'global':
        localStorage.setItem('viewMode', 'local')
        document.querySelector('[js-option="toggleViewMode"]').innerHTML = '<i class="fa fa-square-o fa-fw"></i>'
        break;
      default:
        localStorage.setItem('viewMode', 'global')
        document.querySelector('[js-option="toggleViewMode"]').innerHTML = '<i class="fa fa-globe fa-fw"></i>'
        break;
    }
    ViewFunctions.filter(localStorage.getItem('viewMode'));
  },
  toggleMode: function (mode) {
    mode = mode || localStorage.getItem('mode');
    switch (mode) {
      case 'write':
        localStorage.setItem('mode', 'delete')
        document.querySelector('[js-option="toggleMode"]').innerHTML = '<i class="fa fa-eraser fa-fw"></i>'
        break;
      case 'delete':
        localStorage.setItem('mode', 'view')
        document.querySelector('[js-option="toggleMode"]').innerHTML = '<i class="fa fa-eye fa-fw"></i>'
        break;
      default:
        localStorage.setItem('mode', 'write')
        document.querySelector('[js-option="toggleMode"]').innerHTML = '<i class="fa fa-pencil fa-fw"></i>'
        break;
    }
  },
  eraseKey: function() {
    localStorage.removeItem('albumToken');
    populateTokenForm();
  },
  copyToken: function () {
    Clipboard.copy(localStorage.getItem('albumToken'));
  }
}

document.querySelectorAll('[js-option]').forEach((element) => {
  element.addEventListener('click', () => {
    ViewFunctions[element.getAttribute('js-option')]()
  })
});

document.querySelector('[js-search]')
  .addEventListener('input', (event) => {
    navbar = document.querySelector('nav.navbar');
    element = document.querySelector(`[js-sticker-id="${event.target.value}"]`);
    if (element) {
      element.scrollIntoView({ block: "start" });
      scrollBy(0, -(navbar.offsetHeight * 1.10));
    }
  });
