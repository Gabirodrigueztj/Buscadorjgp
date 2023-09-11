const apiKey = 'BLkQw0eRGE4znnlA88SY6Tlsg2VtjEHPe5LcZw5r3UHguYkOoq3Mk9Gw'; // API Key de Pexels (para uso de demostración)
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchContainer = document.getElementById('search-container');
const imageContainer = document.getElementById('image-container');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    searchImages(query);
});

async function searchImages(query) {
    const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=10`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': apiKey
            }
        });
        const data = await response.json();

        // Animación de desplazamiento y aparición
        searchContainer.style.transform = 'translateY(-100px)';

        setTimeout(() => {
            
            imageContainer.innerHTML = ''; // Limpiar resultados anteriores

            data.photos.forEach((photo) => {
                const imageCard = document.createElement('div');
                imageCard.classList.add('image-card');

                const img = document.createElement('img');
                img.src = photo.src.small;
                img.alt = photo.alt_description;

                // Agregar enlace a la imagen en tamaño grande
                const imgLink = document.createElement('a');
                imgLink.href = photo.src.original;
                imgLink.target = '_blank';
                imgLink.appendChild(img);

                imageCard.appendChild(imgLink);
                imageContainer.appendChild(imageCard);

                // Animación de aparición de la imagen
                setTimeout(() => {
                    imageCard.style.opacity = '1';
                    imageCard.style.transform = 'translateY(0)';
                }, 100);
            });
        }, 300);
        // Hacer scroll hacia la sección de imágenes
        imageContainer.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error al buscar imágenes:', error);
    }
}
