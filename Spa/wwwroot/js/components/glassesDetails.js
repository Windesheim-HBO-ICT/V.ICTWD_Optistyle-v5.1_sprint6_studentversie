import { fetchGlassesDetails } from '../api/glassesDetailsApi.js';

export async function renderGlassesDetails(sku) {
    const data = await fetchGlassesDetails(sku);
    const container = document.getElementById("glasses-details");
    container.innerHTML = "";
    const product = document.createElement("div");
    product.className = "product-details";
    product.innerHTML = `
                    <div class="product">  
                    <img src="/${data.imageUrl}" alt="${data.imageAlt}" class="responsiveImage" />
                    <h2>${data.name}</h2>
                    <p>vanaf &euro;${data.price}</p>
                    </div>
            `;
    container.appendChild(product);

}