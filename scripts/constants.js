export const fileTypes = {
  all: "-1",
  video: "mp4|mkv|avi|mov|wmv|flv|webm|mpeg|mpg|m4v|3gp|ogv|ts|divx",
  music: "mp3|wav|flac|aac|m4a|ogg|wma|ac3|opus|alac|aiff|mid|midi|mod",
  image: "jpg|jpeg|png|gif|bmp|webp|svg|tif|tiff|psd|heif|heic|raw|ico",
  document: "pdf|doc|docx|xls|xlsx|ppt|pptx|csv|odt|ods|odp|rtf|tex|md",
  book: "epub|mobi|cbz|cbr|pdf",
  archive: "zip|rar|7z|tar|gz|iso|dmg|pkg",
  code: "py|js|html|css|php|java|c|cpp|h|json|xml|sql|env|sh|bat|yml|yaml",
  software: "exe|msi|bat|sh|bin|cmd|app|deb|rpm|apk",
  drive: "drive",
  ftp: "ftp"
};

export const searchGenerators = {
  directory: (q, f) => {
    const base = `intitle:"index.of" (parent directory) -inurl:(jsp|php|html|aspx)`;
    return f === "-1" ? `${base} ${q}` : `${base} ${q} (${f})`;
  },
  drive: q => `site:drive.google.com ${q}`,
  ftp: q => `intitle:"index of" inurl:ftp -inurl:(http|https) ${q}`
};

export const CONFIG = {
  TYPING_SPEED: 80,
  ERASING_SPEED: 40,
  MESSAGE_DISPLAY_TIME: 3000,
  ERASE_DELAY: 500,
  VIBRATION_DURATION: 200
};
