fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((allSofas) => allSofas.forEach((sofa) => {
        //console.log(sofa);
        //console.log(i);
        displaySofaCard(sofa);
    }));
/*This function displays all the informations of each sofa in a card*/
function displaySofaCard(sofa) {
    const section = document.querySelector('.items');
    const card = document.createElement('a');
    card.href = "./product.html?id=" + sofa._id;
    const article = document.createElement('article');
    const name = document.createElement('h3');
    name.classList.add('productName');
    name.innerHTML = sofa.name;
    const img = document.createElement('img');
    img.src = sofa.imageUrl;
    img.alt = sofa.altTxt;
    const description = document.createElement('p');
    description.classList.add('productDescription');
    description.innerHTML = sofa.description;
    section.appendChild(card)
    card.appendChild(article);
    article.appendChild(img);
    article.appendChild(name);
    article.appendChild(description);
}
