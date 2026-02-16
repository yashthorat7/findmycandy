class FontLoader {
  constructor(name) {
    this.name = name;
  }

  async load() {
    document.body.style.visibility = "hidden";
    try {
      await document.fonts.load(`1em "${this.name}"`);
      if (!document.fonts.check(`1em "${this.name}"`)) {
        throw new Error(`Font ${this.name} failed to load`);
      }
    } catch (err) {
      console.error("Font load failed:", err);
    } finally {
      document.body.style.visibility = "visible";
      document.body.classList.add("fonts-loaded");
    }
  }
}

export default FontLoader;
