import { getCart } from "../api/cartApi.js";

export async function renderCart() {
    const container = document.getElementById("cart");
    container.innerHTML = "<p>Uw winkelmand wordt geladen…</p>";

    try {
        const items = await getCart();

        let isPremium = false;

        if (!items || items.length === 0) {
            container.innerHTML = `<p>Uw winkelmand is leeg.</p>`;
            return;
        }

        let subtotal = 0;

        const rowsHtml = items.map(item => {
            const lineTotal = item.price * item.quantity;
            subtotal += lineTotal;

            return `
                <tr>
                    <td class="cart-product-name">${item.name}</td>
                    <td class="cart-quantity">${item.quantity}</td>
                    <td class="cart-price">&euro;${item.price.toFixed(2)}</td>
                    <td class="cart-line-total">&euro;${lineTotal.toFixed(2)}</td>
                </tr>`;
        }).join("");

        const discountRate = isPremium ? 0.05 : 0;
        const discountAmount = subtotal * discountRate;
        const total = subtotal - discountAmount;

        const discountText = isPremium
            ? "Korting (Premium klant – 5%)"
            : "Korting (alleen beschikbaar voor Premium klanten)";

        const discountValueText = isPremium
            ? `-&euro;${discountAmount.toFixed(2)}`
            : "-&euro;0,00";

        container.innerHTML = `
                <div class="cart-layout">
                    <div class="cart-items">
                        <table class="cart-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Aantal</th>
                                    <th>Prijs</th>
                                    <th>Subtotaal</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>
                    </div>

                    <aside class="cart-summary" aria-label="Besteloverzicht">
                        <h2>Besteloverzicht</h2>
                        <div class="cart-summary-row">
                            <span>Subtotaal</span>
                            <span>&euro;${subtotal.toFixed(2)}</span>
                        </div>
                        <div class="cart-summary-row cart-discount-row">
                            <span>${discountText}</span>
                            <span>${discountValueText}</span>
                        </div>
                        <div class="cart-summary-row cart-total-row">
                            <span>Totaal</span>
                            <span>&euro;${total.toFixed(2)}</span>
                        </div>

                        <button type="button" class="cart-checkout-button">
                            Bestellen
                        </button>

                        <p class="cart-premium-note">
                            Als Premium klant ontvangt u automatisch 5% korting op uw bestelling.
                        </p>
                    </aside>
                </div>
        `;

        const checkoutButton = container.querySelector(".cart-checkout-button");
        checkoutButton.addEventListener("click", () => {
            alert("De bestelprocedure wordt later beschikbaar gemaakt.");
            // Voorbeeld: window.location.href = "/checkout";
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = `<p>Er is een fout opgetreden bij het ophalen van uw winkelmand. Probeert u het later alstublieft opnieuw.</p>`;
    }
}
