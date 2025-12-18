import { isAuthenticated, logout } from "./api/authApi.js";

class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._initialized = false;

        // Bind handler for auth change events
        this._handleAuthChanged = this._handleAuthChanged.bind(this);
    }

    async loadTemplate() {
        try {
            const response = await fetch("/pages/navbar.html");
            if (!response.ok) {
                throw new Error("Failed to load navbar template: HTTP " + response.status);
            }

            const html = await response.text();
            const template = document.createElement("template");
            template.innerHTML = html;

            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.initialize();
        } catch (error) {
            console.error("Could not load navbar.html:", error);
        }
    }

    connectedCallback() {
        if (!this._initialized) {
            this.loadTemplate();
        }

        // Listen for global authentication state changes (login/logout)
        window.addEventListener("auth-changed", this._handleAuthChanged);
    }

    disconnectedCallback() {
        window.removeEventListener("auth-changed", this._handleAuthChanged);
    }

    _handleAuthChanged() {
        // When login or logout happens anywhere in the SPA, update the auth link
        this.updateAuthLink();
    }

    initialize() {
        if (this._initialized) return;
        this._initialized = true;

        this.sidebar = this.shadowRoot.getElementById("sidebar");
        this.toggleButton = this.shadowRoot.getElementById("toggle-btn");

        const us = this.shadowRoot.getElementById("us");
        const glasses = this.shadowRoot.getElementById("glasses");

        // Sidebar toggle button
        if (this.toggleButton) {
            this.toggleButton.addEventListener("click", () => this.toggleSidebar());
        }

        // Dropdown triggers
        if (us) us.addEventListener("click", () => this.toggleSubMenu(us));
        if (glasses) glasses.addEventListener("click", () => this.toggleSubMenu(glasses));

        // SPA navigation for links inside the Shadow DOM
        this.shadowRoot.addEventListener("click", (e) => {
            const link = e.composedPath().find(
                el => el instanceof HTMLElement && el.matches?.("[data-link]")
            );
            if (!link) return;

            e.preventDefault();
            window.dispatchEvent(
                new CustomEvent("spa-navigation", { detail: link.href })
            );
        });

        // Initial auth state for login/logout link
        this.updateAuthLink();
    }

    async updateAuthLink() {
        let authenticated = false;
        try {
            authenticated = await isAuthenticated();
        } catch (err) {
            console.error("Failed to determine authentication status:", err);
        }

        const authLink = this.shadowRoot.querySelector("#auth-link");
        const authText = this.shadowRoot.querySelector("#auth-text");

        if (!authLink || !authText) {
            console.warn("Auth link elements not found in navbar template.");
            return;
        }

        if (!authenticated) {
            // User is not authenticated: show login link
            authText.textContent = "Inloggen";
            authLink.setAttribute("aria-label", "Inloggen");
            authLink.href = "/login";
            authLink.setAttribute("data-link", "");
            authLink.onclick = null;
            return;
        }

        // User is authenticated: show logout action
        authText.textContent = "Uitloggen";
        authLink.setAttribute("aria-label", "Uitloggen");
        authLink.removeAttribute("data-link");
        authLink.href = "#";

        authLink.onclick = async (e) => {
            e.preventDefault();

            try {
                await logout();
            } catch (err) {
                console.error("Logout failed:", err);
                return;
            }

            // After logout, navigate to login page inside SPA
            window.dispatchEvent(
                new CustomEvent("spa-navigation", { detail: "/login" })
            );
        };
    }

    closeAllSubMenus() {
        if (!this.sidebar) return;

        Array.from(this.sidebar.getElementsByClassName("show")).forEach((ul) => {
            ul.classList.remove("show");
            const btn = ul.previousElementSibling;
            if (btn) {
                btn.classList.remove("rotate");
            }
        });
    }

    toggleSidebar() {
        if (!this.sidebar || !this.toggleButton) return;

        this.sidebar.classList.toggle("close");
        this.toggleButton.classList.toggle("rotate");
        this.closeAllSubMenus();
    }

    toggleSubMenu(button) {
        const submenu = button.nextElementSibling;
        if (!submenu) return;

        const isOpening = !submenu.classList.contains("show");
        if (isOpening) {
            this.closeAllSubMenus();
        }

        submenu.classList.toggle("show");
        button.classList.toggle("rotate");

        // If sidebar is collapsed, expand it when opening a submenu
        if (this.sidebar.classList.contains("close")) {
            this.sidebar.classList.remove("close");
            this.toggleButton.classList.remove("rotate");
        }
    }
}

window.customElements.define("nav-bar", NavBar);
