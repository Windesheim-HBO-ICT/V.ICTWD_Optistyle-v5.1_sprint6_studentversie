import AbstractView from "../abstractView.js";
export default class extends AbstractView {
    constructor() { 
        super();
        this.setTitle("Optistyle"); 
    }

    async getHtml() {
    try {
        // Pad is relatief t.o.v. de HTML-pagina
        const response = await fetch("/pages/home.html");
        const html = await response.text();
        return html
    } catch (error) {
        console.error("Kon glasses.html niet laden:", error);
    }
  }
}