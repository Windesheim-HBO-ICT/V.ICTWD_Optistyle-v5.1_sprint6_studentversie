import AbstractView from "../abstractView.js";
import { renderGlassesList } from "../components/glassesList.js";
export default class extends AbstractView {
    constructor() { 
        super();
        this.setTitle("Brillen"); 
    }

    async getHtml() {
    try {
        // Pad is relatief t.o.v. de HTML-pagina
        const response = await fetch("/pages/glasses.html");
        const html = await response.text();
        return html
    } catch (error) {
        console.error("Kon glasses.html niet laden:", error);
    }
  }

  afterRenderer() {
    renderGlassesList();
  }
}