class NoiseBackground {
    constructor() {
        this.canvas = document.getElementById('noiseCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.n = 50;
        this.pcs = 0.05;
        this.scale = 0.002;
        this.z = 1;
        this.speed = 0.0002;
        this.p = new Array(512);
        this.permutation = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
        
        for(let i = 0; i < 256; i++) {
            this.p[i] = this.permutation[i];
            this.p[256 + i] = this.permutation[i];
        }

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    noise(x, y, z) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;

        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);

        const u = this.fade(x);
        const v = this.fade(y);
        const w = this.fade(z);

        const A = this.p[X  ]+Y, AA = this.p[A]+Z, AB = this.p[A+1]+Z;
        const B = this.p[X+1]+Y, BA = this.p[B]+Z, BB = this.p[B+1]+Z;

        return this.lerp(w, this.lerp(v, this.lerp(u, this.grad(this.p[AA  ], x  , y  , z   ),
                                                      this.grad(this.p[BA  ], x-1, y  , z   )),
                                         this.lerp(u, this.grad(this.p[AB  ], x  , y-1, z   ),
                                                      this.grad(this.p[BB  ], x-1, y-1, z   ))),
                            this.lerp(v, this.lerp(u, this.grad(this.p[AA+1], x  , y  , z-1 ),
                                                      this.grad(this.p[BA+1], x-1, y  , z-1 )),
                                         this.lerp(u, this.grad(this.p[AB+1], x  , y-1, z-1 ),
                                                      this.grad(this.p[BB+1], x-1, y-1, z-1 ))));
    }

    fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    lerp(t, a, b) { return a + t * (b - a); }
    grad(hash, x, y, z) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    draw() {
        this.ctx.fillStyle = 'rgba(20, 13, 13, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        
        for (let y = 0; y <= this.canvas.height; y += 1) {
            for (let x = 0; x <= this.canvas.width; x += 1) {
                const pn = (this.noise(x * this.scale, y * this.scale, this.z) + 1) * 0.5;
                if ((this.n * pn) % 1 < this.pcs) {
                    this.ctx.fillRect(x, y, 1, 1);
                }
            }
        }
        
        this.z += this.speed;
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

class MessageCarousel {
    constructor() {
        this.messages = [
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
        
        this.currentIndex = 0;
        this.messageElement = document.createElement('div');
        this.messageElement.className = 'message-carousel';
        document.body.appendChild(this.messageElement);
        
        this.showNextMessage();
        setInterval(() => this.showNextMessage(), 5000);
    }

    showNextMessage() {
        this.messageElement.style.opacity = '0';
        
        setTimeout(() => {
            this.messageElement.textContent = this.messages[this.currentIndex];
            this.messageElement.style.opacity = '1';
            this.currentIndex = (this.currentIndex + 1) % this.messages.length;
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NoiseBackground();
    
    // Create darker background with pattern
    const darkerBg = document.createElement('div');
    darkerBg.className = 'darker-background';
    document.body.appendChild(darkerBg);
    
    // Initialize message carousel
    new MessageCarousel();
    
    // Get elements
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.querySelector('.filter-select');
    const searchBtn = document.querySelector('.search-btn');
    
    // File type extensions mapping
    const fileTypes = {
        all: '-1',
        video: 'mkv|mp4|avi|mov|mpg|wmv|divx|mpeg',
        image: 'jpg|png|bmp|gif|tif|tiff|psd',
        book: 'mobi|cbz|cbr|cbc|chm|epub|fb2|lit|lrf|odt|pdf|prc|pdb|pml|rb|rtf|tcr|doc|docx',
        music: 'mp3|wav|ac3|ogg|flac|wma|m4a|aac|mod'
    };

    // Search function
    function startSearch() {
        const query = searchInput.value.trim();
        if (!query) return;
        
        const selectedFilter = filterSelect.value;
        const fileType = fileTypes[selectedFilter];
        const searchQuery = `intitle:index.of ${query} ${selectedFilter !== 'all' ? `(${fileType})` : ''}`;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }

    // Event listeners
    searchBtn.addEventListener('click', startSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startSearch();
    });
});