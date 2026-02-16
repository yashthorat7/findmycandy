import { CONFIG } from './constants.js';

class MessageCarousel {
  constructor(messages) {
    this.messages = messages;
    this.currentIndex = 0;
    this.isTyping = false;
    this.element = null;
  }

  init() {
    this.element = document.querySelector('.message-carousel');
    if (!this.element) {
      this.element = document.createElement("div");
      this.element.className = "message-carousel";
      document.body.appendChild(this.element);
    }
    this.typeMessage();
  }

  typeMessage() {
    if (this.isTyping) return;
    const msg = this.messages[this.currentIndex];
    let i = 0;
    this.isTyping = true;
    this.element.textContent = '';
    this.element.classList.add('typing');

    const interval = setInterval(() => {
      if (i < msg.length) {
        this.element.textContent += msg[i++];
      } else {
        clearInterval(interval);
        this.element.classList.remove('typing');
        this.isTyping = false;
        setTimeout(() => this.eraseMessage(), CONFIG.MESSAGE_DISPLAY_TIME);
      }
    }, CONFIG.TYPING_SPEED);
  }

  eraseMessage() {
    if (this.isTyping) return;
    this.isTyping = true;
    const text = this.element.textContent;
    let i = text.length;

    const interval = setInterval(() => {
      if (i > 0) {
        this.element.textContent = text.substring(0, --i);
      } else {
        clearInterval(interval);
        this.isTyping = false;
        this.currentIndex = (this.currentIndex + 1) % this.messages.length;
        setTimeout(() => this.typeMessage(), CONFIG.ERASE_DELAY);
      }
    }, CONFIG.ERASING_SPEED);
  }
}

export default MessageCarousel;
