export async function fetchGlassesDetails(sku) {
    const apiUrl = window.apiBaseUrl + "glasses/" + sku;
    const response = await fetch(apiUrl);
    return response.json();
}