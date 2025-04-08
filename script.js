// Message carousel variables and functions
let messageElement;
let currentMessageIndex = 0;
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

// File type extensions
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

// Search query generators
const searchGenerators = {
    // Directory search with intitle:index.of
    directory: (query, fileType) => {
        if (fileType === 'all') {
            return `intitle:index.of ${query}`;
        } else {
            return `intitle:index.of ${query} (${fileType})`;
        }
    },
    
    // Google Drive search
    drive: (query, fileType) => {
        if (fileType === 'all') {
            return `site:drive.google.com ${query}`;
        } else {
            // For drive search, we use filetype: instead of parentheses
            const firstFileType = fileType.split('|')[0];
            return `site:drive.google.com ${query} filetype:${firstFileType}`;
        }
    }
};

// Advanced search options
const advancedSearchOptions = {
    // Add year to search query
    addYear: (query, year) => {
        return `${query} ${year}`;
    },
    
    // Add quality to search query
    addQuality: (query, quality) => {
        return `${query} ${quality}`;
    },
    
    // Add language to search query
    addLanguage: (query, language) => {
        return `${query} ${language}`;
    },
    
    // Add size to search query
    addSize: (query, size) => {
        return `${query} ${size}`;
    }
};

function startSearch() {
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.querySelector('.filter-select');
    const query = searchInput.value.trim();
    
    if (!query) {
        navigator.vibrate(200);
        return;
    }
    
    const selectedFilter = filterSelect.value;
    const fileType = fileTypes[selectedFilter];
    
    let searchQuery;
    
    // Determine which search generator to use
    if (selectedFilter === 'drive') {
        // Use drive search generator
        searchQuery = searchGenerators.drive(query, fileType);
    } else {
        // Use directory search generator
        searchQuery = searchGenerators.directory(query, fileType);
    }
    
    // Apply advanced search options if needed
    // This is where you could add more complex search options
    // For example, detecting year patterns in the query
    const yearMatch = query.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
        searchQuery = advancedSearchOptions.addYear(searchQuery, yearMatch[0]);
    }
    
    // Open search in new tab
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
}

function initUI() {
    document.body.classList.add('fonts-loaded');
    initMessageCarousel();
    
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.querySelector('.filter-select');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', startSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startSearch();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'hidden';
    
    const freedom = new FontFace('Forever Freedom', 'url(assets/ForeverFreedomRegular.otf)');
    freedom.load().then(() => {
        document.fonts.add(freedom);
        document.body.style.visibility = 'visible';
        initUI();
    }).catch((err) => {
        console.error('Font loading failed:', err);
        document.body.style.visibility = 'visible';
        initUI();
    });
});