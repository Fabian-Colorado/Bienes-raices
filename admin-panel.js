const propertyList = document.getElementById("property-list");

async function loadProperties() {

    try {

        const response = await fetch("/api/admin/properties");

        if (response.status === 401) {

            window.location.href = "/admin.html";
            return;
        }

        const properties = await response.json();

        propertyList.innerHTML = "";

        if (properties.length === 0) {

            propertyList.innerHTML = "<p>No hay propiedades registradas.</p>";
            return;
        }

        properties.forEach(property => {

            const article = document.createElement("article");

            article.innerHTML = `
                <h3>${property.title}</h3>

                <p><strong>Precio:</strong> ${property.price}</p>

                <p><strong>Ubicación:</strong> ${property.location}</p>

                <p>
                    <strong>Habitaciones:</strong> ${property.bedrooms}
                    |
                    <strong>Baños:</strong> ${property.bathrooms}
                </p>
            `;

            propertyList.appendChild(article);

        });

    } catch (error) {

        console.error("Error al cargar propiedades:", error);

        propertyList.innerHTML =
            "<p>No se pudieron cargar las propiedades.</p>";
    }
}

loadProperties();
