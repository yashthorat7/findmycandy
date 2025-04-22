// -- Retro Effects & Font Loading ------------------------------------------------
function createRetroEffects() {
    const startupEl = document.createElement('div');
    startupEl.className = 'crt-startup';
    document.body.appendChild(startupEl);
  
    setTimeout(() => {
      document.querySelector('h1').classList.add('pixel-jitter');
      document.querySelector('.search-btn').classList.add('pixel-jitter');
    }, 2000);
  
    setInterval(() => {
      if (Math.random() > 0.95) {
        document.body.style.opacity = '0.95';
        setTimeout(() => document.body.style.opacity = '1', 50);
      }
    }, 2000);

  }
  
  // -- Message Carousel ------------------------------------------------------------
  let messageElement, currentMessageIndex = 0;
  const messages = [
    "unlock a world of possibilities with every search",
    "navigate through endless digital libraries effortlessly",
    "find what others can't with our advanced search",
    "explore the vast digital landscape with confidence",
    "your trusted tool for digital content discovery",
    "search beyond the surface of the web",
    "the name of this website is completely intentional",
    "made by yash thorat",
    "i am not sorry for making this",
    "now with Google Drive search support!"
  ];
  
  function initMessageCarousel() {
    messageElement = document.createElement('div');
    messageElement.className = 'message-carousel';
    document.body.appendChild(messageElement);
    showNextMessage();
    setInterval(showNextMessage, 5000);
  }
  
  function showNextMessage() {
    messageElement.style.opacity = '0';
    setTimeout(() => {
      messageElement.textContent = messages[currentMessageIndex];
      messageElement.style.opacity = '1';
      currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    }, 500);
  }
  
  // -- Search Logic ----------------------------------------------------------------
  const fileTypes = {
    all: '-1',
    video: 'mp4|mkv|avi|mov|wmv|flv|webm|mpeg|mpg|m4v|3gp|ogv|ts|divx',
    music: 'mp3|wav|flac|aac|m4a|ogg|wma|ac3|opus|alac|aiff|mid|midi|mod',
    image: 'jpg|jpeg|png|gif|bmp|webp|svg|tif|tiff|psd|heif|heic|raw|ico',
    document: 'pdf|doc|docx|xls|xlsx|ppt|pptx|csv|odt|ods|odp|rtf|tex|md|epub|mobi|cbz|cbr|cbc|chm|djvu|fb2|azw|azw3|ibooks|lit|lrf|prc|pdb|pml|rb|tcr|txt',
    software: 'exe|msi|bat|sh|bin|cmd|app|deb|rpm|zip|rar|7z|tar|gz|bz2|xz|iso|dmg|cab|apk',
    torrent: 'torrent',
    drive: 'drive'
  };
  
  const searchGenerators = {
    directory: (q, f) => f === '-1'
      ? `intitle:index.of ${q}`
      : `intitle:index.of ${q} (${f})`,
    drive: q => `site:drive.google.com ${q}`
  };
  
  function startSearch() {
    const q = document.getElementById('searchInput').value.trim();
    if (!q) return navigator.vibrate?.(200);
  
    const filter = document.querySelector('.filter-select').value;
    let searchQuery = filter === 'drive'
      ? searchGenerators.drive(q)
      : filter === 'all'
        ? searchGenerators.directory(q, [
            fileTypes.video,
            fileTypes.music,
            fileTypes.image,
            fileTypes.document,
            fileTypes.software
          ].join('|'))
        : searchGenerators.directory(q, fileTypes[filter]);
  
    // If user typed a year, tack it on
    const year = q.match(/\b(19|20)\d{2}\b/);
    if (year) searchQuery += ` ${year[0]}`;
  
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
      '_blank'
    );
  }
  
  // -- UI Initialization ----------------------------------------------------------
  function initUI() {
    initMessageCarousel();
    document
      .querySelector('.search-btn')
      .addEventListener('click', startSearch);
  
    document
      .getElementById('searchInput')
      .addEventListener('keypress', e => {
        if (e.key === 'Enter') startSearch();
      });
  }
  
  // -- Single DOMContentLoaded ----------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'hidden';
  
    const freedom = new FontFace(
      'Forever Freedom',
      'url(assets/ForeverFreedomRegular.otf)'
    );
  
    freedom.load()
      .then(() => document.fonts.add(freedom))
      .catch(err => console.error('Font load failed:', err))
      .finally(() => {
        document.body.style.visibility = 'visible';
        document.body.classList.add('fonts-loaded');
        initUI();
        createRetroEffects();
      });
  });
  