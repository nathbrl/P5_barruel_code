/**
 * 1) récupère l'url de la page où je suis actuellement
 * 2) créer un nouvel objet url à partir de l'url où je suis actuellement
 * 3) à travers le searchParams la fonction récupère l'id 
 * pour chaque produit pour ensuite afficher ses détails propres
 */
function getProductUrl() {
    const urlLoc = window.location.href;
    const url = new URL(urlLoc);
    const urlId = url.searchParams.get("id");
    return urlId;
}
getProductUrl();

const productId = getProductUrl();

let img = document.querySelector('.item__img img');
let price = document.querySelector('#price');
let description = document.querySelector('#description');
let productName = document.querySelector('#title');
const optionText = document.createElement('option');
const selectOptions = document.querySelector('select').options;
selectOptions.add(optionText)
    optionText.setAttribute('disabled', 'disabled');
    optionText.setAttribute('selected', 'true');
    optionText.textContent = 'SVP choisissez une couleur';

/**
 * 1) récupère les données de l'APi mais pour un produit uniquement grace à son id unique
 * 2) affiche les détail du produit
 */
fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((sofa) => {
        img.src = sofa.imageUrl;
        img.alt = sofa.altTxt;
        price.innerHTML = sofa.price;
        description.innerHTML = sofa.description;
        productName.innerHTML = sofa.name;
        const arrayColors = sofa.colors;
        arrayColors.forEach((sofa) => {
            const colorOption = document.createElement("option");
            colorOption.setAttribute("value", sofa);
            colorOption.textContent = sofa;
            selectOptions.add(colorOption);
        });
        addProductToCart(sofa);
    });

const cart = JSON.parse(localStorage.getItem('products')) || [];
const addToCartButton = document.querySelector('#addToCart');
const select = document.querySelector('#colors');
const quantity = document.querySelector('#quantity');

function addProductToCart(sofa) {
    const productImage = sofa.imageUrl;
    const productAltTxt = sofa.altTxt;
    const productName = sofa.name;

    let selectedColor = select.addEventListener('change', (e) => {
        selectedColor = e.target.value;
    });
    let selectedQuantity = quantity.addEventListener('change', (e) => {
        selectedQuantity = parseInt(e.target.value);
    });

    addToCartButton.addEventListener('click', () => {
        let currentProduct = {
            currentProductId: productId,
            productSelectedColor: selectedColor,
            productSelectedQuantity: selectedQuantity,
            productName: productName,
            productImage: productImage,
            altTxt: productAltTxt,
        }
        if (cart.some(item => item.productSelectedColor === selectedColor 
            && item.currentProductId === productId)) {
            currentProduct.productSelectedQuantity += selectedQuantity;
            cart.forEach((item) => {
                if (item.productSelectedColor === selectedColor 
                    && item.currentProductId === productId) {
                        item.productSelectedQuantity += selectedQuantity;
                }
            });
        } else {
            currentProduct.productSelectedQuantity = selectedQuantity;
            cart.push(currentProduct);
        }
        localStorage.setItem('products', JSON.stringify(cart));
    });
}

