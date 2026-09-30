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
        <h3>${property.title}</h3>
        <p>${property.price}</p>
        <p>${property.location}</p>
        <p>${property.bedrooms} habitaciones · ${property.bathrooms} baños</p>
    `;

    propertyList.appendChild(card);
});
