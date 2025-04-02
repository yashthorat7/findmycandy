// Message carousel variables and functions
let messageElement;
let currentMessageIndex = 0;
const messages = [
    "Unlock a world of possibilities with every search",
    "Navigate through endless digital libraries effortlessly",
    "Find what others can't with our advanced search",
    "Explore the vast digital landscape with confidence",
    "Your trusted tool for digital content discovery",
    "Search beyond the surface of the web",
    "The name of this website is completely intentional",
    "Made by Yash Thorat",
    "I am not sorry for making this"
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
    torrent: 'torrent'
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
    const searchQuery = `intitle:index.of ${query} ${selectedFilter !== 'all' ? `(${fileType})` : ''}`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initMessageCarousel();
    
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.querySelector('.filter-select');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', startSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startSearch();
    });
});