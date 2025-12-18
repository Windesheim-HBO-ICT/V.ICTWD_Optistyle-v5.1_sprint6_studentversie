import AbstractView from "../abstractView.js";
import { renderCart } from "../components/cart.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Winkelmand");
    }

    async getHtml() {
        try {
            const response = await fetch("/pages/cart.html");
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} bij ophalen cart.html`);
            }
            return await response.text();
        } catch (error) {
            console.error("Kon cart.html niet laden:", error);
            return "<p>Kon de winkelmand niet laden.</p>";
        }
    }

    afterRenderer() {
        renderCart();
    }
}
