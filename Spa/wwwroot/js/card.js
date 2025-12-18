class GlassCard extends HTMLElement {
  static get observedAttributes() {
    return ["name", "image"];
  }

  constructor() {
    super();
    this.showInfo = true;
    this.attachShadow({ mode: "open" });
    this._initialized = false;

    this.loadTemplate();
  }

  async loadTemplate() {
    try {
      // Pad is relatief t.o.v. de HTML-pagina
      const response = await fetch("pages/card.html");
      const html = await response.text();

      const template = document.createElement("template");
      template.innerHTML = html;
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.initialize();
    } catch (error) {
      console.error("Kon card.html niet laden:", error);
    }
  }

  connectedCallback() {
    if (this.shadowRoot.children.length && !this._initialized) {
      this.initialize();
    }
  }

  initialize() {
    if (this._initialized) return;
    this._initialized = true;

    this.imageEl = this.shadowRoot.querySelector("img");
    this.titleEl = this.shadowRoot.querySelector("h3");
    this.infoEl = this.shadowRoot.querySelector(".info");
    this.toggleButton = this.shadowRoot.querySelector("#toggle-info");

    if (!this.toggleButton || !this.infoEl || !this.imageEl || !this.titleEl) {
      console.warn("UserCard: elementen niet gevonden in shadowRoot");
      return;
    }

    // beginwaarden op basis van attributes
    this.updateFromAttributes();

    this._onToggleClick = () => this.toggleInfo();
    this.toggleButton.addEventListener("click", this._onToggleClick);
  }

  disconnectedCallback() {
    if (this.toggleButton && this._onToggleClick) {
      this.toggleButton.removeEventListener("click", this._onToggleClick);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._initialized) return;
    if (oldValue === newValue) return;

    if (name === "name") {
      this.titleEl.innerText = newValue || "";
    }
    if (name === "image") {
      this.imageEl.src = newValue || "";
    }
  }

  updateFromAttributes() {
    const name = this.getAttribute("name") || "";
    const image = this.getAttribute("image") || "";

    this.titleEl.innerText = name;
    this.imageEl.src = image;
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    if (this.showInfo) {
      this.infoEl.style.display = "block";
      this.toggleButton.innerText = "Verberg details";
    } else {
      this.infoEl.style.display = "none";
      this.toggleButton.innerText = "Toon details";
    }
  }
}

window.customElements.define("user-card", UserCard);
