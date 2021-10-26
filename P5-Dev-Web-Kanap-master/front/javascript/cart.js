function getAllProducts() {
    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((sofa) => {
            //console.log(sofa);
            //console.log(i);
            storeProduct(sofa);
            displayCartItems();
        });
}
getAllProducts();

function getProductUrl() {
    const urlLoc = window.location.href;
    //console.log(urlLoc);
    const url = new URL(urlLoc);
    //console.log(url);
    const urlId = url.searchParams.get("id");
    return urlId;
}
getProductUrl();

/*function productButtonId (sofa) {
    const addToCartButton = document.querySelectorAll('#addToCart');
    //console.log(addToCartButton);
    addToCartButton.forEach((button) => {
        button.addEventListener('click', () => {
            const productId = getProductUrl();
            console.log(productId);
            const getProduct = sofa.filter(sofa => sofa._id == productId);
            console.log(getProduct);
        });
    });
}*/

function storeProduct(sofa) {
    const addToCartButton = document.querySelectorAll("#addToCart");
    //console.log(addToCartButton);
    addToCartButton.forEach((button) => {
        button.addEventListener("click", () => {
            //console.log(e);
            const productId = getProductUrl();
            //console.log(productId);
            const getProduct = sofa.filter((sofa) => sofa._id == productId);
            //console.log(getProduct);
            let cart = [];
            cart = JSON.parse(localStorage.getItem("products", getProduct)) || [];
            cart.push(getProduct);
            console.log(cart);
            localStorage.setItem("products", JSON.stringify(cart));
        });
    });
}

function displayCartItems() {
    let divProduct = document.querySelector("#cart__items");
    //console.log(divProduct);
    let productQuantity = document.querySelector("input.itemQuantity");
    //console.log(productQuantity);
    let cartItems = localStorage.getItem("products");
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);

    if (cartItems && divProduct) {
        divProduct.innerHTML = '';
        cartItems.forEach((product) => {
            divProduct.innerHTML += `
            <article class="cart__item" data-id="${product[0]._id}">
                <div class="cart__item__img">
                    <img src="${product[0].imageUrl}" alt="${product[0].altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${product[0].name}</h2>
                        <p>${product[0].price}€</p>
                        <p>${product[0].colors}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100"
                            value="0">
                        </div>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </article>`;
        });
    }
}

function removeProduct() {
    const suppressButton = document.querySelectorAll('.cart__item__content__settings__delete p');
    console.log(suppressButton);
    suppressButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            console.log(e);
            localStorage.removeItem('products', getProduct);
            window.location.reload();
        });
    });
}
removeProduct();