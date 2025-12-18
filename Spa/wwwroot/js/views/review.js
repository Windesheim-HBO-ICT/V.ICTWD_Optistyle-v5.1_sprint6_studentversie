import AbstractView from "../abstractView.js";
import { sendReviewMail } from "../components/reviewMail.js";
export default class extends AbstractView {
    constructor() { 
        super();
        this.setTitle("Review"); 
    }

    async getHtml() {
    try {
        // Pad is relatief t.o.v. de HTML-pagina
        const response = await fetch("/pages/review.html");
        const html = await response.text();
        return html
    } catch (error) {
        console.error("Kon review.html niet laden:", error);
    }
  }

  afterRenderer() {
    const form = document.getElementById("reviewForm");
    const resultDiv = document.getElementById("formResult");
    const section = document.getElementById("review-achterlaten");

    if (!form || !resultDiv) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("FullName");
        const emailInput = document.getElementById("Email");
        const ratingInput = document.getElementById("Rating");
        const commentInput = document.getElementById("Comment");

        const name = nameInput?.value.trim();
        const email = emailInput?.value.trim();
        const comment = commentInput?.value.trim() ?? "";
        const rating = ratingInput?.value.trim();

        if (!name || !email) {
            resultDiv.textContent = "Vul uw naam en mailadres in.";
            resultDiv.classList.add("error");
            return;
        }

        resultDiv.textContent = "Bezig met versturen...";
        resultDiv.classList.remove("error");

        const data = await sendReviewMail(name, email, rating, comment);
        if (data != "") {
            resultDiv.textContent = "Bedankt! Uw review is ontvangen door Optistyle. Na controle zal deze worden gepubliceerd op de website. Dit proces kan enkele dagen in beslag nemen.";
            section.innerHTML = "";
        } else {
            resultDiv.textContent = data.message || "Er is iets misgegaan. Probeer het later opnieuw.";
            resultDiv.classList.add("error");
        }
    });
  }
}