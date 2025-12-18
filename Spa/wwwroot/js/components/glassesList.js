import { fetchGlasses } from '../api/glassesApi.js';

export async function renderGlassesList() {
    const data = await fetchGlasses();
    const container = document.getElementById("glasses-list");
    container.innerHTML = "";
    data.forEach(item => {
        const productLink = document.createElement("a");
        productLink.className = "product-link";
        productLink.href = `/brillen/details/${item.sku}`;
        productLink.innerHTML = `
                     <div class="product">  
                        <img src="${item.imageUrl}" alt="${item.imageAlt}" class="responsiveImage" />
                        <h2>${item.name}</h2>
                        <p>vanaf &euro;${item.price}</p>
                     </div>
                `;
        container.appendChild(productLink);
    });
}