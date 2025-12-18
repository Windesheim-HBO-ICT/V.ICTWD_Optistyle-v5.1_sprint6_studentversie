import { renderGlassesList } from './components/glassesList.js';
import { renderGlassesDetails } from "./components/glassesDetails.js";

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('glasses-list')) {
        renderGlassesList();
    }

    if (document.getElementById('glasses-details')) {
        renderGlassesDetails();
    }
});
