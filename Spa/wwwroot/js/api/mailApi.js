export async function fetchMail(to, subject, body) {
    try {
        const response = await fetch(window.apiMailUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ to, subject, body }),
        });

        const data = await response.json();

        if (response.ok && data.ok) return data;
    } catch (err) {
        console.log(err);
    }
    return "";
}