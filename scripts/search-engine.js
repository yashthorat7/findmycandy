import { fileTypes, searchGenerators, CONFIG } from './constants.js';

class SearchEngine {
  constructor() {
    this.filter = 'all';
  }

  setFilter(f) {
    this.filter = f;
  }

  generateQuery(q) {
    if (this.filter === "drive") return searchGenerators.drive(q);
    if (this.filter === "ftp") return searchGenerators.ftp(q);
    if (this.filter === "all") {
      const all = [fileTypes.video, fileTypes.music, fileTypes.image, fileTypes.document, fileTypes.software].join("|");
      return searchGenerators.directory(q, all);
    }
    return searchGenerators.directory(q, fileTypes[this.filter]);
  }

  search(q) {
    const query = q.trim();
    if (!query) {
      navigator.vibrate?.(CONFIG.VIBRATION_DURATION);
      return false;
    }
    window.open(`https://www.google.com/search?q=${encodeURIComponent(this.generateQuery(query))}`, "_blank");
    return true;
  }
}

export default SearchEngine;
