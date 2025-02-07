var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
/*! embed-chat-popup - v1.0.0 */
const css = ".ecp__backdrop{position:fixed;top:0;left:0;width:100%;height:100%;background:var(--ecp__backdrop, rgba(0, 0, 0, .5));z-index:999;display:none}.ecp__backdrop.ecp__backdrop-show{display:block}.ecp__floating-button{position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;background:var(--ecp__background, var(--ecp__background-color, linear-gradient(#08eb98, #037e51)));color:var(--ecp__icon-color, white);cursor:pointer;box-shadow:0 2px 5px #0000004d;display:flex;align-items:center;justify-content:center;z-index:1000;transition:transform .3s;border:0}.ecp__root[data-position=left] .ecp__floating-button{right:auto;left:20px}.ecp__floating-button:focus-visible{outline-offset:3px;outline-color:var(--ecp__background-color, #00d084)!important;outline:2px solid}.ecp__floating-button:hover{transform:scale(1.1)}.ecp__floating-button:active{transform:scale(.9)}.ecp__floating-button svg{opacity:var(--ecp__icon-opacity, 1)}.ecp__floating-button:hover .ecp__floating-button-chat-icon{-webkit-animation:swing 1s ease;animation:swing 1s ease;-webkit-transform-origin:top center;transform-origin:top center}.ecp__floating-button-close-icon{display:none;scale:.5;transition:scale .3s}.ecp__floating-button-open .ecp__floating-button-close-icon{display:block;scale:1}@starting-style{.ecp__floating-button-open .ecp__floating-button-close-icon{scale:.2}}.ecp__floating-button-chat-icon{display:block;scale:1;transition:scale .3s}@starting-style{.ecp__floating-button-chat-icon{scale:.2}}.ecp__floating-button-open .ecp__floating-button-chat-icon{display:none;scale:.8}.ecp__container{position:fixed;bottom:90px;right:20px;width:min(350px,90%);height:min(550px,68%);background:#fff;border-radius:10px;box-shadow:0 2px 5px #0000004d;display:none;flex-direction:column;z-index:1000;transition:opacity .1s ease,scale .1s ease,transform .3s ease,display .3s ease allow-discrete;opacity:0;transform:translateY(20px);scale:.9}.ecp__root[data-position=left] .ecp__container{right:auto;left:20px}.ecp__container-open{display:flex;opacity:1;transform:translateY(0);scale:1}@starting-style{.ecp__container-open{opacity:0;scale:.9;transform:translateY(20px)}}.ecp__iframe{width:100%;height:100%;border:none;border-radius:10px}.ecp__close-button{cursor:pointer;font-weight:700;padding:0;color:#5c5c5c;position:absolute;top:10px;right:10px;background-color:#fff;border:0;height:27px;border-radius:10px;box-shadow:0 3px 5px #00000026}.ecp__close-button:hover{background:#ececec}.ecp__close-button:active{transform:scale(.8)}.ecp__close-button svg{width:27px;height:27px}@keyframes swing{20%{-webkit-transform:rotate(10deg);transform:rotate(10deg)}40%{-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}60%{-webkit-transform:rotate(5deg);transform:rotate(5deg)}80%{-webkit-transform:rotate(-5deg);transform:rotate(-5deg)}to{-webkit-transform:rotate(0deg);transform:rotate(0)}}";
const html = '<div class="ecp__root">\n    <div class="ecp__backdrop"></div>\n\n    <button class="ecp__floating-button">\n        <div class="ecp__floating-button-chat-icon">\n            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.6.376 3.112 1.043 4.453c.178.356.237.763.134 1.148l-.595 2.226a1.3 1.3 0 0 0 1.591 1.592l2.226-.596a1.63 1.63 0 0 1 1.149.133A9.96 9.96 0 0 0 12 22m-4-8.75a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5zm-.75-2.75A.75.75 0 0 1 8 9.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75" clip-rule="evenodd"/></svg>\n        </div>\n        <div class="ecp__floating-button-close-icon">\n            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="12" stroke-dashoffset="12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12l7 7M12 12l-7 -7M12 12l-7 7M12 12l7 -7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="12;0"/></path></svg>\n        </div>\n    </button>\n\n    <div class="ecp__container">\n        <div class="ecp__header">\n            <button class="ecp__close-button">\n                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-2.9 2.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l2.9-2.9l-2.9-2.875q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l2.9 2.9l2.875-2.9q.275-.275.7-.275t.7.275q.3.3.3.713t-.3.687L13.375 12l2.9 2.9q.275.275.275.7t-.275.7q-.3.3-.712.3t-.688-.3z"/></svg>\n            </button>\n        </div>\n        <iframe class="ecp__iframe" allow="microphone; camera"></iframe>\n    </div>\n</div>';
class EmbedChatPopup {
  constructor(chatUrl, options) {
    __publicField(this, "host");
    __publicField(this, "shadowRoot");
    __publicField(this, "options");
    __publicField(this, "chatUrl");
    __publicField(this, "isChatOpen", false);
    __publicField(this, "boundHandleEscape");
    __publicField(this, "elements");
    if (!chatUrl || typeof chatUrl !== "string") {
      throw new Error("A valid chat URL must be provided to display the chat in the iframe.");
    }
    this.chatUrl = chatUrl;
    this.options = options;
    this.boundHandleEscape = this.handleEscape.bind(this);
    this.init();
  }
  init() {
    this.host = this.setupHost();
    this.shadowRoot = this.host.shadowRoot;
    this.elements = this.getElements();
    this.elements.floatingButton.addEventListener("click", this.toggle.bind(this));
    this.elements.backdrop.addEventListener("click", this.close.bind(this));
    this.elements.closeButton.addEventListener("click", this.close.bind(this));
    if (this.options.styles) {
      this.addStyles(this.elements.root, this.options.styles);
    }
    if (this.options.backdrop !== void 0) {
      this.setBackdrop();
    }
    if (this.options.position) {
      this.elements.root.dataset.position = this.options.position;
    }
  }
  toggle() {
    this.isChatOpen ? this.close() : this.open();
  }
  open() {
    if (!this.elements.iframe.src) {
      this.elements.iframe.src = this.chatUrl;
    }
    this.elements.floatingButton.classList.add("ecp__floating-button-open");
    this.elements.container.classList.add("ecp__container-open");
    this.elements.backdrop.classList.add("ecp__backdrop-show");
    document.addEventListener("keydown", this.boundHandleEscape);
    this.isChatOpen = true;
  }
  close() {
    this.elements.floatingButton.classList.remove("ecp__floating-button-open");
    this.elements.container.classList.remove("ecp__container-open");
    this.elements.backdrop.classList.remove("ecp__backdrop-show");
    document.removeEventListener("keydown", this.boundHandleEscape);
    this.isChatOpen = false;
  }
  setupHost() {
    const host = document.createElement("div");
    const shadowRoot = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = css;
    shadowRoot.appendChild(style);
    const template = document.createElement("template");
    template.innerHTML = html;
    shadowRoot.appendChild(template.content.cloneNode(true));
    document.body.appendChild(host);
    return host;
  }
  getElements() {
    return {
      root: this.shadowRoot.querySelector(".ecp__root"),
      backdrop: this.shadowRoot.querySelector(".ecp__backdrop"),
      container: this.shadowRoot.querySelector(".ecp__container"),
      floatingButton: this.shadowRoot.querySelector(".ecp__floating-button"),
      closeButton: this.shadowRoot.querySelector(".ecp__close-button"),
      iframe: this.shadowRoot.querySelector(".ecp__iframe")
    };
  }
  setBackdrop() {
    if (this.options.backdrop === false) {
      this.elements.backdrop.style.display = "none";
    } else if (typeof this.options.backdrop == "string") {
      this.addStyles(this.elements.backdrop, { backdrop: this.options.backdrop });
    }
  }
  handleEscape(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  addStyles(element, styles) {
    Object.keys(styles).forEach((key) => {
      const cssProperty = `--ecp__${camelToSnakeCase(key)}`;
      element.style.setProperty(cssProperty, styles[key]);
    });
    function camelToSnakeCase(str) {
      return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    }
  }
}
if (typeof window !== "undefined") {
  window.EmbedChatPopup = EmbedChatPopup;
}
