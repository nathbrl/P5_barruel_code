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
        addToCart(sofa);
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
  
function addToCart(sofa) {
    const addToCartButton = document.querySelector('#addToCart');
    let select = document.querySelector('#colors');
    let quantity = document.querySelector('input#quantity');
    const productImage = sofa.imageUrl;
    const altTxt = sofa.altTxt;
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
            currentProductId: productId,
            currentSelectedColor: selectedColor,
            currentSelectedQuantity: selectedQuantity,
            currentProductName: productName,
            currentProductPrice: productPrice,
            currentProductImage: productImage,
            currentAltTxt: altTxt,
        }
        if (cart.some((item) => item.currentSelectedColor === selectedColor 
            && item.currentProductId === productId)) {
            console.log('product is already in cart');
            cart.forEach((item) => console.log(item.currentSelectedQuantity += productDescription.currentSelectedQuantity));
        } else {
            console.log('product is not in cart yet');
            productDescription.currentSelectedQuantity = selectedQuantity;
            cart.push(productDescription);
        }
        localStorage.setItem('products', JSON.stringify(cart));
    });
}

