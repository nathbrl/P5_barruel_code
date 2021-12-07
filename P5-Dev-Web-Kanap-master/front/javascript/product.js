function getProductUrl() {
    const urlLoc = window.location.href;
    const url = new URL(urlLoc);
    const urlId = url.searchParams.get("id");
    return urlId;
}
getProductUrl();

const productId = getProductUrl();
fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((sofa) => {
        displayProductDetails(sofa);
        saveProductToLocalStorage(sofa);
    });

function displayProductDetails(sofa) {
    const img = document.querySelector('.item__img img');
    img.src = sofa.imageUrl;
    img.alt = sofa.altTxt;
    const price = document.querySelector('#price');
    price.innerHTML = sofa.price;
    const description = document.querySelector('#description');
    description.innerHTML = sofa.description;
    const name = document.querySelector('#title');
    name.innerHTML = sofa.name;
    const optionText = document.createElement('option');
    const select = document.querySelector('select').options;
    select.add(optionText)
    optionText.setAttribute('disabled', 'disabled');
    optionText.setAttribute('selected', 'true');
    optionText.textContent = 'SVP choisissez une couleur';
    const arrayColors = sofa.colors;
    arrayColors.forEach((sofa) => {
        const colorOption = document.createElement("option");
        colorOption.setAttribute("value", sofa);
        colorOption.textContent = sofa;
        select.add(colorOption);
    });
}

let cart = JSON.parse(localStorage.getItem('products')) || [];
  
function saveProductToLocalStorage(sofa) {
    const addToCartButton = document.querySelector('#addToCart');
    let select = document.querySelector('#colors');
    let quantity = document.querySelector('input#quantity');

    const productName = sofa.name;
    const productPrice = sofa.price;
    let selectedColor = select.addEventListener('change', (e) => {
        selectedColor = e.target.value;
    });
    let selectedQuantity = quantity.addEventListener('change', (e) => {
         selectedQuantity = parseInt(e.target.value);
    });
    
    addToCartButton.addEventListener('click', () => {

        let productDescription = {
            productId: productId,
            selectedColor: selectedColor,
            selectedQuantity: selectedQuantity,
            productName: productName,
            productPrice: productPrice,
        }
        /*Lors de l'ajout du panier en particulier, voici les étapes à réaliser:

        - au click de mon bouton "Ajouter au panier"
                    
        > je vérifie si mon localStorage est vide ou non
                    
        >>> Il n'est pas vide : alors je parcours mon localStorage et pour chaque produit qu'il 
        contient, je vérifie si l'id (identifiant unique) du produit que je veux mettre dans mon 
        panier est le même que celui du produit que je parcours ET si la couleur (option) 
        est aussi la même

        >>> Il est vide : alors je rajoute le produit de la page sur laquelle je suis en prenant 
        bien soin de le mettre dans un tableau (quid de l'ajout d'un autre produit derrière)
                    
        si c'est le cas, alors la quantité du produit que je parcours 
        est égale à elle-même + la quantité du produit que j'ajoute
                    
        si ce n'est pas le cas je rajoute le produit de la page sur laquelle 
        je suis dans le tableau*/

        let emptyLocalStorage = localStorage.getItem('products') === null;
        console.log(emptyLocalStorage);
        let sameColor = productDescription.selectedColor === productDescription.selectedColor;
        console.log(sameColor);
        let sameId = productDescription.productId === productDescription.productId;
        console.log(sameId);

        if (emptyLocalStorage) {
            console.log("je suis dans ma 1è condition localstorage plein");
            cart.push(productDescription);
        } else {
            console.log('je suis dans ma 2è condition localstorage vide');
            productDescription.selectedQuantity = productDescription.selectedQuantity;
            cart.push(productDescription);
        }
        localStorage.setItem('products', JSON.stringify(cart));
    });
}