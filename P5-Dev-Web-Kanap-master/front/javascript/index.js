/**
 * 1) récupère les produits de l'api grace au fetch
 * 2) boucle à travers l'array des produits afin de générer une carte pour chaque article
 * 3) Enfin, affiche les détail des chaque produits
 */
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((products) => {
        const productSection = document.querySelector('.items');
        for (let i = 0; i < products.length; i++) {
            let productCard = `
                <a href="./product.html?id=${products[i]._id}">
                    <article>
                        <img src="${products[i].imageUrl}" alt="${products[i].altTxt}"/>
                        <h3 class="productName">${products[i].name}</h3>
                        <p class="${products[i].productDescription}">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                    </article>
                </a>`;
                productSection.innerHTML += productCard;
        }
    });
