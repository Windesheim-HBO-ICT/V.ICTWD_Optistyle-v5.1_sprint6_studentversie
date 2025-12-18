import AbstractView from "../abstractView.js";
import { renderGlassesDetails } from "../components/glassesDetails.js";
import { initSlideshow } from "../slide.js";

export default class extends AbstractView {
    constructor(params) { 
        super(params);
        this.sku = params.sku;
        this.setTitle("Brillen details"); 
    }

    async getHtml() {
    try {
        const response = await fetch("/pages/glasses-details.html");
        const html = await response.text();
        return html
    } catch (error) {
        console.error("Kon glasses-details.html niet laden:", error);
    }
  }

  afterRenderer() {
    renderGlassesDetails(this.sku);
    initSlideshow();
  }
}
