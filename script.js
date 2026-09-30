const whatsappNumber = "5583182642";

const properties = [
    {
        id: 1,
        title: "Casa familiar en Tula",
        price: "$1,250,000",
        location: "Tula de Allende, Hidalgo",
        bedrooms: 3,
        bathrooms: 2,

        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        ],

        services: {
            water: true,
            electricity: true,
            deeds: true,
            debt: false
        }
    }
];

const propertyList = document.getElementById("property-list");

properties.forEach(property => {
    const card = document.createElement("article");

    card.innerHTML = `
        <img src="${property.images[0]}" alt="${property.title}">

        <div class="property-info">
            <h3>${property.title}</h3>

            <p class="price">${property.price}</p>

            <p>${property.location}</p>

            <p>${property.bedrooms} habitaciones · ${property.bathrooms} baños</p>

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

    const whatsappButton = card.querySelector(".whatsapp-button");

    whatsappButton.addEventListener("click", () => {
        const message = `Hola, me interesa recibir información sobre la casa "${property.title}". ¿Podría darme más información?`;

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");
    });

    propertyList.appendChild(card);
});
