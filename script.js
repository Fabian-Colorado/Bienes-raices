const properties = [
    {
        id: 1,
        title: "Casa familiar en Tula",
        price: "$1,250,000",
        location: "Tula de Allende, Hidalgo",
        bedrooms: 3,
        bathrooms: 2,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
    }
];

const propertyList = document.getElementById("property-list");

properties.forEach(property => {
    const card = document.createElement("article");

    card.innerHTML = `
        <img src="${property.image}" alt="${property.title}">
        <h3>${property.title}</h3>
        <p>${property.price}</p>
        <p>${property.location}</p>
        <p>${property.bedrooms} habitaciones · ${property.bathrooms} baños</p>
    `;

    propertyList.appendChild(card);
});
