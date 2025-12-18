export async function fetchGlasses() {
    const apiUrl = window.apiBaseUrl + "glasses";
    const response = await fetch(apiUrl);
    return response.json();
}