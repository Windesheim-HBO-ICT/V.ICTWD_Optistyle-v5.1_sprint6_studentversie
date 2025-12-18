import AbstractView from "../abstractView.js";

export default class extends AbstractView {
    constructor() { 
        super();
        this.setTitle("Bedankt"); 
    }

    async getHtml() {
    try {
        // Pad is relatief t.o.v. de HTML-pagina
        const response = await fetch("/pages/thanks.html");
        const html = await response.text();
        return html
    } catch (error) {
        console.error("Kon thanks.html niet laden:", error);
    }
  }

  afterRenderer() {
  }
}