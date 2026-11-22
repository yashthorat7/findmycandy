import { CATEGORIES, DORK_SIGNATURES, CONFIG } from './constants.js';

class SearchEngine {
  constructor() {
    this.filter = 'all';
  }

  setFilter(f) {
    const aliasMap = {
      music: 'audio',
      book: 'document',
      books: 'document',
      doc: 'document',
      docs: 'document',
      archive: 'software',
      archives: 'software',
      app: 'software',
      apps: 'software',
      videos: 'video',
      movie: 'video',
      movies: 'video'
    };
    const normalized = aliasMap[f] || f;
    this.filter = CATEGORIES[normalized] ? normalized : 'all';
  }

  getFilter() {
    return this.filter;
  }

  sanitize(rawQuery) {
    if (!rawQuery) return '';
    let q = rawQuery.trim().replace(/\s+/g, ' ');

    const quoteMatches = q.match(/"/g);
    if (quoteMatches && quoteMatches.length % 2 !== 0) {
      q = q.replace(/"/g, '');
    }

    q = q.replace(/\s+-\s+/g, ' ');
    q = q.replace(/(?<=\s)-(?=[a-zA-Z0-9])/g, '');

    return q.trim();
  }

  generateQuery(rawQuery) {
    const q = this.sanitize(rawQuery);
    const category = CATEGORIES[this.filter] || CATEGORIES.all;
    const parts = [];

    if (q) {
      parts.push(q);
    }

    parts.push(DORK_SIGNATURES.title);
    parts.push(DORK_SIGNATURES.serverHeaders);

    if (category.extensions) {
      parts.push(`(${category.extensions})`);
    }

    parts.push(DORK_SIGNATURES.urlExclusions);

    if (category.negativeTerms && category.negativeTerms.length > 0) {
      const negatives = category.negativeTerms.map(term => `-${term}`).join(' ');
      parts.push(negatives);
    }

    return parts.join(' ');
  }

  search(rawQuery) {
    const query = this.sanitize(rawQuery);
    if (!query) {
      navigator.vibrate?.(CONFIG.VIBRATION_DURATION);
      const input = document.getElementById("searchInput");
      if (input) {
        input.focus();
        input.classList.remove('input-shake');
        void input.offsetWidth;
        input.classList.add('input-shake');
      }
      return false;
    }

    const dork = this.generateQuery(query);
    const targetUrl = `https://www.google.com/search?q=${encodeURIComponent(dork)}`;
    window.open(targetUrl, "_blank");
    return true;
  }
}

export default SearchEngine;
