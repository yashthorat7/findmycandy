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
      const limit = footer ? footer.getBoundingClientRect().top : window.innerHeight;
      const available = limit - ddRect.bottom + 20;
      list.style.setProperty('--dynamic-max-height', `${Math.max(100, available)}px`);
    };

    dd.addEventListener('click', e => {
      e.stopPropagation();
      if (!dd.classList.contains('open')) adjustHeight();
      dd.classList.toggle('open');
    });

    window.addEventListener('resize', () => {
      if (dd.classList.contains('open')) adjustHeight();
    });

    document.addEventListener('click', e => {
      if (!dd.contains(e.target)) dd.classList.remove('open');
    });

    options.forEach(opt => {
      opt.addEventListener('click', e => {
        e.stopPropagation();
        const val = opt.dataset.value;
        selected.textContent = opt.textContent;
        dd.classList.remove('open');
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        this.onChange?.(val, opt.textContent);
      });
    });
  }
}

export default DropdownUI;
