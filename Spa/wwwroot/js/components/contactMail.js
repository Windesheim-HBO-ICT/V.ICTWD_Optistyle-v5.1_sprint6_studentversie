import { fetchMail } from "../api/mailApi.js";

export async function sendContactMail(name, phone) {
    const date = new Date();
    const to = "info@optistyle.nl";
    const subject = "Terugbelverzoek via website";
    const body = `Naam : ${name}\nTelefoon: ${phone}\nVerzonden: ${date}\n`;
    const data = await fetchMail(to, subject, body);
    return data;
}