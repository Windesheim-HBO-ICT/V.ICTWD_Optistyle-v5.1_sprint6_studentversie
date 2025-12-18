export async function getCart() {
    const apiUrl = window.apiBaseUrl + "cart";
    const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error(`Kon winkelmand niet ophalen (status ${response.status})`);
    }

    return response.json();
}

export async function addToCart(sku, quantity = 1) {
    const apiUrl = window.apiBaseUrl + "cart";
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ sku, quantity })
    });

    if (!response.ok && response.status !== 204) {
        throw new Error(`Kon niet toevoegen aan winkelmand (status ${response.status})`);
    }
}
