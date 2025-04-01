// Noise background variables and functions
let noiseCanvas, noiseCtx;
let noiseConfig = {
    n: 30,
    pcs: 0.1,
    scale: 0.003,
    z: 1,
    speed: 0.0004,
    p: new Array(512),
    permutation: [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180]
};

function initNoiseBackground() {
    noiseCanvas = document.getElementById('noiseCanvas');
    noiseCtx = noiseCanvas.getContext('2d');
    
    for (let i = 0; i < 256; i++) {
        noiseConfig.p[i] = noiseConfig.permutation[i];
        noiseConfig.p[i + 256] = noiseConfig.permutation[i];
    }
    
    resizeNoiseCanvas();
    window.addEventListener('resize', resizeNoiseCanvas);
    animateNoise();
}

function resizeNoiseCanvas() {
    const dpr = window.devicePixelRatio || 1,
          rect = noiseCanvas.getBoundingClientRect();
    noiseCanvas.width = rect.width * dpr;
    noiseCanvas.height = rect.height * dpr;
    noiseCtx.scale(dpr, dpr);
    Object.assign(noiseCanvas.style, {
        width: rect.width + 'px',
        height: rect.height + 'px'
    });
}

function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(t, a, b) { return a + t * (b - a); }

function grad(hash, x, y, z) {
    const h = hash & 15,
          u = h < 8 ? x : y,
          v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function noise(x, y, z) {
    let X = Math.floor(x) & 255,
        Y = Math.floor(y) & 255,
        Z = Math.floor(z) & 255;
    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
    const u = fade(x),
          v = fade(y),
          w = fade(z),
          A = noiseConfig.p[X] + Y,
          AA = noiseConfig.p[A] + Z,
          AB = noiseConfig.p[A + 1] + Z,
          B = noiseConfig.p[X + 1] + Y,
          BA = noiseConfig.p[B] + Z,
          BB = noiseConfig.p[B + 1] + Z;
    return lerp(w,
        lerp(v, lerp(u, grad(noiseConfig.p[AA], x, y, z),
                            grad(noiseConfig.p[BA], x - 1, y, z)),
                  lerp(u, grad(noiseConfig.p[AB], x, y - 1, z),
                            grad(noiseConfig.p[BB], x - 1, y - 1, z))),
        lerp(v,
            lerp(u, grad(noiseConfig.p[AA + 1], x, y, z - 1),
                     grad(noiseConfig.p[BA + 1], x - 1, y, z - 1)),
            lerp(u, grad(noiseConfig.p[AB + 1], x, y - 1, z - 1),
                     grad(noiseConfig.p[BB + 1], x - 1, y - 1, z - 1)))
    );
}

function drawNoise() {
    const { width, height } = noiseCanvas;
    noiseCtx.fillStyle = 'rgba(14,8,8,0.98)';
    noiseCtx.fillRect(0, 0, width, height);
    noiseCtx.fillStyle = 'rgba(0,0,0,0.82)';
    const pixelSize = window.innerWidth <= 640 ? 2 : 1;
    for (let y = 0; y <= height; y += pixelSize)
        for (let x = 0; x <= width; x += pixelSize)
            if ((noiseConfig.n * ((noise(x * noiseConfig.scale, y * noiseConfig.scale, noiseConfig.z) + 1) * 0.5)) % 1 < noiseConfig.pcs)
                noiseCtx.fillRect(x, y, pixelSize, pixelSize);
    noiseConfig.z += noiseConfig.speed;
}

function animateNoise() {
    drawNoise();
    requestAnimationFrame(animateNoise);
}

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
    initNoiseBackground();
    
    const darkerBg = document.createElement('div');
    darkerBg.className = 'darker-background';
    document.body.appendChild(darkerBg);
    
    initMessageCarousel();
    
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.querySelector('.filter-select');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', startSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startSearch();
    });
});