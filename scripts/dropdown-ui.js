class DropdownUI {
  constructor(id, onChange) {
    this.id = id;
    this.onChange = onChange;
  }

  init() {
    const dd = document.getElementById(this.id);
    const selected = dd.querySelector('.selected-option');
    const options = dd.querySelectorAll('.option');
    const list = dd.querySelector('.options-list');

    const adjustHeight = () => {
      const ddRect = dd.getBoundingClientRect();
      const footer = document.querySelector('.footer') || document.querySelector('.github-link');
      const footerTop = footer ? footer.getBoundingClientRect().top : window.innerHeight;
      const maxBottom = Math.min(footerTop, window.innerHeight);
      const available = Math.max(80, Math.floor(maxBottom - ddRect.bottom - 16));
      list.style.maxHeight = `${available}px`;
    };

    dd.addEventListener('click', e => {
      e.stopPropagation();
      const willOpen = !dd.classList.contains('open');
      if (willOpen) {
        adjustHeight();
        dd.classList.add('open');
      } else {
        list.style.maxHeight = '';
        dd.classList.remove('open');
      }
    });

    window.addEventListener('resize', () => {
      if (dd.classList.contains('open')) adjustHeight();
    });

    if (window.ResizeObserver) {
      new ResizeObserver(() => {
        if (dd.classList.contains('open')) adjustHeight();
      }).observe(document.body);
    }

    const closeDropdown = () => {
      if (dd.classList.contains('open')) {
        list.style.maxHeight = '';
        dd.classList.remove('open');
      }
    };

    document.addEventListener('click', e => {
      if (!dd.contains(e.target)) closeDropdown();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDropdown();
    });

    options.forEach(opt => {
      opt.addEventListener('click', e => {
        e.stopPropagation();
        const val = opt.dataset.value;
        selected.textContent = opt.textContent;
        closeDropdown();
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        this.onChange?.(val, opt.textContent);
      });
    });
  }
}

export default DropdownUI;
