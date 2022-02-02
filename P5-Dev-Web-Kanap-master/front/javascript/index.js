/**
 * 1) récupère les produits de l'api grace au fetch
 * 2) boucle à travers l'array des produits afin de générer une carte pour chaque article
 * 3) Enfin, affiche les détail des chaque produits
 */
const productSection = document.querySelector('.items');

fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((products) => products.forEach(product => {
        productSection.innerHTML += `
            <a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}"/>
                    <h3 class="productName">${product.name}</h3>
                    <p class="${product.productDescription}">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                </article>
            </a>
        `
    }))
    .catch(error => {
        console.log(error);
    });