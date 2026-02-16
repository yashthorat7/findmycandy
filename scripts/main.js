import MessageCarousel from './message-carousel.js';
import SearchEngine from './search-engine.js';
import DropdownUI from './dropdown-ui.js';
import FontLoader from './font-loader.js';
import { messages } from './messages.js';

class App {
  constructor() {
    this.carousel = null;
    this.search = null;
    this.dropdown = null;
    this.font = null;
  }

  initModules() {
    this.carousel = new MessageCarousel(messages);
    this.carousel.init();

    this.search = new SearchEngine();
    this.dropdown = new DropdownUI('filterDropdown', val => this.search.setFilter(val));
    this.dropdown.init();

    this.attachHandlers();
  }

  attachHandlers() {
    const input = document.getElementById("searchInput");
    const btn = document.querySelector(".search-btn");

    btn.addEventListener("click", () => this.search.search(input.value));
    input.addEventListener("keypress", e => {
      if (e.key === "Enter") this.search.search(input.value);
    });
  }

  async initFonts() {
    this.font = new FontLoader("VT323");
    await this.font.load();
  }

  async start() {
    await this.initFonts();
    this.initModules();
  }
}

document.addEventListener("DOMContentLoaded", () => new App().start());
