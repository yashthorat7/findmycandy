export const CATEGORIES = {
  all: {
    id: "all",
    label: "All Files",
    description: "Universal open directory search across all file formats",
    extensions: null,
    negativeTerms: []
  },
  video: {
    id: "video",
    label: "Movies & Videos",
    description: "Berserk mode for movies, TV series, documentaries, and video media",
    extensions: "mkv|mp4|avi|mov|wmv|flv|webm|m4v|ts|vob|mpg|mpeg|divx",
    negativeTerms: ["trailer", "torrent", "sample"]
  },
  audio: {
    id: "audio",
    label: "Music & Audio",
    description: "High-fidelity lossless and lossy audio archives",
    extensions: "mp3|flac|wav|m4a|aac|ogg|alac|opus|wma|aiff",
    negativeTerms: ["torrent", "lyrics"]
  },
  document: {
    id: "document",
    label: "Books & Documents",
    description: "E-books, comics, manuals, papers, and text documents",
    extensions: "pdf|epub|mobi|cbr|cbz|azw3|djvu|docx",
    negativeTerms: ["torrent"]
  },
  software: {
    id: "software",
    label: "Software & Apps",
    description: "Applications, disk images, installers, mobile packages, and archives",
    extensions: "exe|iso|apk|dmg|msi|zip|rar|7z|tar|gz|bin|pkg",
    negativeTerms: ["torrent"]
  }
};

export const DORK_SIGNATURES = {
  title: '(intitle:"index of" OR intitle:"index.of")',
  serverHeaders: '("parent directory" OR "last modified" OR "size" OR "description")',
  urlExclusions: "-inurl:htm -inurl:html -inurl:php -inurl:asp -inurl:jsp"
};

export const fileTypes = {
  all: "-1",
  video: CATEGORIES.video.extensions,
  audio: CATEGORIES.audio.extensions,
  music: CATEGORIES.audio.extensions,
  document: CATEGORIES.document.extensions,
  book: CATEGORIES.document.extensions,
  software: CATEGORIES.software.extensions,
  archive: "zip|rar|7z|tar|gz|iso|dmg|pkg"
};

export const searchGenerators = {
  directory: (q, f) => {
    const ext = f && f !== "-1" ? ` (${f})` : "";
    return `${q} ${DORK_SIGNATURES.title} ${DORK_SIGNATURES.serverHeaders}${ext} ${DORK_SIGNATURES.urlExclusions}`;
  }
};

export const CONFIG = {
  TYPING_SPEED: 80,
  ERASING_SPEED: 40,
  MESSAGE_DISPLAY_TIME: 3000,
  ERASE_DELAY: 500,
  VIBRATION_DURATION: 200
};
