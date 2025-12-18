import AbstractView from "../abstractView.js";
export default class extends AbstractView {
    constructor() { 
        super();
        this.setTitle("Afspraak maken"); 
    }

    async getHtml() {
    try {
        // Pad is relatief t.o.v. de HTML-pagina
        const response = await fetch("/pages/appointment.html");
        const html = await response.text();
        return html
    } catch (error) {
        console.error("Kon appointment.html niet laden:", error);
    }
  }
}