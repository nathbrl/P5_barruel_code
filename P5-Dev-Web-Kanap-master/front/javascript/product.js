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
        addProductToCart(sofa);
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
const addToCartButton = document.querySelector('#addToCart');
let select = document.querySelector('#colors');
let quantity = document.querySelector('input#quantity');

function addProductToCart(sofa) {
    const productImage = sofa.imageUrl;
    const productAltTxt = sofa.altTxt;
    const productName = sofa.name;
    const productPrice = sofa.price;
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
            productPrice: productPrice,
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

