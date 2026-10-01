const whatsappNumber = "5583182642";

fetch("/api/properties")

const propertyList = document.getElementById("property-list");

fetch("/api/properties")
    .then(response => response.json())
    .then(properties => {

        properties.forEach(property => {
    const card = document.createElement("article");

    card.innerHTML = `
        <div class="property-image-container">
            <img src="${property.images[0]}" alt="${property.title}">
        </div>

        <div class="property-info">
            <h3>${property.title}</h3>

            <p class="price">${property.price}</p>

            <p>${property.location}</p>

            <p>${property.bedrooms} habitaciones · ${property.bathrooms} baños</p>

            <button class="details-button" type="button">
                Ver información de la casa
            </button>

            <div class="property-details">
                <p>${property.services.water ? "✓ Servicio de agua" : "✕ Servicio de agua"}</p>
                <p>${property.services.electricity ? "✓ Servicio de luz" : "✕ Servicio de luz"}</p>
                <p>${property.services.deeds ? "✓ Escrituras" : "✕ Escrituras"}</p>
                <p>${property.services.debt ? "⚠ Tiene adeudo" : "✓ Sin adeudo"}</p>
            </div>

            <button class="whatsapp-button" type="button">
                💬 Pedir información sobre esta casa
            </button>
        </div>
    `;

    const detailsButton = card.querySelector(".details-button");
    const whatsappButton = card.querySelector(".whatsapp-button");
    const propertyImage = card.querySelector(".property-image-container");

    detailsButton.addEventListener("click", () => {
        openPropertyModal(property);
    });
    propertyImage.addEventListener("click", () => {
    openPropertyModal(property);
});

    whatsappButton.addEventListener("click", () => {
        const message = `Hola, me interesa recibir información sobre la casa "${property.title}". ¿Podría darme más información?`;

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");
    });

            propertyList.appendChild(card);
        });

    })
    .catch(error => {
        console.error("Error al cargar las propiedades:", error);
    });

function openPropertyModal(property) {
    let currentImage = 0;

    const modal = document.createElement("div");
    modal.className = "property-modal";

    modal.innerHTML = `
        <div class="modal-content">

            <button class="close-modal" type="button">×</button>

            <div class="modal-gallery">

                <button class="gallery-button previous" type="button">‹</button>

                <img 
                    class="modal-image"
                    src="${property.images[0]}"
                    alt="${property.title}"
                >

                <button class="gallery-button next" type="button">›</button>

            </div>

            <div class="modal-info">

                <h2>${property.title}</h2>

                <p class="modal-price">${property.price}</p>

                <p>📍 ${property.location}</p>

                <p>
                    ${property.bedrooms} habitaciones ·
                    ${property.bathrooms} baños
                </p>

                <div class="modal-services">

                    <p>
                        ${property.services.water
                            ? "✓ Servicio de agua"
                            : "✕ Servicio de agua"}
                    </p>

                    <p>
                        ${property.services.electricity
                            ? "✓ Servicio de luz"
                            : "✕ Servicio de luz"}
                    </p>

                    <p>
                        ${property.services.deeds
                            ? "✓ Escrituras"
                            : "✕ Escrituras"}
                    </p>

                    <p>
                        ${property.services.debt
                            ? "⚠ Tiene adeudo"
                            : "✓ Sin adeudo"}
                    </p>

                </div>

                <button class="modal-whatsapp" type="button">
                    💬 Pedir información sobre esta casa
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    const modalImage = modal.querySelector(".modal-image");
    const previousButton = modal.querySelector(".previous");
    const nextButton = modal.querySelector(".next");
    const closeButton = modal.querySelector(".close-modal");
    const modalWhatsapp = modal.querySelector(".modal-whatsapp");
    let touchStartX = 0;
    let touchEndX = 0;


    function updateImage() {
        modalImage.src = property.images[currentImage];
    }


    previousButton.addEventListener("click", () => {

        currentImage--;

        if (currentImage < 0) {
            currentImage = property.images.length - 1;
        }

        updateImage();
    });


    nextButton.addEventListener("click", () => {

        currentImage++;

        if (currentImage >= property.images.length) {
            currentImage = 0;
        }

        updateImage();
    });


    closeButton.addEventListener("click", () => {
        modal.remove();
    });


    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            modal.remove();
        }

    });


    modalWhatsapp.addEventListener("click", () => {

        const message = `Hola, me interesa recibir información sobre la casa "${property.title}". ¿Podría darme más información?`;

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");

    });
}
modalImage.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
});

modalImage.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 50) {
        return;
    }

    if (difference > 0) {
        currentImage++;

        if (currentImage >= property.images.length) {
            currentImage = 0;
        }
    } else {
        currentImage--;

        if (currentImage < 0) {
            currentImage = property.images.length - 1;
        }
    }

    updateImage();
});
