import { fetchMail } from "../api/mailApi.js";

export async function sendReviewMail(name, email, rating, comment) {
    const date = new Date();
    const to = "info@optistyle.nl";
    const subject = "Nieuwe klantbeoordeling via website";
    const body = `Naam : ${name}\n E-mailadres: ${email}\n Beoordeling: ${rating}\n Toelichting: ${comment}\n Verzonden: ${date}`;
    const data = await fetchMail(to, subject, body);
    return data;
}