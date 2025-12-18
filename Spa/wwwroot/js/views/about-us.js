import AbstractView from "../abstractView.js";
import { sendContactMail } from "../components/contactMail.js";
export default class extends AbstractView {
    constructor() { 
        super();
        this.setTitle("Over ons"); 
    }

    async getHtml() {
        try {
            const response = await fetch("/pages/about-us.html");
            const html = await response.text();
            return html
        } catch (error) {
            console.log("Kon about-us.html niet laden:", error);
        }
    }

    afterRenderer() {
        const form = document.getElementById("callbackForm");
        const resultDiv = document.getElementById("formResult");

        if (!form || !resultDiv) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("Name");
            const phoneInput = document.getElementById("Phone");
            const middleNameInput = document.getElementById("MiddleName");

            if (middleNameInput?.value.trim() != "") { 
                resultDiv.textContent = "Spam geblokkeerd...";
                resultDiv.classList.add("error");
                return;
            }

            const name = nameInput?.value.trim();
            const phone = phoneInput?.value.trim();

            if (!name || !phone) {
                resultDiv.textContent = "Vul uw naam en telefoonnummer in.";
                resultDiv.classList.add("error");
                return;
            }

            resultDiv.textContent = "Bezig met versturen...";
            resultDiv.classList.remove("error");

            const data = await sendContactMail(name, phone);

            if (data != "") {
                resultDiv.textContent = data.message || "Uw verzoek is ontvangen. We nemen contact op.";
                form.reset();
            } else {
                resultDiv.textContent = data.message || "Er is iets misgegaan. Probeer het later opnieuw.";
                resultDiv.classList.add("error");
            }
        });
    }
}