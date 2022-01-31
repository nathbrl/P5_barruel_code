/**
 * 1) récupère les produits de l'api grace au fetch
 * 2) boucle à travers l'array des produits afin de générer une carte pour chaque article
 * 3) Enfin, affiche les détail des chaque produits
 */

fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((products) => products.forEach(product => {
        const productSection = document.querySelector('.items');
        let cardlink = document.createElement('a');
        cardlink.setAttribute('href', "");
        productSection.appendChild(cardlink);
        let article = document.createElement('article');
        cardlink.appendChild(article);
        let image = document.createElement('img');
        image.setAttribute('src', 'alt');
        article.appendChild(image);
        let title = document.createElement('h3');
        title.classList.add('productName');
        article.appendChild(title);
        let description = document.createElement('p');
        description.classList.add('productDescription');
        article.appendChild(description);
        cardlink.href = `./product.html?id=${product._id}`;
        image.src = `${product.imageUrl}`;
        image.alt = `${product.altTxt}`;
        title.innerHTML = `${product.name}`;
        description.innerHTML = `${product.description}`
    }))
    .catch(error => {
        console.log(error);
    });